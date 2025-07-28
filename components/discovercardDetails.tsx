import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DiscoverCardDetails = ({ post, onFollow, onTryOn }: {
  post: any;
  onFollow?: () => void;
  onTryOn?: () => void;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={post.user.avatar} style={styles.avatar} />
          <Text style={styles.username}>{post.user.name}</Text>
        </View>
        <TouchableOpacity style={styles.followBtn} onPress={onFollow}>
          <Text style={styles.followBtnText}>Follow</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={post.styleImage} style={styles.postImage} resizeMode="cover" />
        <TouchableOpacity style={styles.tryOnBtn} onPress={onTryOn}>
          <Ionicons name="star" size={20} color="#181A2A" style={{ marginRight: 6 }} />
          <Text style={styles.tryOnText}>Try On Look</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDesc}>{post.description}</Text>
      <View style={styles.tagsRow}>
        {post.tags.map((tag: string, idx: number) => (
          <View key={idx} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.statsRow}>
        <Ionicons name="heart" size={18} color="#181A2A" />
        <Text style={styles.statText}>{post.likes}</Text>
        <Ionicons name="thumbs-down" size={18} color="#181A2A" style={{ marginLeft: 16 }} />
        <Text style={styles.statText}>{post.dislike}</Text>
        <Ionicons name="chatbubble-ellipses-outline" size={18} color="#181A2A" style={{ marginLeft: 16 }} />
        <Text style={styles.statText}>{post.comments}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    margin: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  },
  followBtn: {
    backgroundColor: '#181A2A',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  followBtnText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
  imageWrapper: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: 14,
  },
  tryOnBtn: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -80 }],
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingHorizontal: 24,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  tryOnText: {
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#181A2A',
  },
  postTitle: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#222',
    marginBottom: 4,
    marginTop: 8,
  },
  postDesc: {
    fontSize: 14,
    color: '#888',
    fontFamily: FontFamily.HelveticaNeue.Medium,
    marginBottom: 8,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tagBadge: {
    backgroundColor: '#F6F7F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    color: '#515978',
    fontSize: 13,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statText: {
    fontSize: 13,
    color: '#888',
    marginLeft: 4,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
});

export default DiscoverCardDetails;
