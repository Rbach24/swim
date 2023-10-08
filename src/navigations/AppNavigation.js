import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer' ;
import HomeScreen from '../screens/Home/HomeScreen';
import CategoriesScreen from '../screens/Categories/CategoriesScreen';
import SwimmerScreen from '../screens/Swimmer/SwimmerScreen';
import SwimmerListScreen from '../screens/SwimmersList/SwimmersListScreen';
import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
import SearchScreen from '../screens/Search/SearchScreen';
import StylesDetailsScreen from '../screens/SwimStylesDetails/SwimStylesDetailsScreen';
import CheckinScreen from '../screens/Checkin/CheckinScreen';
import DevToolsScreen from '../screens/DevTools/DevToolsScreen';
import NewSwimmerScreen from '../screens/NewSwimmer/NewSwimmerScreen';
import EditSessionScreen from '../screens/EditSessionScreen/EditSessionScreen';
import AttendanceScreen from '../screens/Attendance/AttendanceScreen';
import Schedule from '../screens/Schedule/schedule';
import Statistics from '../screens/Statistics/statistics';
import SettingScreen from '../screens/SettingScreen/settingScreen';
const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen}  />
      <Stack.Screen name='Swimmers' component={CategoriesScreen}/>
      <Stack.Screen name='Swimmer' component={SwimmerScreen}/>
      <Stack.Screen name='SwimmerList' component={SwimmerListScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='StylesDetails' component={StylesDetailsScreen} />
      <Stack.Screen name='Checkin' component={CheckinScreen} />
      <Stack.Screen name='NewSwimmer' component={NewSwimmerScreen} />
      <Stack.Screen name='DevTools' component={DevToolsScreen} />
      <Stack.Screen name='Edit Session' component={EditSessionScreen} />
      <Stack.Screen name='Attendance' component={AttendanceScreen} />
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
      <Stack.Screen name='Statistics' component={Statistics} />
      <Stack.Screen name='Schedule' component={Schedule} />







    </Stack.Navigator>
  )
} 



const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 150
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 


 export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} 
 

console.disableYellowBox = true;
