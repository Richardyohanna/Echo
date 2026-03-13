import { View, Text , Image, Pressable, StyleSheet} from 'react-native'
import React from 'react'
import { Row_and_Center } from '../tools/styles';
import { fontSizeType } from '../tools/textSet';
import { colorType } from '../tools/colorSet';



const ProfileHeader = () => {
  return (
    <View style={[Row_and_Center.row_and_center, style.p_bg]}>
        <Text style ={{fontSize: fontSizeType.lg, color: colorType.hTextColor, fontWeight: "bold", textAlign: "center", justifyContent: "flex-start"}}>Profile</Text>
      <Pressable style={[ Row_and_Center.row_and_center, {gap: 25}]}>         
         <Image source = {require("../assets/Profile/setting.png")} />
      </Pressable>
    </View>
  )
}

export default ProfileHeader;

const style = StyleSheet.create({
    p_bg : {
        
        width: "100%",
        height: 60,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 10 ,  
        
    },


})