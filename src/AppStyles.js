import { StyleSheet, Dimensions } from 'react-native';

// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const NumColumns = 1;
// item size
const ITEM_HEIGHT = 225;
const ITEM_MARGIN = 20;

// 2 photos per width
export const SwimmerCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: ITEM_MARGIN,
    marginTop: 0,
    width: (SCREEN_WIDTH - (NumColumns + 1) * ITEM_MARGIN) / NumColumns,
    height: ITEM_HEIGHT-155,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15,
    marginBottom : 10
  },
  // photo: {
  //   width: (SCREEN_WIDTH - (NumColumns + 1) * ITEM_MARGIN) / NumColumns - 10,
  //   height: ITEM_HEIGHT/2,
  //   borderRadius: 15,
  //   borderBottomLeftRadius: 0,
  //   borderBottomRightRadius: 0
  // },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 2,
    marginRight: 5,
    marginLeft: 5
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  }
});
