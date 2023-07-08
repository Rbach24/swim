import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { getSwimmersByCategoryId, getCategoryName } from "../../data/MockDataAPI";

export default function SwimmersListScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  const swimmersArray = getSwimmersByCategoryId(item.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  const onPressSwimmer = (item) => {
    navigation.navigate("Swimmer", { item });
  };

  const renderSwimmers = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressSwimmer(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={swimmersArray} renderItem={renderSwimmers} keyExtractor={(item) => `${item.recipeId}`} />
    </View>
  );
}
