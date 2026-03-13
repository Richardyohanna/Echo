import { StyleSheet, ScrollView } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import SavedHeader from "./SavedHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorType } from "../tools/colorSet";
import SavedCategoryTab from "./SavedCategoryTab";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootHomeProp } from "../App";
import SavedPost from "./SavedPost";

import {
  getPosts,
  getSavedPostIds,
  deleteSavedPost,
} from "../services/postService";

type NavigationProp = NativeStackNavigationProp<RootHomeProp>;

const SavedScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [posts, setPosts] = useState<any[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const loadSavedPosts = async () => {
    try {
      const allPosts = await getPosts();
      const saved = await getSavedPostIds();

      setPosts(allPosts);
      setSavedIds(saved);
    } catch (error) {
      console.log("LOAD SAVED SCREEN ERROR:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadSavedPosts();
    }, [])
  );

  const savedPosts = useMemo(() => {
    const onlySavedPosts = posts.filter((post) => savedIds.includes(post.id));

    return onlySavedPosts.filter((post) => {
      if (!activeCategory) return true;

      const category = post.category?.toLowerCase() || "";

      if (activeCategory === "Tech") {
        return (
          category === "tech" ||
          category === "technology"
        );
      }

      if (activeCategory === "Productivity") {
        return category === "productivity";
      }

      return category === activeCategory.toLowerCase();
    });
  }, [posts, savedIds, activeCategory]);

  const onTitlePressed = (postId: string) => {
    navigation.navigate("PostDetail", { postID: postId });
  };

  const handleDeleteSaved = async (postId: string) => {
    try {
      await deleteSavedPost(postId);
      setSavedIds((prev) => prev.filter((id) => id !== postId));
    } catch (error) {
      console.log("DELETE SAVED POST ERROR:", error);
    }
  };

  return (
    <SafeAreaView style={style.s_bg}>
      <SavedHeader />

      <SavedCategoryTab
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scrollContent}

      >
        <SafeAreaView style={style.listContainer}>
          {savedPosts.map((item) => (
            <SavedPost
              key={item.id}
              postType={item.category}
              readTime="5 min"
              postTitle={item.postTitle}
              postContent={item.postContent}
              image={{ uri: item.coverImage }}
              onTitlePressed={() => onTitlePressed(item.id)}
              onDeletePressed={() => handleDeleteSaved(item.id)}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;

const style = StyleSheet.create({
  s_bg: {
    backgroundColor: colorType.primary,
   
   justifyContent: "flex-start",
   height: "100%",

    width: "100%",
  },
  scrollContent: {
    padding: 15,
    width: "100%",
   

  },
  listContainer: {
    gap: 30,
    
  },
});