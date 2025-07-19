import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
const { width } = Dimensions.get('window');

export default function TopLeftTriangleGradient() {
    return (
        <View style={styles.wrapper}>
            <LinearGradient
                colors={['#DCEEFF', '#4DA6FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.softTriangle}
            />
            <View style={styles.triangleMask} />
        </View>
    );
}
export const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width / 2,
        height: width / 2,
        overflow: 'hidden',
        zIndex: -1,
    },
    softTriangle: {
        width: width * 0.7,
        height: width * 0.7,
        borderBottomRightRadius: width * 0.7,
        opacity: 0.2,
      },
    triangleMask: {
        position: 'absolute',
        width: 0,
        height: 0,
        borderTopWidth: 0,
        borderRightWidth: width / 2,
        borderTopColor: 'white',    
        borderRightColor: 'transparent',
        borderBottomRightRadius: width * 0.7,
        opacity: 0.05
    },
});