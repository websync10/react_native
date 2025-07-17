import { supabase } from '@/lib/supabase';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { createSessionFromUrl } from './(auth)/login';

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
   const url = Linking.useURL();
  
      useEffect(() => {
          if (url) {
              createSessionFromUrl(url).catch(console.error);
          }
      }, [url]);
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth change:", _event, session);
      setIsLoggedIn(!!session);
    });
  
    return () => subscription.subscription.unsubscribe();
  }, []);

  if (!loaded || isLoggedIn === null) {
    return null;
  }

  return (
    <Stack>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
