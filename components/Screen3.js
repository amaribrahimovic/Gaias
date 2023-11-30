// React
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// Libraries
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';  
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';  
import Icon from 'react-native-vector-icons/Ionicons'; 

// Components

// Images


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onClick = () =>{

  }


  return (
    <NavigationContainer>   
      <Text>Screen 3</Text>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  outerBody: {
    backgroundColor: '#2C4F40',
    position: 'absolute',
    height: '50%',
    width: '100%',
    zIndex: 0
  },
  bdy: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 64,
    marginTop: 32,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 64,
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 32,
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto',
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.5)'
  },
  child:{
    marginBottom: 16
  },
  txt: {
    color: '#000',
    fontSize: 32,
  },
  bg: {
    backgroundColor: '#fff'
  }

});
// box-shadow: 0px 8px 16px ;
export default Screen3
