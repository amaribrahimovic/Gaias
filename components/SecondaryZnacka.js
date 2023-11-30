import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import greenHome from '../icons/placeholder.png'

const SecondaryZnacka = ({imeZnacka}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.secondaryTxt}>{imeZnacka}</Text>
      <Image source={greenHome} style={styles.img}/>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
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

export default SecondaryZnacka