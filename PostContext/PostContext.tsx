import React, { createContext, useContext, useState, ReactNode } from "react";
import { ImageSourcePropType } from "react-native";


export type BlogPostType = {
  id: string;
  coverImage: ImageSourcePropType;
  postTitle: string;
  postContent: string;
  category: string;
  postUser: string;
  timePosted: string;
  readTime: string;
  profilePic: ImageSourcePropType;
};

type PostContextType = {
  postsById: Record<string, BlogPostType>;
  postOrder: string[];
  savedPostIds: string[];
  publishPost: (post: Omit<BlogPostType, "id" | "timePosted" | "readTime">) => void;
  getPostById: (id: string) => BlogPostType | undefined;
  getAllPosts: () => BlogPostType[];
  toggleSavePost: (id: string) => void;
  isPostSaved: (id: string) => boolean;
  deleteSavedPost: (id: string) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

const initialPosts: BlogPostType[] = [
  {
    id: "1",
    coverImage: require("../assets/Post/The future.png"),
    postTitle: "The Psychology Of Minimalist Web Design in 2024",
    postContent: "How white space and limited palettes are driving engagement in science",
    category: "DESIGN",
    postUser: "Elena Joy",
    timePosted: "Oct 12",
    readTime: "4 min",
    profilePic: require("../assets/Post/profilePic.png"),
  },
  {
    id: "2",
    coverImage: require("../assets/Post/Remote Work.png"),
    postTitle: "The Psychology Of Minimalist Web Design in 2024",
    postContent: "How white space and limited palettes are driving engagement in science",
    category: "DESIGN",
    postUser: "Elena Joy",
    timePosted: "Oct 12",
    readTime: "4 min",
    profilePic: require("../assets/Post/profilePic.png"),
  },
];

const initialPostsById: Record<string, BlogPostType> = {};
initialPosts.forEach((post) => {
  initialPostsById[post.id] = post;
});

const initialPostOrder = initialPosts.map((post) => post.id);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  
  const [postsById, setPostsById] = useState<Record<string, BlogPostType>>(initialPostsById);
  const [postOrder, setPostOrder] = useState<string[]>(initialPostOrder);
  const [savedPostIds, setSavedPostIds] = useState<string[]>([]);

  const publishPost = (
    post: Omit<BlogPostType, "id" | "timePosted" | "readTime">
  ) => {
    const id = Date.now().toString();

    const newPost: BlogPostType = {
      ...post,
      id,
      timePosted: "Just now",
      readTime: "1 min",
    };

    setPostsById((prev) => ({
      ...prev,
      [id]: newPost,
    }));

    setPostOrder((prev) => [id, ...prev]);
  };

  const getPostById = (id: string) => {
    return postsById[id];
  };

  const getAllPosts = () => {
    return postOrder.map((id) => postsById[id]).filter(Boolean);
  };

  const toggleSavePost = (id: string) => {
    setSavedPostIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  };

  const isPostSaved = (id: string) => {
    return savedPostIds.includes(id);
  };

  const deleteSavedPost = (id: string) => {
    setSavedPostIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <PostContext.Provider
      value={{
        postsById,
        postOrder,
        savedPostIds,
        publishPost,
        getPostById,
        getAllPosts,
        toggleSavePost,
        isPostSaved,
        deleteSavedPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
export const usePosts = () => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePosts must be used inside PostProvider");
  }

  return context;
};