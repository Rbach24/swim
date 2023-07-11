import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
//import { categories, swim_styles } from "../../data/dataArrays";
//import { getNumberOfSwimmers } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import { swimmers } from "../../data/dataArrays";
import { getCategoryName } from "../../data/MockDataAPI";
import NewSwimmerButton from "../../components/NewSwimmerButton/NewSwimmerButton";
export default function CategoriesScreen(props) {
 
  const { navigation, route } = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <MenuImage
          onPress={() => { navigation.openDrawer(); }}
        />
      ),
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
        <Text style={styles.date}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style = {{}}>
      <View style = {{flex : 1, paddingBottom : 30, }}>
          <NewSwimmerButton
            onPress={() => {
              navigation.navigate("NewSwimmer");
            }}
          />
        </View>
      <FlatList 
          vertical 
          showsVerticalScrollIndicator={false} 
          numColumns={2} 
          data={swimmers} renderItem={renderSwimmers} 
          keyExtractor={(item) => `${item.swimmerId}`} />
    </View>
  );
}
