import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import stylessss from "./styles";
import { getIngredientName, getAllSessions } from "../../data/MockDataAPI";
import AttendanceForPracticeButton from "../../components/AttendanceForPracticeButton/AttendanceForPracticeButton";
import MultiSelect from "../../components/MultiSelect/MultiSelect";
import TextInputExample from "../../components/TextInput/TextInput";
import EnterTime from "../../components/EnterTime/EnterTime";
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

  return (
    <View>
      <View style = {{paddingBottom : 30}}>
    <MultiSelect
    />
    </View>
    <View >
      <TextInputExample/>
    </View>
    <View >
    <EnterTime/>
  </View>
    </View>

  );
}
