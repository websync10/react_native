import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function GradientBackground() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(0,122,255,0.37)', 'rgba(0,122,255,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0.3, y: 1 }}
                style={styles.gradient}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: height/2.3,
        width: '100%',
        zIndex: -1,
    },
});
