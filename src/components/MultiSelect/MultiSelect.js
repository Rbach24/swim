import SelectDropdown from 'react-native-select-dropdown'
import React from 'react';
import { StyleSheet, Alert} from 'react-native';

export default function MultiSelect(props) { 
	return (
	<SelectDropdown
		buttonStyle = {{borderWidth : 1, borderRadius : 100}}
		data={["200 Medley Relay", "200 Free", "200IM", "50 Free", "100 Fly", "100 Free", "500 Free", "200 Free Relay", "100 Back", "100 Breast", "400 Free Relay", "Diving"]}
		onSelect={(selectedItem, index) => {
			console.log(selectedItem, index);
			Alert.alert(selectedItem);
		}}
		buttonTextAfterSelection={(selectedItem, index) => {
			// text represented after item is selected
			// if data array is an array of objects then return selectedItem.property to render after item is selected
			return selectedItem
		}}
		rowTextForSelection={(item, index) => {
			// text represented for each item in dropdown
			// if data array is an array of objects then return item.property to represent item in dropdown
			return item
		}}
	/>
	);
}

