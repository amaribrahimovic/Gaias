// React
import React, { useState, useRef, useEffect } from 'react';
import * as Font from 'expo-font';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { useNavigation } from '@react-navigation/core';

import { StackActions } from '@react-navigation/native';
// Components
import PrimaryButton from '../../components/PrimaryButton'
import GrayInput from '../../components/GrayInput';
import GrayInput2 from '../../components/GrayInput2';
import PrimaryDogodek from '../../components/PrimaryDogodek';
import SecondaryDogodek from '../../components/SecondaryDogodek'

// Images
import logo from '../../icons/logo-white.png'
import profileGray from '../../icons/profile-gray-stroke.png'
import key from '../../icons/key-gray.png'

import blackHome from '../../icons/home-black-stroke.png'
import greenHome from '../../icons/home-green-full.png'
import blackStack from '../../icons/stack-black-stroke.png'
import greenStack from '../../icons/stack-green-full.png'
import blackProfile from '../../icons/profile-black-stroke.png'
import greenProfile from '../../icons/profile-green-full.png'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState({});
  const isDarkMode = useColorScheme() === 'dark';

  const removeEvent = (eventId) => {
    firebase.database().ref(`users/${uid}/events/${eventId}`).remove()
      .then(() => {
        console.log("Event removed");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const navigation = useNavigation();

  // Get the currently logged-in user's UID
  const currentUser = firebase.auth().currentUser;
  const uid = firebase.auth().currentUser.uid;
  
  useEffect(() => {
    const eventsRef = firebase.database().ref('events');
    eventsRef.on('value', (snapshot) => {
      const eventData = snapshot.val() || {};
      const eventKeys = Object.keys(eventData);
      const eventList = eventKeys.map((key) => {
        const event = eventData[key];
        const isAttending = userEvents[key];
        return (
          <PrimaryDogodek
            imeDogodek={event.name}
            key={key}
            key2={key}
            isAttending={isAttending}
            desc={event.description}
            removeEvent={removeEvent}
            uid={uid}
          />
        );
      });
      setEvents(eventList);
    });

    const userEventsRef = firebase.database().ref(`users/${uid}/events`);
    userEventsRef.on('value', (snapshot) => {
      const events = snapshot.val() || {};
      setUserEvents(events);
    });

    return () => {
      eventsRef.off();
      userEventsRef.off();
    };
  }, [currentUser, userEvents]);

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.bdy}>
        <Text style={styles.txt}>Dogodki</Text>
        {events}
      </ScrollView>
      <View style={styles.tab}>
        <TouchableOpacity>
          <Image source={greenHome} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('DetailsScreen') }}>
          <Image source={blackStack} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('SettingsScreen') }}>
          <Image source={blackProfile} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
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
    marginBottom: 150, //64
    marginTop: 32,
    zIndex: 1,
    paddingBottom: 48
  },
  child:{
    marginBottom: 16
  },
  txt: {
    color: '#000',
    fontSize: 32,
  },
  bg: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 64
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  tab: {
    minHeight: 50,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row'
  },
  logo:{
    height: 32,
    width: 32
},

});
// box-shadow: 0px 8px 16px ;
