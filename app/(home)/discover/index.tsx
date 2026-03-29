import DiscoverCard from '@/components/discoverCard';
import HeaderWithLogo from '@/components/headerwithlogo';
import MobileSidebar from '@/components/home/Sidebar';
import SearchBox from '@/components/searchBox';
import { FontFamily } from '@/constants/Fonts';
import { router } from 'expo-router';

import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TrendingPosts = [
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
    tags: ['#urban', '#fashion', '#streetwear'],
    likes: 120,
    dislike: 5,
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
    tags: ['#woman', '#urban', '#casual'],
    likes: 90,
    dislike: 2,
    comments: 12,
    people: [require('@/assets/images/styles/bohemian-female.png'), require('@/assets/images/styles/minimal-male.png')],
    isFollowing: false,
  },
];

const userData = {
  id: 'user1',
  name: 'Jacklaw_',
  fullName: 'Jack Law',
  avatar: require('@/assets/images/styles/businesscasual-male.png'),
  profileImage: require('@/assets/images/styles/businesscasual-male.png'),
  followers: [require('@/assets/images/styles/bohemian-female.png'), require('@/assets/images/styles/businesscasual-male.png')],
};

const Discover = () => {
  const [activeTab, setActiveTab] = useState('Trending');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [posts, setPosts] = useState(TrendingPosts);
  const [filteredPosts, setFilteredPosts] = useState(TrendingPosts);

  // Function to handle follow/unfollow action
  const handleFollowToggle = (postId: string) => {
    setPosts(prevPosts => {
      const updatedPosts = prevPosts.map(post =>
        post.id === postId
          ? { ...post, isFollowing: !post.isFollowing }
          : post
      );
      setFilteredPosts(filteredPosts =>
        filteredPosts.map(post =>
          post.id === postId
            ? { ...post, isFollowing: !post.isFollowing }
            : post
        )
      );
      return updatedPosts;
    });
  };

  // Handle search
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredPosts(posts);
      return;
    }
    
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
      post.user.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  // Handle filters
  const handleFiltersApplied = (filters: { styleCategory: any[]; seasonWeather: any[]; occasion: any[]; }) => {
    let filtered = [...posts];

    // Apply style category filters
    if (filters.styleCategory.length > 0) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => 
          filters.styleCategory.some((category: string) => 
            tag.toLowerCase().includes(category.toLowerCase())
          )
        )
      );
    }

    // Apply season/weather filters
    if (filters.seasonWeather.length > 0) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => 
          filters.seasonWeather.some((season: string) => 
            tag.toLowerCase().includes(season.toLowerCase())
          )
        )
      );
    }

    // Apply occasion filters
    if (filters.occasion.length > 0) {
      filtered = filtered.filter(post =>
        post.tags.some(tag => 
          filters.occasion.some((occasion: string) => 
            tag.toLowerCase().includes(occasion.toLowerCase())
          )
        )
      );
    }

    setFilteredPosts(filtered);
  };

  // Filter posts based on following status for the Following tab
  const followingPosts = filteredPosts.filter(post => post.isFollowing);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop:16, }}>
      <HeaderWithLogo 
        onMenuPress={() => setSidebarVisible(true)}
        onNotificationPress={() => {
          router.push('/pages/notification');
        }}
        notificationCount={4}
      />
      <MobileSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        userData={userData}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Discover</Text>
        <SearchBox 
          onSearch={handleSearch}
          onFiltersApplied={handleFiltersApplied}
        />
        <View style={styles.tabsRow}>
          <TouchableOpacity onPress={() => setActiveTab('Trending')} style={[styles.tabBtn, activeTab === 'Trending' && styles.tabBtnActive]}>
            <Text style={[styles.tabText, activeTab === 'Trending' && styles.tabTextActive]}>Trending styles for you</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Following')} style={[styles.tabBtn, activeTab === 'Following' && styles.tabBtnActive]}>
            <Text style={[styles.tabText, activeTab === 'Following' && styles.tabTextActive]}>Following</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 15 }}>
          {activeTab === 'Trending' ? (
            filteredPosts.map(post => (
              <TouchableOpacity
                key={post.id}
                activeOpacity={0.85}
                onPress={() => router.push(`/discover/postId=${post.id}`)}
              >
                <DiscoverCard 
                  post={post} 
                  onFollowToggle={() => handleFollowToggle(post.id)}
                />
              </TouchableOpacity>
            ))
          ) : (
            filteredPosts.filter(post => post.isFollowing).length > 0 ? (
              filteredPosts.filter(post => post.isFollowing).map(post => (
                <TouchableOpacity
                  key={post.id}
                  activeOpacity={0.85}
                  onPress={() => router.push(`/discover/postId=${post.id}`)}
                >
                  <DiscoverCard 
                    post={post} 
                    onFollowToggle={() => handleFollowToggle(post.id)}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ textAlign: 'center', color: '#888', marginTop: 32 }}>
                No posts yet. Follow some users to see their posts here!
              </Text>
            )
          )}
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
    color: '#515978',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  tabTextActive: {
    color: '#030318',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
});

export default Discover;