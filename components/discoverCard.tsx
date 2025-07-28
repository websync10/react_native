import { FontFamily } from "@/constants/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import UnfollowConfirmationModal from './UnfollowConfirmationModal';

export type DiscoverCardProps = {
  post: {
    id: string;
    user: {
      name: string;
      avatar: any;
      followers: any[];
    };
    styleImage: any;
    title: string;
    description: string;
    tags: string[];
    likes: number;
    dislike: number;
    comments: number;
    people: any[];
    isFollowing: boolean;
  };
  onFollowToggle?: () => void;
};

const DiscoverCard: React.FC<DiscoverCardProps> = ({ post, onFollowToggle }) => {

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [isFollowed, setIsFollowed] = useState(post.isFollowing);
  const [showUnfollowModal, setShowUnfollowModal] = useState(false);

  const handleFollowPress = () => {
    setIsFollowed((prev) => !prev);
    // Call the parent callback to update the global state
    if (onFollowToggle) {
      onFollowToggle();
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => {
          router.push("/pages/profileDetails");
        }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={post.user.avatar} style={styles.avatar} />
            <Text style={styles.username}>{post.user.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.followBtn, isFollowed && styles.followBtnFollowing]}
          onPress={() => {
            if (isFollowed) {
              setShowUnfollowModal(true);
            } else {
              setIsFollowed(true);
              if (onFollowToggle) onFollowToggle();
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
        {/* Unfollow Confirmation Modal */}
        {isFollowed && showUnfollowModal && (
          <UnfollowConfirmationModal
            visible={showUnfollowModal}
            onClose={() => setShowUnfollowModal(false)}
            onConfirm={() => {
              setIsFollowed(false);
              setShowUnfollowModal(false);
              if (onFollowToggle) onFollowToggle();
            }}
            user={{
              name: post.user.name,
              avatar: post.user.avatar,
            }}
          />
        )}
      </View>
      <Image
        source={post.styleImage}
        style={styles.postImage}
        resizeMode="cover"
      />
      <View style={styles.cardContent}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postDesc}>{post.description}</Text>
        <View style={styles.tagsRow}>
          {post.tags.map((tag, idx) => (
            <TouchableOpacity key={idx} style={styles.tagBtn} activeOpacity={0.8}>
              <Text style={styles.tagText}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.cardFooter}>
          <View style={styles.statsRow}>
            <TouchableOpacity
              onPress={() => {
                setLiked((l) => !l);
                if (disliked) setDisliked(false);
              }}
              activeOpacity={0.7}
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
                setDisliked((d) => !d);
                if (liked) setLiked(false);
              }}
              activeOpacity={0.7}
              style={{ marginLeft: 8 }}
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
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color="#000"
              style={{ marginLeft: 12 }}
            />
            <Text style={styles.statText}>{post.comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    paddingBottom: 16,
    borderColor: "#e6e7ec",
    borderWidth: 0.5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: "#000000",
    marginRight: 8,
  },
  followersGroup: {
    flexDirection: "row",
    marginLeft: 2,
  },
  followerAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  followBtn: {
    backgroundColor: "#000",
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 6,
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
  postImage: {
    width: "100%",
    height: 180,
    borderRadius: 0,
    marginTop: 12,
    marginBottom: 12,
  },
  cardContent: {
    paddingHorizontal: 14,
  },
  postTitle: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: "#222",
    marginBottom: 4,
  },
  postDesc: {
    fontSize: 14,
    color: "#8288A0",
    fontFamily: FontFamily.HelveticaNeue.Regular,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 13,
    color: "#000",
    marginLeft: 4,
    marginRight: 12,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  tagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  tagBtn: {
    backgroundColor: '#fff',
    borderColor: '#E6E7EC',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingTop:6,
    paddingBottom:6,
  },
  tagText: {
    fontSize: 14,
    color: '#8288A0',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  peopleGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  peopleAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: -8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  peopleBadge: {
    backgroundColor: "#E6007A",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -8,
    shadowColor: "#E6007A",
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  peopleBadgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
});

export default DiscoverCard;