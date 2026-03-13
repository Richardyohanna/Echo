import "./global.css";
import { Text, View } from "react-native";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold
} from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTab from "./navigationScreen/NavigationTab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetailScreen from "./HomeComponent/Post/PostDetails/PostDetailScreen";
import CreatPost from "./CreatePost/CreatPost";
import CreateAccount from "./CreateAccount/CreateAccount";
import LoginScreen from "./Login/LoginScreen";
import { PostProvider } from "./PostContext/PostContext";
import { BlogPostType } from "./PostContext/PostContext";

export type RootHomeProp = {
  Login: undefined,
  CreateAccount: undefined,
  HomePage: {
    screen: "Home" | "Profile" | "Saved" | "Explore"
  },
  CreatePost: { draftId?: string; postId?: string } | undefined;

  PostDetail: {
    postID: string;
  };

}


export default function App() {

  const Stack = createNativeStackNavigator<RootHomeProp>();


    const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  /*
 
  */
 // <CreateAccount />
 // <LoginScreen />
  return (
  <PostProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="HomePage" component={NavigationTab} />
        <Stack.Screen name="CreatePost" component={CreatPost} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </PostProvider>
);
}
