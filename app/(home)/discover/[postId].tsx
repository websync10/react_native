import Header from "@/components/Header";
import MobileSidebar from "@/components/home/Sidebar";
import UnfollowConfirmationModal from "@/components/UnfollowConfirmationModal";
import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Path } from "react-native-svg";

type Post = {
  id: string;
  user: {
    name: string;
    avatar: any;
  };
  styleImage: any;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  dislike: number;
  comments: number;
};

const mockPosts: { [key: string]: Post } = {
  "1": {
    id: "1",
    user: {
      name: "Jacklaw_",
      avatar: require("@/assets/images/styles/businesscasual-male.png"),
    },
    styleImage: require("@/assets/images/styles/streetwear-male.png"),
    title: "Stylish Urban Fashion",
    description: "Simply dummy text of the printing and typesetting industry.",
    tags: ["#Summer", "#Casual", "#Urban"],
    likes: 120,
    dislike: 17,
    comments: 0,
  },
  "2": {
    id: "2",
    user: {
      name: "Stevee_",
      avatar: require("@/assets/images/styles/bohemian-female.png"),
    },
    styleImage: require("@/assets/images/styles/casual-female.png"),
    title: "Stylish Woman in Urban Setting",
    description: "Simply dummy text of the printing and typesetting industry.",
    tags: ["#Woman", "#Urban", "#Casual"],
    likes: 90,
    dislike: 2,
    comments: 12,
  },
};

const DiscoverPostDetail = () => {
  const { postId } = useLocalSearchParams();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);

  // Get post data based on postId
  const post = mockPosts[postId as string] || mockPosts["1"];
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const userData = {
    id: 'user1',
    name: 'Jacklaw_',
    fullName: 'Jack Law',
    avatar: require('@/assets/images/styles/businesscasual-male.png'),
    profileImage: require('@/assets/images/styles/businesscasual-male.png'),
    followers: [require('@/assets/images/styles/bohemian-female.png'), require('@/assets/images/styles/businesscasual-male.png')],
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Header
            title=""
          />
          <MobileSidebar
            visible={sidebarVisible}
            onClose={() => setSidebarVisible(false)}
            userData={userData}
          />
        </View>

        {/* User Info and Follow Button */}
        <View style={styles.userSection}>
          <TouchableOpacity onPress={() => { router.push('./pages/profileDetails') }} >
            <View style={styles.userInfo}>
              <Image source={post.user.avatar} style={styles.avatar} />
              <Text style={styles.username}>{post.user.name}</Text>
            </View></TouchableOpacity>
          <TouchableOpacity
            style={[styles.followBtn, isFollowed && styles.followBtnFollowing]}
            onPress={() => {
              if (isFollowed) {
                setShowUnfollowModal(true);
              } else {
                setIsFollowed(true);
              }
            }}
          >
            <Text
              style={[
                styles.followBtnText,
                isFollowed && styles.followBtnTextFollowing,
              ]}
            >
              {isFollowed ? "Following" : "Follow"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* Unfollow Confirmation Modal */}
        {isFollowed && showUnfollowModal && (
          <UnfollowConfirmationModal
            visible={showUnfollowModal}
            onClose={() => setShowUnfollowModal(false)}
            onConfirm={() => {
              setIsFollowed(false);
              setShowUnfollowModal(false);
            }} user={{
              name: "",
              avatar: undefined
            }} />
        )}

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={post.styleImage}
            style={styles.mainImage}
            resizeMode="cover"
          />

          {/* Try On Look Button */}
          <TouchableOpacity
            style={styles.tryOnButton}
            onPress={() => {
              router.push("/pages/tryLookPage");
            }}
          >
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path
                d="M13.6603 21.1438C14.5575 16.9657 17.8212 13.702 21.9993 12.8048C17.8212 11.9076 14.5575 8.64387 13.6603 4.46578C12.7631 8.64387 9.49938 11.9076 5.32129 12.8048C9.49938 13.702 12.7631 16.9657 13.6603 21.1438Z"
                fill="black"
              />
              <Path
                d="M5.32294 9.50195C5.68045 7.83707 6.98098 6.53653 8.64587 6.17902C6.98099 5.8215 5.68045 4.52097 5.32294 2.85608C4.96542 4.52097 3.66489 5.8215 2 6.17902C3.66489 6.53653 4.96542 7.83707 5.32294 9.50195Z"
                fill="black"
              />
            </Svg>
            <Text style={styles.tryOnText}>Try On Look</Text>
          </TouchableOpacity>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postDescription}>{post.description}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {post.tags.map(
              (
                tag:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<
                    unknown,
                    string | React.JSXElementConstructor<any>
                  >
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactPortal
                    | React.ReactElement<
                      unknown,
                      string | React.JSXElementConstructor<any>
                    >
                    | Iterable<React.ReactNode>
                    | null
                    | undefined
                  >
                  | null
                  | undefined,
                index: React.Key | null | undefined
              ) => (
                <TouchableOpacity key={index} style={styles.tagBtn}>
                  <Text style={styles.tagText}>{tag}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              onPress={() => {
                setLiked(!liked);
                if (disliked) setDisliked(false);
              }}
              activeOpacity={0.7}
              style={styles.statButton}
            >
              {liked ? (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7111 21H15.8769C17.7124 21 19.3123 19.7508 19.7575 17.9701L21.3788 11.4851C21.6943 10.2228 20.7396 9 19.4385 9H14.5L15.8069 6.75968C16.7791 5.09303 15.5769 3 13.6474 3H12.5L8.63178 9.76943C8.54543 9.92052 8.50002 10.0915 8.50002 10.2656V18.4648C8.50002 18.7992 8.66712 19.1114 8.94532 19.2969L10.4923 20.3282C11.1494 20.7662 11.9214 21 12.7111 21ZM4 9H5C6.10457 9 7 9.89543 7 11V18C7 19.1046 6.10457 20 5 20H4C2.89543 20 2 19.1046 2 18V11C2 9.89543 2.89543 9 4 9Z"
                    fill="#000000"
                  />
                </Svg>
              ) : (
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M6 8H4C2.89543 8 2 8.89543 2 10V19C2 20.1046 2.89543 21 4 21H6C7.10457 21 8 20.1046 8 19V10C8 8.89543 7.10457 8 6 8Z"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M15.8769 21H12.2111C11.4214 21 10.6494 20.7662 9.9923 20.3282L8.4453 19.2969C8.1671 19.1114 8 18.7992 8 18.4648V10.2656C8 10.0915 8.04541 9.92052 8.13176 9.76943L12 3H13.3287C15.3254 3 16.5164 5.22536 15.4088 6.88675L14 9H19.4384C20.7396 9 21.6943 10.2228 21.3787 11.4851L19.7575 17.9701C19.3123 19.7508 17.7124 21 15.8769 21Z"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </TouchableOpacity>
            <Text style={styles.statText}>{post.likes}</Text>

            <TouchableOpacity
              onPress={() => {
                setDisliked(!disliked);
                if (liked) setLiked(false);
              }}
              activeOpacity={0.7}
              style={[styles.statButton, { marginLeft: 16 }]}
            >
              {disliked ? (
                <Svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ transform: [{ scaleX: -1 }, { rotate: "180deg" }] }}
                >
                  <Path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7111 21H15.8769C17.7124 21 19.3123 19.7508 19.7575 17.9701L21.3788 11.4851C21.6943 10.2228 20.7396 9 19.4385 9H14.5L15.8069 6.75968C16.7791 5.09303 15.5769 3 13.6474 3H12.5L8.63178 9.76943C8.54543 9.92052 8.50002 10.0915 8.50002 10.2656V18.4648C8.50002 18.7992 8.66712 19.1114 8.94532 19.2969L10.4923 20.3282C11.1494 20.7662 11.9214 21 12.7111 21ZM4 9H5C6.10457 9 7 9.89543 7 11V18C7 19.1046 6.10457 20 5 20H4C2.89543 20 2 19.1046 2 18V11C2 9.89543 2.89543 9 4 9Z"
                    fill="#000000"
                  />
                </Svg>
              ) : (
                <Svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ transform: [{ scaleX: -1 }, { rotate: "180deg" }] }}
                >
                  <Path
                    d="M6 8H4C2.89543 8 2 8.89543 2 10V19C2 20.1046 2.89543 21 4 21H6C7.10457 21 8 20.1046 8 19V10C8 8.89543 7.10457 8 6 8Z"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <Path
                    d="M15.8769 21H12.2111C11.4214 21 10.6494 20.7662 9.9923 20.3282L8.4453 19.2969C8.1671 19.1114 8 18.7992 8 18.4648V10.2656C8 10.0915 8.04541 9.92052 8.13176 9.76943L12 3H13.3287C15.3254 3 16.5164 5.22536 15.4088 6.88675L14 9H19.4384C20.7396 9 21.6943 10.2228 21.3787 11.4851L19.7575 17.9701C19.3123 19.7508 17.7124 21 15.8769 21Z"
                    stroke="#000"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>
              )}
            </TouchableOpacity>
            <Text style={styles.statText}>{post.dislike}</Text>

            <TouchableOpacity style={[styles.statButton, { marginLeft: 16 }]}>
              <Ionicons name="chatbubble-outline" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.statText}>{post.comments}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F7F9",
    justifyContent: "center",
    alignItems: "center",
  },
  userSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
  },
  followBtn: {
    backgroundColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  followBtnFollowing: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#000",
  },
  followBtnText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  followBtnTextFollowing: {
    color: "#000",
  },
  imageContainer: {
    position: "relative",
    marginHorizontal: 20,
    marginBottom: 20,
    // borderRadius: 12,
    overflow: "hidden",
  },
  mainImage: {
    width: "100%",
    height: 400,
    // borderRadius: 12,
  },
  tryOnButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -75 }],
    backgroundColor: "#fff",
    borderRadius: 50,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  tryOnIcon: {
    marginRight: 8,
  },
  tryOnText: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
  },
  contentSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  postTitle: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#000",
    marginBottom: 8,
  },
  postDescription: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: "#8288A0",
    lineHeight: 20,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tagBtn: {
    backgroundColor: '#fff',
    borderColor: '#E6E7EC',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  tagText: {
    fontSize: 14,
    color: '#8288A0',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statButton: {
    marginRight: 8,
  },
  statText: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: "#000",
    marginRight: 16,
  },
});

export default DiscoverPostDetail;
