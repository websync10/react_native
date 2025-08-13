import SplashScreenComponent from '@/components/SplashScreen';
import { ProfileRefreshProvider } from '@/lib/contexts/ProfileRefreshContext';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { supabase } from '@/lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [showSplash, setShowSplash] = useState(true);
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

  // Check if it's the first app launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasLaunched = await AsyncStorage.getItem('hasLaunched');
        if (!hasLaunched) {
          // First time launching the app
          setShowSplash(true);
          // Mark as launched
          await AsyncStorage.setItem('hasLaunched', 'true');
        } else {
          // Not first time, skip splash
          setShowSplash(false);
        }
      } catch (error) {
        console.error('Error checking first launch:', error);
        setShowSplash(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (!loaded || isLoggedIn === null) return null;
  
  return (
    <ProfileRefreshProvider>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={false} />
        
        {/* Show splash screen on first load */}
        {showSplash && (
          <SplashScreenComponent onFinish={() => setShowSplash(false)} />
        )}
        
        {isLoggedIn ? (
          <Stack screenOptions={{ headerShown: false }}>
            {/* Routes accessible when logged in */}
            <Stack.Screen name="(auth)/onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/findYourFitMale" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/findYourFitFemale" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/yourStyleMale" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/yourStyleFemale" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/accountsetup" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/bodyShapemale" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)/bodyShapeFemale" options={{ headerShown: false }} />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            {/* Routes accessible when not logged in */}
            <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          </Stack>
        )}
      </SafeAreaProvider>
    </ProfileRefreshProvider>
  );
}
