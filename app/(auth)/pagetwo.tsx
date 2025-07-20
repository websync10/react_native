import PageTwo from '@/components/onboarding/PageTwo'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

const pagetwo = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flex: 1 }}>
                <PageTwo />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 16,
        fontFamily: 'Helvetica'
    },
});
export default pagetwo
