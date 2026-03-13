import { ImageSourcePropType } from "react-native"

export type HomeScreenPost = {
     
    id: string,
    coverImage: ImageSourcePropType,
    profilePicture: ImageSourcePropType,
    category: string,
    content: string,
    aurthor: string,
    timePosted: string,
    readTime: string
    
}