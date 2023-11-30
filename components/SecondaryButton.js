import { View, Text } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const SecondaryButton = ({textContent}) => {
  return (
    <View style={styles.btn}>
      <Text style={styles.txt}>{textContent}</Text>
    </View>
  )
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
      backgroundColor: '#81B673',
      borderRadius: 64,
      fontWeight: 500,
      lineHeight: 24,
      width: '100%'
    },
    txt: {
      fontSize: 20,
      color: '#FFF'
    }
  });

export default SecondaryButton