import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from 'expo-linking';
import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

WebBrowser.maybeCompleteAuthSession();

const redirectTo = makeRedirectUri();

export const createSessionFromUrl = async (url: string) => {
    const { params, errorCode } = QueryParams.getQueryParams(url);
    if (errorCode) throw new Error(errorCode);

    const { access_token, refresh_token } = params;
    Alert.alert("Tokens from URL:");

    if (!access_token || !refresh_token) {
        Alert.alert("Missing token(s) in URL");
        return;
    }

    const { data, error } = await supabase.auth.setSession({
        access_token,
        refresh_token,
    });

    if (error) {
        Alert.alert("setSession error:", error.message);
        return;
    }

    Alert.alert("Session set successfully!")
};


const performOAuth = async (provider: 'google' | 'facebook') => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo,
            skipBrowserRedirect: true,
        },
    });

    if (error) {
        console.error('OAuth error:', error.message);
        Alert.alert('OAuth error', error.message);
        return;
    }

    const res = await WebBrowser.openAuthSessionAsync(data?.url ?? "", redirectTo);

    if (res.type === 'success' && res.url) {
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
        console.error('Magic link error:', error.message);
        Alert.alert('Error', error.message);
    } else {
        Alert.alert('Check your inbox', 'Magic link sent to: ' + email);
    }
};

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const url = Linking.useURL();

    useEffect(() => {
        if (url) {
            createSessionFromUrl(url).catch(console.error);
        }
    }, [url]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>

                <View style={styles.content}>
                    <Text style={{
                        fontSize: 60,
                        textAlign: "center",
                        marginBottom: 20,
                        fontWeight: 900,

                    }}>
                        Myuze
                    </Text>
                    <Text style={styles.headerText}>
                        Find your style. Try it on. Own it.
                    </Text>

                    <TouchableOpacity onPress={() => performOAuth('google')} style={styles.socialButton}>
                        <View style={styles.socialButtonContent}>
                            <Image
                                source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                                style={styles.socialIcon}
                            />
                            <Text style={styles.socialButtonText}>Log in with Google</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => performOAuth('facebook')} style={[styles.socialButton, styles.facebookButton]}>
                        <View style={styles.socialButtonContent}>
                            <View style={styles.facebookIcon}>
                                <Text style={styles.facebookIconText}>f</Text>
                            </View>
                            <Text style={styles.socialButtonText}>Log in with Facebook</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR</Text>
                        <View style={styles.dividerLine} />
                    </View>

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

                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
                        <TouchableOpacity onPress={() => sendMagicLink(email)} style={styles.continueButton}>
                            <Text style={styles.continueButtonText}>Continue with email</Text>
                        </TouchableOpacity>

                        <Link href="/(auth)/onboarding" asChild>
                            <TouchableOpacity style={styles.continueButton}>
                                <Text style={styles.nextPage}>View Other Page</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 60,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '400',
    },
    socialButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    facebookButton: {
        marginBottom: 24,
    },
    socialButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 12,
    },
    facebookIcon: {
        width: 20,
        height: 20,
        backgroundColor: '#1877F2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    facebookIconText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    socialButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E0E0E0',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#999',
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
    },
    signUpText: {
        fontSize: 14,
        color: '#666',
    },
    signUpLink: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
    continueButton: {
        backgroundColor: '#666',
        borderRadius: 8,
        paddingVertical: 16,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    nextPage: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
export default LoginScreen;