import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function LogoutButton() {
    const router = useRouter();
    const resetOnboarding = useOnboardingStore((state) => state.reset);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            Alert.alert("Logout Failed", error.message);
        } else {
            resetOnboarding();
            router.replace("/(auth)/login");
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 12,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
