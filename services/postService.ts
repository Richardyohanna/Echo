import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
  setDoc,
  where,
  writeBatch 
} from "firebase/firestore";
import { PostModel } from "../Models/PostModel";
import { updateProfile } from "firebase/auth";


const postCollection = collection(db, "posts");
const draftCollection = collection(db, "drafts");





export const createPost = async (post: PostModel) => {
  const docRef = await addDoc(postCollection, post);
  return docRef.id;
};

export const getPosts = async () => {
  const q = query(postCollection, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as PostModel[];
};

export const getPostById = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const snapshot = await getDoc(postRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as PostModel;
};

export const updatePost = async (
  id: string,
  updatedData: Partial<PostModel>
) => {
  const postRef = doc(db, "posts", id);
  await updateDoc(postRef, updatedData);
};

export const deletePost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  await deleteDoc(postRef);
};

export const savePost = async (postId: string) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  await setDoc(doc(db, "savedPosts", user.uid, "posts", postId), {
    postId,
    savedAt: Date.now(),
  });
};

export const getSavedPostIds = async () => {
  const user = auth.currentUser;

  if (!user) return [];

  const snapshot = await getDocs(collection(db, "savedPosts", user.uid, "posts"));

  return snapshot.docs.map((item) => item.id);
};

export const deleteSavedPost = async (postId: string) => {
  const user = auth.currentUser;

  if (!user) throw new Error("User not logged in");

  await deleteDoc(doc(db, "savedPosts", user.uid, "posts", postId));
};

export const getPostsByAuthor = async (author: string) => {
  const posts = await getPosts();
  return posts.filter((post) => post.author === author);
};

/** ---------------- DRAFTS ---------------- */

export type DraftModel = {
  id?: string;
  postTitle: string;
  postContent: string;
  category: string;
  author: string;
  authorId: string;
  coverImage: string;
  profilePicture: string;
  createdAt: number;
  updatedAt: number;
};

export const createDraft = async (draft: DraftModel) => {
  const docRef = await addDoc(draftCollection, draft);
  return docRef.id;
};

export const getDraftsByAuthorId = async (authorId: string) => {
  const q = query(draftCollection, where("authorId", "==", authorId));

  const snapshot = await getDocs(q);

  const drafts = snapshot.docs.map((item) => ({
    id: item.id,
    ...item.data(),
  })) as DraftModel[];

  return drafts.sort((a, b) => b.updatedAt - a.updatedAt);
};


export const getDraftById = async (draftId: string) => {
  const draftRef = doc(db, "drafts", draftId);
  const snapshot = await getDoc(draftRef);

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  } as DraftModel;
};

export const updateDraft = async (
  draftId: string,
  updatedData: Partial<DraftModel>
) => {
  const draftRef = doc(db, "drafts", draftId);
  await updateDoc(draftRef, {
    ...updatedData,
    updatedAt: Date.now(),
  });
};

export const publishDraftToPost = async (
  draftId: string,
  postData: PostModel
) => {
  const postRef = await addDoc(collection(db, "posts"), postData);
  await deleteDoc(doc(db, "drafts", draftId));
  return postRef.id;
};

export const deleteDraft = async (draftId: string) => {
  const draftRef = doc(db, "drafts", draftId);
  await deleteDoc(draftRef);
};



export const updateUserProfilePictureEverywhere = async (photoURL: string) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not logged in");
  }

  await updateProfile(user, { photoURL });

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName || "",
      photoURL,
      updatedAt: Date.now(),
    },
    { merge: true }
  );

  const batch = writeBatch(db);

  // update posts by authorId
  const postsByAuthorIdQuery = query(postCollection, where("authorId", "==", user.uid));
  const postsByAuthorIdSnapshot = await getDocs(postsByAuthorIdQuery);

  postsByAuthorIdSnapshot.docs.forEach((item) => {
    batch.update(item.ref, {
      profilePicture: photoURL,
    });
  });

  // fallback for old posts saved before authorId existed
  const fallbackAuthorName = user.displayName || user.email || "Anonymous";
  const postsByAuthorNameQuery = query(postCollection, where("author", "==", fallbackAuthorName));
  const postsByAuthorNameSnapshot = await getDocs(postsByAuthorNameQuery);

  postsByAuthorNameSnapshot.docs.forEach((item) => {
    batch.update(item.ref, {
      profilePicture: photoURL,
      authorId: user.uid,
    });
  });

  // update drafts by authorId
  const draftsByAuthorIdQuery = query(draftCollection, where("authorId", "==", user.uid));
  const draftsByAuthorIdSnapshot = await getDocs(draftsByAuthorIdQuery);

  draftsByAuthorIdSnapshot.docs.forEach((item) => {
    batch.update(item.ref, {
      profilePicture: photoURL,
    });
  });

  // fallback for old drafts saved before authorId existed
  const draftsByAuthorNameQuery = query(draftCollection, where("author", "==", fallbackAuthorName));
  const draftsByAuthorNameSnapshot = await getDocs(draftsByAuthorNameQuery);

  draftsByAuthorNameSnapshot.docs.forEach((item) => {
    batch.update(item.ref, {
      profilePicture: photoURL,
      authorId: user.uid,
    });
  });

  await batch.commit();
};