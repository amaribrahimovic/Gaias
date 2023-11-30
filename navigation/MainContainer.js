
import React from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    StatusBar,
    Text,
    useColorScheme,
    View,
    Image,
    TextInput
  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { auth } from '../firebase';

//Icons
import blackHome from '../icons/home-black-stroke.png'
import greenHome from '../icons/home-green-full.png'
import blackStack from '../icons/stack-black-stroke.png'
import greenStack from '../icons/stack-green-full.png'
import blackProfile from '../icons/profile-black-stroke.png'
import greenProfile from '../icons/profile-green-full.png'
import blackAdmin from '../icons/admin-black-stroke.png'
import greenAdmin from '../icons/admin-green-full.png'

//Screens
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import DetailsScreen from './screens/DetailsScreen'
import Login from '../Login';

import Dogodki from './screens/Dogodki';
import Znacke from './screens/Znacke';
import Uporabniki from './screens/Uporabniki';
import Profil from './screens/Profil';

//Screen names
const homeName = 'Home';
const detailsName = 'Details';
const settingsName = 'Settings';

const dogodkiName = 'Dogodki';
const znackeName = 'Znacke';
const uporabnikiName = 'Uporabniki';
const profilName = 'Profil';


const Tab = createBottomTabNavigator();

const MainContainer = () => {
    
    
  return (
    <NavigationContainer  independent={true}>
        <Tab.Navigator
        tabBarOptions={
            {
            showLabel: false,
            }
        }
        screenOptions={
            { 
                headerShown: false,
            }
            }
        >
        
        <Tab.Screen name={homeName} component={HomeScreen} options={{
            headerShown: false,
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenHome} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackHome} style={styles.logo}/>
                    )
                }
                
            }
        }}/>
        <Tab.Screen name={detailsName} component={DetailsScreen} options={{
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenStack} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackStack} style={styles.logo}/>
                    )
                }
                
            }
        }}/>
        <Tab.Screen name={settingsName} component={SettingsScreen} options={{
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenProfile} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackProfile} style={styles.logo}/>
                    )
                }
                
            }
        }}/>

    <Tab.Screen name={dogodkiName} component={Dogodki} options={{
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenHome} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackHome} style={styles.logo}/>
                    )
                }
                
            }
        }}/>
        <Tab.Screen name={znackeName} component={Znacke} options={{
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenStack} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackStack} style={styles.logo}/>
                    )
                }
                
            }
        }}/>
        <Tab.Screen name={uporabnikiName} component={Uporabniki} options={{
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenProfile} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackProfile} style={styles.logo}/>
                    )
                }
                
            }
        }}/>
        <Tab.Screen name={profilName} component={Profil} options={{
            tabBarIcon: ({size, focused, color}) =>{
                if (focused === true) {
                    return (
                        <Image source={greenAdmin} style={styles.logo}/>
                    )
                } else{
                    return (
                        <Image source={blackAdmin} style={styles.logo}/>
                    )
                }
                
            }
        }}/>
        </Tab.Navigator>
    </NavigationContainer>
  )
}

export default MainContainer

const styles = StyleSheet.create({
    logo:{
        height: 32,
        width: 32
    },
})