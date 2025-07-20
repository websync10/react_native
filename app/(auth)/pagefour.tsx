import PageFour from '@/components/onboarding/PageFour';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const pagetwo = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <PageFour />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexGrow: 1,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica Neue'
    },
});
export default pagetwo
