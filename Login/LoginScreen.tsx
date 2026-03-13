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
} from "react-native";
import React, { useState } from "react";
import { colorType } from "../tools/colorSet";
import { fontSizeType } from "../tools/textSet";
import { Row_and_Center } from "../tools/styles";
import Checkbox from "expo-checkbox";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootHomeProp } from "../App";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../services/authService";

const LoginScreen = () => {
  type NavigationProp = NativeStackNavigationProp<RootHomeProp, "Login">;
  const navigation = useNavigation<NavigationProp>();

  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

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

  return (
    <SafeAreaView style={style.l_bg}>
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
              <Image source={require("../assets/CreateAccount/eye.png")} />
            </Pressable>
          </View>
        </View>

        <View style={[Row_and_Center.row_and_center, { gap: 10 }]}>
          <Checkbox value={isChecked} onValueChange={setChecked} />
          <Text style={{ fontSize: fontSizeType.sm }}>
            Remember this device for 30 days
          </Text>
        </View>

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

        <Image source={require("../assets/Divider.png")} />

        <View
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
        </View>

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
    </SafeAreaView>
  );
};

export default LoginScreen;

const style = StyleSheet.create({
  l_bg: {
    flex: 1,
    backgroundColor: colorType.primary,
    padding: 20,
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
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 20,
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