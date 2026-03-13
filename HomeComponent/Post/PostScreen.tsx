import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { colorType } from "../../tools/colorSet";
import { fontSizeType } from "../../tools/textSet";
import { Row_and_Center } from "../../tools/styles";

type postProp = {
  id: string;
  image: ImageSourcePropType;
  profilePic: ImageSourcePropType;
  category: string;
  category_title: string;
  content: string;
  post_user: string;
  time_posted: string;
  read_time: string;
  isSaved?: boolean;
  onTitlePressed?: () => void;
  onSavePressed?: () => void;
};

const PostScreen = ({
  image,
  profilePic,
  category,
  category_title,
  content,
  post_user,
  time_posted,
  read_time,
  isSaved,
  onTitlePressed,
  onSavePressed,
}: postProp) => {
  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <View style={style.p_bg}>
      <Pressable onPress={onTitlePressed}>
        <Image source={image} style={style.image_styl} resizeMode="cover" />
      </Pressable>

      <View style={style.post_category}>
        <Text style={style.post_category_text}>{category}</Text>
      </View>

      <Pressable onPress={onTitlePressed} style={style.text_section}>
        <Text style={style.title}>{category_title}</Text>

        <Text style={style.content} numberOfLines={2} ellipsizeMode="tail">
          {stripHtml(content)}
        </Text>
      </Pressable>

      <View style={[Row_and_Center.row_and_center, style.user_detail]}>
        <View style={[Row_and_Center.row_and_center, { gap: 10 }]}>
          <Image source={profilePic} style={style.profile_image} />
          <View>
            <Text style={style.user_name}>{post_user}</Text>
            <Text style={style.user_meta}>
              {time_posted} • {read_time} read
            </Text>
          </View>
        </View>

        <Pressable
          style={[Row_and_Center.row_and_center, { height: "100%" }]}
          onPress={onSavePressed}
        >
          <Image
            source={require("../../assets/Post/savedIcon.png")}
            style={{

              tintColor: isSaved ? colorType.buttonColor : "#94A3B8",
            }}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default PostScreen;

const style = StyleSheet.create({
  p_bg: {
    width: "100%",
    backgroundColor: colorType.prePrimary,
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
  },

  image_styl: {
    width: "100%",
    height: 200.25,
  },

  post_category: {
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    left: 20,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },

  post_category_text: {
    fontSize: fontSizeType.xs,
    color: colorType.buttonColor,
  },

  text_section: {
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: fontSizeType.xl,
    color: colorType.hTextColor,
    fontWeight: "600",
  },

  content: {
    fontSize: fontSizeType.sm,
    color: colorType.contentText,
  },

  user_detail: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: "space-between",
    gap: 10,
  },

  profile_image: {
    width: 42,
    height: 42,
    borderRadius: 50,
  },

  user_name: {
    fontSize: fontSizeType.base,
    color: colorType.hTextColor,
    fontWeight: "500",
  },

  user_meta: {
    fontSize: fontSizeType.xs,
    color: colorType.contentText,
  },
});