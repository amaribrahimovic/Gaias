import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import greenHome from '../icons/home-green-full.png'
import blackStack from '../icons/stack-black-stroke.png'
import blackProfile from '../icons/profile-black-stroke.png'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PrimaryButton from './PrimaryButton'

const Navbar = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={styles.flex}>
      <Image source={greenHome} style={styles.icon}/>
      <Image source={blackStack} style={styles.icon}/>
      <Image source={blackProfile} style={styles.icon}/>
    </View>
  )
}

const styles = StyleSheet.create({
    flex: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 16,
        paddingBottom: 16
    },
    icon: {
        height: 32,
        width: 32
    }
});

export default Navbar

