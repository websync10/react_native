import { getUser } from '@/lib/services/handleusers/getUser';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Button,
    Image,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';

export default function TryonScreen() {
    const { userId } = useOnboardingStore();
    const params = useLocalSearchParams();
    const imageUrl = params.imageUrl as string;
    console.log("tryonImages", imageUrl)
    const [modelImage, setModelImage] = useState('')
    const [responseImage, setResponseImage] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser(userId);
                setModelImage('https://media.istockphoto.com/id/471947578/photo/confidence-is-the-first-step-to-happiness.jpg?s=612x612&w=0&k=20&c=_2sc2ebWSoCZmnAvj8X35hcQ7Y0wSojnHMCXzrAKm3g=');
                console.log("modelImage", modelImage)
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };
        fetchUser();
    }, [userId]);

    const handleTryon = async () => {
        setLoading(true);
        setResponseImage('');
        setStatus('Sending request...');

        try {
            const res = await fetch(`https://27b45700e3ac.ngrok-free.app/api/virtual-tryon/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model_name: 'tryon-v1.6',
                    inputs: {
                        model_image: modelImage,
                        garment_image: imageUrl,
                    },
                }),
            });

            const data = await res.json();
            console.log('Tryon Response:', data);

            if (data.output) {
                setResponseImage(data.output);
                setStatus('Success!');
            } else {
                setStatus(`Failed: ${data.error?.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error(err);
            setStatus('Error sending request');
        }

        setLoading(false);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Virtual Try-On</Text>
            {imageUrl ? (
                <Image
                    source={{ uri: imageUrl }}
                    style={{ width: 300, height: 400, resizeMode: 'contain', borderWidth: 2, }}
                />
            ) : (
                <Text>Image not available.</Text>
            )}
            <Button title="Generate Try-On" onPress={handleTryon} />

            {loading && <ActivityIndicator style={{ marginTop: 20 }} />}

            <Text style={styles.status}>{status}</Text>

            {responseImage ? (
                <Image source={{ uri: responseImage }} style={styles.image} />
            ) : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    heading: {
        fontSize: 22,
        marginBottom: 16,
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        marginVertical: 10,
        borderRadius: 8,
    },
    status: {
        marginTop: 20,
        fontSize: 16,
        color: '#444',
    },
    image: {
        width: 300,
        height: 400,
        marginTop: 20,
        resizeMode: 'contain',
    },
});
