import { View, Text, Image, Pressable,  ImageSourcePropType } from 'react-native'
import React from 'react'
import { fontSizeType } from '../tools/textSet'
import { colorType } from '../tools/colorSet'
import { Row_and_Center } from '../tools/styles'

type SaveProp = {
    postType: string,
    readTime: string,
    postTitle: string,
    postContent: string,
    image: ImageSourcePropType,
    onTitlePressed: () => void,
    onDeletePressed: () => void
}

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

const SavedPost = ({postType, readTime, postTitle, postContent, image, onTitlePressed, onDeletePressed} : SaveProp) => {
  return (
    
            <View style= {{gap: 2}}>

              <View style = {{flexDirection: "row", width: "100%", gap: 20}}>
                <View style = {{flex: 1, gap: 15}}>
                  <View style = {{flexDirection: "row", gap: 10}} >
                    <View style = {{backgroundColor: "rgba(148,6,249, 0.2)", borderRadius: 10, padding: 2, paddingLeft: 5, paddingRight: 5}}>
                      <Text style={{fontSize: fontSizeType.xs,fontWeight: "400", color: colorType.buttonColor}}> {postType}</Text>
                    </View>
                    <Text style={{fontSize: fontSizeType.xs,fontWeight: "200", color: colorType.contentText}} > {readTime} Read</Text>
                  </View>
                  <Text 
                    style={{fontSize: fontSizeType.base,fontWeight: "600", color: colorType.hTextColor}}
                     onPress={onTitlePressed}
                    >{postTitle}</Text>
                  <Text 
                    numberOfLines={2}
                    ellipsizeMode='tail'
                    style={{fontSize: fontSizeType.sm,fontWeight: "300", color: colorType.contentText}}
                    >{stripHtml(postContent)}</Text>
                </View>
                <View style={{ width: 96, height: 96, borderRadius: 12, overflow: "hidden" }}>
                <Image
                    source={image}
                    style={{ width: "100%", height: "100%" }}
                    resizeMode="cover"
                />
                </View>
              </View>
              <View style = {{ flexDirection: "row", gap: 15, alignItems: "center"}}>
                    <View style = {[Row_and_Center.row_and_center, {backgroundColor: "rgba(148,6,249, 0.2)", borderRadius: 10, padding: 5, paddingLeft: 10, paddingRight: 10, gap: 5}]}>
                      <Image source={require("../assets/Saved/savedSmall.png")} />
                      <Text style={{fontSize: fontSizeType.sm,fontWeight: "500", color: colorType.buttonColor}}>Saved</Text>
                    </View> 
    
                    {/** Delete saved button */}
                    <Pressable onPress={onDeletePressed}>
                      <Image source={require("../assets/Saved/delete.png")} />
                    </Pressable>  
              </View>
            </View>
  )
}

export default SavedPost