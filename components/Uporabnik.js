import { Button, StyleSheet, Text, View, Image, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, {useEffect, useState, useMemo, useRef} from 'react'

//Icons
import profileIcon from '../icons/profile-white-stroke.png'

import firebase from 'firebase/compat/app';
import 'firebase/compat/database'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import PrimaryZnacka from './PrimaryZnacka';
import AdminZnacka2 from './AdminZnacka2';

const Uporabnik = ({imeUporabnik, key2, removeEvent, removeBadge, key3}) => {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  // const { current: events } = useRef([]);
  // const [userEvents, setUserEvents] = useState({});
  let userEvents = useMemo(
    () => ({}),
    [] //no dependencies so the value doesn't change
  );

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRemoveEvent = () => {
    removeEvent(key2);
  }

  const uid = key2;
  const currentUser = firebase.database().ref('users').child(uid);
  
  useEffect(() => {
    // let userEvents;
    const eventsRef = firebase.database().ref('badges');
    eventsRef.on('value', (snapshot) => {
      const eventData = snapshot.val() || {};
      const eventKeys = Object.keys(eventData);
      const eventList = eventKeys.map((key) => {
        const event = eventData[key];
        const isAttending = userEvents[key];
        return (
          <AdminZnacka2
            imeZnacka={event.name}
            key={key}
            key2={key}
            isAttending={isAttending}
            desc={event.description}
            userUid={uid}
            removeBadge={removeBadge}
          />
        );
      });
      setEvents(eventList);
    });

    const userEventsRef = firebase.database().ref(`users/${uid}/badges`);
    userEventsRef.on('value', (snapshot) => {
      const events = snapshot.val() || {};
      userEvents = events;
      // setUserEvents(events);
    });

    return () => {
      eventsRef.off();
      userEventsRef.off();
    };
  }, [userEvents]);

  return (
    <TouchableOpacity style={styles.card} onPress={openModal}>
      <Image source={profileIcon} style={styles.icon}/>
      <Text style={styles.secondaryTxt}>{imeUporabnik}</Text>
      <Modal visible={showModal} transparent={true}>
          <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <ScrollView contentContainerStyle={styles.modal}>
              <Text style={styles.thirdTxt}>{key3}</Text>
              <Text style={styles.thirdTxt}>{imeUporabnik}</Text>
              <Text style={styles.mt}></Text>
              <Image source={profileIcon} style={styles.icon}/>
              <TouchableOpacity style={styles.btn} onPress={handleRemoveEvent}>
                <Text style={styles.btnTxt}>Zbriši</Text>
              </TouchableOpacity>
              {events}
            </ScrollView>
          </TouchableOpacity>
        </Modal>
    </TouchableOpacity>
  )
}

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
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: 32,
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
        marginLeft: 16
      },
      thirdTxt: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
        marginBottom: 16
      },
      btnTxt: {
        fontSize: 16,
        color: '#2C4F40',
        fontWeight: '600',
      },
      btn: {
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 48,
        paddingLeft: 48,
        borderRadius: 64,
        marginTop: 16
      },
      icon: {
        width: 50,
        height: 50
      },
      mt: {
        marginTop: 16
      },
});

export default Uporabnik