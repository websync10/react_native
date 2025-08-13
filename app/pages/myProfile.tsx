
import Header from '@/components/Header';
import LikedPostsList from '@/components/profile/LikedPost';
import { FontFamily } from '@/constants/Fonts';
import { getProfile } from '@/lib/actions/users/getProfile';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Post } from '@/lib/types/posts';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');
const imageWidth = (width - 60) / 2;

export type Outfit = {
  id: string;
  user_id: string;
  image: string;
  created_at: string;
};



export type MyProfileData = {
  id: string;
  name: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  outfits: Outfit[] | null;
  posts: number,
  liked_outfits: Post[] | null;
  followers_count: number;
  following_count: number;
};

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState('Outfits');
  const { userId } = useOnboardingStore()
  const [myProfileData, setMyProfileData] = useState<MyProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getProfile(userId);
        if (!data) {
          console.error("Failed to load profile");
        } else {
          setMyProfileData(data[0]);
          console.log("Profile data: ", JSON.stringify(data[0], null, 2))
          console.log("Outfits count: ", data[0]?.outfits?.length ?? 0)
          console.log("Liked outfits count: ", data[0]?.liked_outfits?.length ?? 0)
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  // Refresh profile data when screen comes into focus (e.g., after creating a post)
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        const refreshProfile = async () => {
          try {
            const data = await getProfile(userId);
            if (data) {
              const previousCount = myProfileData?.outfits?.length || 0;
              const newCount = data[0]?.outfits?.length || 0;
              
              setMyProfileData(data[0]);
              
              // Show success message if a new post was created
              if (newCount > previousCount) {
                setShowSuccessMessage(true);
                setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
              }
            }
          } catch (error) {
            console.error("Error refreshing profile:", error);
          }
        };
        refreshProfile();
      }
    }, [userId, myProfileData?.outfits?.length])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await getProfile(userId);
      if (data) {
        setMyProfileData(data[0]);
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

  const renderOutfitGrid = (outfits: Outfit[]) => {
    console.log("Rendering outfits grid with:", outfits?.length ?? 0, "outfits")
    console.log("Outfits data:", outfits)
    
    outfits?.forEach((outfit, index) => {
      console.log(`Outfit ${index}:`, {
        id: outfit.id,
        image_url: outfit.image,
        hasImageUrl: !!outfit.image,
        imageUrlLength: outfit.image?.length
      });
    });
    
    if (!outfits || outfits.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No outfits yet</Text>
          <Text style={styles.emptyStateSubtext}>Create your first outfit to get started!</Text>
        </View>
      );
    }

    return (
      <View style={styles.outfitsGrid}>
        {outfits.map((outfit) => (
          <TouchableOpacity
            key={outfit.id}
            style={styles.outfitItem}
            activeOpacity={0.8}
            onPress={() => {
              if (outfit.image) {
                router.push({
                  pathname: '/pages/tryLookPage',
                  params: { outfitImage: outfit.image }
                });
              }
            }}
          >
            <Image
              source={outfit.image ? { uri: outfit.image } : require('../../assets/images/logo.png')}
              style={styles.outfitImage}
              resizeMode="cover"
              onError={(error) => {
                console.log("Image load error for outfit:", outfit.id, "URL:", outfit.image, "Error:", error.nativeEvent.error);
              }}
              onLoad={() => {
                console.log("Image loaded successfully for outfit:", outfit.id, "URL:", outfit.image);
              }}
            />
            {!outfit.image && (
              <View style={styles.noImageOverlay}>
                <Text style={styles.noImageText}>No Image</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Profile" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!myProfileData) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Profile" />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={[styles.container, { paddingTop: 32 }]}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <Header title="Profile" />
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={
                myProfileData?.avatar_url
                  ? { uri: myProfileData.avatar_url }
                  : require('../../assets/images/logo.png')
              }
              style={styles.profileAvatar}
            />
            <View style={styles.profileText}>
              <Text style={styles.profileName}>{myProfileData?.name ?? 'No Name'}</Text>
              <Text style={styles.profileUsername}>{myProfileData?.username ?? '@unknown'}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push('/pages/editProfile');
              }}
              style={styles.editProfileButton}
            >
              <Text style={styles.editProfileText}>Edit profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{myProfileData?.outfits?.length ?? 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{myProfileData?.followers_count ?? 0}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{myProfileData?.following_count ?? 0}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.createPostButton}
            onPress={() => router.push('/pages/createPost')}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle" size={20} color="#FFFFFF" />
            <Text style={styles.createPostButtonText}>Create New Post</Text>
          </TouchableOpacity>

          <View style={styles.tabsSection}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Outfits' && styles.activeTabButton]}
              onPress={() => setActiveTab('Outfits')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'Outfits' && styles.activeTabButtonText]}>
                Outfits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'Likes' && styles.activeTabButton]}
              onPress={() => setActiveTab('Likes')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'Likes' && styles.activeTabButtonText]}>
                Likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentSection}>
          {activeTab === 'Outfits'
            ? renderOutfitGrid(myProfileData?.outfits ?? [])
            : <LikedPostsList posts={myProfileData?.liked_outfits ?? []} />}
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: '#fff',
  },
  outfitImage: {
    width: '100%',
    height: '100%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 20,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#FF6B6B',
  },
  debugInfo: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 12,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#666',
    marginBottom: 2,
  },
  createLookButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createLookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  noImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  devResetButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 16,
  },
  devResetButtonText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  createPostButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  createPostButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginLeft: 8,
  },
  postCountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  postCountText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  successMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2F7',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
  successMessageText: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#10B981',
    marginLeft: 8,
  },
  statIndicator: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E0F2F7',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default MyProfile;
