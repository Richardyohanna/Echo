import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { fontSizeType } from '../tools/textSet';

const CreateAccountHeader = () => {
  return (
    <View style= {style.c_h}>
     <Pressable style = {{justifyContent: "center", alignItems: "center", padding: 5}}>
        <Image source = {require("../assets/CreateAccount/back.png")} />
     </Pressable>
     <View style = {style.view_text}>
        <Text style = {style.text}>Join Echo</Text>
     </View>
    </View>
  )
}

export default CreateAccountHeader;

const style = StyleSheet.create({
    c_h : {
        position: "absolute",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        flexDirection: "row",
        padding: 15,
        marginTop: 30
    },
    view_text: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        width: "100%",

    },
    text : {
        fontWeight: "600",
        textAlign: "center",
        flex: 1,
        width: "100%",
        fontSize: fontSizeType['2xl']
    }
})