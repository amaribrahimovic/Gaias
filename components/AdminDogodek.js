import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Modal, Image } from 'react-native';

import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const AdminDogodek = ({ imeDogodek, descDogodek, removeEvent, key2 }) => {
  const [showModal, setShowModal] = useState(false);
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const snapshot = await firebase.database().ref('users').once('value');
        const usersData = snapshot.val();

        if (usersData) {
          const attendeesList = Object.entries(usersData).reduce((result, [userId, userData]) => {
            if (userData.events && userData.events[key2]) {
              result.push({ id: userId, name: userData.name, id2: userData.id2 });
            }
            return result;
          }, []);

          setAttendees(attendeesList);
        }
      } catch (error) {
        console.error('Error fetching attendees:', error);
      }
    };

    fetchAttendees();
  }, [key2]);

  const handleRemoveEvent = () => {
    removeEvent(key2);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openModal}>
      <Text style={styles.primaryTxt}>{imeDogodek}</Text>
      <Text style={styles.secondaryTxt}>{descDogodek}</Text>
      <TouchableOpacity style={styles.btn} onPress={handleRemoveEvent}>
        <Text style={styles.btnTxt}>Zbriši</Text>
      </TouchableOpacity>
      <Modal visible={showModal} transparent={true}>
        <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
          <View style={styles.modal2}>
            <Text style={styles.secondaryTxt}>{imeDogodek}</Text>
            <Text style={styles.secondaryTxt}>{descDogodek}</Text>
            {/* <Image source= style={styles.img}/> */}
            <Text style={styles.primaryTxt}>Prijavljeni:</Text>
            {attendees.map((attendee) => (
              <Text key={attendee.id} style={styles.secondaryTxt}>{attendee.id2} | {attendee.name}</Text>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '70%',
    backgroundColor: '#2C4F40',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    paddingTop: 30
  },
  modal2: {
    width: '70%',
    height: '40%',
    backgroundColor: '#81B673',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    paddingTop: 30
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
      btn: {
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 48,
        paddingLeft: 48,
        borderRadius: 64
      }
});

export default AdminDogodek