import React, { useLayoutEffect, useRef, useState } from "react";
import { ScrollView, Alert, Text, View, Image, Dimensions, TouchableHighlight,} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { getStyleName, getCategoryName, getCategoryById, getSessionsbySwimmerId as getSessionsbySwimmerId, getSwimmerById} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewStylesButton from "../../components/ViewSwimStylesButton/ViewSwimStylesButton";
import CheckinButton from "../../components/CheckinButton/CheckinButton";
import AttendanceForPracticeButton from "../../components/AttendanceButton/AttendanceForPracticeButton";
import { FlatList } from "react-native-gesture-handler";
import { convertSecondstoTime, addAttendance } from "../../data/MockDataAPI";
import EditButton from "../../components/EditButton/EdditButton";



const { width: viewportWidth } = Dimensions.get("window");

function sortDates(sessions) {
  sessions.sort( (a, b) => {
    var string1 = a.date;
    var timestamp1 = Date.parse(string1);
    var string2 = b.date;
    var timestamp2 = Date.parse(string2);

    return -1 * (timestamp1 - timestamp2);
  });

  return sessions;

  // for (var i=0; i< sessions.length; i++) {
  //   var item = sessions[i];
  //   var dateString = item.date;
  //   var sessionTimestamp = Date.parse(dateString);

  // }
}

export default function SwimmerScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const swimmer = item;
  console.log("The swimmer is : " + JSON.stringify(item) );
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);
  const swimmerName = item.name;
  const meetSessions = getSessionsbySwimmerId(item.swimmerId);
  const practiceSessions = getSessionsbySwimmerId(item.swimmerId, "Practice");
  //const practiceSessions = getSessionsbySwimmerId(item.swimmerId, "Practice");

  const [activeSlide, setActiveSlide] = useState(0);

  const slider1Ref = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: "false",
      headerLeft: () => (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  function processDateString (dateString) {
    var sessionTimestamp = Date.parse(dateString);
    if (sessionTimestamp == NaN) {
      return "Err: " + dateString;
    }
    var outString = new Date(sessionTimestamp).toDateString();
    if (outString == "Invalid Date")
    {
      outString = "Invalid Date: " + dateString;
    }
    return outString;
  };

  const onPressSessions = (item) => {
    var name = getStyleName(item);
    let swim_style = item;
    navigation.navigate("SwimStyle", { swim_style: swim_style, name });
  };
  const readable_time_recorded = convertSecondstoTime(item.time_recorded);
  console.log(JSON.stringify(readable_time_recorded));
  const renderMeetSession = ({ item }) => (
    

    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" 
    onPress={() => 
      navigation.navigate("Edit Session", {session : item, id : item.id, swimmerId : swimmer.swimmerId})}
    >
      <View style={styles.session}>
        {/* <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} /> */}
        <Text style={styles.categoriesName}>{processDateString(item.date)}</Text>
        <Text style={styles.categoriesName}>{item.swim_style}</Text>
        <Text style={styles.categoriesName}>{item.time_recorded}</Text>
        {/* <Text style={styles.categoriesInfo}>{getNumberOfSwimmers(item.id)} recipes</Text> */}
      </View>
    </TouchableHighlight>);

  const renderPracticeSession = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.session}>
        <View style={styles.categoriesItemContainer}>
          {/* <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} /> */}
          <Text style={styles.categoriesName}>PRACTICE: {item.date}</Text>
        </View>
      </View>
    </TouchableHighlight>);

  const [disabled, setDisabled] = useState(false);

  const onClick = () => {
    setDisabled(true);
  };  


  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={slider1Ref}
            data={item.photosArray}
            renderItem={renderImage}
            sliderWidth={viewportWidth}
            itemWidth={viewportWidth}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            firstItem={0}
            loop={false}
            autoplay={false}
            autoplayDelay={500}
            autoplayInterval={3000}
            onSnapToItem={(index) => setActiveSlide(0)}
          />
          <Pagination
            dotsLength={item.photosArray.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotColor="rgba(255, 255, 255, 0.92)"
            dotStyle={styles.paginationDot}
            inactiveDotColor="white"
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={slider1Ref.current}
            tappableDots={!!slider1Ref.current}
          />
        </View>
      </View>
      <View style={styles.infoSwimmerContainer}>
        <Text style={styles.infoSwimmerName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("SwimmersList", { category, title })
            }
          >
            <Text style={styles.category}>
              {getCategoryName(item.categoryId).toUpperCase()} 
            </Text>
          </TouchableHighlight>
        </View>

        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require("../../../assets/icons/time.png")}
          />
          <Text style={styles.infoSwimmer}>Qualified for {item.time}  </Text>
        </View>
        <View style={styles.infoContainer}>
          <AttendanceForPracticeButton
            disabled = {disabled}

            onPress={async () => {
                
              // item here is the recipe/swimmer item.
              const item = route.params?.item;
              await addAttendance(item).then( () => {
                Alert.alert ("Attendance Saved");
                let updatedSwimmer = getSwimmerById(item.swimmerId);
                navigation.navigate("Swimmer", { item: updatedSwimmer } );
                // navigation.navigate("Home");
              });
            }}
          />
        </View>
        
        <View style={styles.infoContainer}>
          <CheckinButton
            onPress={() => {
              navigation.navigate("Checkin", {swimmerId: item.swimmerId });
            }}
          />
        </View>

        <EditButton 
          onPress={ () => {
            navigation.navigate("NewSwimmer", {swimmer: item });

          }}
        />
        

        {/* <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View> */}
      </View>

      <View >
        {/* <Text style={styles.infoDescriptionRecipe}>No. of sessions: {JSON.stringify(meetSessions)}</Text> */}
        <FlatList 
          length = '30'
          horizontal="true"
          key = {'#'}
          data={sortDates(meetSessions)} renderItem={renderMeetSession} 
          keyExtractor={(item) => `${item.id}`} />

      </View>

      <View >
        {/* <Text style={styles.infoDescriptionRecipe}>No. of sessions: {JSON.stringify(meetSessions)}</Text> */}
        <FlatList 
          length = '30'
          horizontal="true"
          key = {'#'}
          data={sortDates(practiceSessions)} renderItem={renderPracticeSession} 
          keyExtractor={(item) => `${item.id}`} />

      </View>

      

      {/* <View>
        <FlatList 
          vertical 
          key = {'_'}
          numColumns={2}
          showsVerticalScrollIndicator={false} 
          data={practiceSessions} renderItem={renderPracticeSession} 
          keyExtractor={(item) => `${item.id}`} />
      </View>
         */}

    </ScrollView>
  );
}
