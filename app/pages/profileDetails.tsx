import Header from "@/components/Header";
import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path, Rect } from "react-native-svg";

const { width } = Dimensions.get("window");
const imageWidth = (width - 60) / 2;

type User = {
  id: string;
  name: string;
  username: string;
  avatar: any;
  posts: number;
  followers: string;
  following: number;
  isFollowing: boolean;
  outfits: { id: string; image: any }[];
  likedOutfits: { id: string; image: any }[];
};

const mockUsers: { [key: string]: User } = {
  stevee: {
    id: "stevee",
    name: "Stevee_",
    username: "@Stevee_",
    avatar: require("@/assets/images/profileImgs/bohemian-female.png"),
    posts: 127,
    followers: "1.2K",
    following: 465,
    isFollowing: true,
    outfits: [
      {
        id: "1",
        image: require("@/assets/images/profileImgs/businesscasual-female.png"),
      },
      {
        id: "2",
        image: require("@/assets/images/profileImgs/casual-female.png"),
      },
      {
        id: "3",
        image: require("@/assets/images/profileImgs/formal-female.png"),
      },
      {
        id: "4",
        image: require("@/assets/images/profileImgs/minimal-female.png"),
      },
      {
        id: "5",
        image: require("@/assets/images/profileImgs/streetwear-female.png"),
      },
      {
        id: "6",
        image: require("@/assets/images/profileImgs/vintage-female.png"),
      },
      {
        id: "7",
        image: require("@/assets/images/profileImgs/formal-female.png"),
      },
      {
        id: "8",
        image: require("@/assets/images/profileImgs/street-female.png"),
      },
    ],
    likedOutfits: [
      {
        id: "l1",
        image: require("@/assets/images/profileImgs/formal-female.png"),
      },
      {
        id: "l2",
        image: require("@/assets/images/profileImgs/street-female.png"),
      },
    ],
  },
};

// Add this helper for navigation to try-on page
const goToTryOn = (outfitId: string) => {
  router.push({
    pathname: "/pages/mylookDetails",
    params: { outfitId },
  });
};

const ProfileDetails = () => {
  const { userId } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Outfits");
  const [isFollowing, setIsFollowing] = useState(true);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const user = mockUsers[userId as string] || mockUsers["stevee"];

  const handleGoBack = () => {
    router.back();
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const scrollOffset = event.nativeEvent.contentOffset.y;
        // Show sticky header when scrolled past the profile section (approximately 200px)
        setShowStickyHeader(scrollOffset > 200);
      },
    }
  );

  const renderOutfitGrid = (outfits: any[]) => {
    return (
      <View style={styles.outfitsGrid}>
        {outfits.map((outfit, index) => (
          <TouchableOpacity
            key={outfit.id}
            style={styles.outfitItem}
            activeOpacity={0.8}
            onPress={() => {
              goToTryOn(outfit.id);
            }}
          >
            <Image
              source={outfit.image}
              style={styles.outfitImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Sticky Header - appears on scroll */}
      {showStickyHeader && (
        <Animated.View style={styles.stickyHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            <TouchableOpacity style={[styles.backButton]} onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.stickyHeaderTitleLeft}>{user.name}</Text>
          </View>
          <TouchableOpacity style={styles.followedButton}>
            <Svg width={32} height={32} viewBox="0 0 25 24" fill="none">
              <Rect width={24} height={24} x={0.146484} y={0} fill="none" />
              <Path
                d="M12.1948 5.8335C14.0455 5.8335 15.5458 7.33383 15.5458 9.1845C15.5458 10.3877 14.9118 11.4426 13.9597 12.0336C14.7617 12.2761 15.5049 12.6819 16.1424 13.2255C16.1881 13.2644 16.2257 13.3119 16.253 13.3654C16.2804 13.4188 16.2969 13.4771 16.3017 13.5369C16.3065 13.5967 16.2995 13.6569 16.281 13.714C16.2626 13.7711 16.233 13.824 16.1941 13.8697C16.1552 13.9154 16.1077 13.953 16.0543 13.9804C16.0008 14.0077 15.9426 14.0242 15.8827 14.029C15.8229 14.0338 15.7627 14.0268 15.7056 14.0083C15.6485 13.9899 15.5956 13.9604 15.5499 13.9215C14.6144 13.1233 13.4245 12.6858 12.1948 12.6878C9.50058 12.6878 7.26211 14.7537 7.03485 17.4204C7.02332 17.5401 6.96501 17.6505 6.8726 17.7275C6.78018 17.8046 6.66112 17.8421 6.54124 17.8318C6.42136 17.8216 6.31034 17.7646 6.23228 17.673C6.15422 17.5815 6.11542 17.4628 6.12429 17.3428C6.34013 14.8107 8.0956 12.7398 10.4303 12.0338C9.47819 11.4431 8.84379 10.3878 8.84379 9.1845C8.84379 7.33383 10.3441 5.8335 12.1948 5.8335ZM18.1344 14.7924L18.1497 14.8069C18.1919 14.8467 18.2256 14.8947 18.2486 14.948C18.2716 15.0013 18.2835 15.0588 18.2835 15.1168C18.2835 15.1749 18.2716 15.2324 18.2486 15.2857C18.2256 15.339 18.1919 15.387 18.1497 15.4268L15.8326 17.6111C15.745 17.6938 15.6281 17.7385 15.5076 17.7354C15.387 17.7386 15.2701 17.6939 15.1824 17.6111L13.8517 16.3567C13.8095 16.3169 13.7758 16.2689 13.7528 16.2156C13.7298 16.1623 13.7179 16.1048 13.7179 16.0468C13.7179 15.9887 13.7298 15.9312 13.7528 15.8779C13.7758 15.8246 13.8095 15.7766 13.8517 15.7368L13.8671 15.7223C13.9519 15.6424 14.064 15.5978 14.1806 15.5978C14.2971 15.5978 14.4092 15.6424 14.494 15.7223L15.5076 16.6777L17.5075 14.7924C17.5923 14.7125 17.7044 14.6679 17.821 14.6679C17.9375 14.6679 18.0497 14.7125 18.1344 14.7924ZM12.1948 6.74741C10.8488 6.74741 9.7577 7.83846 9.7577 9.1845C9.7577 10.5305 10.8488 11.6216 12.1948 11.6216C13.5408 11.6216 14.6319 10.5305 14.6319 9.1845C14.6319 7.83846 13.5408 6.74741 12.1948 6.74741Z"
                fill="#202020"
              />
            </Svg>
          </TouchableOpacity>
        </Animated.View>
      )}

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* Original Header */}
        <Header title="Profile Details" />

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.profileInfo}>
              <Image source={user.avatar} style={styles.profileAvatar} />
              <View style={styles.profileText}>
                <Text style={styles.profileName}>{user.name}</Text>
                <Text style={styles.profileUsername}>{user.username}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.followButton,
                isFollowing && styles.followingButton,
              ]}
              onPress={handleFollowToggle}
            >
              <Text
                style={[
                  styles.followButtonText,
                  isFollowing && styles.followingButtonText,
                ]}
              >
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Tabs Section */}
          <View style={styles.tabsSection}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "Outfits" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("Outfits")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "Outfits" && styles.activeTabButtonText,
                ]}
              >
                Outfits
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "Likes" && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab("Likes")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "Likes" && styles.activeTabButtonText,
                ]}
              >
                Likes
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {activeTab === "Outfits"
            ? renderOutfitGrid(user.outfits)
            : renderOutfitGrid(user.likedOutfits)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
  },
  scrollView: {
    flex: 1,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  stickyHeaderTitleLeft: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
    textAlign: "left",
    marginLeft: 12,
    flex: 1,
  },

  followedButton:{
    borderWidth:1,
    borderColor: "#D9D9D9",
    borderRadius: 100,
  },

  backButton: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 500,
  },
  searchButton: {
    padding: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 24,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 100,
    marginRight: 16,
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: "#8288A0",
  },
  followButton: {
    backgroundColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  followingButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
  },
  followButtonText: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#FFFFFF",
  },
  followingButtonText: {
    color: "#000",
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    // marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: "#8288A0",
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#E0E0E0",
  },
  tabsSection: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#000",
  },
  tabButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: "#8288A0",
  },
  activeTabButtonText: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  outfitsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  outfitItem: {
    width: imageWidth,
    height: imageWidth * 1.2, // Slightly taller than square
    borderRadius: 16,
    overflow: "hidden",
  },
  outfitImage: {
    width: "100%",
    height: "100%",
  },
});

export default ProfileDetails;
