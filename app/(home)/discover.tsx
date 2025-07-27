import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

const explore = () => {
    const logout = async () => {
        await AsyncStorage.removeItem('session_token');
        router.replace('/login');
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Discover page!</Text>
        </View>
    )
}

export default explore