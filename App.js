import React, {useRef, useState, useEffect} from 'react';

import { AppState, StyleSheet, Text, View } from 'react-native';
import { initializeSwimmersFromDatabase, saveSwimmersToDatabase} from "./src/data/MockDataAPI"
import AppContainer from './src/navigations/AppNavigation';

export default function App() {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

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
          // case 'background':
          // Save current app data to storage since the app is inactive or backgrounded.
          saveSwimmersToDatabase(appState.current);
          break;

        case 'active':
          // Initialize the data arrays with stored data from database since the app just became active/
          initializeSwimmersFromDatabase(appState.current); 
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
