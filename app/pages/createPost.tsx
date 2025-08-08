import { insertPost } from "@/lib/actions/users/post/createPost";
import { uploadToCloudinary } from "@/lib/services/upload-images/uploadToCloudinary";
import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
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
        });

        if (!result.canceled) {
            setLocalImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!title || !localImage) {
            Alert.alert("Please provide a title and image.");
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
                Alert.alert("✅ Post created!");
                setTitle("");
                setDescription("");
                setTags("");
                setLocalImage(null);
            } else {
                Alert.alert("❌ Failed to create post");
            }
        } catch (err) {
            Alert.alert("Upload failed", String(err));
        }

        setUploading(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Post title"
                style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Write a short description"
                style={[styles.input, { height: 80 }]}
                multiline
            />

            <Text style={styles.label}>Tags (comma-separated)</Text>
            <TextInput
                value={tags}
                onChangeText={setTags}
                placeholder="e.g. summer, streetwear"
                style={styles.input}
            />

            <Text style={styles.label}>Image</Text>
            {localImage && (
                <Image
                    source={{ uri: localImage }}
                    style={{ width: "100%", height: 200, borderRadius: 8, marginBottom: 12 }}
                />
            )}
            <TouchableOpacity onPress={pickImage} style={styles.pickBtn}>
                <Text style={styles.pickBtnText}>{localImage ? "Change Image" : "Pick Image"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={uploading}>
                <Text style={styles.buttonText}>
                    {uploading ? "Uploading..." : "Submit Post"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
    container: { padding: 20 },
    label: { marginBottom: 4, fontWeight: "600", fontSize: 16 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    pickBtn: {
        padding: 10,
        backgroundColor: "#eee",
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 16,
    },
    pickBtnText: {
        fontWeight: "500",
        color: "#333",
    },
    button: {
        backgroundColor: "#000",
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});
