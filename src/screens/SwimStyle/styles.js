import { StyleSheet } from 'react-native';
import { SwimmerCard } from '../../AppStyles';

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 20
  },
  photoStyle: {
    width: '100%',
    height: 250,
    alignSelf: 'center'
  },
  styleInfo: {
    color: 'black',
    margin: 10,
    fontSize: 19,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  container: SwimmerCard.container,
  photo: SwimmerCard.photo,
  title: SwimmerCard.title,
  category: SwimmerCard.category
});

export default styles;
