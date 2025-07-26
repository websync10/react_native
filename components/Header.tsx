import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface HeaderProps {
    title: string;
    onBackPress?: () => void;
    rightComponent?: React.ReactNode;
    showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
    title, 
    onBackPress, 
    rightComponent, 
    showBackButton = true 
}) => {
    const handleBackPress = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.back();
        }
    };

    return (
        <View style={styles.header}>
            {showBackButton ? (
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBackPress}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
            ) : (
                <View style={styles.placeholder} />
            )}
            
            <Text style={styles.headerTitle}>{title}</Text>
            
            {rightComponent ? (
                <View style={styles.rightComponent}>
                    {rightComponent}
                </View>
            ) : (
                <View style={styles.placeholder} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E5E5EA',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#343640',
        textAlign: 'center',
        flex: 1,
    },
    placeholder: {
        width: 40,
    },
    rightComponent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Header;