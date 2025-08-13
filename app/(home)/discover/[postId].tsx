import Header from "@/components/Header";
import UnfollowConfirmationModal from "@/components/UnfollowConfirmationModal";
import { FontFamily } from "@/constants/Fonts";
import { getPostById } from "@/lib/actions/users/post/getPostById";
import {
  dislikePost,
  hasUserDislikedPost,
  hasUserLikedPost,
  likePost,
  undislikePost,
  unlikePost
} from "@/lib/actions/users/post/postInteractions";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types/posts";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Svg, { Path } from "react-native-svg";

const DiscoverPostDetail = () => {
  const params = useLocalSearchParams();
  const postId = params.postId as string;
  const showCommentsParam = params.showComments as string;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);
  const { userId } = useOnboardingStore();
  const currentUserId = userId;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);


  const [likesCount, setLikesCount] = useState<number>(
    Array.isArray(post?.likes) ? post.likes.length : typeof post?.likes === 'number' ? post.likes : 0
  );
  const [dislikesCount, setDislikesCount] = useState<number>(
    Array.isArray(post?.disLikes) ? post.disLikes.length : typeof post?.disLikes === 'number' ? post.disLikes : 0
  );
  const isCurrentUserPost = post?.user?.id === currentUserId;

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

  useEffect(() => {
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

  useEffect(() => {
    if (showCommentsParam === 'true') {
      setShowComments(true);
      fetchComments();
    }
  }, [showCommentsParam]);

  useFocusEffect(
    React.useCallback(() => {
      if (postId && currentUserId) {
        fetchPost();
      }
    }, [postId, currentUserId])
  );

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          id,
          comment,
          created_at,
          user_id,
          users:user_id (
            id,
            full_name,
            avatar_url
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setComments(data as any || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoadingComments(false);
    }
  };

  const submitComment = async () => {
    if (!newComment.trim() || !userId || submittingComment) return;

    setSubmittingComment(true);
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .insert({
          post_id: postId,
          user_id: userId,
          comment: newComment.trim()
        })
        .select(`
          id,
          comment,
          created_at,
          user_id,
          users:user_id(
            id,
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) throw error;

      setComments(prev => [data, ...prev]);
      setNewComment('');

      if (post) {
        setPost(prev => prev ? { ...prev, comments: [...(prev.comments || []), data] } : null);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      Alert.alert('Error', 'Failed to post comment. Please try again.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleCommentPress = () => {
    setShowComments(true);
    if (comments.length === 0) {
      fetchComments();
    }
  };

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


  const renderComment = ({ item }: { item: any }) => (
    <View style={styles.commentItem}>
      <Image
        source={{ uri: item.users?.avatar_url }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUsername}>{item.users?.full_name}</Text>
          <Text style={styles.commentTime}>{(item.created_at.slice(0, 10))}</Text>
        </View>
        <Text style={styles.commentText}>{item.comment}</Text>
      </View>
    </View>
  );


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

        <View style={styles.userSection}>
          <TouchableOpacity onPress={() => { 
            router.push({
              pathname: '/pages/profileDetails',
              params: { userId: post?.user.id }
            });
          }} >
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

            <TouchableOpacity
              style={[styles.statButton, { marginLeft: 16 }]}
              onPress={handleCommentPress}
              activeOpacity={0.7}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.statText}>{post?.comments.length ?? 0}</Text>
          </View>
        </View>
      </ScrollView>
      <Modal
        visible={showComments}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.commentsContainer}>
          {/* Comments Header */}
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Comments</Text>
            <TouchableOpacity
              onPress={() => setShowComments(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            renderItem={renderComment}
            keyExtractor={(item) => item.id}
            style={styles.commentsList}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyComments}>
                {loadingComments ? (
                  <ActivityIndicator size="large" color="#000" />
                ) : (
                  <>
                    <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
                    <Text style={styles.emptyCommentsText}>No comments yet</Text>
                    <Text style={styles.emptyCommentsSubtext}>Be the first to comment!</Text>
                  </>
                )}
              </View>
            )}
            refreshing={loadingComments}
            onRefresh={fetchComments}
          />

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <Image
              source={{ uri: post?.user?.avatar_url }}
              style={styles.commentInputAvatar}
            />
            <View style={styles.commentInputWrapper}>
              <TextInput
                style={styles.commentInput}
                placeholder="Add a comment..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[
                  styles.commentSubmitButton,
                  (!newComment.trim() || submittingComment) && styles.commentSubmitButtonDisabled
                ]}
                onPress={submitComment}
                disabled={!newComment.trim() || submittingComment}
              >
                {submittingComment ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Ionicons name="send" size={16} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
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
  commentsContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  commentsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  commentItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 8,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  emptyComments: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyCommentsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginTop: 12,
  },
  emptyCommentsSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  commentInputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    marginRight: 8,
  },
  commentSubmitButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentSubmitButtonDisabled: {
    backgroundColor: '#ccc',
  },
});


export default DiscoverPostDetail;
