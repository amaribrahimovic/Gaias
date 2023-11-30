import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';

//Libraries
import { useNavigation } from '@react-navigation/core'

//Components
import AdminZnacka from '../../components/AdminZnacka';
import PrimaryButton from '../../components/PrimaryButton';
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

export default function Znacke() {
  const navigation = useNavigation();

  const [desc, setDesc] = useState("");
  const [name, setName] = useState("");
  const [imgurl, setImgurl] = useState("");

  const [events, setEvents] = useState([]);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleDescChange = (text) => {
    setDesc(text);
  };

  const handleImgurlChange = (text) => {
    setImgurl(text)
  };

  useEffect(() => {
    const eventsRef = firebase.database().ref('badges');
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

  const createEvent = (name, desc, imgurl) => {
    const eventsRef = firebase.database().ref(`badges/${name}`);
  
    eventsRef.set({
      name: name,
      description: desc,
      image: imgurl
    }).then(() => {
      console.log('Badge created successfully!');
    }).catch((error) => {
      console.error('Error creating badge: ', error);
    });
    setName("");
    setDesc("");
    setImgurl("");
  }

  const removeEvent = (eventId) => {
    firebase.database().ref(`badges/${eventId}`).remove()
      .then(() => {
        console.log("Event removed");
      })
      .catch((error) => {
        console.log(error);
      });
  }

    return (
      <View style={styles.bg}>
      <ScrollView contentContainerStyle={styles.bdy}>
      <Text style={styles.txtMb}>Ustvari Značko</Text>
      <View style={styles.field}>
            <TextInput placeholder="Ime" value={name} name="ime" onChangeText={text => handleNameChange(text)}/>
          </View>
          <View style={styles.field}>
            <TextInput placeholder="Opis" value={desc} name="opis" onChangeText={text => handleDescChange(text)}/>
        </View>
        <View style={styles.field}>
            <TextInput placeholder="Slika URL" value={imgurl} name="slika" onChangeText={text => handleImgurlChange(text)}/>
        </View>
          <View style={styles.mb}/>
          <TouchableOpacity style={styles.btn} onPress={() => createEvent(name, desc, imgurl)}>
            <Text style={styles.txt2}>Ustvari</Text>
          </TouchableOpacity>
          <View style={styles.mb}/>
        <Text style={styles.txt}>Kolekcija Značk</Text>
        <View style={styles.container}>
          {events.map((event) => (
            <AdminZnacka key={event.id} key2={event.id} imeZnacka={event.name} desc={event.description} imgurl={event.image} removeEvent={removeEvent}/>
          ))}
        </View>
      </ScrollView>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => { navigation.replace('Dogodki') }}>
          <Image source={blackHome} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={greenStack} style={styles.logo} />
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
}

const styles = StyleSheet.create({
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
  txt2:{
    color: '#fff',
    fontSize: 24,
  },
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
