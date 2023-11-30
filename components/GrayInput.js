import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, TextInput } from 'react-native'

const GrayInput = ({iconInput, phInput, setEmail, emailS}) => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={styles.field}>
        <Image source={iconInput} style={styles.icon}/>
        <TextInput placeholder={phInput} value={emailS} onChangeText={text => setEmail(text)}/>
    </View>
  )
}

export default GrayInput

const styles = StyleSheet.create({
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
    icon:{
        height: 17,
        width: 17,
        marginRight: 22
    }
})