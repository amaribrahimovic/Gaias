import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'

const PrimaryButton = ({textContent, name, password}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={()=>{console.log(`${name} and ${password}`)}}>
      <Text style={styles.txt}>{textContent}</Text>
    </TouchableOpacity>
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
      backgroundColor: '#2C4F40',
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

export default PrimaryButton