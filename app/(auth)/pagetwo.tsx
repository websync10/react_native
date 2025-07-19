import PageTwo from '@/components/onboarding/PageTwo'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const pagetwo = () => {
    const params = useLocalSearchParams();
    const gender = Array.isArray(params.gender) ? params.gender[0] : params.gender;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <PageTwo gender={gender} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        flexGrow: 1,
        backgroundColor: '#ffffff',
        fontFamily: 'Helvetica'
    },
});
export default pagetwo
