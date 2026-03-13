import { View, Text , Image, StyleSheet, Pressable} from 'react-native'
import React, { useCallback, useState } from "react";
import { colorType } from '../../tools/colorSet';
import { fontFamilyType, fontSizeType } from '../../tools/textSet';
import { Row_and_Center } from '../../tools/styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootPageProp } from '../../navigationScreen/NavigationTab/HomeStackNavigation';
import { RootHomeProp } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { auth } from "../../services/firebase";
import { useFocusEffect } from "@react-navigation/native";

const Header = () => {
  type NavigationProp = NativeStackNavigationProp<RootHomeProp, "HomePage">;

  const navigation = useNavigation<NavigationProp>();
  const [photoURL, setPhotoURL] = useState<string | null>(auth.currentUser?.photoURL || null);

  useFocusEffect(
    useCallback(() => {
      setPhotoURL(auth.currentUser?.photoURL || null);
    }, [])
  );

  const goToProfile = () => {
    navigation.navigate("HomePage", { screen: "Profile" });
  };

  return (
    <View style={style.h_bg}>
      <View style={[Row_and_Center.row_and_center, { gap: 10 }]}>
        <View style={style.logo}>
          <Image source={require("../../assets/headerIcon/logo.png")} />
        </View>
        <Text style={style.text}>Echo</Text>
      </View>

      <View style={[Row_and_Center.row_and_center, { gap: 15 }]}>
        <Image source={require("../../assets/headerIcon/notification.png")} />

        <Pressable onPress={goToProfile}>
          <Image
            source={
              photoURL
                ? { uri: photoURL }
                : require("../../assets/headerIcon/profilePic.png")
            }
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
        </Pressable>
      </View>
    </View>
  );
};
export default Header;

const style = StyleSheet.create({
    h_bg : {
        flexDirection: "row",
        justifyContent: "space-between",
        //borderWidth: 1,
       // borderColor: "rgba(148,6,249,0.3)",
    },
    logo : {
        width: 35, 
        height: 35, 
        backgroundColor: "rgba(148,6,249,0.1)",  
        borderRadius: 8, 
        alignItems: "center", 
        justifyContent: "center"
    },
    text : {
        fontFamily: fontFamilyType.interBold,
        fontSize: fontSizeType.xl
    }
})
