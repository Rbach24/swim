import React, { useLayoutEffect, useRef, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
  getSessionsbySwimmerId as getSessionsbySwimmerId
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import CheckinButton from "../../components/CheckinButton/CheckinButton";
import AttendanceForPracticeButton from "../../components/AttendanceForPracticeButton/AttendanceForPracticeButton";
import { FlatList } from "react-native-gesture-handler";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;

  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const title = getCategoryName(category.id);
  const meetSessions = getSessionsbySwimmerId(item.swimmerId);
  const practiceSessions = getSessionsbySwimmerId(item.swimmerId, "Practice");

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

  const onPressSessions = (item) => {
    var name = getIngredientName(item);
    let ingredient = item;
    navigation.navigate("Ingredient", { ingredient, name });
  };

  const renderMeetSession = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.categoriesItemContainer}>
        {/* <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} /> */}
        <Text style={styles.categoriesName}>{item.date}</Text>
        <Text style={styles.categoriesName}>{item.type}</Text>
        <Text style={styles.categoriesName}>{item.swim_style}</Text>
        <Text style={styles.categoriesName}>{item.time_recorded}</Text>
        {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
      </View>
    </TouchableHighlight>);

  const renderPracticeSession = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
      <View style={styles.categoriesItemContainer}>
        {/* <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} /> */}
        <Text style={styles.categoriesName}>{item.date}</Text>
        <Text style={styles.categoriesName}>{item.type}</Text>
      </View>
    </TouchableHighlight>);


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
      <View style={styles.infoRecipeContainer}>
        <Text style={styles.infoRecipeName}>{item.title}</Text>
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title })
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
          <Text style={styles.infoRecipe}>Qualified for {item.time}  </Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              // item here is the recipe/swimmer item.
              let sessions = item.sessions;
              let title = "Personal Records of " + item.title ;
              navigation.navigate("IngredientsDetails", { sessions: sessions, title });
            }}
          />
        </View>
        <View style={styles.infoContainer}>
          <AttendanceForPracticeButton
            onPress={() => {
              // item here is the recipe/swimmer item.
              let sessions = item.sessions;
              let title = "Personal Records of " + item.title ;
              navigation.navigate("IngredientsDetails", { sessions: sessions, title });
            }}
          />
        </View>
        
        <View style={styles.infoContainer}>
          <CheckinButton
            onPress={() => {
              navigation.navigate("Checkin");
            }}
          />
        </View>
        

        <View style={styles.infoContainer}>
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>

      <View>
        {/* <Text style={styles.infoDescriptionRecipe}>No. of sessions: {JSON.stringify(meetSessions)}</Text> */}
        <FlatList 
          vertical 
          showsVerticalScrollIndicator={false} 
          data={meetSessions} renderItem={renderMeetSession} 
          keyExtractor={(item) => `${item.id}`} />
      </View>

      <View><Text> ------------------------- </Text></View>

      <View>
        {/* <Text style={styles.infoDescriptionRecipe}>No. of sessions: {JSON.stringify(meetSessions)}</Text> */}
        <FlatList 
          vertical 
          showsVerticalScrollIndicator={false} 
          data={practiceSessions} renderItem={renderPracticeSession} 
          keyExtractor={(item) => `${item.id}`} />
      </View>

      {/* <View>
        <FlatList data="allSession" renderItem={renderPracticeSessions} />
      </View> */}

    </ScrollView>
  );
}
