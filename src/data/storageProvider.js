import * as FileSystem from 'expo-file-system';
import { swimmers, mock_data } from './dataArrays';

const DATA_FILENAME = "swim_data.json";

export async function LoadMockData() {
  swimmers.splice(0, swimmers.length);
  var result = swimmers.concat(mock_data);
  for (var i=0; i< mock_data.length; i++) {
    swimmers[i] = mock_data[i];
  }
  console.log ("LoadMockData completed.");
  saveSwimmersToDatabase("LoadMockData - saving mocked data.");
}

export async function ResetSavedData() {
    var fileUri = FileSystem.documentDirectory + DATA_FILENAME;
    console.log ("Deleting " + fileUri + "...");
    FileSystem.deleteAsync(fileUri);
    console.log ("Resetting data to stock data..");

    swimmers.splice(0, swimmers.length);

    console.log ("ResetSavedData completed.");
    saveSwimmersToDatabase("ResetSavedData - saving resetted data.");
}

export async function saveSwimmersToDatabase (appState) {
    console.log ("AppState: " + appState + " saveSwimmersToDatabase started...");
    let data = swimmers;
    if (data == null || data.length == 0) {
      console.log ("Swimmers array is empty/null - nothing written to file.");
      console.log ("If you want to reset data, use DevTools -> Reset data button.");
      return;
    }

    let dataAsString = JSON.stringify(data);
    var fileUri = FileSystem.documentDirectory + DATA_FILENAME;
    console.log ("File uri = " + fileUri);
  
    await FileSystem.writeAsStringAsync (fileUri, dataAsString);
  
    //// writeSwimData (DATA_FILENAME, dataAsString);
    console.log (dataAsString.length + " bytes written to file.");
  
    console.log (" saveSwimmersToDatabase ended.");
  
  }
  

export async function initializeSwimmersFromDatabase (appState) {
    console.log ("AppState: " + appState + ", initializeSwimmersFromDatabase started...");

    var fileUri = FileSystem.documentDirectory + DATA_FILENAME;
  
    var dataAsString = await FileSystem.readAsStringAsync(fileUri);
  
    if (dataAsString == null) {
      console.log ("Swimmers saved data not found or was corrupt. No data initialized.");
      // swimmers.splice(0, swimmers.length);
      // for (var i=0; i< static_swimmers.length; i++) {
      //   swimmers[i] = static_swimmers[i];
      // }

      return;
    }
  
    // console.log ("Read " + dataAsString + " bytes from " + DATA_FILENAME);
  
    let dataAsJSON = JSON.parse(dataAsString);
  
    if ((dataAsJSON != null) && dataAsJSON.length > 0) {
  
      // ERROR: Cannot assign new object to exported top level object.
      // ERROR: swimmers = dataAsJSON;
  
      // Empty the swimmers array and add new element.
      swimmers.splice(0, swimmers.length);
      for (var i=0; i< dataAsJSON.length; i++) {
        swimmers[i] = dataAsJSON[i];
      }
  
      var string_swimmers = JSON.stringify(swimmers);
      // console.log ("\n\n Spliced swimmers = " + string_swimmers);
  
      console.log ("Initialized " + swimmers.length + " swimmers (" + string_swimmers.length + " bytes) saved swimmers data into memory.");
//      Alert.alert("Initialized " + swimmers.length + " swimmers from disk");
    } else {
      console.log ("Swimmers saved data not found, using static data for demo.");
    }
  
    console.log ("initializeSwimmersFromDatabase ended.");
  }
