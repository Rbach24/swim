import React, { useLayoutEffect } from "react";
import { FlatList, ScrollView, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { getStyleUrl, getSwimmersBySession, getCategoryName } from "../../data/MockDataAPI";

export default function StyleScreen(props) {
  const { navigation, route } = props;

  const styleId = route.params?.style;
  const styleUrl = getStyleUrl(styleId);
  const styleName = route.params?.name;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.name,
    });
  }, []);

  const onPressSwimmer = (item) => {
    navigation.navigate("Swimmer", { item });
  };

  const renderSwimmers = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressSwimmer(item)}>
      <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressSwimmer(item)}>
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.photo_url }} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
        </View>
      </TouchableHighlight>
    </TouchableHighlight>
  );

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={{ borderBottomWidth: 0.4, marginBottom: 10, borderBottomColor: "grey" }}>
        <Image style={styles.photoStyle} source={{ uri: "" + styleUrl }} />
      </View>
      <Text style={styles.styleInfo}>{styleName}:</Text>
      <View>
        <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2} data={getSwimmersBySession(styleId)} renderItem={renderSwimmers} keyExtractor={(item) => `${item.recipeId}`} />
      </View>
    </ScrollView>
  );
}
