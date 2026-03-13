import { View, Text, Pressable, Image , StyleSheet} from 'react-native'
import React from 'react'
import { Row_and_Center } from '../tools/styles'
import { fontSizeType } from '../tools/textSet'
import { colorType } from '../tools/colorSet'

const ExploreHeader = () => {
  return (
    <View style={[Row_and_Center.row_and_center, style.e_h]}>
      <Pressable> 
        <Image source = {require("../assets/Explore/menu.png")} />
      </Pressable>
      <Text style = {style.text}>Explore</Text>
      <Pressable>
        <Image source = {require("../assets/Explore/notification.png")} />
      </Pressable>
    </View>
  )
}

export default ExploreHeader;

const style = StyleSheet.create({
    e_h : {
        justifyContent: "space-between", 
        width: "100%", 
        position: "absolute",
        marginTop: 40,
        padding: 20,
        zIndex: 999,
        backgroundColor: colorType.prePrimary
    },
    text: {
        fontSize: fontSizeType.lg,
        fontWeight: "600",
    }
})