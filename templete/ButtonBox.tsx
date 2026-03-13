import { Pressable, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colorType } from '../tools/colorSet';

type textProp = {
    text: string;
    onButtonPressed?: () => void ;
    active: boolean;
}
const ButtonBox = ( {text, onButtonPressed , active}: textProp) => {
  return (
    <Pressable onPress={onButtonPressed} style= {[style.b_bg, {backgroundColor: active ? colorType.buttonColor : colorType.prePrimary}]}>
      <Text style ={{color: active ? "#fff" : colorType.contentText}}>{text}</Text>
    </Pressable>
  )
}

export default ButtonBox;

const style = StyleSheet.create({
  b_bg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 38,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});