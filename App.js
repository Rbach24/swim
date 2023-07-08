import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { initializeSwimmersFromDatabase, saveSwimmersToDatabase} from "./src/data/MockDataAPI"
import AppContainer from './src/navigations/AppNavigation';

export default function App() {

  // Initialize the data arrays with stored data from database
  initializeSwimmersFromDatabase();

  return (
     <AppContainer />
  );
}
