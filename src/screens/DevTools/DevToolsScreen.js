import React, { useLayoutEffect, BackHandler } from "react";
import { FlatList, Text, View, Alert, TouchableHighlight } from "react-native";
import styles from "./styles";
import { categories, swim_styles } from "../../data/dataArrays";
import { getNumberOfSwimmers } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import { ResetSavedData, LoadMockData } from "../../data/storageProvider";

var tools = [
  { name: 'Reset Saved Data', id: 'resetdata'},
  { name: 'Load Mock Data', id: 'loadmockdata'},
];

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

  const onPressReset = async (item) => {

      if (item.id == "resetdata") {
        await ResetSavedData().then( () => {
          Alert.alert("Saved data cleared. Please close and reload app.");
          // navigation.navigate("Home");
        // console.error("Trying to exit the app now...");
        // BackHandler.exitApp();
        });
      } else if (item.id == "loadmockdata") {
        await LoadMockData().then( () => {
          Alert.alert("Mock data loaded.");
        });
      }
  };

  const renderDevTool = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressReset(item)}>
      <View style={styles.categoriesName}>
        <Text style={styles.categoriesName}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList data={tools} renderItem={renderDevTool} keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}
