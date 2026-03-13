import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Row_and_Center } from '../tools/styles'
import { colorType, } from '../tools/colorSet'
import { fontSizeType } from '../tools/textSet'


const TagSetting = () => {
  return (
<View style= {[ Row_and_Center.row_and_center , style.user_detail]}>
        <View style = {[Row_and_Center.row_and_center, {gap: 10}]}>
          <Image source = {require("../assets/Post/CreatePost/tag.png")}  />
          <View>
            <Text style = {{ fontSize: fontSizeType.base, color: colorType.hTextColor}}>Tags</Text>
            <Text style = {{fontSize: fontSizeType.xs, color: colorType.contentText}}>Add up to 5 tags</Text>
          </View>
        </View>
        <Pressable style={[Row_and_Center.row_and_center, {height: "100%"}]}>
          <Image source={require("../assets/Post/CreatePost/greaterThan.png")}/>
        </Pressable>
      </View>
  )
}

export default TagSetting;

const style = StyleSheet.create({
    s_bg : {
        backgroundColor: colorType.prePrimary,
        width: "100%",
        height: 70,
        padding: 10,
        borderRadius: 20
    } ,
    user_detail : {
      padding: 20,
      justifyContent: "space-between",
      gap: 10,
      
      backgroundColor: colorType.prePrimary,
        width: "100%",
        height: 70,
        borderRadius: 20
    }
})