
import Header from '@/components/Header';
import { FontFamily } from '@/constants/Fonts';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 2;

const myProfileData = {
  name: 'Robert L',
  username: '@robertlowsky',
  avatar: { uri: 'https://picsum.photos/120/120' },
  posts: 127,
  followers: '1.2K',
  following: 465,
  outfits: [
    { id: '1', image: { uri: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' } },
    { id: '2', image: { uri: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80' } },
    { id: '3', image: { uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80' } },
    { id: '4', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
    { id: '5', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
    { id: '6', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
    { id: '7', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
    { id: '8', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
    { id: '9', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
  ],
  likedOutfits: [
    { id: 'l1', image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' } },
    { id: 'l2', image: { uri: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80' } },
  ],
};

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('Outfits');

  const renderOutfitGrid = (outfits: any[]) => (
    <View style={styles.outfitsGrid}>
      {outfits.map((outfit) => (
        <View key={outfit.id} style={styles.outfitItem}>
          <Image source={outfit.image} style={styles.outfitImage} resizeMode="cover" />
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>


        {/* Remove borderBottom for Header on this page */}
        <Header title='Profile' />


        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image source={myProfileData.avatar} style={styles.profileAvatar} />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{myProfileData.name}</Text>
              <Text style={styles.profileUsername}>{myProfileData.username}</Text>
            </View>
            <TouchableOpacity onPress={()=>{router.push('/pages/editProfile')}} style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{myProfileData.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{myProfileData.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{myProfileData.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
          <View style={styles.tabsSection}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Outfits' && styles.activeTabButton]}
              onPress={() => setActiveTab('Outfits')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'Outfits' && styles.activeTabButtonText]}>Outfits</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Likes' && styles.activeTabButton]}
              onPress={() => setActiveTab('Likes')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'Likes' && styles.activeTabButtonText]}>Likes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.contentSection}>
          {activeTab === 'Outfits'
            ? renderOutfitGrid(myProfileData.outfits)
            : renderOutfitGrid(myProfileData.likedOutfits)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    textAlign: 'center',
    marginBottom: 8,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
    backgroundColor: '#f0f0f0',
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
  },
  editProfileButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 100,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  editProfileText: {
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E0E0E0',
  },
  tabsSection: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginTop: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#000',
  },
  tabButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
  },
  activeTabButtonText: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  outfitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  outfitItem: {
    width: imageWidth,
    height: imageWidth * 1.2,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  outfitImage: {
    width: '100%',
    height: '100%',
  },
});

export default MyProfile;
