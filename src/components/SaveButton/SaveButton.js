import React from 'react';
import { Alert, Text, TouchableOpacity, } from 'react-native';
import PropTypes from "prop-types";
import styles from "./styles";

export default function SaveButton (props){

  return (
     <TouchableOpacity onPress={props.onPress} >
        <Text> {props.text} </Text>
     </TouchableOpacity>
  )
}

SaveButton.propTypes = {
  onPress: PropTypes.func,
  text: PropTypes.string,
};
