import { View, Text , Image, Pressable, StyleSheet} from 'react-native'
import React from 'react'
import { Row_and_Center } from '../tools/styles';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootPageProp } from '../navigationScreen/NavigationTab/HomeStackNavigation';
import { useNavigation } from "@react-navigation/native";
import { fontSizeType } from '../tools/textSet';
import { colorType } from '../tools/colorSet';


type NavigationProp = NativeStackNavigationProp<RootPageProp, "HomeScreen">;

const SavedHeader = () => {

    
    const navigation = useNavigation<NavigationProp>()

    const onBackPress = () => {
        navigation.navigate("HomeScreen");
    }

  return (
    <View style={[Row_and_Center.row_and_center, style.p_bg]}>
      <View style ={[Row_and_Center.row_and_center, {gap: 15}]}> 
        {/* <Pressable onPress={onBackPress}>
                <Image source = {require("../assets/Saved/back.png")} />
            </Pressable>  
        */}      
        <Text style ={{fontSize: fontSizeType.lg, color: colorType.hTextColor, fontWeight: "bold", textAlign: "center", justifyContent: "flex-start"}}>Saved Posts</Text>
      </View>
      <View style={[ Row_and_Center.row_and_center, {gap: 25}]}>
         
         <Image source = {require("../assets/Saved/search.png")} />
         <Image source = {require("../assets/Saved/menu.png")} />
      </View>
    </View>
  )
}

export default SavedHeader;

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