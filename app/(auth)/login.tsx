import GradientBackground from '@/components/ui/GradientBackground';
import GradientRight from '@/components/ui/GradientRight';
import { createSessionFromUrl } from '@/lib/services/supabase/createSession';
import { supabase } from '@/lib/supabase';
import { makeRedirectUri } from 'expo-auth-session';
import * as Linking from 'expo-linking';
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
const redirectTo = makeRedirectUri({
    scheme: 'myuzeapp',
    path: 'validate',
});

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
            emailRedirectTo: Linking.createURL("/validate"),
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
        console.log("redirectTo", redirectTo)
    }, [url]);

    return (
        <SafeAreaView style={{ flex: 1, }}>
            <GradientBackground />
            <ScrollView>
                <View style={styles.content}>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "flex-end"
                    }}>
                        <Image
                            source={require('../../assets/images/bag.png')}
                            resizeMode="contain"
                            style={{
                                width: 80,
                                height: 80,
                                alignSelf: 'center',
                            }}
                        />
                        <Text style={{
                            fontSize: 45,
                            textAlign: "center",
                            marginBottom: 10,
                            fontWeight: 900,
                        }}>
                            Myuze
                        </Text>
                    </View>
                    <Text style={styles.headerText}>
                        Find your style with AI.{"\n"}Try it on. Own it.
                    </Text>
                    <View style={{
                        display: "flex",
                        flexDirection: 'column',
                        gap: 10,
                    }}>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 24,
                            fontWeight: "bold"
                        }}>
                            Sign in
                        </Text>
                        <Text style={{
                            textAlign: "center",
                            fontSize: 17,
                            marginBottom: 20,
                        }}>
                            Enter your email address to complete sign in
                        </Text>
                    </View>

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
                        <Text style={styles.dividerText}>Or sign in with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>Email address</Text>
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
                    <View style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
                        <TouchableOpacity onPress={() => sendMagicLink(email)} style={styles.continueButton}>
                            <Text style={styles.continueButtonText}>Sign in</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.signUpContainer}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
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
        backgroundColor: "white"
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginBottom: 70,
        fontWeight: 'bold',
    },
    socialButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        borderWidth: 0.3,
        borderColor: "#777"
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
        width: 30,
        height: 30,
        marginRight: 12,
    },
    facebookIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#1877F2',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    facebookIconText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    socialButtonText: {
        fontSize: 20,
        color: '#333',
        fontWeight: '500',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
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
        fontSize: 20,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#333',
        borderWidth: 0.3,
        borderColor: "#777",
        height: 60,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    signUpText: {
        fontSize: 18,
        color: '#666',
    },
    signUpLink: {
        fontSize: 18,
        color: '#007AFF',
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#000',
        borderRadius: 28,
        paddingVertical: 16,
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    nextPage: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
export default LoginScreen;