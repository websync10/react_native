
import Header from '@/components/Header';
import SearchBox from '@/components/searchBox';
import { FontFamily } from '@/constants/Fonts';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 2;

const looksData = [
  { id: '1', image: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' } },
  { id: '2', image: { uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80' } },
  { id: '3', image: { uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80' } },
  { id: '4', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
  { id: '5', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
  { id: '6', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
];

const tabs = ['All', 'Photos', 'Videos'];

const TryOnHistory = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  // Filter logic can be added here if needed
  const filteredLooks = looksData;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Try On History"  />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchBoxWrapper}>
          <SearchBox onSearch={setSearch} />
        </View>
        <View style={styles.tabsRow}>
          {tabs.map(tab => (
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
          <View style={styles.grid}>
            {filteredLooks.map(look => (
              <View key={look.id} style={styles.gridItem}>
                <Image source={look.image} style={styles.gridImage} resizeMode="cover" />
                <TouchableOpacity style={styles.viewLookBtn}>
                  <Text style={styles.viewLookText}>View Look</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop:16,
  },
  searchBoxWrapper: {
    // paddingHorizontal: 16,
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
