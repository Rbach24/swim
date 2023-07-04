import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, StyleSheet, Alert } from "react-native";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import TextInputExample from "../../components/TextInput/TextInput";
import EnterTime from "../../components/EnterTime/EnterTime";
import SaveButton from "../../components/SaveButton/SaveButton";

export default function CheckinScreen(props) {
  const { navigation, route } = props;

  const sessions = route.params?.sessions;
  const sessionsArray = sessions; // getAllSessions(sessions);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerTitleStyle: {
        fontSize: 16,
      },
    });
  }, []);

  function onSaveButton() {

    

    Alert.alert(
        'Changes Saved'
     );


    navigation.goBack();
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
      <MultiSelect/>
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
      <TextInputExample/>
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
      <EnterTime/>
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
