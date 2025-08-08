import Header from '@/components/Header';
import LookbookCard from '@/components/lookbookCard';
import { FontFamily } from '@/constants/Fonts';
import { getUserLookbooks } from '@/lib/actions/users/getLookBook';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { LookBook } from '../pages/public-lookbook-feed';

const Lookbook = () => {
  const [looks, setLooks] = useState<LookBook[]>([]);
  const { userId } = useOnboardingStore()
  const fetchMore = async () => {
    const newLookbooks = await getUserLookbooks(userId);
    setLooks((prev) => [...prev, ...newLookbooks]);
  };
    const handleDeleteLookbook = (id: string) => {
      setLooks(prev => prev.filter(lb => lb.id !== id));
    };

  useEffect(() => {
    fetchMore()
  }, [userId])
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 16, }}>
      <Header title='LookBook' />
      <Link href={"/pages/public-lookbook-feed"}>View more</Link>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.pageTitle}>My Looks</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#282A37" style={{ marginRight: 8 }} />
            <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#282A37" />
          </View>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          {looks.map(look => (
            <LookbookCard
              id={look.id}
              key={look.id}
              image={{ uri: look.image }}
              title={look.title}
              date={look.date}
              is_public={look.is_public}
              onDelete={handleDeleteLookbook}
            />
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 22,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginTop: 16,
    marginLeft: 20,
    marginBottom: 20,
    color: '#343640',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F7F9',
    borderRadius: 100,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#282A37',
  },
});

export default Lookbook;
