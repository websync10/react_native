import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { supabase } from '@/lib/supabase';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-url-polyfill/auto';

if (typeof global.structuredClone === 'undefined') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const {setField} = useOnboardingStore();
  const [loaded] = useFonts({
    // Helvetica Neue font family variants
    'HelveticaNeue-Thin': require('../assets/fonts/HelveticaNeueThin.otf'),
    'HelveticaNeue-Light': require('../assets/fonts/HelveticaNeueLight.otf'),
    'HelveticaNeue-Roman': require('../assets/fonts/HelveticaNeueRoman.otf'),
    'HelveticaNeue-Medium': require('../assets/fonts/HelveticaNeueMedium.otf'),
    'HelveticaNeue-Bold': require('../assets/fonts/HelveticaNeueBold.otf'),
    'HelveticaNeue-Heavy': require('../assets/fonts/HelveticaNeueHeavy.otf'),
    'HelveticaNeue-Black': require('../assets/fonts/HelveticaNeueBlack.otf'),
    
    // Backward compatibility aliases
    'Helvetica': require('../assets/fonts/HelveticaNeueRoman.otf'),
    'Helvetica-Medium': require('../assets/fonts/HelveticaNeueMedium.otf'),
    'HelveticaNeue': require('../assets/fonts/HelveticaNeueRoman.otf'),
    'Helvetica Neue': require('../assets/fonts/HelveticaNeueRoman.otf'),
    'HelveticaNeueMedium': require('../assets/fonts/HelveticaNeueMedium.otf'),
    'HelveticaNeueLight': require('../assets/fonts/HelveticaNeueLight.otf'),
    
    // SpaceMono for monospace text
    'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth change:", _event, session);
      setIsLoggedIn(!!session);
      if(session?.user){
        setField("userId", session?.user?.id)
      }
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (!loaded || isLoggedIn === null) return null
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={false} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={isLoggedIn}> 
          {/* true= valid !true= notvalid */}
          <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/findYourFitMale" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/findYourFitFemale" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/yourStyleMale" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/yourStyleFemale" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/accountsetup" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/bodyShapemale" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/bodyShapeFemale" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="edit" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!isLoggedIn}>
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </SafeAreaProvider>
  );
}
