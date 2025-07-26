
import DiscoverCard from '@/components/discoverCard';
import HeaderWithLogo from '@/components/headerwithlogo';
import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const trendingPosts = [
  {
    id: '1',
    user: {
      name: 'Jacklaw_',
      avatar: require('@/assets/images/styles/businesscasual-male.png'),
      followers: [require('@/assets/images/styles/bohemian-female.png'), require('@/assets/images/styles/businesscasual-male.png')],
    },
    styleImage: require('@/assets/images/styles/streetwear-male.png'),
    title: 'Stylish Urban Fashion',
    description: 'Simply dummy text of the printing and typesetting industry.',
    likes: 120,
    comments: 17,
    people: [require('@/assets/images/styles/businesscasual-male.png'), require('@/assets/images/styles/bohemian-female.png')],
    isFollowing: false,
  },
  {
    id: '2',
    user: {
      name: 'Stevee_',
      avatar: require('@/assets/images/styles/bohemian-female.png'),
      followers: [require('@/assets/images/styles/businesscasual-male.png'), require('@/assets/images/styles/bohemian-female.png')],
    },
    styleImage: require('@/assets/images/styles/casual-female.png'),
    title: 'Stylish Woman in Urban Setting',
    description: 'Simply dummy text of the printing and typesetting industry.',
    likes: 90,
    comments: 12,
    people: [require('@/assets/images/styles/bohemian-female.png'), require('@/assets/images/styles/minimal-male.png')],
    isFollowing: false,
  },
];



const Discover = () => {
  const [activeTab, setActiveTab] = useState('Trending');
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <HeaderWithLogo />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Discover</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#888" style={{ marginRight: 8 }} />
            <TextInput placeholder="Search" style={styles.searchInput} placeholderTextColor="#888" />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={22} color="#222" />
          </TouchableOpacity>
        </View>
        <View style={styles.tabsRow}>
          <TouchableOpacity onPress={() => setActiveTab('Trending')} style={[styles.tabBtn, activeTab === 'Trending' && styles.tabBtnActive]}>
            <Text style={[styles.tabText, activeTab === 'Trending' && styles.tabTextActive]}>Trending styles for you</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Following')} style={[styles.tabBtn, activeTab === 'Following' && styles.tabBtnActive]}>
            <Text style={[styles.tabText, activeTab === 'Following' && styles.tabTextActive]}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 8 }}>
          {activeTab === 'Trending' ? (
            trendingPosts.map(post => <DiscoverCard key={post.id} post={post} />)
          ) : (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>No posts yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 22,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    marginTop: 16,
    marginLeft: 20,
    marginBottom: 8,
    color: '#222',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#222',
  },
  filterBtn: {
    marginLeft: 12,
    backgroundColor: '#f3f3f3',
    borderRadius: 12,
    padding: 8,
  },
  tabsRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tabBtnActive: {
    borderBottomColor: '#222',
  },
  tabText: {
    fontSize: 15,
    color: '#888',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  tabTextActive: {
    color: '#222',
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    paddingBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingTop: 14,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  username: {
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#222',
    marginRight: 8,
  },
  followersGroup: {
    flexDirection: 'row',
    marginLeft: 2,
  },
  followerAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  followBtn: {
    backgroundColor: '#222',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  followBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
  postImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    marginTop: 12,
    marginBottom: 10,
  },
  cardContent: {
    paddingHorizontal: 14,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#222',
    marginBottom: 4,
  },
  postDesc: {
    fontSize: 14,
    color: '#888',
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  peopleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  peopleAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  peopleBadge: {
    backgroundColor: '#E6007A',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
    shadowColor: '#E6007A',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  peopleBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  navBtn: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
  },
  navBtnActive: {
    borderTopWidth: 2,
    borderTopColor: '#222',
  },
  navText: {
    fontSize: 12,
    color: '#888',
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginTop: 2,
  },
  navTextActive: {
    color: '#222',
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
});

export default Discover;