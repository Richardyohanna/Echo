import { ImageSourcePropType } from "react-native"

export type CreatePostProp = {
    coverImage: ImageSourcePropType,
    postTitle: string,
    postContent: string,
    category: string,
    aurthor: string,
    profilePicture: ImageSourcePropType
}