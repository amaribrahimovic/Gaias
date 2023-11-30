import { Button, StyleSheet, Text, TouchableOpacity, View, Modal, ScrollView } from 'react-native'
import { useState, useEffect } from 'react';
import React from 'react'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const PrimaryDogodek = ({imeDogodek, key2, isAttending,  desc, removeEvent, uid}) => {
  const [showPopup, setShowPopup] = useState(false);

  const addEventToUser = (eventId, uid) => {
    firebase.database().ref(`users/${uid}/events/${eventId}`).set(true);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleRemoveEvent = () => {
    removeEvent(key2);
    setShowPopup(false); // Update showPopup state to false when the event is removed
  }

  if (isAttending) {
    return (
      <View style={styles.card}>
        <Text style={styles.primaryTxt}>{imeDogodek}</Text>
        <Text style={styles.secondaryTxt}>Pridružil si se</Text>
        <TouchableOpacity style={styles.btn}  onPress={handleRemoveEvent}>
          <Text style={styles.btnTxt}>Prekliči</Text>
        </TouchableOpacity>
      </View>
    )
  } else{
    return (
      <View style={styles.card2}>
        <Text style={styles.primaryTxt}>{imeDogodek}</Text>
        <Text style={styles.secondaryTxt}></Text>
        <TouchableOpacity style={styles.btn} onPress={togglePopup}>
          <Text style={styles.btnTxt}>Preberi Več</Text>
        </TouchableOpacity>
        <Modal visible={showPopup} animationType="fade">
          <View style={styles.popup}>
            <ScrollView contentContainerStyle={styles.bdy}>
              <Text style={styles.txt}>{imeDogodek}</Text>
              <Text style={styles.txt2}>Opis</Text>
              <Text style={styles.txt3}>
                {desc}
              </Text>
              <TouchableOpacity style={styles.button} onPress={()=> {
                addEventToUser(key2, uid);
                setShowPopup(false); // Update showPopup state to false when the event is added
              }}>
                <Text>Pridruži se</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={togglePopup} style={styles.button2}>
                <Text>Prekliči</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
    popup: {
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
      marginBottom: 150, //64
      marginTop: 32,
      zIndex: 1,
      paddingBottom: 48
    },
    card: {
        backgroundColor: '#2C4F40',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto',
      },
      card2: {
        backgroundColor: '#81B673',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
        justifyContent: 'space-between',
        width: '100%',
        height: 'auto',
      },
      primaryTxt: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: '700',
        marginBottom: 16
      },
      secondaryTxt: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
        marginBottom: 16
      },
      btnTxt: {
        fontSize: 16,
        color: '#2C4F40',
        fontWeight: '600'
      },
      txt: {
        color: '#fff',
        fontSize: 32,
      },
      txt2: {
        color: '#fff',
        fontSize: 32,
        marginTop: 20
      },
      txt: {
        color: '#fff',
        fontSize: 32,
      },
      txt3: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 40
      },
      btn: {
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 48,
        paddingLeft: 48,
        borderRadius: 64
      },
      button: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 20,
        color: '#2C4F40',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 30
      },
      button2: {
        width: '80%',
        height: 50,
        backgroundColor: '#81B673',
        borderRadius: 20,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        marginTop: 30
      },
});

export default PrimaryDogodek