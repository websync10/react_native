import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';

import PageOne from '@/components/onboarding/PageOne';
import { getUser } from '@/lib/services/handleusers/getUser';

const Hello = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessionAndProfile = async () => {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) {
                console.error('Error getting session:', error);
                setLoading(false);
                return;
            }

            setSession(session);

            if (session?.user) {
                const onboarded = await getUser(session.user.id)

                if (onboarded) {
                    setIsOnboarded(onboarded ?? false);
                } else {
                    setIsOnboarded(false);
                }
            }

            setLoading(false);
        };

        fetchSessionAndProfile();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (isOnboarded) {
            router.push('/(home)');
        }
    }, [isOnboarded]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <PageOne />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        fontFamily: 'Helvetica',
        marginBottom: 30,
    },
});

export default Hello;
