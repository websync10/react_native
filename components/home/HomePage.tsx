import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import MobileSidebar from './Sidebar';

interface HomePageProps{
    userData: User | null
}

const HomePage = ({
    userData
}: HomePageProps) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

            {/* Header */}
            <View style={styles.header}>

                <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                    <Icon name="menu" size={24} color="#333" />
                </TouchableOpacity>

                <MobileSidebar
                    visible={sidebarVisible}
                    onClose={() => setSidebarVisible(false)}
                    userData={userData}
                />

                <View style={styles.logoContainer}>
                    <View style={styles.logoIcon}>
                        <Text style={styles.logoText}>M</Text>
                    </View>
                    <Text style={styles.brandText}>Myuze</Text>
                </View>

                <TouchableOpacity>
                    <Icon name="bell" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Large Logo */}
                <View style={styles.largeLogo}>
                    <View style={styles.shoppingBag}>
                        <Text style={styles.largeLogoText}>M</Text>
                    </View>
                </View>

                {/* Greeting */}
                <Text style={styles.greeting}>Hi there 👋</Text>
                <Text style={styles.subtitle}>Ask Myuze for outfit ideas</Text>
            </View>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
                <Text style={styles.helpText}>How can I help you today?</Text>

                {/* Input Section */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Ask me anything..."
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.sendButton}>
                        <Icon name="arrow-up" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f8f9fa',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#007AFF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    logoText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    brandText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    largeLogo: {
        marginBottom: 40,
    },
    shoppingBag: {
        width: 120,
        height: 120,
        backgroundColor: '#007AFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    largeLogoText: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    helpText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: '#333',
    },
    sendButton: {
        width: 36,
        height: 36,
        backgroundColor: '#333',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#333',
        fontWeight: '500',
    },
    navTextInactive: {
        color: '#666',
    },
    homeIndicator: {
        width: 134,
        height: 5,
        backgroundColor: '#333',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 8,
    },
});

export default HomePage;