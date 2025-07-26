import { uploadToCloudinary } from '@/lib/services/upload-images/uploadToCloudinary';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need gallery permission to proceed.');
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const localUri = result.assets[0].uri;
        const cloudUrl = await uploadToCloudinary(localUri);
        if (cloudUrl) {
            return cloudUrl;
        } else {
            Alert.alert('Upload Failed', 'Could not upload image to Cloudinary.');
        }
    }
};

export const openCamera = async (): Promise<string | undefined> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera permission to proceed.');
        return;
    }

    const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const localUri = result.assets[0].uri;
        const cloudUrl = await uploadToCloudinary(localUri);
        if (cloudUrl) {
            return cloudUrl;
        } else {
            Alert.alert('Upload Failed', 'Could not upload image to Cloudinary.');
        }
    }
};