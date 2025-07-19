import HomePage from '@/components/home/HomePage';
import { supabase } from '@/lib/supabase';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

interface UserData {
  id: string;
  fullName: string;
  profileImage: string;
}

export default function HomeScreen() {
  const [userData, setUserData] = useState<UserData | null>(null);

  async function getUser() {
    const {
      data,
      error,
    } = await supabase
      .from("profiles")
      .select('id, full_name, avatar_url')
      .single();

    if (error) {
      console.log("Error fetching user:", error.message);
      return;
    }

    const user = {
      id: data.id,
      fullName: data.full_name,
      profileImage: data.avatar_url,
    };

    setUserData(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View style={{flex: 1, paddingVertical: 20, backgroundColor: "#ffffff"}}>
      <HomePage userData={userData} />
    </View>
  );
}
