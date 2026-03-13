import {
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  Pressable,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CreatePostHeader from "./CreatePostHeader";
import { Column_and_Center, Row_and_Center } from "../tools/styles";
import { fontSizeType } from "../tools/textSet";
import { colorType } from "../tools/colorSet";
import { RichEditor, RichToolbar, actions } from "react-native-pell-rich-editor";
import * as ImagePicker from "expo-image-picker";
import PostSetting from "./TagSetting";
import VisibilitySetting from "./VisibilitySetting";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootHomeProp } from "../App";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  createPost,
  createDraft,
  getDraftById,
  updateDraft,
  publishDraftToPost,
} from "../services/postService";
import { uploadImageToSupabase } from "../services/supabaseStorage";
import { auth } from "../services/firebase";

type NavigationProp = NativeStackNavigationProp<RootHomeProp, "CreatePost">;
type CreatePostRouteProp = RouteProp<RootHomeProp, "CreatePost">;

const CreatPost = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CreatePostRouteProp>();

  const draftId = route.params?.draftId;

  const [postTitle, setPostTitle] = useState("");
  const [category, setCategory] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [draftLoading, setDraftLoading] = useState(false);
  const [loadingDraft, setLoadingDraft] = useState(false);

  const richText = useRef<RichEditor>(null);
  const scrollRef = useRef<ScrollView>(null);

  const handleEditorFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ y: 300, animated: true });
    }, 500);
  };

  const [coverImage, setCoverImage] = useState<any>(
    require("../assets/Post/CreatePost/Cover Image Section.png")
  );

  useEffect(() => {
    if (draftId) {
      loadDraft();
    }
  }, [draftId]);

  const loadDraft = async () => {
    try {
      setLoadingDraft(true);

      const draft = await getDraftById(draftId!);

      if (!draft) {
        Alert.alert("Draft not found", "This draft could not be loaded.");
        return;
      }

      setPostTitle(draft.postTitle || "");
      setCategory(draft.category || "");
      setPostContent(draft.postContent || "");

      if (draft.coverImage) {
        setCoverImage({ uri: draft.coverImage });
      }
    } catch (error) {
      console.log("LOAD DRAFT ERROR:", error);
      Alert.alert("Error", "Failed to load draft.");
    } finally {
      setLoadingDraft(false);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access gallery is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setCoverImage({ uri: result.assets[0].uri });
    }
  };

  const uploadCoverIfNeeded = async () => {
    let coverImageUrl = "";

    if (coverImage && typeof coverImage === "object" && "uri" in coverImage) {
      if (
        typeof coverImage.uri === "string" &&
        (coverImage.uri.startsWith("http://") || coverImage.uri.startsWith("https://"))
      ) {
        return coverImage.uri;
      }

      coverImageUrl = await uploadImageToSupabase(coverImage.uri);
    }

    return coverImageUrl;
  };

  const handleSaveDraft = async () => {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        Alert.alert("Not logged in", "You must be logged in to save a draft.");
        return;
      }

      if (!postTitle.trim() && !postContent.trim() && !category.trim()) {
        Alert.alert("Empty draft", "Enter at least a title, category or content.");
        return;
      }

      setDraftLoading(true);

      const coverImageUrl = await uploadCoverIfNeeded();

      const draftPayload = {
        postTitle,
        postContent,
        category,
        author: currentUser.displayName || currentUser.email || "Anonymous",
        authorId: currentUser.uid,
        coverImage: coverImageUrl,
        profilePicture: currentUser.photoURL || "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
     

      if (draftId) {
        await updateDraft(draftId, draftPayload);
        Alert.alert("Draft updated", "Your draft has been updated.");
      } else {
        await createDraft(draftPayload);
        Alert.alert("Draft saved", "Your draft has been saved.");
      }

      navigation.goBack();
    } catch (error) {
      console.log("SAVE DRAFT ERROR:", error);
      Alert.alert("Draft failed", "Failed to save draft.");
    } finally {
      setDraftLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      if (!postTitle.trim()) {
        Alert.alert("Missing title", "Please enter a post title.");
        return;
      }

      if (!category.trim()) {
        Alert.alert("Missing category", "Please enter a category.");
        return;
      }

      if (!postContent.trim()) {
        Alert.alert("Missing content", "Please enter your post content.");
        return;
      }

      const currentUser = auth.currentUser;

      if (!currentUser) {
        Alert.alert("Not logged in", "You must be logged in to create a post.");
        return;
      }

      setLoading(true);

      const coverImageUrl = await uploadCoverIfNeeded();

    const postPayload = {
      postTitle,
      postContent,
      category,
      author: currentUser.displayName || currentUser.email || "Anonymous",
      authorId: currentUser.uid,
      coverImage: coverImageUrl,
      profilePicture: currentUser.photoURL || "",
      createdAt: Date.now(),
    };

      if (draftId) {
        await publishDraftToPost(draftId, postPayload);
      } else {
        await createPost(postPayload);
      }

      Alert.alert("Success", "Post published successfully.");
      navigation.goBack();
    } catch (error) {
      console.log("CREATE POST ERROR:", error);
      Alert.alert("Publish failed", "Failed to publish post.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingDraft) {
    return (
      <View style={[Column_and_Center.column_and_center, style.p_bg]}>
        <ActivityIndicator color={colorType.buttonColor} />
      </View>
    );
  }

  return (
    <View style={[Column_and_Center.column_and_center, style.p_bg]}>
      <CreatePostHeader />

      <KeyboardAvoidingView
        style={{ flex: 1, width: "100%" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={-1000}
      >
        <TouchableWithoutFeedback
          onPress={() => richText.current?.blurContentEditor()}
        >
          <ScrollView
            ref={scrollRef}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={style.scrollContent}
          >
            <Pressable style={style.ad_image} onPress={pickImage}>
              <Image
                source={coverImage}
                style={{ width: "100%", height: 200, borderRadius: 20 }}
                resizeMode="cover"
              />
            </Pressable>

            <Text style={style.h_text}>POST TITLE</Text>

            <TextInput
              value={postTitle}
              onChangeText={setPostTitle}
              placeholder="Enter Your Title"
              placeholderTextColor="rgba(55,55,55,0.4)"
              style={[style.text_input, { height: 50 }]}
            />

            <Text style={style.h_text}>Category</Text>

            <TextInput
              value={category}
              onChangeText={setCategory}
              placeholder="Enter Your Category"
              placeholderTextColor="rgba(55,55,55,0.4)"
              style={[style.text_input, { height: 50 }]}
            />

            <Text style={style.h_text}>CONTENT</Text>

            <RichToolbar
              editor={richText}
              actions={[
                actions.setBold,
                actions.setItalic,
                actions.setUnderline,
                actions.insertBulletsList,
                actions.insertOrderedList,
                actions.heading1,
              ]}
              style={style.toolbar}
            />

            <RichEditor
              ref={richText}
              initialContentHTML={postContent}
              onChange={setPostContent}
              placeholder="Write your story here... Use the toolbar above to format your content."
              style={style.editor}
              useContainer={true}
              onFocus={handleEditorFocus}
              initialHeight={220}
              editorStyle={{
                backgroundColor: colorType.prePrimary,
                color: "#333",
                placeholderColor: "rgba(55,55,55,0.4)",
                contentCSSText: `
                  padding: 12px;
                  font-size: 14px;
                  line-height: 22px;
                `,
              }}
              onCursorPosition={(scrollY) => {
                scrollRef.current?.scrollTo({
                  y: Math.max(0, scrollY + 120),
                  animated: true,
                });
              }}
            />

            <Text style={[style.h_text, { marginTop: 25 }]}>Post Settings</Text>
            <PostSetting />
            <VisibilitySetting />

            <Pressable
              onPress={handleSaveDraft}
              disabled={draftLoading}
              style={[
                Row_and_Center.row_and_center,
                style.draftButton,
                { opacity: draftLoading ? 0.7 : 1 },
              ]}
            >
              {draftLoading ? (
                <ActivityIndicator color={colorType.buttonColor} />
              ) : (
                <Text
                  style={{
                    fontSize: fontSizeType.lg,
                    color: colorType.buttonColor,
                    fontWeight: "500",
                  }}
                >
                  {draftId ? "Update Draft" : "Save Draft"}
                </Text>
              )}
            </Pressable>

            <Pressable
              onPress={handleCreatePost}
              disabled={loading}
              style={[
                Row_and_Center.row_and_center,
                style.publish,
                { opacity: loading ? 0.7 : 1 },
              ]}
            >
              {loading ? (
                <ActivityIndicator color={colorType.prePrimary} />
              ) : (
                <>
                  <Image source={require("../assets/Post/CreatePost/publish.png")} />
                  <Text
                    style={{
                      fontSize: fontSizeType.lg,
                      color: colorType.prePrimary,
                      fontWeight: "500",
                    }}
                  >
                    {draftId ? "Publish Draft" : "Publish Post"}
                  </Text>
                </>
              )}
            </Pressable>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CreatPost;

const style = StyleSheet.create({
  p_bg: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colorType.primary,
  },
  scrollContent: {
    gap: 15,
    padding: 10,
    paddingBottom: 180,
  },
  ad_image: {
    marginTop: 110,
    width: "100%",
  },
  h_text: {
    fontSize: fontSizeType.base,
    color: colorType.hTextColor,
    fontWeight: "600",
  },
  text_input: {
    width: "100%",
    backgroundColor: colorType.prePrimary,
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  toolbar: {
    width: "100%",
    backgroundColor: colorType.prePrimary,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  editor: {
    width: "100%",
    minHeight: 220,
    backgroundColor: colorType.prePrimary,
    borderRadius: 20,
  },
  draftButton: {
    marginTop: 20,
    width: "100%",
    height: 56,
    gap: 15,
    borderRadius: 20,
    backgroundColor: "rgba(148,6,249,0.1)",
    padding: 10,
    borderWidth: 1,
    borderColor: colorType.buttonColor,
  },
  publish: {
    marginTop: 12,
    width: "100%",
    height: 56,
    gap: 15,
    borderRadius: 20,
    backgroundColor: colorType.buttonColor,
    padding: 10,
    shadowColor: colorType.buttonColor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
});