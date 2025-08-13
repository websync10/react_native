import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

type HeaderWithShareProps = {
  title?: string;
  onBack: () => void;
  shareImage?: any;
};

type ShareOption = {
  id: string;
  name: string;
  icon: string;
  color: string;
  action: () => void;
};

export default function HeaderWithShare({ 
  title = 'Try On Look', 
  onBack, 
  shareImage 
}: HeaderWithShareProps) {
  const [showSharePanel, setShowSharePanel] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dy > 20;
    },
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dy > 0) {
        slideAnim.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        hideSharePanel();
      } else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  // const showSharePanelHandler = () => {
  //   setShowSharePanel(true);
  //   Animated.timing(slideAnim, {
  //     toValue: 0,
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };

  const hideSharePanel = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setShowSharePanel(false);
      slideAnim.setValue(0);
    });
  };

  // Mock sharing options - replace with actual sharing functionality
  const shareOptions: ShareOption[] = [
    {
      id: 'airdrop',
      name: 'AirDrop',
      icon: 'wifi',
      color: '#007AFF',
      action: () => console.log('Share via AirDrop')
    },
    {
      id: 'messages',
      name: 'Messages',
      icon: 'chatbubble',
      color: '#34C759',
      action: () => console.log('Share via Messages')
    },
    {
      id: 'mail',
      name: 'Mail',
      icon: 'mail',
      color: '#007AFF',
      action: () => console.log('Share via Mail')
    },
    {
      id: 'notes',
      name: 'Notes',
      icon: 'document-text',
      color: '#FFCC00',
      action: () => console.log('Share to Notes')
    },
    {
      id: 'reminders',
      name: 'Reminders',
      icon: 'checkmark-circle',
      color: '#FF9500',
      action: () => console.log('Share to Reminders')
    }
  ];

  const contacts = [
    { id: '1', name: 'Sandy Wilder\nCheng', avatar: '👩‍🦰', online: true },
    { id: '2', name: 'Chris\nAngelotti', avatar: '👨‍🦱', online: true },
    { id: '3', name: 'Sandy and\nTony', avatar: '👥', online: true },
    { id: '4', name: 'Stephanie\nVidal', avatar: '👩‍🦳', online: true },
    { id: '5', name: 'Anna\nMiller', avatar: '👩‍🦲', online: false }
  ];

  const actions = [
    { id: 'copy', name: 'Copy', icon: 'copy-outline' },
    { id: 'reading', name: 'Add to Reading List', icon: 'glasses-outline' },
    { id: 'bookmark', name: 'Add Bookmark', icon: 'bookmark-outline' }
  ];

  return (
    <>
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={onBack}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>

      {/* Share Panel Modal */}
      <Modal
        visible={showSharePanel}
        transparent={true}
        animationType="none"
        onRequestClose={hideSharePanel}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.backdropTouchable} 
            onPress={hideSharePanel}
            activeOpacity={1}
          />
          
          <Animated.View 
            style={[
              styles.sharePanel,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Drag Handle */}
            <View style={styles.dragHandle} />
            
            {/* Share Image Preview */}
            {shareImage && (
              <View style={styles.imagePreviewContainer}>
                <Image source={shareImage} style={styles.shareImagePreview} />
                <View style={styles.imageOverlay}>
                  <Text style={styles.imageTitle}>Title</Text>
                  <View style={styles.subtitleRow}>
                    <Text style={styles.imageSubtitle}>Subtitle Options</Text>
                    <Ionicons name="chevron-forward" size={16} color="#666" />
                  </View>
                </View>
                <TouchableOpacity style={styles.closeButton}>
                  <Ionicons name="close" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            )}

            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
              {/* Contacts Section */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.contactsContainer}
                contentContainerStyle={styles.contactsContent}
              >
                {contacts.map((contact) => (
                  <TouchableOpacity key={contact.id} style={styles.contactItem}>
                    <View style={styles.contactAvatarContainer}>
                      <View style={styles.contactAvatar}>
                        <Text style={styles.contactEmoji}>{contact.avatar}</Text>
                      </View>
                      {contact.online && <View style={styles.onlineIndicator} />}
                    </View>
                    <Text style={styles.contactName}>{contact.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Share Options */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.shareOptionsContainer}
                contentContainerStyle={styles.shareOptionsContent}
              >
                {shareOptions.map((option) => (
                  <TouchableOpacity key={option.id} style={styles.shareOption} onPress={option.action}>
                    <View style={[styles.shareOptionIcon, { backgroundColor: option.color }]}>
                      <Ionicons name={option.icon as any} size={24} color="white" />
                    </View>
                    <Text style={styles.shareOptionName}>{option.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Actions */}
              <View style={styles.actionsContainer}>
                {actions.map((action, index) => (
                  <TouchableOpacity 
                    key={action.id} 
                    style={[
                      styles.actionItem,
                      index < actions.length - 1 && styles.actionItemBorder
                    ]}
                  >
                    <Ionicons name={action.icon as any} size={22} color="#000" />
                    <Text style={styles.actionName}>{action.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {
    paddingHorizontal: 0,
    marginBottom: 0,
    backgroundColor: '#fff',
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  headerTitle: {
    fontSize: 18,
    color: '#1A2B32',
    textAlign: 'center',
    flex: 1,
    fontWeight: '600',
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    flex: 1,
  },
  sharePanel: {
    backgroundColor: '#F2F2F7',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.8,
    paddingBottom: 34,
  },
  dragHandle: {
    width: 36,
    height: 5,
    backgroundColor: '#C7C7CC',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  scrollContent: {
    flex: 1,
  },
  imagePreviewContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  shareImagePreview: {
    width: 60,
    height: 60,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  imageOverlay: {
    flex: 1,
    marginLeft: 12,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSubtitle: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  closeButton: {
    padding: 8,
  },
  contactsContainer: {
    marginBottom: 20,
  },
  contactsContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  contactItem: {
    alignItems: 'center',
    width: 80,
  },
  contactAvatarContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  contactAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E5EA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactEmoji: {
    fontSize: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: '#F2F2F7',
  },
  contactName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    lineHeight: 16,
  },
  shareOptionsContainer: {
    marginBottom: 20,
  },
  shareOptionsContent: {
    // paddingHorizontal: 16,
    gap: 20,
  },
  shareOption: {
    alignItems: 'center',
    width: 80,
  },
  shareOptionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  shareOptionName: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  actionsContainer: {
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  actionItemBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C7C7CC',
  },
  actionName: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
  },
});