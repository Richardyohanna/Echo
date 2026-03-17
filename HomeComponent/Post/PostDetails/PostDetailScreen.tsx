import { View, Text, StyleSheet, Image, ScrollView, useWindowDimensions } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PostHeader from "./PostHeader";
import { colorType } from "../../../tools/colorSet";
import { fontSizeType } from "../../../tools/textSet";
import PublisherDetail from "./PublisherDetail";
import {
  RouteProp,
  useRoute,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { RootHomeProp } from "../../../App";
import { getPostById } from "../../../services/postService";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { formatTimeAgo } from "../../../tools/timeFormat";
import RenderHtml from "react-native-render-html";

type PostDetailRouteProp = RouteProp<RootHomeProp, "PostDetail">;
type NavigationProp = NativeStackNavigationProp<RootHomeProp>;

const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { postID } = route.params;
  const { width } = useWindowDimensions();

  const [post, setPost] = useState<any>(null);

  const loadPost = async () => {
    try {
      const data = await getPostById(postID);
      console.log("POST DETAIL DATA:", data);
      setPost(data);
    } catch (error) {
      console.log("LOAD POST ERROR:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPost();
    }, [postID])
  );

  if (!post) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading post...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorType.prePrimary }}>
      <PostHeader
        postId={post.id}
        authorId={post.authorId}
        postTitle={post.postTitle}
        postContent={post.postContent}
        onDeleted={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.p_bg}
      >
        <Image
          source={{ uri: post.coverImage }}
          style={{ width: "100%", height: 250 }}
          resizeMode="cover"
        />

        <Text style={style.after_image_button}>{post.category}</Text>

        <Text style={style.h_text}>{post.postTitle}</Text>

        <PublisherDetail
          postUser={post.author}
          timePosted={post.createdAt ? formatTimeAgo(post.createdAt) : "Unknown"}
          readTime="5 min"
          profilePic={
            post.profilePicture
              ? { uri: post.profilePicture }
              : require("../../../assets/Post/profilePic.png")
          }
        />

        <View style={style.htmlContainer}>
          <RenderHtml
            contentWidth={width - 30}
            source={{ html: post.postContent || "<p>No content</p>" }}
            tagsStyles={{
              p: {
                color: colorType.contentText,
                fontSize: fontSizeType.sm,
                lineHeight: fontSizeType.sm + 10,
                marginBottom: 12,
              },
              strong: {
                fontWeight: "bold",
                color: colorType.hTextColor,
              },
              b: {
                fontWeight: "bold",
                color: colorType.hTextColor,
              },
              em: {
                fontStyle: "italic",
              },
              i: {
                fontStyle: "italic",
              },
              u: {
                textDecorationLine: "underline",
              },
              h1: {
                fontSize: fontSizeType["2xl"],
                fontWeight: "800",
                color: colorType.hTextColor,
                marginBottom: 12,
              },
              h2: {
                fontSize: fontSizeType.xl,
                fontWeight: "700",
                color: colorType.hTextColor,
                marginBottom: 10,
              },
              ul: {
                marginBottom: 12,
              },
              ol: {
                marginBottom: 12,
              },
              li: {
                color: colorType.contentText,
                fontSize: fontSizeType.sm,
                lineHeight: fontSizeType.sm + 10,
                marginBottom: 6,
              },
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostDetailScreen;

const style = StyleSheet.create({
  p_bg: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colorType.prePrimary,
    gap: 15,
  },
  after_image_button: {
    height: 24,
    backgroundColor: "rgba(148,6,249,0.3)",
    borderRadius: 20,
    textAlign: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingTop: 4,
    color: colorType.buttonColor,
    marginLeft: 15,
    marginRight: 15,
    fontSize: fontSizeType.xs,
  },
  h_text: {
    color: colorType.hTextColor,
    fontSize: fontSizeType["2xl"],
    fontWeight: "800",
    marginLeft: 15,
    marginRight: 15,
  },
  htmlContainer: {
    marginLeft: 15,
    marginRight: 15,
    width: "92%",
    marginBottom: 30,
  },
});