import { ImageSourcePropType } from "react-native"

export type ExplorePostProp = {
    id : string,
    postType: string,
    postTitle: string,
    aurthor: string,
    readTime: string,
    coverImage: ImageSourcePropType
}