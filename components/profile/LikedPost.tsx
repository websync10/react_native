import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LikedPost {
    id: string;
    title: string;
    image: string;
    created_at: string;
}

interface Props {
    posts: LikedPost[];
}

const LikedPostsList: React.FC<Props> = ({ posts }) => {
    const handlePostPress = (post: LikedPost) => {
        if (post.image) {
            router.push({
                pathname: '/pages/tryLookPage',
                params: { outfitImage: post.image }
            });
        }
    };

    const renderItem = (item: LikedPost, index: number) => (
        <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => handlePostPress(item)}
        >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {posts.map((item, index) => renderItem(item, index))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        marginBottom: 16,
        backgroundColor: '#f8f8f8',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 160,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginHorizontal: 8,
        marginTop: 6,
        color: '#333',
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginHorizontal: 8,
        marginBottom: 8,
    },
});

export default LikedPostsList;
