import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { supabase } from '@/lib/supabase';
import {
    Feather,
    Ionicons,
    MaterialIcons,
} from '@expo/vector-icons';
import { router } from 'expo-router';
import React, {
    useEffect,
    useRef,
    useState
} from 'react';
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
    const {image} = useOnboardingStore()

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
                    <Image
                        source={require('@/assets/images/icons/Union.png')}
                        style={styles.backgroundImage}
                        resizeMode="cover"
                    />
                    <SafeAreaView style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton} onPress={onClose}>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.profileSection}>
                            <View style={styles.profileContainer}>
                                <Image
                                    source={{ uri: image ? image : userData?.profileImage }}
                                    style={styles.profileImage}
                                />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>{userData?.fullName}</Text>
                                    <TouchableOpacity style={styles.editProfileContainer} onPress={() => router.push("/pages/editProfile")}>
                                        <Text style={styles.editProfileText}>Edit Profile</Text>
                                        <Feather name="edit-2" size={12} color="#999" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.menuSection}>
                            <MenuItem
                                icon={<MaterialIcons name="person" size={20} color="#666" />}
                                label="Profile"
                                onPress={() => { router.push("/pages/myProfile") }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="history" size={20} color="#666" />}
                                label="Try Outfits"
                                onPress={() => { router.push("/pages/tryOnHistory") }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="privacy-tip" size={20} color="#666" />}
                                label="Privacy Policy"
                                onPress={() => { router.push("/pages/privacyPolicy") }}
                            />
                            <MenuItem
                                icon={<MaterialIcons name="help-outline" size={20} color="#666" />}
                                label="Help & Support"
                                onPress={() => { router.push("/pages/help-support") }}
                            />
                        </View>

                        <View style={styles.logoutSection}>
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
        backgroundColor: '#00272E66',
    },
    sidebar: {
        width: SIDEBAR_WIDTH,
        backgroundColor: 'transparent',
        zIndex: 2,
        overflow: 'hidden',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 16,
        backgroundColor: 'transparent',
    },
    backButton: {
        // alignSelf: '',
        padding: 10,
        position: 'absolute',
        top: 90,
        right: 5,
        zIndex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 86,
        right: 56,
        zIndex: 1,
        padding: 18,
    },
    profileSection: {
        paddingHorizontal: 34,
        paddingTop: 16,
        paddingBottom: 32,
        left: -10,
        backgroundColor: 'transparent',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#efefef',
        borderRadius: 16,
        padding: 16,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
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
        marginBottom: 6,
        fontFamily: 'HelveticaNeue',
    },
    editProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    editProfileText: {
        fontSize: 14,
        color: '#666',
        marginRight: 6,
        fontWeight: 'bold',
        fontFamily: 'HelveticaNeue',
    },
    menuSection: {
        paddingHorizontal: 32,
        left: -8,
        backgroundColor: 'transparent',
        gap: 16
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 18,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        marginBottom: 8,
        borderColor: '#efefef',
        borderWidth: 1
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#1A1A1A',
        marginLeft: 16,
        fontFamily: 'HelveticaNeue',
    },
    logoutText: {
        color: '#FF4444',
        fontFamily: 'HelveticaNeue',
    },
    logoutSection: {
        top: 180,
        paddingHorizontal: 34,
        paddingTop: 6,
        paddingBottom: 32,
        left: -10,
        backgroundColor: 'transparent',
    },
});

export default MobileSidebar;