import { View, Text, Image, Pressable, StyleSheet, Alert, Share } from "react-native";
import React from "react";
import { Row_and_Center } from "../../../tools/styles";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { fontSizeType } from "../../../tools/textSet";
import { colorType } from "../../../tools/colorSet";
import { RootHomeProp } from "../../../App";
import { auth } from "../../../services/firebase";
import { deletePost } from "../../../services/postService";

type NavigationProp = NativeStackNavigationProp<RootHomeProp>;

type Props = {
  postId: string;
  authorId?: string;
  postTitle: string;
  postContent: string;
  onDeleted?: () => void;
};

const PostHeader = ({
  postId,
  authorId,
  postTitle,
  postContent,
  onDeleted,
}: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const currentUser = auth.currentUser;

  const isOwner = currentUser?.uid === authorId;

  const onBackPress = () => {
    navigation.goBack();
  };

  const onEditPress = () => {
    navigation.navigate("CreatePost", { postId });
  };

  const onDeletePress = () => {
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deletePost(postId);
              Alert.alert("Deleted", "Post deleted successfully.");
              if (onDeleted) {
                onDeleted();
              } else {
                navigation.goBack();
              }
            } catch (error) {
              console.log("DELETE POST ERROR:", error);
              Alert.alert("Error", "Failed to delete post.");
            }
          },
        },
      ]
    );
  };

  const onSharePress = async () => {
    try {
      await Share.share({
        message: `${postTitle}\n\n${postContent.replace(/<[^>]*>/g, "")}`,
      });
    } catch (error) {
      console.log("SHARE POST ERROR:", error);
    }
  };

  return (
    <View style={[Row_and_Center.row_and_center, style.p_bg]}>
      <View style={[Row_and_Center.row_and_center, { gap: 15 }]}>
        <Pressable onPress={onBackPress} style={{ width: 40 }}>
          <Image source={require("../../../assets/Post/PostDetail/back.png")} />
        </Pressable>

        <Text style={style.headerText}>Post Details</Text>
      </View>

      <View style={[Row_and_Center.row_and_center, { gap: 20 }]}>
        {isOwner && (
          <>
            <Pressable onPress={onEditPress}>
              <Image source={require("../../../assets/Post/PostDetail/edit.png")} />
            </Pressable>

            <Pressable onPress={onDeletePress}>
              <Image source={require("../../../assets/Post/PostDetail/delete.png")} />
            </Pressable>
          </>
        )}

        <Pressable onPress={onSharePress}>
          <Image source={require("../../../assets/Post/PostDetail/share.png")} />
        </Pressable>
      </View>
    </View>
  );
};

export default PostHeader;

const style = StyleSheet.create({
  p_bg: {
    width: "100%",
    height: 60,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  headerText: {
    fontSize: fontSizeType.lg,
    color: colorType.hTextColor,
    fontWeight: "bold",
    textAlign: "center",
  },
});