import React, { useCallback, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import ExploreHeader from "./ExploreHeader";
import { colorType } from "../tools/colorSet";
import { SafeAreaView } from "react-native-safe-area-context";
import { fontSizeType } from "../tools/textSet";
import ExploreCategory from "./ExploreCategory/ExploreCategory";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootHomeProp } from "../App";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ExplorePost from "./ExplorePost";
import PopularAurthor from "./PopularAurthor";
import { getPosts } from "../services/postService";
import { PostModel } from "../Models/PostModel";

type NavigationProp = NativeStackNavigationProp<RootHomeProp, "HomePage">;

const featuredAurthor = [
  {
    id: 1,
    image: require("../assets/Explore/randomUser.png"),
    aurthor: "Richard Yohanna",
  },
  {
    id: 2,
    image: require("../assets/Explore/randomUser.png"),
    aurthor: "Elena Joy",
  },
  {
    id: 3,
    image: require("../assets/Explore/randomUser.png"),
    aurthor: "Ezekiel Aiso",
  },
  {
    id: 4,
    image: require("../assets/Explore/randomUser.png"),
    aurthor: "Adamu Yohanna",
  },
];

const ExploreScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [posts, setPosts] = useState<PostModel[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.log("EXPLORE POSTS ERROR:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadPosts();
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
        !activeCategory ||
        category === activeCategory.replace("#", "").toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [posts, searchText, activeCategory]);

  const onTitlePressed = (postId: string) => {
    navigation.navigate("PostDetail", { postID: postId });
  };

  return (
    <SafeAreaView style={style.e_bg}>
      <ExploreHeader />

      <ScrollView contentContainerStyle={style.SafeView}>
        <SafeAreaView style={style.SafeView}>
          <View style={style.search}>
            <Image source={require("../assets/Explore/search.png")} />
            <TextInput
              placeholder="Search articles, topic, or writers"
              placeholderTextColor="rgba(55,55,55,0.5)"
              value={searchText}
              onChangeText={setSearchText}
              style={{ flex: 1 }}
            />
          </View>

          <Text style={style.heading}>Trending Topics</Text>

          <ExploreCategory
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <View style={style.writerRow}>
            <Text style={style.heading}>Featured Writers</Text>
            <Text style={style.viewAll}>View all</Text>
          </View>

          <View style={style.allWriters}>
            {featuredAurthor.map((item) => (
              <PopularAurthor
                key={item.id}
                aurthor={item.aurthor}
                image={item.image}
              />
            ))}
          </View>

          <Text style={style.heading}>Popular Posts</Text>

          {filteredPosts.map((item) => (
            <ExplorePost
              key={item.id}
              postType={item.category}
              postTitle={item.postTitle}
              image={{ uri: item.coverImage }}
              aurthor={item.author}
              readTime="5 min"
              onTitlePressed={() => onTitlePressed(item.id!)}
            />
          ))}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreen;

const style = StyleSheet.create({
  e_bg: {
    flex: 1,
    width: "100%",
    backgroundColor: colorType.prePrimary,
    gap: 20,
    position: "relative",
  },
  SafeView: {
    padding: 15,
    gap: 20,
  },
  search: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    borderRadius: 10,
    backgroundColor: "rgba(148,6,249, 0.2)",
    height: 48,
    width: "100%",
    padding: 15,
  },
  heading: {
    fontSize: fontSizeType.lg,
    fontWeight: "600",
    marginTop: 15,
  },
  writerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  viewAll: {
    fontSize: fontSizeType.sm,
    fontWeight: "500",
    color: "blue",
    marginTop: 15,
  },
  allWriters: {
    flexDirection: "row",
    width: "100%",
    flexWrap: "wrap",
  },
});