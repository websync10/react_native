import { useChatStore } from '@/lib/stores/chatStore';
import { supabase } from '@/lib/supabase';
import {
    Feather,
    Ionicons,
    MaterialIcons,
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
const SIDEBAR_WIDTH = width * 0.75;

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
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>

                        <View style={styles.profileSection}>
                            <View style={styles.profileContainer}>
                                <Image
                                    source={{ uri: `${userData?.profileImage}` }}
                                    style={styles.profileImage}
                                />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>{userData?.fullName}</Text>
                                    <TouchableOpacity style={styles.editProfileContainer} onPress={() => router.push("/edit")}>
                                        <Text style={styles.editProfileText}>Edit Profile</Text>
                                        <Feather name="edit-2" size={12} color="#999" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.menuSection}>
                            <MenuItem
                                icon={<MaterialIcons name="fitness-center" size={20} color="#666" />}
                                label="Fit Preferences"
                                onPress={() => { }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="history" size={20} color="#666" />}
                                label="Try on History"
                                onPress={() => { }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="security" size={20} color="#666" />}
                                label="Privacy Policy"
                                onPress={() => { }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="help-outline" size={20} color="#666" />}
                                label="Help & Support"
                                onPress={() => { }}
                            />
                        </View>

                        <View style={styles.logoutSection}>
                            <MenuItem
                                icon={<MaterialIcons name="delete" size={20} color="#FF4444" />}
                                label="Clear chat"
                                onPress={clearMessages}
                                isClose={true}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="logout" size={20} color="#FF4444" />}
                                label="Log Out"
                                onPress={handleLogout}
                                isLogout={true}
                            />
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
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 2,
    },
    container: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
        padding: 8,
    },
    profileSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 24,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#f0f0f0',
    },
    profileInfo: {
        marginLeft: 12,
        flex: 1,
    },
    profileName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    editProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editProfileText: {
        fontSize: 14,
        color: '#666',
        marginRight: 4,
    },
    menuSection: {
        paddingHorizontal: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderRadius: 8,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginLeft: 12,
    },
    logoutText: {
        color: '#FF4444',
    },
    logoutSection: {
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
    },
});

export default MobileSidebar;
