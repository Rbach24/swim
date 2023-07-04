import React from 'react';
import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

const EnterTime = () => {
  const [text, onChangeText] = React.useState('Enter Date');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Time Recorded"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop : 10,
    height: 40,
    margin: 12,
    padding: 10,
  },
});

export default EnterTime;