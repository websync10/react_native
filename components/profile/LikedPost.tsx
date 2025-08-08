import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

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
    const renderItem = ({ item }: { item: LikedPost }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.date}>{new Date(item.created_at).toLocaleDateString()}</Text>
        </View>
    );

    return (
        <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={renderItem}
        />
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
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
