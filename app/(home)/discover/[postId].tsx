import Header from "@/components/Header";
import UnfollowConfirmationModal from "@/components/UnfollowConfirmationModal";
import { FontFamily } from "@/constants/Fonts";
import { getPostById } from "@/lib/actions/users/post/getPostById";
import { dislikePost, hasUserDislikedPost, hasUserLikedPost, likePost, undislikePost, unlikePost } from "@/lib/actions/users/post/postInteractions";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { Post } from "@/lib/types/posts";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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

const DiscoverPostDetail = () => {
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const { userId } = useOnboardingStore();
  const currentUserId = userId;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [likesCount, setLikesCount] = useState<number>(
    Array.isArray(post?.likes) ? post.likes.length : typeof post?.likes === 'number' ? post.likes : 0
  );
  const [dislikesCount, setDislikesCount] = useState<number>(
    Array.isArray(post?.disLikes) ? post.disLikes.length : typeof post?.disLikes === 'number' ? post.disLikes : 0
  );


  const isCurrentUserPost = post?.user?.id === currentUserId;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("postid", postId)
        const res = await getPostById(postId, currentUserId);
        if (!res.success) throw new Error("Post fetch failed");

        const postData = res?.data as Post
        setPost(postData);
        setIsFollowed(postData.isFollowing || false);
      } catch (err) {
        console.error("Error loading post:", err);
      }
    };

    if (postId && currentUserId) fetchPost();
  }, [postId, currentUserId]);


  useEffect(() => {
    const initializeReactionStatus = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const [likedStatus, dislikedStatus] = await Promise.all([
          hasUserLikedPost(postId, userId),
          hasUserDislikedPost(postId, userId)
        ]);

        setLiked(likedStatus);
        setDisliked(dislikedStatus);
      } catch (error) {
        console.error('Failed to initialize reaction status:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeReactionStatus();
  }, [post?.id, userId]);

  const handleLike = async () => {
    if (!userId || loading) return;

    const wasLiked = liked;
    const wasDisliked = disliked;
    const prevLikesCount = likesCount;
    const prevDislikesCount = dislikesCount;

    try {
      if (liked) {
        setLiked(false);
        setLikesCount(prev => prev - 1);
        await unlikePost(postId, userId);
      } else {
        setLiked(true);
        setLikesCount(prev => prev + 1);

        if (disliked) {
          setDisliked(false);
          setDislikesCount(prev => prev - 1);
          await undislikePost(postId, userId);
        }

        await likePost(postId, userId);
      }
    } catch (error) {
      setLiked(wasLiked);
      setDisliked(wasDisliked);
      setLikesCount(prevLikesCount);
      setDislikesCount(prevDislikesCount);
      console.error('Error handling like:', error);
    }
  };

  useEffect(() => {
    if (post) {
      setLikesCount(Array.isArray(post.likes) ? post.likes.length : typeof post.likes === 'number' ? post.likes : 0);
      setDislikesCount(Array.isArray(post.disLikes) ? post.disLikes.length : typeof post.disLikes === 'number' ? post.disLikes : 0);
    }
  }, [post]);


  const handleDislike = async () => {
    if (!userId || loading) return;

    const wasLiked = liked;
    const wasDisliked = disliked;
    const prevLikesCount = likesCount;
    const prevDislikesCount = dislikesCount;

    try {
      if (disliked) {
        setDisliked(false);
        setDislikesCount(prev => prev - 1);
        await undislikePost(postId, userId);
      } else {
        setDisliked(true);
        setDislikesCount(prev => prev + 1);

        if (liked) {
          setLiked(false);
          setLikesCount(prev => prev - 1);
          await unlikePost(postId, userId);
        }

        await dislikePost(postId, userId);
      }
    } catch (error) {
      setLiked(wasLiked);
      setDisliked(wasDisliked);
      setLikesCount(prevLikesCount);
      setDislikesCount(prevDislikesCount);

      console.error('Error handling dislike:', error);
    }
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
            title="Discover Looks"
          />
        </View>

        {/* User Info and Follow Button */}
        <View style={styles.userSection}>
          <TouchableOpacity onPress={() => { router.push('./pages/profileDetails') }} >
            <View style={styles.userInfo}>
              <Image source={{ uri: post?.user.avatar_url }} style={styles.avatar} />
              <Text style={styles.username}>{post?.user.full_name}</Text>
            </View></TouchableOpacity>
          {
            !isCurrentUserPost && (
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
            )
          }
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
              name: post?.user.full_name ?? "",
              avatar: post?.user.avatar_url
            }} />
        )}

        {/* Main Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: post?.image }}
            style={styles.mainImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.tryOnButton}
            onPress={() => {
              router.push({
                pathname: "/pages/tryLookPage",
                params: { outfitImage: post?.image }
              });
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
          <Text style={styles.postTitle}>{post?.title}</Text>
          <Text style={styles.postDescription}>{post?.description}</Text>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {post?.tags.map(
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
                  <Text style={styles.tagText}>#{tag}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <TouchableOpacity
              onPress={handleLike}
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
            <Text style={styles.statText}>{likesCount}</Text>

            <TouchableOpacity
              onPress={handleDislike}
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
                     fill="#FF3B30"
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
            <Text style={styles.statText}>{dislikesCount}</Text>

            <TouchableOpacity style={[styles.statButton, { marginLeft: 16 }]}>
              <Ionicons name="chatbubble-outline" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.statText}>{post?.comments.length ?? 0}</Text>
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
