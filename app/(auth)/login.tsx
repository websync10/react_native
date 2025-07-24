import GradientBackground from "@/components/ui/GradientBackground";
import GradientRight from "@/components/ui/GradientRight";
import { createSessionFromUrl } from "@/lib/services/supabase/createSession";
import { supabase } from "@/lib/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri({
  scheme: "myuzeapp",
  path: "validate",
});

const performOAuth = async (provider: "google" | "facebook") => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
    Alert.alert("OAuth error", error.message);
    return;
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success" && res.url) {
    await createSessionFromUrl(res.url);
  }
};

const sendMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: Linking.createURL("/validate"),
    },
  });

  if (error) {
    console.error("Magic link error:", error.message);
    Alert.alert("Error", error.message);
  } else {
    Alert.alert("Check your inbox", "Magic link sent to: " + email);
  }
};

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).catch(console.error);
    }
    console.log("redirectTo", redirectTo);
  }, [url]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <GradientBackground />
      <ScrollView>
        <View style={styles.content}>
          {/* Section 1: Logo and Header Text */}
          <View style={styles.headerSection}>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/baglogo.png")}
                resizeMode="contain"
                style={styles.bagLogo}
              />
              <Image
                source={require("../../assets/images/Myuzetxtlogo.png")}
                resizeMode="contain"
                style={styles.textLogo}
              />
            </View>
            <Text style={styles.headerText}>
              Find your style with AI.{"\n"}Try it on. Own it.
            </Text>
          </View>

          {/* Section 2: Authentication Forms */}
          <View style={styles.authSection}>
            {/* Section 2.1: Social Login Buttons */}
            <View style={styles.socialLoginSection}>
              <TouchableOpacity
                onPress={() => performOAuth("google")}
                style={styles.socialButton}
              >
                <View style={styles.socialButtonContent}>
                  <Image
                    source={{
                      uri: "https://developers.google.com/identity/images/g-logo.png",
                    }}
                    style={styles.socialIcon}
                  />
                  <Text style={styles.socialButtonText}>
                    Log in with Google
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => performOAuth("facebook")}
                style={[styles.socialButton, styles.facebookButton]}
              >
                <View style={styles.socialButtonContent}>
                  <View style={styles.facebookIcon}>
                    <Text style={styles.facebookIconText}>f</Text>
                  </View>
                  <Text style={styles.socialButtonText}>
                    Log in with Facebook
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Section 2.2: Divider */}
            <View style={styles.dividerSection}>
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>
            </View>

            {/* Section 2.3: Email Input */}
            <View style={styles.emailSection}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter email"
                  placeholderTextColor="#999"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Section 2.4: Continue Button and Sign Up Link */}
            <View style={styles.actionSection}>
              <TouchableOpacity
                onPress={() => sendMagicLink(email)}
                style={styles.continueButton}
              >
                <Text style={styles.continueButtonText}>
                  Continue with email
                </Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/accountsetup")}>
                  <Text style={styles.signUpLink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <GradientRight />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 64,
  },
  // Section 1: Header Section
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
    gap: 23,
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  bagLogo: {
    width: 52,
    height: 52,
    alignSelf: "center",
  },
  textLogo: {
    width: 110,
    height: 32.39,
    top: 10,
  },
  headerText: {
    color: "#737373",
    fontFamily: "Helvetica Neue",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: 20,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  // Section 2: Auth Section
  authSection: {
    flex: 1,
    gap: 32,
  },
  // Section 2.1: Social Login Section
  socialLoginSection: {
    flexDirection: "column",
    gap: 17,
  },
  // Section 2.2: Divider Section
  dividerSection: {
    // marginVertical: 10,
  },
  // Section 2.3: Email Section
  emailSection: {
    // marginVertical: 15,
  },
  // Section 2.4: Action Section
  actionSection: {
    flexDirection: "column",
    gap: 16,
    // marginTop: 10,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#D3D3D3",
  },
  facebookButton: {
    marginBottom: 0,
  },
  socialButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  facebookIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#1877F2",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  facebookIconText: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: -3,
  },
  socialButtonText: {
    fontSize: 16,
    color: "#0B0C0C",
    fontWeight: "500",
    fontFamily: "Helvetica Neue",
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
    width: "100%",
    paddingHorizontal: 40,
  },
  dividerLine: {
    flex: 1,
    height: 2,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#999",
    fontFamily: "Helvetica Neue",
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 16,
    color: "#262627",
    marginBottom: 8,
    fontWeight: "400",
    fontFamily: "Helvetica Neue",
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    // paddingVertical: 16,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 0.3,
    borderColor: "#777",
    height: 60,
    fontFamily: "Helvetica Neue",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signUpText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Helvetica Neue",
  },
  signUpLink: {
    fontSize: 14,
    color: "#00272E",
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
  },
  continueButton: {
    backgroundColor: "#999999",
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FEFEFF",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Helvetica Neue",
  },
  nextPage: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default LoginScreen;
