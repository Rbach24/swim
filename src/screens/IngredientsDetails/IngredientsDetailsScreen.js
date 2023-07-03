import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getIngredientName, getAllSessions } from "../../data/MockDataAPI";
export default function IngredientsDetailsScreen(props) {
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

  function convertSecsToTime(secs) {
    let output = "";
    let onlySecs = secs % 60;
    let mins = Math.floor(secs / 60);
    output = mins + "mins, " + onlySecs + " secs.";
    return output;
  }
  

  // const onPressIngredient = (item) => {
  //   let name = getIngredientName(item.ingredientId);
  //   let ingredient = item.ingredientId;
  //   navigation.navigate("Ingredient", { ingredient, name });
  // };
  const renderIngredient = ({ item }) => (
    // item = session item
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" 
    // TODO: Add add this functionality later on -- onPress={() => onPressIngredient(item)}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{ item.date }</Text> 
        <Text style={styles.title}>{item.swim_style}</Text>
        <Text style={{ color: "grey" }}>Time: {convertSecsToTime(item.time_recorded)} </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={3} data={sessionsArray} renderItem={renderIngredient} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
   
  );
}
