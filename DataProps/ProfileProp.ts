import { ImageSourcePropType } from "react-native"

export type ProfileProp = {
    
    profilePicture: ImageSourcePropType,
    name: string,
    username: string,
    about: string,
    followers: number,
    following: number,
    noOfPost: number,

}

export type ProfilePostProp = {
    id: string,
    date: string,
    readTime: string,
    postTitle: string
}

