import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import ProfileHeader from "../ProfileComponent/ProfileHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorType } from "../tools/colorSet";
import { fontSizeType } from "../tools/textSet";
import PostAndDraftButton from "../ProfileComponent/PostAndDraftButton";
import { auth } from "../services/firebase";
import {
  getPostsByAuthor,
  getDraftsByAuthorId,
  updateUserProfilePictureEverywhere,
} from "../services/postService";
import { uploadImageToSupabase } from "../services/supabaseStorage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RootHomeProp } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DraftModel } from "../services/postService";
import { PostModel } from "../Models/PostModel";

type NavigationProp = NativeStackNavigationProp<RootHomeProp>;

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const user = auth.currentUser;

  const [myPosts, setMyPosts] = useState<PostModel[]>([]);
  const [myDrafts, setMyDrafts] = useState<DraftModel[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "drafts">("posts");
  const [profileLoading, setProfileLoading] = useState(false);

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  const loadMyPosts = async () => {
    try {
      const authorName = user?.displayName || user?.email || "Anonymous";
      const posts = await getPostsByAuthor(authorName);
      setMyPosts(posts);
    } catch (error) {
      console.log("LOAD PROFILE POSTS ERROR:", error);
    }
  };

  const loadMyDrafts = async () => {
    try {
      if (!user?.uid) return;
      const drafts = await getDraftsByAuthorId(user.uid);
      setMyDrafts(drafts);
    } catch (error) {
      console.log("LOAD PROFILE DRAFTS ERROR:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMyPosts();
      loadMyDrafts();
    }, [user?.uid, user?.displayName, user?.email, user?.photoURL])
  );

  const visibleItems = useMemo(() => {
    return activeTab === "posts" ? myPosts : myDrafts;
  }, [activeTab, myPosts, myDrafts]);

  const onPostPressed = (postId: string) => {
    navigation.navigate("PostDetail", { postID: postId });
  };

  const onDraftPressed = (draftId: string) => {
    navigation.navigate("CreatePost", { draftId });
  };

  const handleChangeProfilePicture = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        Alert.alert("Not logged in", "You must be logged in.");
        return;
      }

      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission required",
          "Permission to access gallery is required."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) return;

      setProfileLoading(true);

      const imageUri = result.assets[0].uri;

      const profilePictureUrl = await uploadImageToSupabase(
        imageUri,
        "post-images",
        "profiles"
      );

      await updateUserProfilePictureEverywhere(profilePictureUrl);

      Alert.alert("Success", "Profile picture updated successfully.");

      await loadMyPosts();
      await loadMyDrafts();
    } catch (error) {
      console.log("UPDATE PROFILE PICTURE ERROR:", error);
      Alert.alert("Failed", "Failed to update profile picture.");
    } finally {
      setProfileLoading(false);
    }
  };

  return (
    <SafeAreaView style={style.p_bg}>
      <ProfileHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 30, gap: 20, width: "100%" }}
      >
        <View style={style.profileTop}>
          <Pressable onPress={handleChangeProfilePicture} style={style.profileImageWrapper}>
            <Image
              source={
                user?.photoURL
                  ? { uri: user.photoURL }
                  : require("../assets/Profile/profilePicture.png")
              }
              style={style.profileImage}
            />

            <View style={style.profileOverlay}>
              {profileLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={style.profileOverlayText}>
                  Click to change profile picture
                </Text>
              )}
            </View>

            <View style={style.verifiedBadge}>
              <Image source={require("../assets/Profile/verified.png")} />
            </View>
          </Pressable>

          <Text style={style.nameText}>
            {user?.displayName || "Echo User"}
          </Text>

          <Text style={style.usernameText}>
            @{(user?.email || "user").split("@")[0]}
          </Text>

          <Text style={style.bioText}>Welcome to your profile page.</Text>

          <Pressable style={style.editButton}>
            <Text style={style.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        <View style={style.statsContainer}>
          <View style={style.statsRow}>
            <View style={[style.social, { width: "46%" }]}>
              <Text style={style.statsNumber}>0</Text>
              <Text style={style.statsLabel}>FOLLOWERS</Text>
            </View>

            <View style={[style.social, { width: "46%" }]}>
              <Text style={style.statsNumber}>0</Text>
              <Text style={style.statsLabel}>FOLLOWING</Text>
            </View>
          </View>

          <View style={[style.social, { width: "100%" }]}>
            <Text style={style.statsNumber}>
              {activeTab === "posts" ? myPosts.length : myDrafts.length}
            </Text>
            <Text style={style.statsLabel}>
              {activeTab === "posts" ? "POSTS" : "DRAFTS"}
            </Text>
          </View>
        </View>

        <View>
          <PostAndDraftButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {visibleItems.length === 0 ? (
            <View style={style.emptyState}>
              <Text style={style.emptyTitle}>
                {activeTab === "posts" ? "No posts yet" : "No drafts yet"}
              </Text>
              <Text style={style.emptyText}>
                {activeTab === "posts"
                  ? "Your published posts will appear here."
                  : "Your saved drafts will appear here."}
              </Text>
            </View>
          ) : (
            visibleItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  item.id &&
                  (activeTab === "posts"
                    ? onPostPressed(item.id)
                    : onDraftPressed(item.id))
                }
                style={style.postCard}
              >
                <Image
                  source={
                    item.coverImage
                      ? { uri: item.coverImage }
                      : require("../assets/Profile/evolution.png")
                  }
                  style={style.postImage}
                />

                <View style={style.postInfo}>
                  <Text style={style.postMeta}>
                    {activeTab === "posts" ? "RECENT • 5 MIN READ" : "DRAFT"}
                  </Text>

                  <Text style={style.postTitle}>{item.postTitle}</Text>

                  <Text numberOfLines={2} style={style.postExcerpt}>
                    {stripHtml(item.postContent)}
                  </Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  p_bg: {
    backgroundColor: colorType.prePrimary,
    position: "relative",
    width: "100%",
    flex: 1,
  },
  profileTop: {
    width: "100%",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  profileImageWrapper: {
    position: "relative",
    width: 130,
    height: 130,
    borderRadius: 65,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
  },
  profileOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profileOverlayText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 10,
    right: 0,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: colorType.buttonColor,
  },
  nameText: {
    fontSize: fontSizeType["3xl"],
    fontWeight: "700",
  },
  usernameText: {
    fontSize: fontSizeType.lg,
    fontWeight: "500",
    color: colorType.buttonColor,
  },
  bioText: {
    fontSize: fontSizeType.lg,
    color: colorType.contentText,
    textAlign: "center",
  },
  editButton: {
    width: 142,
    height: 44,
    marginTop: 15,
    backgroundColor: colorType.buttonColor,
    borderRadius: 20,
    padding: 10,
  },
  editButtonText: {
    fontSize: fontSizeType.lg,
    color: colorType.prePrimary,
    textAlign: "center",
  },
  statsContainer: {
    width: "100%",
    gap: 20,
    padding: 15,
  },
  statsRow: {
    flexDirection: "row",
    gap: 20,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  social: {
    backgroundColor: "rgba(148,6,249, 0.1)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(148,6,249, 0.2)",
    padding: 20,
    alignItems: "center",
    gap: 5,
  },
  statsNumber: {
    fontSize: fontSizeType.lg,
    fontWeight: "500",
  },
  statsLabel: {
    fontSize: fontSizeType.base,
    fontWeight: "200",
    color: colorType.contentText,
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: fontSizeType.lg,
    fontWeight: "700",
    color: colorType.hTextColor,
  },
  emptyText: {
    marginTop: 8,
    fontSize: fontSizeType.sm,
    color: colorType.contentText,
    textAlign: "center",
  },
  postCard: {
    flexDirection: "row",
    gap: 15,
    padding: 15,
    width: "100%",
  },
  postImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  postInfo: {
    gap: 5,
    flex: 1,
  },
  postMeta: {
    fontSize: fontSizeType.base,
    color: colorType.contentText,
    fontWeight: "100",
  },
  postTitle: {
    fontSize: fontSizeType.lg,
    fontWeight: "400",
    width: "95%",
    flexWrap: "wrap",
  },
  postExcerpt: {
    fontSize: fontSizeType.sm,
    color: colorType.contentText,
  },
});