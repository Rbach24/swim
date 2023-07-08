import React, {useRef, useState, useEffect} from 'react';
import * as Updates from 'expo-updates';

import { AppState, StyleSheet, Text, View } from 'react-native';
// import { initializeSwimmersFromDatabase, saveSwimmersToDatabase} from "./src/data/MockDataAPI"
import AppContainer from './src/navigations/AppNavigation';
import { initializeSwimmersFromDatabase, saveSwimmersToDatabase } from "./src/data/storageProvider";

export default function App() {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // Call this data init method once to preload data.
  initializeSwimmersFromDatabase(); 

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState is == ', appState.current);

      switch (appState.current) {
        case 'inactive': 
          {
            // case 'background':
            // Save current app data to storage since the app is inactive or backgrounded.

            const saveData = async () => { 
              await saveSwimmersToDatabase(appState.current);
            };

            saveData().catch(console.error);
          }
          break;

        case 'active':
          {
            // Initialize the data arrays with stored data from database since the app just became active/
            const readData = async () => {
              await initializeSwimmersFromDatabase(appState.current); 
            };

            readData().catch(console.error).finally( () => {
              // Updates.reloadAsync();
            });
          }
      }

    });

    return () => {
      subscription.remove();
    };
  }, []);


  return (
    <AppContainer />
  );


}
