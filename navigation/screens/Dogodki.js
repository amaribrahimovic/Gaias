// React
import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
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
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useNavigation } from '@react-navigation/core'

// Components
import PrimaryButton from '../../components/PrimaryButton'
import GrayInput from '../../components/GrayInput';
import GrayInput2 from '../../components/GrayInput2';
import AdminDogodek from '../../components/AdminDogodek';
//Form
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
import blackAdmin from '../../icons/admin-black-stroke.png'
import greenAdmin from '../../icons/admin-green-full.png'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Dogodki() {
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventsRef = firebase.database().ref('events');
    eventsRef.on('value', (snapshot) => {
      const eventList = [];
      snapshot.forEach((childSnapshot) => {
        const eventId = childSnapshot.key;
        const event = childSnapshot.val();
        eventList.push({ id: eventId, ...event });
      });
      setEvents(eventList);
    });
    return () => eventsRef.off();
  }, []);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleDescChange = (text) => {
    setDesc(text);
  };

  const removeEvent = (eventId) => {
    firebase.database().ref(`events/${eventId}`).remove()
      .then(() => {
        console.log("Event removed");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createEvent = (name, desc) => {
    const eventsRef = firebase.database().ref(`events/${name}`);
  
    eventsRef.set({
      name: name,
      description: desc
    }).then(() => {
      console.log('Event created successfully!');
    }).catch((error) => {
      console.error('Error creating event: ', error);
    });
    setName("");
    setDesc("");
  }

  const navigation = useNavigation();

  return (
      <View style={styles.bg}>
        <ScrollView contentContainerStyle={styles.bdy}>
          <Text style={styles.txtMb}>Ustvari Dogodek</Text>
          <View style={styles.field}>
            <TextInput placeholder="Ime" value={name} name="ime" onChangeText={text => handleNameChange(text)}/>
          </View>
          <View style={styles.field}>
            <TextInput placeholder="Opis" value={desc} name="opis" onChangeText={text => handleDescChange(text)}/>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => createEvent(name, desc)}>
            <Text style={styles.txt2}>Ustvari</Text>
          </TouchableOpacity>
          <View style={styles.mb}/>
          <Text style={styles.txt}>Dogodki</Text>
          {events.map((event) => (
            <AdminDogodek key={event.id} key2={event.id} imeDogodek={event.name} descDogodek={event.description} removeEvent={removeEvent}/>
          ))}
        </ScrollView>       
        <View style={styles.tab}>
        <TouchableOpacity>
          <Image source={greenHome} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('Znacke') }}>
          <Image source={blackStack} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('Uporabniki') }}>
          <Image source={blackAdmin} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('Profil') }}>
          <Image source={blackProfile} style={styles.logo} />
        </TouchableOpacity>
      </View>
      </View>
  );
};


const styles = StyleSheet.create({
  field: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 10,
    paddingTop: 10,
    width: '100%',
    borderRadius: 40,
    marginBottom: 48
},
  outerBody: {
    backgroundColor: '#2C4F40',
    position: 'absolute',
    height: '50%',
    width: '100%',
    zIndex: 0
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
  txt2:{
    color: '#fff',
    fontSize: 24,
  },
  bg: {
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 64
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mb: {
    marginBottom: 16
  },
  mt: {
    marginTop: 16
  },
  mv: {
    marginTop: 16,
    marginBottom: 16
  },
  txtMb: {
    color: '#000',
    fontSize: 32,
    marginBottom: 48
  },
  logo:{
        height: 32,
        width: 32
    },
    btn: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 8,
      paddingBottom: 8,
      paddingRight: 64,
      paddingLeft: 64,
      backgroundColor: '#2C4F40',
      borderRadius: 64,
      fontWeight: 500,
      lineHeight: 24,
      width: '100%'
    },
});