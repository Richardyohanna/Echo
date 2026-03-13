import { Pressable, Text, StyleSheet } from "react-native";
import React from "react";
import { colorType } from "../tools/colorSet";

type textProp = {
  text: string;
  onButtonPressed?: () => void;
  active: boolean;
};

const ExploreButtonBox = ({ text, onButtonPressed, active }: textProp) => {
  return (
    <Pressable
      onPress={onButtonPressed}
      style={[
        style.b_bg,
        {
          backgroundColor: active
            ? colorType.buttonColor
            : "rgba(148,6,249, 0.3)",
        },
      ]}
    >
      <Text
        style={{
          color: active ? "#fff" : "rgba(148,6,249, 0.6)",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default ExploreButtonBox;

const style = StyleSheet.create({
  b_bg: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 38,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});