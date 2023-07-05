import React, { useLayoutEffect } from "react";
import { FlatList, TextInput, Text, View, Image, TouchableHighlight, StyleSheet, Alert } from "react-native";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import TextInputExample from "../../components/TextInput/TextInput";
import EnterTime from "../../components/EnterTime/EnterTime";
import SaveButton from "../../components/SaveButton/SaveButton";
import SelectDropdown from 'react-native-select-dropdown'
import { addSessionToSwimmer, getSwimmerById } from "../../data/MockDataAPI";

// import { nativeViewGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";

export default function CheckinScreen(props) {
  const { navigation, route } = props;

  const sessions = route.params?.sessions;

  const sessionsArray = sessions; // getAllSessions(sessions);

  var d = new Date();
  var newId = '' + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
  var newSession = {
    id: newId,
    swim_style: '',
    time_recorded: 0,
    date: '',
    type: 'Meet'
  }

  const [text, onChangeText] = React.useState('Enter Date');
  const [sessionDate, onDateChanged] = React.useState('');
  const [sessionTime, onTimeChanged] = React.useState('');
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  function onSaveButton() {

    // let newSession = {
    //   id: newId,
    //   swim_style
    // }


    newSession.date = sessionDate;
    newSession.time_recorded = sessionTime;
    var swimmerId = route.params?.swimmerId;

    addSessionToSwimmer(swimmerId, newSession);
    
    var swimmer = getSwimmerById(swimmerId);
    // Alert.alert( JSON.stringify(route.params) + "  ----- " + JSON.stringify(swimmer));
    
    navigation.navigate("Recipe", { item: swimmer });
  }


  return (
   <View style ={{paddingTop : 180}}>
    <View style = {{
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 90,
    marginRight: 10,
    borderRadius : 100,
    justifyContent: 'center',
    alignItems: 'center',}}>

      {/* <MultiSelect /> */}

      <SelectDropdown
        buttonStyle = {{borderWidth : 1, borderRadius : 100}}
        data={["200 Medley Relay", "200 Free", "200IM", "50 Free", "100 Fly", "100 Free", "500 Free", "200 Free Relay", "100 Back", "100 Breast", "400 Free Relay", "Diving"]}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          newSession.swim_style = selectedItem;
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item
        }}
      />

    </View>
    
    <View style = {{ height: 50,width: 270, marginTop: 20, marginLeft: 90, marginRight: 10, borderRadius: 100, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}>
      {/* <TextInputExample /> */}

      { /* TODO: Chaitu - change this to calendar/date control  */}
      <TextInput
        style={styles.input}
        onChangeText={onDateChanged}
        value={sessionDate}
        placeholder="Enter Date"
        keyboardType="numeric"
      />

    </View>
    <View style = {{
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 90,
    marginRight: 10,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',}}>
      {/* <EnterTime/> */}

      <TextInput
        style={styles.input}
        onChangeText={onTimeChanged}
        value={sessionTime}
        placeholder="Enter time recorded for session"
        keyboardType="numeric"
      />


    </View>
    <View style = {{
    height: 50,
    width: 270,
    marginTop: 20,
    marginLeft: 90,
    marginRight: 10,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',}}>
      <SaveButton
        text = "Save me!"
        onPress = {() => onSaveButton() }
      // onPress={() => {navigation.goBack();}}
      /> 
    </View>
  </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
