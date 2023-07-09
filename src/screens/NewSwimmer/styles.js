import { StyleSheet, Dimensions } from 'react-native';
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const numColumns = 3;
// item size
const SWIMMER_ITEM_HEIGHT = 100;
const SWIMMER_ITEM_OFFSET = 10;
const SWIMMER_ITEM_MARGIN = SWIMMER_ITEM_OFFSET * 2;

const stylessss = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    margin: SWIMMER_ITEM_OFFSET,
    marginTop: 30,
    width: (SCREEN_WIDTH - SWIMMER_ITEM_MARGIN) / numColumns - SWIMMER_ITEM_OFFSET,
    height: SWIMMER_ITEM_HEIGHT + 60
  },
  title: {
    margin: 10,
    marginBottom: 5,
    color: 'black',
    fontSize: 13,
    textAlign: 'center'
  },
  photo: {
    width: (SCREEN_WIDTH - SWIMMER_ITEM_MARGIN) / numColumns - SWIMMER_ITEM_OFFSET,
    height: SWIMMER_ITEM_HEIGHT,
    borderRadius: 60
  }
});

export default stylessss;
