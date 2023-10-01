import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import stylessss from './styles';
//oct 1
export default function AttendanceForPracticeButton (props) {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={props.onPress } >
        <View style={stylessss.container}>
          <Text style={stylessss.text}>Attendance</Text>
        </View>
      </TouchableHighlight>
    );
}

AttendanceForPracticeButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
