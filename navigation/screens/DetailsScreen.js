import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as Font from 'expo-font';

//Components
import PrimaryZnacka from '../../components/PrimaryZnacka';
import SecondaryZnacka from '../../components/SecondaryZnacka';


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

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDklhVrfn5Cp36BufQJDAW1gFjxYomiUpQ",
  authDomain: "gaia-e0d22.firebaseapp.com",
  databaseURL: "https://gaia-e0d22-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gaia-e0d22",
  storageBucket: "gaia-e0d22.appspot.com",
  messagingSenderId: "663868469898",
  appId: "1:663868469898:web:5222b5a591e1e87258f373",
  measurementId: "G-BFQ5JDR22X"
};
let app;
app = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();

export default function DetailsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [userEvents, setUserEvents] = useState({});

  // Get the currently logged-in user's UID
  const currentUser = firebase.auth().currentUser;
  const uid = firebase.auth().currentUser.uid;
  
  useEffect(() => {
    const eventsRef = firebase.database().ref('badges');
    eventsRef.on('value', (snapshot) => {
      const eventData = snapshot.val() || {};
      const eventKeys = Object.keys(eventData);
      const eventList = eventKeys.map((key) => {
        const event = eventData[key];
        const isAttending = userEvents[key];
        return (
          <PrimaryZnacka
            imeZnacka={event.name}
            desc={event.description}
            key={key}
            isAttending={isAttending}
          />
        );
      });
      setEvents(eventList);
    });

    const userEventsRef = firebase.database().ref(`users/${uid}/badges`);
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
        <Text style={styles.txt}>Kolekcija Značk</Text>
        <View style={styles.container}>
          {events}
        </View>
      </ScrollView>
      <View style={styles.tab}>
        <TouchableOpacity onPress={()=>{navigation.replace("HomeScreen")}}>
          <Image source={blackHome} style={styles.logo}/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={greenStack} style={styles.logo}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.replace("SettingsScreen")}}>
          <Image source={blackProfile} style={styles.logo}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    outerBody: {
        backgroundColor: '#2C4F40',
        position: 'absolute',
        height: '100%',
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
        paddingBottom: 48
      },
      child:{
        marginBottom: 16
      },
      txt: {
        color: '#000',
        fontSize: 32,
      },
      txt2: {
        color: '#000',
        fontSize: 16,
        marginTop: 20
      },
      bg: {
        backgroundColor: '#fff',
        flex: 1,
        paddingBottom: 64
        // justifyContent: 'center',
        // alignItems: 'center',

      },
      container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16,
        width: '85%',
        zIndex: 1,
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
})