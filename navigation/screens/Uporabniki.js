import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
// const admin = require('firebase-admin');
//Libraries
import { useNavigation } from '@react-navigation/core'

//Components
import PrimaryZnacka from '../../components/PrimaryZnacka';
import SecondaryZnacka from '../../components/SecondaryZnacka';
import PrimaryButton from '../../components/PrimaryButton';
import Uporabnik from '../../components/Uporabnik';

//Form
import SecondaryButton from '../../components/SecondaryButton';

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

export default function Uporabniki() {
  // admin.initializeApp();
  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const [events, setEvents] = useState([]);

  const handleNameChange = (text) => {
    setName(text);
  };
  const handleDescChange = (text) => {
    setDesc(text);
  };
  const handleEmailChange = (text) => {
    setEmail(text);
  };

  useEffect(() => {
    const eventsRef = firebase.database().ref('users');
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

  const removeEvent = (eventId) => {
    firebase.database().ref(`users/${eventId}`).remove()
      .then(() => {
        console.log("Event removed");
      })
      .catch((error) => {
        console.log(error);
      });
      //
      
  }

  const removeBadge = (eventId, badgeId) => {
    firebase.database().ref(`users/${eventId}/badges/${badgeId}`).remove()
      .then(() => {
        console.log("Event removed");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const createEvent = async (name, desc, email) => {
    firebase.auth().createUserWithEmailAndPassword(email, desc)
  .then(async (userCredential) => {
    let actualId = 0;
    await firebase.database().ref('UsersCount/count').once('value', (snapshot) => {
      console.log(snapshot.val());
      actualId = snapshot.val() + 1;
      console.log(actualId);
      console.log(snapshot.val()+1)
    });
    console.log(actualId);
    const userId = userCredential.user.uid;
    const userData = {
      email: userCredential.user.email,
      name: name,
      badges: {},
      events: {},
      id2: actualId
    };
    firebase.database().ref(`users/${userId}`).set(userData);
    firebase.database().ref(`UsersCount/count`).set(actualId);
    // navigation.replace('Uporabniki');
  })
  .catch((error) => {
    // handle errors here
    console.log(error);
  });
    setName("");
    setDesc("");
    setEmail("");
  }

    return (
      <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.bdy}>
      <Text style={styles.txtMb}>Ustvari Uporabnika</Text>
          <View style={styles.field}>
            <TextInput placeholder="Ime" value={name} name="ime" onChangeText={text => handleNameChange(text)}/>
          </View>
          <View style={styles.field}>
            <TextInput placeholder="Email" value={email} name="email" onChangeText={text => handleEmailChange(text)}/>
          </View>
          <View style={styles.field}>
            <TextInput placeholder="Geslo" value={desc} name="geslo" onChangeText={text => handleDescChange(text)}/>
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => createEvent(name, desc, email)}>
            <Text style={styles.txt3}>Ustvari</Text>
          </TouchableOpacity>
          <View style={styles.mb}/>
           {/* <Text style={styles.txtMb}>Ustvari uporabnika</Text>
           <PrimaryButton textContent="Ustvari"/> */}
           <View style={styles.mb}/>
           <Text style={styles.txt}>Uporabniki</Text>
           {events.map((event) => (
            <Uporabnik key={event.id} key2={event.id} key3={event.id2} imeUporabnik={event.name} removeEvent={removeEvent} removeBadge={removeBadge}/>
          ))}
         </ScrollView>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => { navigation.replace('Dogodki') }}>
          <Image source={blackHome} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => { navigation.replace('Znacke') }}>
          <Image source={blackStack} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={greenAdmin} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('Profil') }}>
          <Image source={blackProfile} style={styles.logo} />
        </TouchableOpacity>
      </View>
    </View>
    );
}

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
txt3:{
  color: '#fff',
  fontSize: 24,
},
    outerBody: {
        backgroundColor: '#2C4F40',
        position: 'absolute',
        height: '100%',
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
      logo:{
        height: 32,
        width: 32
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
      }
})
