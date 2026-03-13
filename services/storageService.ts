import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { storage } from "./firebase";



export const uploadImageToStorage = async (
  uri: string,
  folder: string = "postImages"
) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const fileName = `${folder}/${Date.now()}.jpg`;
  const storageRef = ref(storage, fileName);

  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

