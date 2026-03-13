import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CreateAccountHeader from "./CreateAccountHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { colorType } from "../tools/colorSet";
import { Row_and_Center } from "../tools/styles";
import { fontSizeType } from "../tools/textSet";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootHomeProp } from "../App";
import { registerUser } from "../services/authService";

const CreateAccount = () => {
  type NavigationProp = NativeStackNavigationProp<RootHomeProp, "CreateAccount">;
  const navigation = useNavigation<NavigationProp>();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async () => {
    if (!fullName.trim()) {
      Alert.alert("Missing name", "Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Missing email", "Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      Alert.alert("Missing password", "Please enter your password.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Weak password", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(fullName.trim(), email.trim(), password);

      Alert.alert("Success", "Account created successfully.");
      navigation.replace("HomePage", { screen: "Home" });
      
    } catch (error: any) {
      console.log("REGISTER ERROR:", error);

      let message = "Unable to create account. Please try again.";

      if (error?.code === "auth/email-already-in-use") {
        message = "That email is already in use.";
      } else if (error?.code === "auth/invalid-email") {
        message = "That email address is not valid.";
      } else if (error?.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      }

      Alert.alert("Registration failed", message);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={style.c_ac_bg}>
      <CreateAccountHeader />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={style.scroll_style}
      >
        <Image source={require("../assets/CreateAccount/Hero Section.png")} />

        <Text
          style={{
            fontSize: fontSizeType["3xl"],
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          Create Your Account
        </Text>

        <Text style={{ textAlign: "center", color: colorType.contentText }}>
          Start your journey with the world's most vibrant community of writers
          and readers.
        </Text>

        <View style={style.form}>
          <Text style={{ fontSize: fontSizeType.base, fontWeight: "500" }}>
            Full Name
          </Text>

          <View style={style.text_input}>
            <Image source={require("../assets/CreateAccount/user.png")} />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter Your Full Name"
              placeholderTextColor={"rgba(55,55,55,0.5)"}
              style={{ flex: 1 }}
            />
          </View>

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

          <Text style={{ fontSize: fontSizeType.base, fontWeight: "500" }}>
            Password
          </Text>

          <View style={style.text_input}>
            <Image source={require("../assets/CreateAccount/password.png")} />

            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a strong password"
              placeholderTextColor={"rgba(55,55,55,0.5)"}
              style={{ flex: 1 }}
              secureTextEntry={secureText}
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Pressable onPress={() => setSecureText((prev) => !prev)}>
              <Image source={require("../assets/CreateAccount/eye.png")} />
            </Pressable>
          </View>

          <Pressable
            onPress={handleCreateAccount}
            disabled={loading}
            style={[
              Row_and_Center.row_and_center,
              {
                backgroundColor: colorType.buttonColor,
                padding: 20,
                borderRadius: 20,
                gap: 10,
                marginTop: 15,
                opacity: loading ? 0.7 : 1,
              },
            ]}
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
                  Create Account
                </Text>
                <Image
                  source={require("../assets/CreateAccount/createAccount.png")}
                />
              </>
            )}
          </Pressable>

          <View style={[Row_and_Center.row_and_center, { marginTop: 20 }]}>
            <Text style={{ textAlign: "center" }}> Already have an account? </Text>
            <Pressable onPress={goToLogin}>
              <Text style={{ color: "blue", textAlign: "center" }}>Log in</Text>
            </Pressable>
          </View>

          <Text
            style={{
              color: colorType.contentText,
              fontSize: fontSizeType.xs,
              textAlign: "center",
            }}
          >
            By continuing you agree to our{" "}
            <Text style={{ textDecorationLine: "underline", color: "blue" }}>
              Terms and Services
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;

const style = StyleSheet.create({
  c_ac_bg: {
    flex: 1,
    backgroundColor: colorType.primary,
    paddingTop: 45,
    position: "relative",
  },
  scroll_style: {
    flexDirection: "column",
    gap: 20,
    paddingBottom: 40,
  },
  form: {
    padding: 15,
    gap: 15,
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
  },
});