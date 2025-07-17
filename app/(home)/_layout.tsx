import { Tabs } from 'expo-router';

export default function HomeLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="tryon"
        options={{
          title: 'Try On',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Discover',
        }}
      />
    </Tabs>
  );
}
