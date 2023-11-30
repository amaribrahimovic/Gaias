import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image, TextInput } from 'react-native'

const GrayInput2 = ({iconInput, phInput, passwordInput, setPassword, passwordS}) => {
  const [text, onChangeText] = React.useState("");
  return (
    <View style={styles.field}>
        <Image source={iconInput} style={styles.icon}/>
        <TextInput placeholder={phInput} secureTextEntry={passwordInput} value={passwordS} onChangeText={text => setPassword(text)}/>
    </View>
  )
}

export default GrayInput2

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
        width: 34,
        marginRight: 5
    }
})