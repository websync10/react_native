import HomePage from '@/components/home/HomePageDemo';
import { getUserProfile } from '@/lib/services/handleusers/getProfile';
import { getUser } from '@/lib/services/handleusers/getUser';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';


export default function HomeScreen() {
  const [session, setSession] = useState<Session | null>(null);
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<User | null>(null)

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
        const profile = await getUserProfile(session.user.id);
        const onboarded = await getUser(session.user.id)
        if (profile) {
          setUserData(profile)
        }
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
    if (isOnboarded === false) {
      router.push('/(auth)/onboarding');
    }
  }, [isOnboarded]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <HomePage userData={userData}  />
    </View>
  );
}
