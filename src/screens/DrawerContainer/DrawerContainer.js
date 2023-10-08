import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";
import MenuButton from "../../components/MenuButton/MenuButton";

export default function DrawerContainer(props) {
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
      <MenuButton
          title="Settings"
          source={require("../../../assets/icons/settings.png")}
          onPress={() => {
            navigation.navigate("SettingScreen");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="HOME"
          source={require("../../../assets/icons/home.png")}
          onPress={() => {
            navigation.navigate("Home");
            navigation.closeDrawer();
          }}
        />
        {/* <MenuButton
          title="SWIMMERS"
          source={require("../../../assets/icons/category.png")}
          onPress={() => {
            navigation.navigate("SwimmerList");
            navigation.closeDrawer();
          }}
        /> */}
        <MenuButton
          title="SEARCH"
          source={require("../../../assets/icons/search.png")}
          onPress={() => {
            navigation.navigate("Search");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Schedule"
          source={require("../../../assets/icons/calendar.png")}
          onPress={() => {
            navigation.navigate("Schedule");
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title="Statistics"
          source={require("../../../assets/icons/statistics.png")}
          onPress={() => {
            navigation.navigate("Statistics");
            navigation.closeDrawer();
          }}
        />
         <MenuButton
          title="DevTools"
          source={require("../../../assets/icons/menu.png")}
          onPress={() => {
            navigation.navigate("DevTools");
            navigation.closeDrawer();
          }}
        />
        
      </View>
    </View>
  );
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};
