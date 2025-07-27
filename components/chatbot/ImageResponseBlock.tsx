import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
    images: string[];
    onRegenerate?: () => void;
};

const ImageResponseBlock: React.FC<Props> = ({ images, onRegenerate }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const recommendations = images.map((url, index) => ({
        id: index.toString(),
        image: url,
        label: 'Try Now',
    }));

    if (recommendations.length === 0) return null;

    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={recommendations}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.scrollContent}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedImage(item.image)}>
                        <View style={styles.card}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <TouchableOpacity style={styles.button} onPress={() =>
                                router.push({
                                    pathname: '/(home)/lookbook',
                                    params: {
                                        imageUrl: item.image,
                                    },
                                })
                            }>
                                <Text style={styles.buttonText}>{item.label}</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {onRegenerate && (
                <TouchableOpacity style={styles.regenerate} onPress={onRegenerate}>
                    <Text style={styles.regenerateIcon}>🔄</Text>
                    <Text style={styles.regenerateText}>Regenerate</Text>
                </TouchableOpacity>
            )}

            {/* ✅ Fullscreen Modal Dialog */}
            <Modal visible={!!selectedImage} transparent animationType="fade">
                <View style={styles.modalBackdrop}>
                    <Pressable style={styles.modalCloseArea} onPress={() => setSelectedImage(null)} />
                    <Image source={{ uri: selectedImage! }} style={styles.fullImage} resizeMode="contain" />
                    <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.closeButton}>
                        <Text style={styles.closeText}>✕</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        height: 170,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        // shadowColor: '#000',
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
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalCloseArea: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    fullImage: {
        width: '90%',
        height: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 24,
        backgroundColor: '#000',
        borderRadius: 20,
        padding: 6,
    },
    closeText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default ImageResponseBlock;