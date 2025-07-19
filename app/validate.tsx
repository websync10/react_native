import { createSessionFromUrl } from '@/lib/services/supabase/createSession';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { supabase } from '@/lib/supabase';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const ValidateScreen = () => {
    const url = Linking.useLinkingURL();
    const router = useRouter();
    const { userId, setField } = useOnboardingStore()
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const handleUrl = async () => {
            if (!url) {
                setError("Validation URL not found.");
                setLoading(false);
                return;
            }

            try {
                const session = await createSessionFromUrl(url);
                const userEmail = session?.user?.email ?? null;

                if (!userEmail || !session?.user?.id) {
                    throw new Error("Email or User ID not found in session.");
                }

                setEmail(userEmail);

                setField("userId", session.user.id);
            } catch (err) {
                console.error(err);
                setError("Failed to validate session.");
            } finally {
                setLoading(false);
            }
        };

        handleUrl();
    }, [url]);


    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.loadingText}>Validating session...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    const handleNavigate = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            router.replace('/(auth)/onboarding');
        } else {
            Alert.alert("You're not logged in");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>You're logged in 🎉</Text>
            <Text style={styles.email}>Email: {email}</Text>

            <TouchableOpacity style={styles.button} onPress={handleNavigate}>
                <Text style={styles.buttonText}>Let’s get started →</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#fff',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 12,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ValidateScreen;
