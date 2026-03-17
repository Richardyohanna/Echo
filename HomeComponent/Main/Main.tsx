import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Column_and_Center } from "../../tools/styles";
import SearchBox from "../../templete/SearchBox";
import CategoryList from "./CategoryList";
import PostScreen from "../Post/PostScreen";
import { RootHomeProp } from "../../App";
import {
  getPosts,
  savePost,
  getSavedPostIds,
} from "../../services/postService";
import { PostModel } from "../../Models/PostModel";
import { formatTimeAgo } from "../../tools/timeFormat";

type NavigationProp = NativeStackNavigationProp<RootHomeProp>;

const Main = () => {
  const navigation = useNavigation<NavigationProp>();
  const [posts, setPosts] = useState<PostModel[]>([]);
  const [searchText, setSearchText] = useState("");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const loadSavedPosts = async () => {
    try {
      const ids = await getSavedPostIds();
      setSavedPosts(ids);
    } catch (error) {
      console.log("LOAD SAVED POSTS ERROR:", error);
    }
  };

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.log("LOAD POSTS ERROR:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPosts();
      loadSavedPosts();
    }, [])
  );

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const title = post.postTitle?.toLowerCase() || "";
      const author = post.author?.toLowerCase() || "";
      const category = post.category?.toLowerCase() || "";
      const query = searchText.toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        author.includes(query) ||
        category.includes(query);

      const matchesCategory =
        !activeCategory || category === activeCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchText, activeCategory]);

  const onTitlePressed = (postId: string) => {
    navigation.navigate("PostDetail", { postID: postId });
  };

  const onSavePressed = async (postId: string) => {
    try {
      await savePost(postId);

      setSavedPosts((prev) => {
        if (prev.includes(postId)) {
          return prev;
        }
        return [...prev, postId];
      });
    } catch (error) {
      console.log("SAVE POST ERROR:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        Column_and_Center.column_and_center,
        style.m_bg,
      ]}
      showsVerticalScrollIndicator={false}
    >
      <SearchBox
        placeholder_text="Search blog posts..."
        value={searchText}
        onChangeText={setSearchText}
        onSearchPress={() => {}}
      />

      <CategoryList
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {filteredPosts.map((post) => (
        <PostScreen
          key={post.id}
          id={post.id!}
          image={
            post.coverImage
              ? { uri: post.coverImage }
              : require("../../assets/Post/The future.png")
          }
          profilePic={
            post.profilePicture
              ? { uri: post.profilePicture }
              : require("../../assets/headerIcon/profilePic.png")
          }
          category={post.category}
          category_title={post.postTitle}
          content={post.postContent}
          post_user={post.author}
          time_posted={post.createdAt ? formatTimeAgo(post.createdAt) : "Just now"}
          read_time="5 min"
          isSaved={savedPosts.includes(post.id!)}
          onTitlePressed={() => onTitlePressed(post.id!)}
          onSavePressed={() => onSavePressed(post.id!)}
        />
      ))}
    </ScrollView>
  );
};

export default Main;

const style = StyleSheet.create({
  m_bg: {
    gap: 20,
  },
});