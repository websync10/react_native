import { supabase } from "@/lib/supabase";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();
const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) throw new Error(errorCode);
  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) return;

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;
  console.log("session:", data.session)
  return data.session;
};

const performOAuth = async (provider: 'facebook' | 'google') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo,
      skipBrowserRedirect: true,
    },
  });

  if (error) {
    console.error("OAuth error:", error.message);
    return;
  }

  const res = await WebBrowser.openAuthSessionAsync(
    data?.url ?? "",
    redirectTo
  );

  if (res.type === "success") {
    await createSessionFromUrl(res.url);
  }
};

const sendMagicLink = async (email: string) => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    console.error("Magic link error:", error.message);
    Alert.alert("Error", error.message);
  } else {
    Alert.alert("Check your inbox", "Magic link sent to: " + email);
  }
};

export default function Auth() {
  const [email, setEmail] = useState("");

  const url = Linking.useURL();
  console.log({ url })

  useEffect(() => {
    if (url) createSessionFromUrl(url);
  }, [url]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Button title="Continue with Email" onPress={() => sendMagicLink(email)} />
      <View style={styles.spacer} />
      <Button title="Login with Facebook" onPress={() => performOAuth('facebook')} />
      <View style={styles.spacer} />
      <Button title="Login with Google" onPress={() => performOAuth('google')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "gray",
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  spacer: {
    height: 10,
  },
});
