import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithCredential,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";


// REGISTER USER
export const registerUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;

  await updateProfile(user, {
    displayName: fullName,
  });

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    fullName,
    email: user.email,
    createdAt: Date.now(),
  });

  return user;
};


// LOGIN USER
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};


// LOGOUT
export const logoutUser = async () => {
  await signOut(auth);
};


// PASSWORD RESET
export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};


// GOOGLE LOGIN
export const loginWithGoogle = async (idToken: string) => {
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  return result.user;
};


// APPLE LOGIN
export const loginWithApple = async (identityToken: string) => {
  const provider = new OAuthProvider("apple.com");

  const credential = provider.credential({
    idToken: identityToken,
  });

  const result = await signInWithCredential(auth, credential);

  return result.user;
};