import React, { useLayoutEffect, useState } from "react";
import DatePicker from 'react-native-date-picker';
import { FlatList, TextInput, Text, View, Image, TouchableHighlight, StyleSheet, Alert } from "react-native";
import SaveButton from "../../components/SaveButton/SaveButton";
import SelectDropdown from 'react-native-select-dropdown'
import { addSessionToSwimmer, getSwimmerById } from "../../data/MockDataAPI";
import { addSwimmerToSwimmerList } from "../../data/MockDataAPI";
// import { nativeViewGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";

export default function NewSwimmerScreen(props) {
  const { navigation, route } = props;

  // const sessions = route.params?.sessions;

  // const sessionsArray = sessions; // getAllSessions(sessions);

  // var d = new Date();
  // var newId = '' + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();
  var newSwimmer = {
    swimmerId: '',
    title: '',
    time: '',
    category: ''
  }

  const [swimmerName, onNameChanged] = React.useState('');
  const [swimmerTime, onTimeChanged] = React.useState('');
  let [swimmerCategory] = React.useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  function onSaveButton() {
    newSwimmer.title = swimmerName;
    newSwimmer.time = swimmerTime;
    addSwimmerToSwimmerList(swimmerName, swimmerCategory, swimmerTime);    
    navigation.navigate("Home");
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
      <SelectDropdown
        buttonStyle = {{borderWidth : 1, borderRadius : 100}}
        /* TODO: Remove below definition and use swim_style in dataArray.js */
        data={["2026", "2025", "2024", "2023"]}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          newSwimmer.category = selectedItem;
          swimmerCategory = selectedItem;
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
      <TextInput
        style={styles.input}
        onChangeText={onNameChanged}
        value={swimmerName}
        placeholder="Enter Name"
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
      <TextInput
        style={styles.input}
        onChangeText={onTimeChanged}
        value={swimmerTime}
        placeholder="Enter what the Swimmer has already qualified for"
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
        text = "Add Swimmer"
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
