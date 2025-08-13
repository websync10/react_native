import Header from '@/components/Header';
import LookbookCard from '@/components/lookbookCard';
import { FontFamily } from '@/constants/Fonts';
import { getUserLookbooks } from '@/lib/actions/users/getLookBook';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { LookBook } from '../pages/public-lookbook-feed';

const Lookbook = () => {
  const [looks, setLooks] = useState<LookBook[]>([]);
  const [filteredLooks, setFilteredLooks] = useState<LookBook[]>([]);
  const { userId } = useOnboardingStore();

  const fetchMore = async () => {
    if (!userId) return;
    
    const allLookbooks = await getUserLookbooks(userId);
    
    const userLookbooks = allLookbooks.filter((lookbook: LookBook) => lookbook.userId === userId);
    
    setLooks(userLookbooks);
    setFilteredLooks(userLookbooks);
  };

  const handleDeleteLookbook = (id: string) => {
    const lookbookToDelete = looks.find(lb => lb.id === id);
    if (lookbookToDelete && lookbookToDelete.userId === userId) {
      setLooks(prev => prev.filter(lb => lb.id !== id));
      setFilteredLooks(prev => prev.filter(lb => lb.id !== id));
    } else {
      console.error("Attempted to delete lookbook not owned by current user");
    }
  };

  const handleSearch = (searchText: string) => {
    if (!searchText.trim()) {
      setFilteredLooks(looks);
      return;
    }
    
    const filtered = looks.filter(look => 
      look.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredLooks(filtered);
  };

  const handleViewMore = () => {
    router.push('/pages/public-lookbook-feed');
  };

  useEffect(() => {
    fetchMore();
  }, [userId]);

  if (!userId) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 16, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.pageTitle}>Please log in to view your lookbooks</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 32, }}>
      <Header title='LookBook' />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>My Looks</Text>
          <TouchableOpacity style={styles.viewMoreButton} onPress={handleViewMore}>
            <Text style={styles.viewMoreText}>View More</Text>
            <Ionicons name="arrow-forward" size={16} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#282A37" style={{ marginRight: 8 }} />
            <TextInput 
              placeholder="Search your looks..." 
              style={styles.searchInput} 
              placeholderTextColor="#282A37"
              onChangeText={handleSearch}
            />
          </View>
        </View>
        
        {filteredLooks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              {looks.length === 0 ? "You haven't created any lookbooks yet" : "No lookbooks match your search"}
            </Text>
          </View>
        ) : (
          <View style={{ marginHorizontal: 20 }}>
            {filteredLooks.map(look => (
              <LookbookCard
                id={look.id}
                key={look.id}
                image={{ uri: look.image }}
                title={look.title}
                date={look.date}
                is_public={look.is_public}
                lookbookUserId={look.userId}
                onDelete={handleDeleteLookbook}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 22,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#343640',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  viewMoreText: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginRight: 5,
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
});

export default Lookbook;

