import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '../../HomeComponent/HomeScreen';
import PostDetailScreen from '../../HomeComponent/Post/PostDetails/PostDetailScreen';
import CreatPost from '../../CreatePost/CreatPost';

export type RootPageProp = {
    HomeScreen: undefined,    
}

const Stack = createNativeStackNavigator<RootPageProp>();


const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen name = "HomeScreen" component={HomeScreen} />      
    </Stack.Navigator>

  )
}

export default HomeStackNavigation