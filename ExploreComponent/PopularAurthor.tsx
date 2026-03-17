import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import React from "react";
import { colorType } from "../tools/colorSet";
import { fontSizeType } from "../tools/textSet";

type aurthorProp = {
  image: ImageSourcePropType;
  aurthor: string;
};

const PopularAurthor = ({ image, aurthor }: aurthorProp) => {
  return (
    <View style={style.singleWriter}>
      <View style={style.justPostIndicator}>
        <Image
          source={image}
          style={{ borderWidth: 1, borderColor: "white", borderRadius: 50, width: 40, height: 40 }}
        />
      </View>
      <Text
        style={style.posterName}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {aurthor}.
      </Text>
    </View>
  );
};

export default PopularAurthor;

const style = StyleSheet.create({
  singleWriter: {
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  justPostIndicator: {
    borderWidth: 1,
    borderColor: colorType.buttonColor,
    borderRadius: 50,
  },
  posterName: {
    fontSize: fontSizeType.sm,
  },
});