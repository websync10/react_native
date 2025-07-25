import React from 'react';
import { Image, StyleSheet, View } from 'react-native';



export default function GradientBackground() {
    return (<>
        <View style={styles.topleft}>
            <Image source={require('@/assets/images/topleftgradient.png')} />
        </View>
        <View style={styles.centerright}>
            <Image source={require('@/assets/images/centerrightgradient.png')} />
        </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        position:'absolute',
        flex: 1,
    },
    topleft:{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
    },
    centerright:{
        position: 'absolute',
        right: 0,
        top: '50%',
        zIndex: -1,
    }
});