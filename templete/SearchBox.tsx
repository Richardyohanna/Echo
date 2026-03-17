import { View, StyleSheet, Pressable, TextInput, Image } from "react-native";
import React from "react";
import { Row_and_Center } from "../tools/styles";
import { colorType } from "../tools/colorSet";

type Props = {
  placeholder_text: string;
  onSearchPress?: () => void;
  onChangeText?: (text: string) => void;
  value?: string;
};

const SearchBox = ({
  placeholder_text,
  onSearchPress,
  onChangeText,
  value,
}: Props) => {
  return (
    <View
      style={[Row_and_Center.row_and_center, { gap: 10 }, style.search_box]}
    >
      <Pressable onPress={onSearchPress}>
        <Image source={require("../assets/searchIcon/search.png")} />
      </Pressable>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder_text}
        placeholderTextColor={colorType.contentText}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default SearchBox;

const style = StyleSheet.create({
  search_box: {
    width: "96%",
    borderWidth: 1,
    borderColor: "rgba(50,50,50,0.3)",
    height: 48,
    borderRadius: 10,
    backgroundColor: colorType.prePrimary,
    justifyContent: "flex-start",
    paddingLeft: 15,
    paddingRight: 15,
  },
});