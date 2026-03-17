import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import Header from "./Header/Header";
import Container from "./Container/Container";
import Main from "./Main/Main";
import { colorType } from "../tools/colorSet";

const HomeScreen = () => {

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // reload posts / content here

    setTimeout(() => {
      setRefreshing(false);
    }, 1500);

  }, []);

  return (
    <>    
    <ScrollView
      style={style.h_bg}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Header />
      
      <Main />
    </ScrollView>

    <Container />
    </>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  h_bg: {
    flex: 1,
    padding: 15,
    marginTop: 25,
    backgroundColor: colorType.primary,
    gap: 15,
    position: "relative"
  },
});