import { View, Text, StyleSheet , Image, ImageSourcePropType, Pressable} from 'react-native'
import React from 'react'
import { fontSizeType } from '../tools/textSet'
import { colorType } from '../tools/colorSet'

type ExploreProp = { 
    postType: string,
    postTitle: string,
    aurthor: string,
    readTime: string,
    image: ImageSourcePropType,
    onTitlePressed: () => void
}

const ExplorePost = ({postType, postTitle, aurthor, readTime, image, onTitlePressed}: ExploreProp) => {
  return (
       
        <Pressable onPress={onTitlePressed} style = {style.post} >
          <Image source = {image}  style = {{borderRadius: 20, width: "100%", height: 201.38}}/>
          <View style= {{position: "absolute", top: 20,left: 20,backgroundColor: colorType.prePrimary, borderRadius: 10, padding: 3,paddingLeft: 5, paddingRight: 5, height: 23, zIndex: 999}}> 
            <Text style = {{fontSize: fontSizeType.xs, color: colorType.buttonColor}}>{postType}</Text>
          </View>
          <View style={{width: "100%", gap: 10, marginTop: 10}}>
            <Text style ={{fontSize: fontSizeType.lg, fontWeight: "600"}}>{postTitle}</Text>
            <Text style = {{fontSize: fontSizeType.xs, color: colorType.contentText}}>{aurthor} • {readTime} read</Text>
          </View>          
        </Pressable>
  )
}

export default ExplorePost;

const style = StyleSheet.create(
    {
         post : {
            position: "relative",
            width: "100%",
            alignItems: "center",
            flexDirection: "column",
           
        }
    }
)