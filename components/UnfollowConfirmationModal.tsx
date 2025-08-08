import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface UnfollowConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: {
    name: string;
    avatar: any;
  };
}

const UnfollowConfirmationModal: React.FC<UnfollowConfirmationModalProps> = ({
  visible,
  onClose,
  onConfirm,
  user,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>

          {/* User Avatar */}
          <View style={styles.avatarContainer}>
            {/* <Image source={user.avatar} style={styles.avatar} /> */}
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </View>

          {/* Title */}
          <Text style={styles.title}>
            Are you sure you want to{'\n'}unfollow {user.name}?
          </Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            You will no longer see their posts in your feed.
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Changed from 'center' to 'flex-end'
    alignItems: 'center',
    // paddingHorizontal: 20,
    // paddingBottom: 32, // Add some bottom padding for spacing
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20, // Only top corners rounded for bottom sheet style
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 32,
    paddingHorizontal: 24,
    width: width,
    // maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F6F7F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 18,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    top: -2
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#000000',
    borderRadius: 50,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#FFFFFF',
    top: -2,
  },
});

export default UnfollowConfirmationModal;