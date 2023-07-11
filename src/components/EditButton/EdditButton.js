import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';


export default function EditButton (props) {
    return (
        <TouchableHighlight underlayColor='black' onPress={props.onPress}>
        <View style = {{ height: 50,width: 270, marginTop: 20, marginLeft: 10, marginRight: 10, borderRadius: 100, borderColor: 'black', borderWidth: 1, justifyContent: 'center', alignItems: 'center',}} >
          <Text >Edit</Text>
        </View>
      </TouchableHighlight>
    );
}

EditButton.propTypes = {
    onPress: PropTypes.func,
    source: PropTypes.number,
    title: PropTypes.string
  };
  

