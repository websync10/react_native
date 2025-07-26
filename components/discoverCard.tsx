
import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
    likes: number;
    comments: number;
    people: any[];
    isFollowing: boolean;
  };
};

const DiscoverCard: React.FC<DiscoverCardProps> = ({ post }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={post.user.avatar} style={styles.avatar} />
        <Text style={styles.username}>{post.user.name}</Text>
        <View style={styles.followersGroup}>
          {post.user.followers.map((f, idx) => (
            <Image key={idx} source={f} style={styles.followerAvatar} />
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.followBtn}>
        <Text style={styles.followBtnText}>Follow</Text>
      </TouchableOpacity>
    </View>
    <Image source={post.styleImage} style={styles.postImage} resizeMode="cover" />
    <View style={styles.cardContent}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDesc}>{post.description}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.statsRow}>
          <Ionicons name="heart-outline" size={18} color="#888" />
          <Text style={styles.statText}>{post.likes}</Text>
          <Ionicons name="chatbubble-outline" size={18} color="#888" style={{ marginLeft: 12 }} />
          <Text style={styles.statText}>{post.comments}</Text>
        </View>
        <View style={styles.peopleGroup}>
          {post.people.map((p, idx) => (
            <Image key={idx} source={p} style={styles.peopleAvatar} />
          ))}
          <View style={styles.peopleBadge}><Text style={styles.peopleBadgeText}>P</Text></View>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
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
});

export default DiscoverCard;
