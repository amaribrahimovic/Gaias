import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import useFonts from './hooks/useFonts';
//Screens
import MainContainer from './navigation/MainContainer';
import HomeScreen from './navigation/screens/HomeScreen';
import DetailsScreen from './navigation/screens/DetailsScreen';
import SettingsScreen from './navigation/screens/SettingsScreen'
import Login from './Login.js';

//Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Dogodki from './navigation/screens/Dogodki';
import Znacke from './navigation/screens/Znacke';
import Uporabniki from './navigation/screens/Uporabniki';
import Profil from './navigation/screens/Profil';

const Stack = createNativeStackNavigator();

export default function App() {
  // const LoadFonts = async () => {
  //   await useFonts();
  // };
  // LoadFonts();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Dogodki" component={Dogodki} />
        <Stack.Screen options={{ headerShown: false }} name="Znacke" component={Znacke} />
        <Stack.Screen options={{ headerShown: false }} name="Uporabniki" component={Uporabniki} />
        <Stack.Screen options={{ headerShown: false }} name="Profil" component={Profil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
