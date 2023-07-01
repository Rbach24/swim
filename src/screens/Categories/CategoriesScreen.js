import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { categories, ingredients } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";

export default function CategoriesScreen(props) {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (item) => {
    const title = item.name;
    const ingredient = item;
    navigation.navigate("IngredientsDetails", { ingredients, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>{item.name}</Text>
        {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList data={ingredients} renderItem={renderCategory} keyExtractor={(item) => `${item.ingredientId}`} />
    </View>
  );
}
