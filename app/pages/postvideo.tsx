import Header from '@/components/Header';
import PrimaryButton from '@/components/PrimaryButton';
import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function PostImg() {
  const [facebookEnabled, setFacebookEnabled] = useState(true);
  const [instagramEnabled, setInstagramEnabled] = useState(false);
  const [tiktokEnabled, setTiktokEnabled] = useState(false);
  const [xEnabled, setXEnabled] = useState(false);
  const [caption, setCaption] = useState('');
  const [headline, setHeadline] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Post"
      />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentWrapper}>
            {/* Image Section */}
            <View style={styles.imageSection}>
              <View>
                <Image
                  source={require('@/assets/images/lookDetail1.png')}
                  style={styles.postImage}
                />
                {/* Overlay video player icon */}
                <Image
                  source={require('../../assets/images/icons/videoplayer.png')}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 36,
                    height: 36,
                    transform: [{ translateX: -18 }, { translateY: -18 }],
                    opacity: 0.85,
                  }}
                  resizeMode="contain"
                //   pointerEvents="none"
                />
              </View>
            </View>

            {/* Headline Input */}
            <View style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
            <TextInput
              style={styles.headlineInput}
              placeholder="Add a catchy headline to get more views"
              placeholderTextColor="#8E8E93"
              value={headline}
              onChangeText={setHeadline}
            />
            <View style={{left: -26, bottom: -6}}>
            {/* "Design" SVG Attribute Icon */}
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" accessibilityLabel="Design Attribute Icon">
              <Path d="M13.6603 21.1438C14.5575 16.9657 17.8212 13.702 21.9993 12.8048C17.8212 11.9076 14.5575 8.64387 13.6603 4.46578C12.7631 8.64387 9.49938 11.9076 5.32129 12.8048C9.49938 13.702 12.7631 16.9657 13.6603 21.1438Z" fill="black"/>
              <Path d="M5.32294 9.50195C5.68045 7.83707 6.98098 6.53653 8.64587 6.17902C6.98099 5.8215 5.68045 4.52097 5.32294 2.85608C4.96542 4.52097 3.66489 5.8215 2 6.17902C3.66489 6.53653 4.96542 7.83707 5.32294 9.50195Z" fill="black"/>
            </Svg></View>
            </View>

            {/* Caption Input */}
            <TextInput
              style={styles.captionInput}
              placeholder="Write a caption..."
              placeholderTextColor="#8E8E93"
              multiline
              value={caption}
              onChangeText={setCaption}
            />

            {/* Hashtags Button */}
            <TouchableOpacity style={styles.hashtagButton}>
              <Text style={styles.hashtagText}>#Hashtags</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Social Media Toggles */}
            <View style={styles.socialSection}>
              <View style={styles.socialItem}>
                <View style={styles.socialLeft}>
                  <View style={styles.socialIconWrapper}>
                    <Ionicons name="logo-instagram" size={24} color="#E1306C" />
                  </View>
                  <Text style={styles.socialText}>Instagram</Text>
                </View>
                <Switch
                  value={instagramEnabled}
                  onValueChange={setInstagramEnabled}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#E5E5EA"
                  style={styles.switch}
                />
              </View>

              <View style={styles.socialItem}>
                <View style={styles.socialLeft}>
                  <View style={styles.socialIconWrapper}>
                    <Ionicons name="logo-facebook" size={24} color="#1877F2" />
                  </View>
                  <Text style={styles.socialText}>Facebook</Text>
                </View>
                <Switch
                  value={facebookEnabled}
                  onValueChange={setFacebookEnabled}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#E5E5EA"
                  style={styles.switch}
                />
              </View>

              <View style={styles.socialItem}>
                <View style={styles.socialLeft}>
                  <View style={styles.socialIconWrapper}>
                    <Ionicons name="logo-tiktok" size={24} color="#000" />
                  </View>
                  <Text style={styles.socialText}>Tiktok</Text>
                </View>
                <Switch
                  value={tiktokEnabled}
                  onValueChange={setTiktokEnabled}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#E5E5EA"
                  style={styles.switch}
                />
              </View>

              <View style={styles.socialItem}>
                <View style={styles.socialLeft}>
                  <View style={styles.socialIconWrapper}>
                    <Text style={styles.xLogo}>𝕏</Text>
                  </View>
                  <Text style={styles.socialText}>X</Text>
                </View>
                <Switch
                  value={xEnabled}
                  onValueChange={setXEnabled}
                  trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#E5E5EA"
                  style={styles.switch}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Post Button - Fixed at bottom */}
        <View style={styles.buttonContainer}>
          <PrimaryButton title='Post Now' onPress={()=>{
            router.push('/(home)/lookbook')
          }} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical:12,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  imageSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#F5F7FA',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F5F7FA',
  },
  avatarBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  avatarBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  headlineInput: {
    width:'100%',
    fontSize: 15,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 12,
    marginBottom: 20,
    minHeight: 40,
    fontFamily: FontFamily?.HelveticaNeue?.Regular || undefined,
  },
  captionInput: {
    fontSize: 15,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 12,
    marginBottom: 24,
    minHeight: 40,
    fontFamily: FontFamily?.HelveticaNeue?.Regular || undefined,
  },
  hashtagButton: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
    marginTop: 32,
  },
  hashtagText: {
    fontSize: 15,
    color: '#8E8E93',
    fontFamily: FontFamily?.HelveticaNeue?.Regular || undefined,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginBottom: 24,
    marginHorizontal: -20, // Extend to full width
  },
  socialSection: {
    // gap: 12
    // ,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  socialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  socialIconWrapper: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  socialText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    fontFamily: FontFamily?.HelveticaNeue?.Regular || undefined,
  },
  xLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
    paddingTop: 16,
  },
});