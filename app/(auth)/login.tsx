import PrimaryButton from "@/components/PrimaryButton";
import GradientBackground from "@/components/ui/GradientBackground";
import { FontFamily } from "@/constants/Fonts";
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

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const url = Linking.useURL();

  useEffect(() => {
    if (url) {
      createSessionFromUrl(url).catch(console.error);
    }
  }, [url]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GradientBackground />
      <ScrollView >
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
            <View style={{gap:8}}>
              <Text style={styles.headerboldText}>Sign in</Text>
              <Text style={styles.headerText}>Enter your email address to complete sign in</Text>

            </View>
            
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
                    Continue with Google
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
                    Continue with Facebook
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Section 2.2: Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or sign in with</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Section 2.3: Email Input */}
            <View>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter email address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Section 2.4: Continue Button and Sign Up Link */}
            <View style={styles.actionSection}>

              <PrimaryButton title="Sign in" onPress={()=>{}}/>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>
                  Don&apos;t have an account?{" "}
                </Text>
                <TouchableOpacity onPress={() => router.push("/accountsetup")}>
                  <Text style={styles.signUpLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 54,
  },
  // Section 1: Header Section
  headerSection: {
    alignItems: "center",
    marginBottom: 32,
    paddingTop:86,
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
    color: "#67696E",
    fontFamily: FontFamily.HelveticaNeue.Regular,
    fontSize: 16,
    letterSpacing: -0.24,
    lineHeight:20,
    textAlign: "center",
  },
  // Section 2: Auth Section
  headerboldText: {
    color: "#1D2F4E",
    fontFamily: FontFamily.HelveticaNeue.Bold,
    fontSize: 24,
    letterSpacing: -0.24,
    textAlign: "center",
    marginTop:24
  },

  authSection: {
    flex: 1,
    gap: 32,
    backgroundColor: '#fff',
    marginHorizontal: -24,
    paddingHorizontal: 24,
    marginTop: 'auto',
    paddingBottom: 60,
  },
  socialLoginSection: {
    flexDirection: "column",
    gap: 17,
  },
  actionSection: {
    flexDirection: "column",
    gap: 16,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
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
    gap:1
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
    color: "#2F4366",
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  dividerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 5,
    width: "100%",
    // paddingHorizontal: 5,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "#636369",
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  inputContainer: {
    marginBottom: 0,
  },
  inputLabel: {
    fontSize: 16,
    color: "#343640",
    marginBottom: 8,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  textInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#D9DBE2",
    height: 60,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop:24 ,
  },
  signUpText: {
    fontSize: 14,
    color: "#737373",
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  signUpLink: {
    fontSize: 14,
    color: "#000",
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
});
export default LoginScreen;
