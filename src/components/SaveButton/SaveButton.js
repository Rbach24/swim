import React from 'react';
import { Alert, Text, TouchableOpacity, } from 'react-native';

const SaveButton = () => {
  const showAlert = () =>{
     Alert.alert(
        'Changes Saved'
     )
  }
  return (
     <TouchableOpacity onPress = {showAlert}>
        <Text>Save</Text>
     </TouchableOpacity>
  )
}
export default SaveButton


