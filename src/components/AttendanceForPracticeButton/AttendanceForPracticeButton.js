import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import stylesss from './styles';

export default function AttendanceForPracticeButton (props) {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={props.onPress}>
        <View style={stylesss.container}>
          <Text style={stylesss.text}>Attendance For Practice</Text>
        </View>
      </TouchableHighlight>
    );
}

AttendanceForPracticeButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
