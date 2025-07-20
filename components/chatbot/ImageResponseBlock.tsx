import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const mockRecommendations = [
    {
        id: '1',
        image:
            'https://images.unsplash.com/photo-1600180758890-6c861b4b8d53?fit=crop&w=600&q=80',
        label: 'Try Now',
    },
    {
        id: '2',
        image:
            'https://images.unsplash.com/photo-1618354691211-e09c6d556c6e?fit=crop&w=600&q=80',
        label: 'Try Now',
    },
    {
        id: '3',
        image:
            'https://images.unsplash.com/photo-1581009146145-b5efdb50a62b?fit=crop&w=600&q=80',
        label: 'Try Now',
    },
];

const ImageResponseBlock = () => {
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={mockRecommendations}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.scrollContent}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.regenerate}>
                <Text style={styles.regenerateIcon}>🔄</Text>
                <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12,
        paddingLeft: 16,
        backgroundColor: '#fff',
    },
    scrollContent: {
        gap: 12,
    },
    card: {
        width: 140,
        height: 180,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    image: {
        width: '100%',
        height: 140,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: '#333',
        fontWeight: '600',
    },
    regenerate: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14,
        paddingHorizontal: 4,
    },
    regenerateIcon: {
        fontSize: 18,
        marginRight: 6,
    },
    regenerateText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#555',
    },
});

export default ImageResponseBlock;
