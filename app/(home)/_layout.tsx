import { FontFamily } from '@/constants/Fonts';
import { Tabs } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, Keyboard, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    StatusBar.setHidden(false);

    return () => {
      showSub.remove();
      hideSub.remove();
      StatusBar.setHidden(false);
    };
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: FontFamily.HelveticaNeue.Medium,
          fontSize: 12,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#8288A0',
        tabBarStyle: keyboardVisible
          ? { display: 'none' }
          : {
            paddingBottom: insets.bottom + 10,
            height: 60 + insets.bottom,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
            backgroundColor: '#ffffff',
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{
                  position: 'absolute',
                  top: -8,
                  width: 36,
                  height: 2,
                  backgroundColor: '#000000',
                  // borderRadius: 2,
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                }} />
              )}
              <Image
                style={{ width: 24, height: 24 }}
                source={focused
                  ? require('@/assets/images/icons/activeHomeIcon.png')
                  : require('@/assets/images/icons/inactiveHomeIcon.png')
                }
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="lookbook"
        options={{
          title: 'Lookbook',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{
                  position: 'absolute',
                  top: -8,
                  width: 36,
                  height: 2,
                  backgroundColor: '#000000',
                  // borderRadius: 2,
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                }} />
              )}
              <Image
                style={{ width: 24, height: 24 }}
                source={focused
                  ? require('@/assets/images/icons/activeLookbookIcon.png')
                  : require('@/assets/images/icons/inactiveLookbookIcon.png')
                }
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color, focused }) => (
            <View style={{ alignItems: 'center' }}>
              {focused && (
                <View style={{
                  position: 'absolute',
                  top: -8,
                  width: 36,
                  height: 2,
                  backgroundColor: '#000000',
                  // borderRadius: 2,
                  borderBottomRightRadius: 2,
                  borderBottomLeftRadius: 2,
                }} />
              )}
              <Image
                style={{ width: 24, height: 24 }}
                source={focused
                  ? require('@/assets/images/icons/activeDiscoverIcon.png')
                  : require('@/assets/images/icons/inactiveDiscoverIcon.png')
                }
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}