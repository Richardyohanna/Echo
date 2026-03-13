import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Header from "./Header/Header";
import Container from "./Container/Container";
import Main from "./Main/Main";
import { colorType } from "../tools/colorSet";


const HomeScreen = () => {
    return (
        <View style = {style.h_bg}>
            <Header></Header>
            <Container></Container>
            <Main></Main>
        </View>
    )
}

export default HomeScreen;

const style = StyleSheet.create({
    h_bg : {
        flex: 1,
        padding: 15,
        marginTop: 25,
        backgroundColor: colorType.primary,
        gap: 15
    }
})