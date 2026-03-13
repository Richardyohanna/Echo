import { View, Text, Image, Pressable , StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { Row_and_Center} from '../tools/styles'
import { fontSizeType } from '../tools/textSet'
import { colorType } from '../tools/colorSet'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootHomeProp } from '../App'
import { useNavigation } from '@react-navigation/native'

const CreatePostHeader = () => {

 type NavigationProp = NativeStackNavigationProp<RootHomeProp>;

 const navigation = useNavigation<NavigationProp>();
 
const onXPressed = () => {
    navigation.navigate("HomePage", {screen: "Home"});
}

  return (
    <SafeAreaView style= {[Row_and_Center.row_and_center, style.c_p_bg]}>
      {/** x Button */}
      <Pressable onPress={onXPressed} style={{marginLeft: 10}}>
        <Image source = {require("../assets/Post/CreatePost/cancel.png")} />
      </Pressable>      
      <Text style={style.c_p_text}>Create New Post</Text>
      
      {/** cancel button */}
      <Pressable>
        <Text>Cancel</Text>
      </Pressable>

      {/** Save Button */}
      <Pressable style = {style.s_p_b}>
        <Text style = {{color: colorType.prePrimary}}>Save Post</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default CreatePostHeader;

const style = StyleSheet.create({
    c_p_bg : {
        gap: 10, 
        justifyContent: "space-evenly",
        backgroundColor: colorType.prePrimary,
        padding: 26,
        height: 110,
        alignItems: "center",
        position: "absolute",
        top: 0,
        zIndex: 999,
        marginLeft: 0,
        width: "100%",
    },
    c_p_text : {
        fontSize: fontSizeType.xl,
        color : colorType.hTextColor,
        fontWeight: "500"
    },
    s_p_b : {
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: colorType.buttonColor,
        padding: 10,
        shadowColor: colorType.buttonColor,
        shadowOffset: {
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        
        // Android shadow
        elevation: 6,
    }
})