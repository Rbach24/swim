import { StyleSheet } from "react-native";
import { SwimmerCard } from "../../AppStyles";

const styles = StyleSheet.create({
  container: SwimmerCard.container,
  photo: SwimmerCard.photo,
  title: SwimmerCard.title,
  category: SwimmerCard.category,
  btnIcon: {
    height: 14,
    width: 14,
  },
  searchContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#EDEDED", 
    borderRadius: 10, 
    width: 250,
    justifyContent: "space-around"
  },
  searchIcon: { 
    width: 20, 
    height: 20, 
    tintColor: 'grey' 
  },
  searchInput: {
    backgroundColor: "#EDEDED",
    color: "black",
    width: 180,
    height: 50,
  }
});

export default styles;
