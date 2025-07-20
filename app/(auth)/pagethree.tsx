import PageThree from '@/components/onboarding/PageThree';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';

const pagetwo = () => {
    const params = useLocalSearchParams();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <PageThree />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexGrow: 1,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica Neue',
    },
});
export default pagetwo
