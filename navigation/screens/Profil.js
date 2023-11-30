import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { auth } from '../../firebase';


//Components
import PrimaryZnacka from '../../components/PrimaryZnacka';
import SecondaryZnacka from '../../components/SecondaryZnacka';
import profileLogo from '../../icons/profile-white-stroke.png';

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

export default function Profil() {
  const [name, setName] = useState('');
  const currentUser = firebase.auth().currentUser;
  const uid = firebase.auth().currentUser.uid;

  useEffect(() => {
    firebase.database().ref(`users/${uid}`).once('value', (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.admin) {
        firebase.database().ref(`users/${uid}/name`).once('value', (snapshott)=>{
          setName(snapshott.val());
          console.log(name);
        });       
      }     
    });
  }, []);

  const navigation = useNavigation();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch(error => alert(error.message))
  }
    return (
      <View style={styles.bg}>
        <ScrollView contentContainerStyle={styles.bdy}>
            <View style={styles.container1}>
                <Text style={styles.txt}>Profil</Text>
                <View style={styles.profileImg}>
                    <Image source={profileLogo} style={styles.img}/>
                </View>
                <Text style={styles.txt2}>{name}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.txt3}>Odjava</Text>
            </TouchableOpacity>
        </ScrollView>
        <View style={styles.tab}>
        <TouchableOpacity onPress={() => { navigation.replace('Dogodki') }}>
          <Image source={blackHome} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('Znacke') }}>
          <Image source={blackStack} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace('Uporabniki') }}>
          <Image source={blackAdmin} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity >
          <Image source={greenProfile} style={styles.logo} />
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
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 32,
        marginRight: 32,
        marginBottom: 64,
        marginTop: 32,
        zIndex: 1,
        paddingBottom: 100
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
        marginTop: 8
      },
      txt3: {
        fontSize: 24,
        color: '#fff'
      },
      bg: {
        backgroundColor: '#fff',
        flex: 1,
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
        width: '80%',
        zIndex: 1,
      },
      profileImg: {
        backgroundColor: '#2C4F40',
        width: 200,
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 24,
        borderRadius: 20
      },
      img: {
        width: 120,
        height: 120,
      },
      container1:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      button: {
        width: '80%',
        height: 'auto',
        backgroundColor: '#DD3446',
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4
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