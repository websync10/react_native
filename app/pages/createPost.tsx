import Header from "@/components/Header";
import { FontFamily } from "@/constants/Fonts";
import { insertPost } from "@/lib/actions/users/post/createPost";
import { uploadToCloudinary } from "@/lib/services/upload-images/uploadToCloudinary";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const CreatePost = () => {
    const { userId } = useOnboardingStore();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [localImage, setLocalImage] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alert("Permission to access gallery is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: false,
            quality: 0.8,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            setLocalImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!title || !localImage) {
            Alert.alert("Missing Information", "Please provide a title and image to create your post.");
            return;
        }

        setUploading(true);

        try {
            const tagArray = tags
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 0);

            const cloudflareUrl = await uploadToCloudinary(localImage);
            const postData = {
                userId: userId,
                title: title,
                description: description,
                tags: tagArray,
                image: cloudflareUrl ?? undefined,
            }
            const result = await insertPost({ postData });

            if (result.success) {
                Alert.alert("🎉 Success!", "Your post has been created successfully!");
                setTitle("");
                setDescription("");
                setTags("");
                setLocalImage(null);
            } else {
                Alert.alert("❌ Error", "Failed to create post. Please try again.");
            }
        } catch (err) {
            Alert.alert("Upload Failed", "There was an error uploading your post. Please check your connection and try again.");
        }

        setUploading(false);
    };

    const removeImage = () => {
        setLocalImage(null);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Create Post" />
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    <View style={styles.headerSection}>
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View 
                                    style={[
                                        styles.progressFill, 
                                        { width: `${((title ? 1 : 0) + (localImage ? 1 : 0)) * 50}%` }
                                    ]} 
                                />
                            </View>
                            <Text style={styles.progressText}>
                                {((title ? 1 : 0) + (localImage ? 1 : 0))}/2 steps completed
                            </Text>
                        </View>
                        <View style={styles.iconContainer}>
                            <Ionicons name="camera-outline" size={32} color="#007AFF" />
                        </View>
                        <Text style={styles.headerTitle}>Share Your Style</Text>
                        <Text style={styles.headerSubtitle}>Create a new post to showcase your fashion</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Ionicons name="image-outline" size={16} color="#6B7280" />
                                <Text style={styles.statText}>High Quality</Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Ionicons name="people-outline" size={16} color="#6B7280" />
                                <Text style={styles.statText}>Share with Community</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Post Title</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={title}
                                    onChangeText={setTitle}
                                    placeholder="Give your post a catchy title..."
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.titleInput}
                                    maxLength={100}
                                />
                                <View style={styles.inputIcon}>
                                    <Ionicons name="create-outline" size={20} color="#9CA3AF" />
                                </View>
                            </View>
                            <Text style={styles.characterCount}>{title.length}/100</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Description</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={description}
                                    onChangeText={setDescription}
                                    placeholder="Tell us about your look, inspiration, or style tips..."
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.descriptionInput}
                                    multiline
                                    maxLength={500}
                                />
                                <View style={styles.inputIcon}>
                                    <Ionicons name="document-text-outline" size={20} color="#9CA3AF" />
                                </View>
                            </View>
                            <Text style={styles.characterCount}>{description.length}/500</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tags</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    value={tags}
                                    onChangeText={setTags}
                                    placeholder="summer, streetwear, casual, vintage..."
                                    placeholderTextColor="#9CA3AF"
                                    style={styles.tagsInput}
                                    maxLength={200}
                                />
                                <View style={styles.inputIcon}>
                                    <Ionicons name="pricetag-outline" size={20} color="#9CA3AF" />
                                </View>
                            </View>
                            <Text style={styles.characterCount}>{tags.length}/200</Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Image</Text>
                            {localImage ? (
                                <View style={styles.imagePreviewContainer}>
                                    <Image
                                        source={{ uri: localImage }}
                                        style={styles.imagePreview}
                                        resizeMode="cover"
                                    />
                                    <TouchableOpacity 
                                        style={styles.removeImageButton}
                                        onPress={removeImage}
                                    >
                                        <Ionicons name="close-circle" size={24} color="#EF4444" />
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                        style={styles.changeImageButton}
                                        onPress={pickImage}
                                    >
                                        <Text style={styles.changeImageText}>Change Image</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity 
                                    style={styles.imagePickerContainer}
                                    onPress={pickImage}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.imagePickerContent}>
                                        <Ionicons name="image-outline" size={48} color="#9CA3AF" />
                                        <Text style={styles.imagePickerText}>Tap to select an image</Text>
                                        <Text style={styles.imagePickerSubtext}>Choose a high-quality photo</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <TouchableOpacity 
                        style={[
                            styles.submitButton, 
                            (!title || !localImage || uploading) && styles.submitButtonDisabled
                        ]} 
                        onPress={handleSubmit} 
                        disabled={!title || !localImage || uploading}
                        activeOpacity={0.8}
                    >
                        <View style={styles.submitButtonContent}>
                            {uploading ? (
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                    <Text style={styles.submitButtonText}>Creating Post...</Text>
                                </View>
                            ) : (
                                <>
                                    <Ionicons name="paper-plane" size={20} color="#FFFFFF" />
                                    <Text style={styles.submitButtonText}>Create Post</Text>
                                </>
                            )}
                        </View>
                    </TouchableOpacity>
                    
                    <View style={styles.bottomSpacing} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 32, // Add top padding for better device compatibility
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 120, // Increased bottom padding to avoid mobile navigation
    },
    content: {
        padding: 20,
        paddingTop: 0, // Remove top padding since header section has its own padding
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
        paddingVertical: 20,
    },
    progressContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#6B7280',
        marginTop: 8,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F0F9FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 28,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#1F2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 16,
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
    },
    statText: {
        fontSize: 12,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#6B7280',
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: '100%',
        backgroundColor: '#E5E7EB',
    },
    formSection: {
        marginBottom: 32,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#374151',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 12,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    inputIcon: {
        marginLeft: 12,
    },
    titleInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#1F2937',
    },
    descriptionInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#1F2937',
        height: 120,
        textAlignVertical: 'top',
    },
    tagsInput: {
        flex: 1,
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#1F2937',
    },
    characterCount: {
        fontSize: 12,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#9CA3AF',
        textAlign: 'right',
        marginTop: 4,
    },
    imagePickerContainer: {
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        borderRadius: 16,
        padding: 40,
        backgroundColor: '#F9FAFB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePickerContent: {
        alignItems: 'center',
    },
    imagePickerText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#6B7280',
        marginTop: 12,
        marginBottom: 4,
    },
    imagePickerSubtext: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#9CA3AF',
    },
    imagePreviewContainer: {
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#F9FAFB',
    },
    imagePreview: {
        width: '100%',
        height: 300,
        borderRadius: 16,
    },
    removeImageButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    changeImageButton: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    changeImageText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    submitButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    submitButtonDisabled: {
        backgroundColor: '#D1D5DB',
        shadowOpacity: 0,
        elevation: 0,
    },
    submitButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        marginLeft: 8,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bottomSpacing: {
        height: 100, // Adjust as needed for spacing
    },
});
