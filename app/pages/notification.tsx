import Header from '@/components/Header';
import HeaderWithLogo from '@/components/headerwithlogo';
import { FontFamily } from '@/constants/Fonts';
import { router } from 'expo-router';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';

interface NotificationItem {
    id: string;
    title: string;
    description?: string;
    time: string;
    isRead: boolean;
    type: 'post' | 'trending' | 'comment' | 'update';
}

export default function NotificationScreen() {
    // Sample notification data based on the design
    const notifications: NotificationItem[] = [
        {
            id: '1',
            title: 'Your post is live! See how others are reacting.',
            time: 'October 28, 2023 at 07:40 AM',
            isRead: false,
            type: 'post'
        },
        {
            id: '2',
            title: 'Your content is trending!',
            description: 'Check out the engagement.',
            time: 'October 28, 2023 at 10:00 AM',
            isRead: false,
            type: 'trending'
        },
        {
            id: '3',
            title: 'New comment on your video',
            time: 'October 28, 2023 at 12:00 PM',
            isRead: false,
            type: 'comment'
        },
        {
            id: '4',
            title: 'New update on Myuze! Check out the latest features',
            time: 'October 28, 2023 at 10:00 AM',
            isRead: false,
            type: 'update'
        }
    ];

    const handleBackPress = () => {
        router.back();
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar 
                    barStyle="dark-content" 
                    backgroundColor="#ffffff" 
                    translucent={false}
                />

                {/* Header */}
                <Header title='Notification' />

                <ScrollView 
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Today Section */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today</Text>
                    </View>

                    {/* Notification List */}
                    <View style={styles.notificationsList}>
                        {notifications.map((notification) => (
                            <View key={notification.id} style={styles.notificationItem}>
                                {/* Blue dot indicator */}
                                <View style={styles.notificationIndicator}>
                                    <View style={[
                                        styles.dot,
                                        { backgroundColor: notification.isRead ? 'transparent' : '#007AFF' }
                                    ]} />
                                </View>

                                {/* Notification Content */}
                                <View style={styles.notificationContent}>
                                    <Text style={styles.notificationTitle}>
                                        {notification.title}
                                        {notification.description && (
                                            <Text style={styles.notificationEmoji}>
                                                {notification.type === 'trending' ? ' 🎉 ' : ' '}
                                            </Text>
                                        )}
                                        {notification.description}
                                    </Text>
                                    <Text style={styles.notificationTime}>
                                        {notification.time}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    titleContainer: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    pageTitle: {
        fontSize: 18,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    sectionHeader: {
        backgroundColor: '#F5F6FA',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginHorizontal: -24,
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#8A92A5',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    notificationsList: {
        flex: 1,
    },
    notificationItem: {
        flexDirection: 'row',
        paddingVertical: 16,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5EA',
        alignItems: 'flex-start',
    },
    notificationIndicator: {
        width: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 2,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    notificationContent: {
        flex: 1,
        marginLeft: 12,
    },
    notificationTitle: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#000',
        lineHeight: 22,
        marginBottom: 8,
    },
    notificationEmoji: {
        fontSize: 16,
    },
    notificationTime: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#8A92A5',
        lineHeight: 18,
    },
});
