import React, { useLayoutEffect } from "react";
import { FlatList, Text, View, TouchableHighlight, Image } from "react-native";
import styles from "./styles";
import { swimmers } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import NewSwimmerButton from "../../components/NewSwimmerButton/NewSwimmerButton";

const homeTiles = [
  { id: 'swimmerstile', asset: '', title: 'Swimmers', screen: 'Swimmers'},
  //{ id: 'devtoolstile', asset: '', title: 'DevTools', screen: 'DevTools'},
  { id: 'attendancetile', asset: '', title: 'Attendance', screen: 'Attendance'}
];

export default function HomeScreen(props) {

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

  const onPressTile = (item) => {
    // navigation.navigate("Swimmer", { item });
    navigation.navigate(item.screen);
  };

  const renderTile = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(86, 141, 245,0.9)" onPress={() => onPressTile(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.date}>{item.name}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View style={{paddingTop: 200}}>
      <View>
      </View>
      <Image>
        
      </Image>
      <FlatList 
          vertical 
          showsVerticalScrollIndicator={false} 
          numColumns={1} 
          data={homeTiles} renderItem={renderTile} 
          keyExtractor={(item) => `${item.id}`} />
    </View>
  );
}