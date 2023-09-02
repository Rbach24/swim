import React, { useLayoutEffect, useState } from "react";
import { FlatList, TextInput, Text, View, Image, TouchableHighlight, StyleSheet, Alert } from "react-native";
import SaveButton from "../../components/SaveButton/SaveButton";
import SelectDropdown from 'react-native-select-dropdown'
import { addSwimmerToSwimmerList, getSwimmers, addSessionToSwimmer, getSwimmerById } from "../../data/MockDataAPI";
import { getCategories } from "../../data/MockDataAPI";
// import { nativeViewGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";


export default function NewSwimmerScreen(props) {
  const { navigation, route } = props;
  let localState = {};
  let allSwimmers = getSwimmers();

  // const sessions = route.params?.sessions;

  // const sessionsArray = sessions; // getAllSessions(sessions);
  let [swimmerName, onNameChanged] = useState('');
  let [swimmerTime, onTimeChanged] = useState('');
  let title = '', time = '';

  let [swimmerCategory] = useState('');
  let categories = getCategories();

  if (route.params?.swimmer) {
    localState = route.params?.swimmer
    title = swimmerName = localState.title;
    time = swimmerTime = localState.time;
     // swimmerCategory = state.category;
  } 
  else {
    localState = {
      swimmerId: '',
      title: '',
      time: '',
      category: ''
    }
  }
  var newSwimmer = localState;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  function onSaveButton() {
    newSwimmer.title = title;
    newSwimmer.time = time;
    newSwimmer.categoryId = swimmerCategory.id;

    // Alert.alert(JSON.stringify(newSwimmer));
    addSwimmerToSwimmerList(newSwimmer);    
    navigation.navigate("Categories", { item: allSwimmers});
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
        defaultButtonText = "Select class"
        buttonStyle = {{borderWidth : 1, borderRadius : 100}}
        /* TODO: Remove below definition and use swim_style in dataArray.js */
        data={categories}
        onSelect={(selectedItem, index) => {
          console.log("SELECT DROPDOWN: selectedItem=" + selectedItem + ", index = " + index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          newSwimmer.category = selectedItem;
          swimmerCategory = selectedItem;
          return selectedItem.name;
        }}
        rowTextForSelection={(item, index) => {
          // text represented for each item in dropdown
          // if data array is an array of objects then return item.property to represent item in dropdown
          return item.name;
        }}
        defaultValueByIndex = {localState.categoryId}
      />

    </View>
    
    <View style = {{ height: 50,width: 270, marginTop: 20, marginLeft: 90, marginRight: 10, borderRadius: 100, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}}>
      <TextInput
        style={styles.input}
        // onChangeText={text => localState.title = text}
        // onChangeText={onNameChanged}
        onChangeText={ text => {
          // onNameChanged(text); 
          // swimmerName = text;
          title = text;
          console.log ("NAME: " + text + ", swimmerName: " + swimmerName); 
        }}
      defaultValue = {title}
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
        // onChangeText={onTimeChanged}
        onChangeText={ text => {
          // onTimeChanged(text); 
          // swimmerTitle = text;
          time = text;
          console.log ("NAME: " + text + ", time: " + time); 
        }}
        // onChangeText={text=>localState.time = text}
        defaultValue={time}
        placeholder="Enter what the Swimmer has qualified for"
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
        text = "Save"
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
