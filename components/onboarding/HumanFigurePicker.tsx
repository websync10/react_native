import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HumanFigurePicker() {
    const { gender, image, setField } = useOnboardingStore()

    const pickFromGallery = async () => {
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
            setField("image", result.assets[0].uri)
        }
    };

    const openCamera = async () => {
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
            setField("image", result.assets[0].uri);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={
                        image
                            ? { uri: image }
                            : gender === "Male" ? require('../../assets/images/man.png') : require('../../assets/images/women.png')
                    }
                    style={styles.humanImage}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
                        <Text style={styles.buttonText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={openCamera}>
                        <Text style={styles.buttonText}>Camera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: "100%"
    },
    humanImage: {
        width: 180,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        borderWidth: 1,
        borderColor: '#333',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: '#fff',
        width: "50%"
    },
    buttonText: {
        color: '#000',
        textAlign: "center",
        fontWeight: "bold",
    },
});

