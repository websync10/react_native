import HeaderWithShare from '@/components/headerwithShare';
import PrimaryButton from '@/components/PrimaryButton';
import { FontFamily } from '@/constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CreateVideo() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithShare
        title="Create video"
        onBack={() => router.back()}
      />

      <View style={styles.content}>
        {/* Media Section */}
        <View style={styles.mediaContainer}>
          <View style={styles.mediaWrapper}>
            <Image
              source={require('@/assets/images/lookDetail1.png')}
              style={styles.mediaImage}
              resizeMode="cover"
            />

            {/* Play Button */}
            <TouchableOpacity style={styles.playButton}>
              <Ionicons name="play" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonSection}>
          <PrimaryButton title='Shop The Look' onPress={() => { }} />

          <TouchableOpacity onPress={() => { router.push('/pages/postvideo') }} style={styles.continueButton} >
            {/* for image */}
            <Text style={styles.continueButtonText}>Continue to Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 32
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mediaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  mediaWrapper: {
    width: '100%',
    aspectRatio: 3 / 4,
    maxHeight: SCREEN_HEIGHT * 0.6,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  mediaImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -35 }, { translateY: -35 }],
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 10,
    gap: 12
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    marginRight: 8,
  },
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  avatarWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 2,
    overflow: 'hidden',
  },
  avatarOverlap: {
    marginLeft: -10,
  },
  shopAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  continueButton: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
});