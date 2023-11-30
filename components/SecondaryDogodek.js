import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SecondaryDogodek = ({imeDogodek}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.primaryTxt}>{imeDogodek}</Text>
      <Text style={styles.secondaryTxt}>Zelo kratek opis</Text>
      <View style={styles.btn}>
        <Text style={styles.btnTxt}>Preberi več</Text>
      </View>
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
        color: '#81B673',
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

export default SecondaryDogodek