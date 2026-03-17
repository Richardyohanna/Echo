import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState , useEffect} from "react";
import { colorType } from "../tools/colorSet";
import { fontSizeType } from "../tools/textSet";
import { Row_and_Center } from "../tools/styles";
import Checkbox from "expo-checkbox";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootHomeProp } from "../App";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../services/authService";

import {

  resetPassword,
  loginWithGoogle,
  loginWithApple,
} from "../services/authService";


import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  type NavigationProp = NativeStackNavigationProp<RootHomeProp, "Login">;
  const navigation = useNavigation<NavigationProp>();

  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "1:480844890059:web:29877c7af9f1167d1b004e",
    iosClientId: "YOUR_IOS_CLIENT_ID",
    androidClientId: "YOUR_ANDROID_CLIENT_ID",
  });


  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      loginWithGoogle(id_token);

      navigation.replace("HomePage", { screen: "Home" });
    }
  }, [response]);

  // APPLE LOGIN
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      if (credential.identityToken) {
        await loginWithApple(credential.identityToken);

        navigation.replace("HomePage", { screen: "Home" });
      }
    } catch (error) {
      console.log("Apple login error:", error);
    }
  };


  const login = async () => {
    if (!email.trim()) {
      Alert.alert("Missing email", "Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Missing password", "Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      navigation.replace("HomePage", { screen: "Home" });
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      let message = "Unable to login. Please try again.";

      if (error?.code === "auth/invalid-email") {
        message = "That email address is not valid.";
      } else if (
        error?.code === "auth/invalid-credential" ||
        error?.code === "auth/wrong-password" ||
        error?.code === "auth/user-not-found"
      ) {
        message = "Incorrect email or password.";
      } else if (error?.code === "auth/too-many-requests") {
        message = "Too many attempts. Please try again later.";
      }

      Alert.alert("Login failed", message);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = () => {
    navigation.navigate("CreateAccount");
  };


  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Enter Email", "Please enter your email first.");
      return;
    }

    try {
      await resetPassword(email.trim());

      Alert.alert(
        "Password Reset",
        "A reset email has been sent to your email."
      );
    } catch (error) {
      Alert.alert("Error", "Could not send reset email.");
    }
  };



  return (
    <SafeAreaView style={style.l_bg}>
     <KeyboardAvoidingView 
           style ={{width: "100%", justifyContent: "center", alignItems: "center"}}
           behavior={Platform.OS === "ios" ?  "padding" : "height"}
           keyboardVerticalOffset={20}
           >
          
          
      <View style={style.form}>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View style={style.logo}>
            <Image source={require("../assets/headerIcon/logo.png")} />
          </View>

          <Text
            style={{
              fontSize: fontSizeType["3xl"],
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Echo
          </Text>

          <Text
            style={{
              textAlign: "center",
              color: colorType.contentText,
              fontWeight: "300",
              fontSize: fontSizeType.sm,
            }}
          >
            Welcome back! Please enter your details
          </Text>
        </View>

        <View style={{ gap: 5, width: "100%" }}>
          <Text style={{ fontSize: fontSizeType.base, fontWeight: "500" }}>
            Email Address
          </Text>

          <View style={style.text_input}>
            <Image source={require("../assets/CreateAccount/email.png")} />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="richard@example.com"
              placeholderTextColor={"rgba(55,55,55,0.5)"}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={{ flex: 1 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: fontSizeType.base, fontWeight: "500" }}>
              Password
            </Text>

            <Text
              style={{
                fontSize: fontSizeType.sm,
                fontWeight: "500",
                color: "blue",
              }}

              onPress={handleForgotPassword}
            >
              Forgot Password?
            </Text>
          </View>

          <View style={style.text_input}>
            <Image source={require("../assets/CreateAccount/password.png")} />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor={"rgba(55,55,55,0.5)"}
              secureTextEntry={secureText}
              style={{ flex: 1 }}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable onPress={() => setSecureText((prev) => !prev)}>
              <Image source={secureText? require("../assets/CreateAccount/no-eye.png") : require("../assets/CreateAccount/eye.png")}  style={{height: 25, width: 25}}/>
            </Pressable>
          </View>
        </View>

      {/*   <View style={[Row_and_Center.row_and_center, { gap: 10 }]}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={{ fontSize: fontSizeType.sm }}>
            Remember this device for 30 days
          </Text>
        </View>  */}

        <Pressable
          style={[
            Row_and_Center.row_and_center,
            {
              backgroundColor: colorType.buttonColor,
              padding: 20,
              borderRadius: 20,
              gap: 10,
              marginTop: 15,
              width: "100%",
              opacity: loading ? 0.7 : 1,
            },
          ]}
          onPress={login}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colorType.prePrimary} />
          ) : (
            <>
              <Text
                style={{
                  color: colorType.prePrimary,
                  fontSize: fontSizeType.lg,
                }}
              >
                Login
              </Text>
              <Image
                source={require("../assets/CreateAccount/createAccount.png")}
              />
            </>
          )}
        </Pressable>

        

       {/* <Image source={require("../assets/Divider.png")} /> <View
          style={[
            Row_and_Center.row_and_center,
            { justifyContent: "space-between", width: "100%" },
          ]}
        >
          <Pressable
            style={[
              Row_and_Center.row_and_center,
              {
                borderWidth: 1,
                borderColor: "rgba(55,55,55,0.2)",
                borderRadius: 10,
                gap: 10,
                width: 139,
                height: 50,
              },
            ]}
            onPress={() => promptAsync()}
          >
            <Image source={require("../assets/google.png")} />
            <Text
              style={{
                color: colorType.hTextColor,
                fontSize: fontSizeType.lg,
              }}
            >
              Google
            </Text>
          </Pressable>

          <Pressable
            style={[
              Row_and_Center.row_and_center,
              {
                borderWidth: 1,
                borderColor: "rgba(55,55,55,0.2)",
                borderRadius: 10,
                gap: 10,
                width: 139,
                height: 50,
              },
            ]}

            onPress={handleAppleLogin}
          >
            <Image source={require("../assets/apple.png")} />
            <Text
              style={{
                color: colorType.hTextColor,
                fontSize: fontSizeType.lg,
              }}
            >
              Apple
            </Text>
          </Pressable>
        </View> */}

        <Text
          style={{
            color: colorType.contentText,
            fontSize: fontSizeType.xs,
            textAlign: "center",
            width: "100%",
          }}
        >
          Don't have an account?{" "}
          <Text
            style={{ textDecorationLine: "underline", color: "blue" }}
            onPress={createAccount}
          >
            Sign up for free
          </Text>
        </Text>
      </View>
       </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  l_bg: {
    flex: 1,
    backgroundColor: colorType.primary,
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    backgroundColor: colorType.prePrimary,
    borderRadius: 20,
    gap: 20,
    padding: 20,
    marginTop: 40,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingTop: 20,
    
    width: "94%"
  },
  logo: {
    width: 50,
    height: 40,
    backgroundColor: "rgba(148,6,249,0.1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text_input: {
    backgroundColor: colorType.prePrimary,
    borderRadius: 10,
    flexDirection: "row",
    padding: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    borderColor: "rgba(55,55,55,0.2)",
    width: "100%",
  },
});