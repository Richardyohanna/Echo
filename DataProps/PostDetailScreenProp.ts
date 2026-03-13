import { ImageSourcePropType } from "react-native"

export type PostDetailScreenProp = {
    coverImage: ImageSourcePropType,
    category: string,
    postTitle: string,
    aurthor: string,
    timePosted: string,
    profilePicture: ImageSourcePropType,
    postContent: string
}