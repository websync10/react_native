import HomePage from '@/components/home/HomePage';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export default function HomeScreen() {
  const [users, setUsers] = useState<{ id: string }[]>([])
  async function getAllUsers() {
    const { data, error } = await supabase.from("profiles").select('id')
    if (error) console.log(error?.message)
    setUsers(data ?? [])
  }
  console.log(users)
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <View style={{ flex: 1, }}>
      <HomePage />
      {users && users.map(u => (
        <Text>
          {u.id}
        </Text>
      ))}
    </View>
  );
}
