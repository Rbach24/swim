import React, { useLayoutEffect, useState, useRef } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
//import { categories, swim_styles } from "../../data/dataArrays";
//import { getNumberOfSwimmers } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
//import { swimmers } from "../../data/dataArrays";
import { getCategoryName, getSwimmers, removeAttendance } from "../../data/MockDataAPI";
import NewSwimmerButton from "../../components/NewSwimmerButton/NewSwimmerButton";
import { addAttendance } from "../../data/MockDataAPI";
import CheckBox from "react-native-check-box";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Alert } from "react-native";
import { getSwimmerById } from "../../data/MockDataAPI";
let swimmers;
//Attendance hubwfe
export default function AttendanceScreen(props) {
  const [disabled, setDisabled] = useState(false);

  swimmers = getSwimmers();
  const { navigation, route } = props;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => { navigation.openDrawer(); }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);
  console.log("SWIMMERS:   " + JSON.stringify(swimmers))

  const onPressSwimmer = (item) => {
    navigation.navigate("Swimmer", { item });
  };
  function hasAttended (swimmer) {
    const date = new Date();
    const dateString = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
    let alreadyCheckedIn = false;
    swimmer.sessions.map(data => {
      if (data.date == dateString) {
        alreadyCheckedIn = true;
      }
    });
    return alreadyCheckedIn;
  }
  const renderSwimmers = ({ item }) => (
    <BouncyCheckbox
  size={25}
  fillColor="blue"
  unfillColor="#FFFFFF"
  padding = '5%'
  text = {item.title}
  iconStyle={{ borderColor: "red" }}
  innerIconStyle={{ borderWidth: 2 }}
  isChecked = {hasAttended(item)}
  onPress={async (isCheckedIn) => {
    if (isCheckedIn){
      await addAttendance(item).then( () => {
        let updatedSwimmer = getSwimmerById(item.swimmerId);
        // navigation.navigate("Swimmer", { item: updatedSwimmer } );
      });
    }
    else {
      await removeAttendance(item).then( () => {
        let updatedSwimmer = getSwimmerById(item.swimmerId);
        // navigation.navigate("Swimmer", { item: updatedSwimmer } );
      })
    }
    


  }}
/>
    // onClick={async()=>{

      // await addAttendance(item).then( () => {
      //   Alert.alert ("Attendance Saved");
      //   let updatedSwimmer = getSwimmerById(item.swimmerId);
      //   navigation.navigate("Swimmer", { item: updatedSwimmer } );
      //   // navigation.navigate("Home");

    //   });

    // }}
  );

  return (
    <View style = {{}}>
      
      <FlatList 
          verticalshowsVerticalScrollIndicator={false} 
          numColumns={1} 
          data={swimmers} renderItem={renderSwimmers} 
          keyExtractor={(item) => `${item.swimmerId}`} />
    </View>
  );
}
