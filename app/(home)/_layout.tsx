import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Keyboard, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    StatusBar.setHidden(true); 
    return () => StatusBar.setHidden(false); 

  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontFamily: 'Helvetica' },
        tabBarStyle: keyboardVisible
          ? { display: 'none' }
          : {
            paddingBottom: insets.bottom + 10,
            height: 60 + insets.bottom,
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Image style={{width:26, height:26}} source={require('@/assets/images/icons/home.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="tryon"
        options={{
          title: 'Try On',
          tabBarIcon: ({ color, focused }) => (
            <Image style={{width:26, height:26}} source={require('@/assets/images/icons/tryon.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <Feather name="compass" size={24} color={focused ? 'black' : color} />
          ),
        }}
      />
    </Tabs>
  );
}
