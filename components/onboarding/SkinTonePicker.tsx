import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WheelColorPicker from 'react-native-wheel-color-picker';

export default function SkinTonePicker() {
    const [skin_tone, setSkinTone] = useState<string>('#f5e2d4');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pick Your Skin Tone</Text>

            <View style={[styles.preview, { backgroundColor: skin_tone }]} />

            <WheelColorPicker
                color={skin_tone}
                onColorChangeComplete={setSkinTone}
                sliderHidden
            />

            <Text style={styles.hex}>Selected: {skin_tone}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    preview: {
        height: 50,
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    hex: {
        marginTop: 12,
        fontSize: 16,
        fontWeight: '500',
    },
    picker: {
        flex: 1,
    },
});
