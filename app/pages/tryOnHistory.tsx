import Header from '@/components/Header';
import SearchBox from '@/components/searchBox';
import { FontFamily } from '@/constants/Fonts';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export interface TryOnLook {
  id: string;
  image: string;
  category: string;
  type: 'static' | 'virtual';
  weather: string;
  body_type: string;
  location: string;
  created_at: string;
}

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 2;
const tabs = ['All', 'Photos'];

const TryOnHistory = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [looksData, setLooksData] = useState<TryOnLook[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLooks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tryondb').select('*').order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching looks:', error.message);
    } else {
      setLooksData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchLooks();
  }, []);

  const filteredLooks = looksData.filter((look) => {
    const matchesSearch =
      look.category.toLowerCase().includes(search.toLowerCase()) ||
      look.location.toLowerCase().includes(search.toLowerCase());

    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Photos' && look.type === 'virtual')

    return matchesSearch && matchesTab;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Try On" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchBoxWrapper}>
          <SearchBox onSearch={setSearch} />
        </View>

        <View style={styles.tabsRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tabDivider} />

        <View style={styles.gridSection}>
          {loading ? (
            <ActivityIndicator size="large" color="#000" />
          ) : filteredLooks.length === 0 ? (
            <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>No try-on data found.</Text>
          ) : (
            <View style={styles.grid}>
              {filteredLooks.map((look) => (
                <View key={look.id} style={styles.gridItem}>
                  <Image source={{ uri: look.image }} style={styles.gridImage} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.viewLookBtn}
                    onPress={() => router.push({
                      pathname: '/pages/tryLookPage',
                      params: { outfitImage: look.image }
                    })}
                  >
                    <Text style={styles.viewLookText}>Try Look</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  searchBoxWrapper: {
    marginTop: 8,
    marginBottom: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tabBtn: {
    marginRight: 24,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#8288A0',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  tabTextActive: {
    color: '#000',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  tabDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  gridSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItem: {
    width: imageWidth,
    height: imageWidth * 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#f7f7f7',
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  viewLookBtn: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  viewLookText: {
    fontSize: 15,
    color: '#222',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
});

export default TryOnHistory;
