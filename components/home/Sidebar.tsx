import { FontFamily } from '@/constants/Fonts';
import { useChatStore } from '@/lib/stores/chatStore';
import { supabase } from '@/lib/supabase';
import {
    Ionicons,
    MaterialIcons
} from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Modal,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.85;

interface SidebarProps {
    visible: boolean;
    onClose: () => void;
    userData: User | null
}

const MobileSidebar: React.FC<SidebarProps> = ({ visible, onClose, userData }) => {
    const slideAnim = useRef(new Animated.Value(-SIDEBAR_WIDTH)).current;
    const [showModal, setShowModal] = useState(visible);

    const { clearMessages } = useChatStore();
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Logout error:", error.message);
            Alert.alert("Logout failed", error.message);
            return;
        }

        router.replace('/(auth)/login');
    };
    useEffect(() => {
        if (visible) {
            setShowModal(true);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: -SIDEBAR_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                setShowModal(false);
            });
        }
    }, [visible]);

    if (!showModal) return null;

    return (
        <Modal
            transparent
            animationType="none"
            visible={showModal}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <TouchableOpacity
                    style={styles.backdrop}
                    activeOpacity={1}
                    onPress={onClose}
                />

                <Animated.View
                    style={[
                        styles.sidebar,
                        {
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            bottom: 0,
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <SafeAreaView style={styles.container}>
                        {/* Header with close icon */}
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                                <Ionicons name="close" size={24} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={()=>{router.push('/pages/myProfile')}}>
                        <View style={styles.profileSection}>
                            <View style={styles.profileContainer}>
                                <Image
                                    source={{ uri: 'https://picsum.photos/120/120' }}
                                    style={styles.profileImage}
                                />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>Robert L.</Text>
                                    <Text style={styles.profileUsername}>@robertlowsky</Text>
                                </View>
                                <TouchableOpacity style={styles.editProfileContainer}>
                                    <Ionicons name="chevron-forward" size={20} color="#999" />
                                </TouchableOpacity>
                            </View>
                        </View></TouchableOpacity>

                        <View style={styles.menuSection}>
                            <MenuItem
                                icon={<MaterialIcons name="checkroom" size={20} color="#666" />}
                                label="Fit Preferences"
                                onPress={() => { }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="history" size={20} color="#666" />}
                                label="Try on History"
                                onPress={() => {router.push('/pages/tryOnHistory') }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="privacy-tip" size={20} color="#666" />}
                                label="Privacy Policy"
                                onPress={() => {router.push('/pages/privacyPolicy')}}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="help-outline" size={20} color="#666" />}
                                label="Help & Support"
                                onPress={() => {
                                    onClose();
                                    router.push('/pages/help-support');
                                }}
                            />
                        </View>

                        <View style={styles.logoutSection}>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <MaterialIcons name="logout" size={20} color="#FF4444" />
                                <Text style={styles.logoutButtonText}>Logout</Text>
                                <Ionicons name="chevron-forward" size={16} color="#FF4444" />
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
};

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    isLogout?: boolean;
    isClose?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, onPress, isLogout = false, isClose = false }) => {
    return (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                {icon}
                <Text style={[styles.menuItemText, isLogout && styles.logoutText]}>
                    {label}
                </Text>
            </View>
            <Ionicons
                name="chevron-forward"
                size={16}
                color={isLogout && isClose ? "#FF4444" : "#999"}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#00272E66',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: 'white',
        shadowColor: '#000',
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 2,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        backgroundColor: 'white', 
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    closeButton: {
        padding: 8,
        borderRadius: 8,
        // backgroundColor: '#f5f5f5',
    },
    profileSection: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 24,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f0f0f0',
    },
    profileInfo: {
        marginLeft: 16,
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 4,
        fontFamily: FontFamily.HelveticaNeue.Bold,
    },
    profileUsername: {
        fontSize: 14,
        color: '#999',
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    editProfileContainer: {
        padding: 8,
    },
    menuSection: {
        paddingHorizontal: 24,
        paddingTop: 16,
        backgroundColor: 'white',
        gap: 0,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        paddingVertical: 16,
        borderRadius: 0,
        backgroundColor: 'white',
        marginBottom: 0,
        borderBottomWidth: 1.1,
        borderBottomColor: '#e0e0e0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuItemText: {
        fontSize: 14,
        color: '#1A1A1A',
        marginLeft: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    logoutText: {
        color: '#F84D64',
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    logoutSection: {
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: 'white',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderRadius: 100,
        backgroundColor: 'white',
        borderWidth: 1.5,
        borderColor: '#FF4444',
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FF4444',
        marginLeft: 12,
        flex: 1,
        fontFamily: 'HelveticaNeue',
    },
});

export default MobileSidebar;
