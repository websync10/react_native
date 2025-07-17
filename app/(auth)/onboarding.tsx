import ProfileForm from '@/components/ProfileForm';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Hello = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [fullname, setFullname] = useState('');

    useEffect(() => {
        const init = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
        };
        init();

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        const getUserProfile = async () => {
            if (!session) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('full_name')
                .eq('id', session.user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setFullname(data?.full_name || '');
            }
        };

        getUserProfile();
    }, [session]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <ProfileForm fullname={fullname} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
    },
});

export default Hello;
