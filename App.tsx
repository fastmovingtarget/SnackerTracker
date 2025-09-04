//2025-09-04 : Adding Tracking Data Provider, Keyboard Avoiding View
//2025-08-19 : Styling changes for the main view
//2025-06-05 : Plugging the home page component into our main app
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import TrackerArrayProvider from './Contexts/TrackerContext';
import Home from './Components/Home';
import { Colours } from './Constants/Colours';

export default function App() {
  return (
    <TrackerArrayProvider>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Home />
      </KeyboardAvoidingView>
    </TrackerArrayProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colours.Primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
