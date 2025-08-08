
import Header from '@/components/Header';
import LikedPostsList from '@/components/profile/LikedPost';
import { FontFamily } from '@/constants/Fonts';
import { getProfile } from '@/lib/actions/users/getProfile';
import { getLikedPosts } from '@/lib/actions/users/post/getLikePosts';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Post } from '@/lib/types/posts';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import React, {
  useEffect,
  useState
} from 'react';
import {
  Dimensions,
  Image,
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
  image_url: string;
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
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(userId);
      if (!data) {
        console.error("Failed to load profile");
      } else {
        console.log("user data: ", data)
        setMyProfileData(data[0]);
      }
    };

    const fetchLikedPosts = async () => {
      const res = await getLikedPosts(userId);
      if (res?.success && res.data) {
        setLikedPosts(res.data);
      } else {
        console.error("Failed to fetch liked posts");
      }
    };


    if (userId) {
      fetchProfile();
      fetchLikedPosts()
    }
  }, [userId]);

  const renderOutfitGrid = (outfits: any[]) => (
    <View style={styles.outfitsGrid}>
      {outfits.map((outfit) => (
        <View key={outfit.id} style={styles.outfitItem}>
          <Image source={outfit.image} style={styles.outfitImage} resizeMode="cover" />
        </View>
      ))}
    </View>
  );

  if (!myProfileData) {
    return <Text>helloworld...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <TouchableOpacity
              onPress={() => {
                try {
                  router.push("/pages/createPost");
                } catch (err) {
                  console.error("Navigation failed:", err);
                }
              }}
              style={{ top: 35, right: 60, backgroundColor: "white", borderRadius: "50%" }}
            >
              <Plus />
            </TouchableOpacity>
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
              {/* Posts count fallback to 0 */}
              <Text style={styles.statNumber}>{myProfileData?.posts ?? 0}</Text>
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
            : <LikedPostsList posts={likedPosts} />}
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
