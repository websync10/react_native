import DiscoverCard from '@/components/discoverCard';
import Header from '@/components/Header';
import SearchBox from '@/components/searchBox';
import { FontFamily } from '@/constants/Fonts';
import { followUser, unfollowUser } from '@/lib/actions/users/follow/handleFollowLogic';
import { getPosts } from '@/lib/actions/users/post/getPost';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Post } from '@/lib/types/posts';

import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const Discover = () => {
  const [activeTab, setActiveTab] = useState<"Trending" | "Following">("Trending");
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const { userId } = useOnboardingStore();
  const currentUserId = userId
  const [followedUserIds, setFollowedUserIds] = useState<Set<string>>(new Set());

  const fetchPosts = async () => {
    try {
      const response = await getPosts(userId);
      if (!response.success) throw new Error("Failed to fetch posts");
      const mappedPosts: Post[] = response.data
      setPosts(mappedPosts ?? []);
      setFilteredPosts(mappedPosts);

      const followedSet = new Set<string>();
      mappedPosts.forEach(post => {
        if (post.isFollowing) followedSet.add(post.user.id);
      });
      setFollowedUserIds(followedSet);

  } catch (err) {
    console.error("Error loading posts:", err);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts();
    }, [userId])
  );

const handleFollowToggle = async (postId: string, targetUserId: string) => {
  const post = posts.find(p => p.id === postId);
  if (!post) return;

  const isNowFollowing = !post.isFollowing;
  
  console.log('Follow toggle:', {
    postId,
    targetUserId,
    currentFollowing: post.isFollowing,
    newFollowing: isNowFollowing,
    totalPostsByUser: posts.filter(p => p.user.id === targetUserId).length
  });

  if (isNowFollowing) {
    await followUser(currentUserId, targetUserId);
    setFollowedUserIds(prev => new Set(prev).add(targetUserId));
  } else {
    await unfollowUser(currentUserId, targetUserId);
    setFollowedUserIds(prev => {
      const updated = new Set(prev);
      updated.delete(targetUserId);
      return updated;
    });
  }

  const updatedPosts = posts.map(post =>
    post.user.id === targetUserId ? { ...post, isFollowing: isNowFollowing } : post
  );
  
  const updatedFilteredPosts = filteredPosts.map(post =>
    post.user.id === targetUserId ? { ...post, isFollowing: isNowFollowing } : post
  );
  
  console.log('Updated posts by user:', {
    targetUserId,
    updatedCount: updatedPosts.filter(p => p.user.id === targetUserId && p.isFollowing === isNowFollowing).length,
    totalPostsByUser: updatedPosts.filter(p => p.user.id === targetUserId).length
  });
  
  setPosts(updatedPosts);
  setFilteredPosts(updatedFilteredPosts);
};


const handleSearch = (query: string) => {
  if (!query.trim()) {
    setFilteredPosts(posts);
    return;
  }

  const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.description.toLowerCase().includes(query.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
    post.user.full_name.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredPosts(filtered);
};

const handleFiltersApplied = (filters: { styleCategory: any[]; seasonWeather: any[]; occasion: any[]; }) => {
  let filtered = [...posts];

  if (filters.styleCategory.length > 0) {
    filtered = filtered.filter(post =>
      post.tags.some(tag =>
        filters.styleCategory.some((category: string) =>
          tag.toLowerCase().includes(category.toLowerCase())
        )
      )
    );
  }

  if (filters.seasonWeather.length > 0) {
    filtered = filtered.filter(post =>
      post.tags.some(tag =>
        filters.seasonWeather.some((season: string) =>
          tag.toLowerCase().includes(season.toLowerCase())
        )
      )
    );
  }

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

return (
  <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 32, }}>
    <Header title='Discover' />
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
            <View key={`${post.id}-${post.likes}-${post.disLikes}-${post.isFollowing}`}>
              <DiscoverCard
                post={post}
                onFollowToggle={() => handleFollowToggle(post.id, post.user.id)}
              />
            </View>
          ))
                  ) : (
            filteredPosts.filter(post => post.isFollowing).length > 0 ? (
              filteredPosts.filter(post => post.isFollowing).map(post => (
                <View key={`${post.id}-${post.likes}-${post.disLikes}-${post.isFollowing}`}>
                  <DiscoverCard
                    post={post}
                    onFollowToggle={() => handleFollowToggle(post.id, post.user.id)}
                  />
                </View>
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