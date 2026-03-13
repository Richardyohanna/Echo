import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { colorType } from "../../tools/colorSet";
import { fontSizeType } from "../../tools/textSet";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootHomeProp } from "../../App";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const BUTTON_SIZE = 56;
const MARGIN = 10;
const TAB_BAR_HEIGHT = 70;
const VISIBLE_PART = 18;

const MIN_X = MARGIN;
const MAX_X = SCREEN_WIDTH - BUTTON_SIZE - MARGIN;

const MIN_Y = MARGIN;
const MAX_Y = SCREEN_HEIGHT - TAB_BAR_HEIGHT - VISIBLE_PART;

const Container = () => {

  type navigationProp = NativeStackNavigationProp<RootHomeProp, "HomePage">;

  const navigation = useNavigation<navigationProp>();

  const createPost = () => {

    navigation.navigate("CreatePost");
  }
  const pan = useRef(
    new Animated.ValueXY({
      x: SCREEN_WIDTH - BUTTON_SIZE - 20,
      y: SCREEN_HEIGHT - TAB_BAR_HEIGHT - BUTTON_SIZE - 40,
    })
  ).current;

  const lastOffset = useRef({
    x: SCREEN_WIDTH - BUTTON_SIZE - 20,
    y: SCREEN_HEIGHT - TAB_BAR_HEIGHT - BUTTON_SIZE - 40,
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gestureState) => {
        let newX = lastOffset.current.x + gestureState.dx;
        let newY = lastOffset.current.y + gestureState.dy;

        newX = Math.max(MIN_X, Math.min(newX, MAX_X));
        newY = Math.max(MIN_Y, Math.min(newY, MAX_Y));

        pan.setValue({ x: newX, y: newY });
      },

      onPanResponderRelease: (_, gestureState) => {
        let newX = lastOffset.current.x + gestureState.dx;
        let newY = lastOffset.current.y + gestureState.dy;

        newX = Math.max(MIN_X, Math.min(newX, MAX_X));
        newY = Math.max(MIN_Y, Math.min(newY, MAX_Y));

        lastOffset.current = { x: newX, y: newY };
        pan.setValue({ x: newX, y: newY });
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        style.c_bg,
        {
          left: pan.x,
          top: pan.y,
        },
      ]}
    >
      <Pressable 
          onPress={createPost}
          style={style.pressable}>
        <Text style={style.text}>+</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Container;

const style = StyleSheet.create({
  c_bg: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: colorType.buttonColor,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    zIndex: 999,
    elevation: 10,
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: fontSizeType["3xl"],
    textAlign: "center",
    marginTop: -5,
  },
});