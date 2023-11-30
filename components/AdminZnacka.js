import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react';
import { Modal, TouchableOpacity} from 'react-native';
import greenHome from '../icons/placeholder.png'

const AdminZnacka = ({imeZnacka, desc, removeEvent, key2, imgurl}) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleRemoveEvent = () => {
    removeEvent(key2);
  }
    return (
      
      <TouchableOpacity style={styles.card} onPress={openModal}>
        <Text style={styles.secondaryTxt}>{imeZnacka}</Text>
        <Image source={{uri: imgurl}} style={styles.img}/>
        <Modal visible={showModal} transparent={true}>
          <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <View style={styles.modal}>
              <Text style={styles.secondaryTxt}>{imeZnacka}</Text>
              <Text style={styles.secondaryTxt}>{desc}</Text>
              <Image source={{uri: imgurl}} style={styles.img}/>
              <TouchableOpacity style={styles.btn} onPress={handleRemoveEvent}>
                <Text style={styles.btnTxt}>Zbriši</Text>
              </TouchableOpacity>
            </View>
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
    height: '40%',
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
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 14,
        paddingRight: 14,
        marginTop: 32,
        justifyContent: 'space-between',
        width: 120,
        height: 120,
      },
      card2: {
        backgroundColor: '#81B673',
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 14,
        paddingRight: 14,
        marginTop: 32,
        justifyContent: 'space-between',
        width: 120,
        height: 120,
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
        marginBottom: 6
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
      },
      img: {
        width: 50,
        height: 50,
        borderRadius: 15
      }
});

export default AdminZnacka