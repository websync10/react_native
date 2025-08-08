import PrimaryButton from '@/components/PrimaryButton';
import { FontFamily } from '@/constants/Fonts';
import { createUserLookbook } from '@/lib/actions/users/createLookBook';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

export default function TryLookOutput() {
  const params = useLocalSearchParams();
  const resultImage = params.tryonImage as string;
  const clothingItem = params.outfitImage as string;
  const originalPhoto = params.userImage as string;
  console.log(resultImage, clothingItem, originalPhoto)
  const { userId } = useOnboardingStore();
  const shareImage = async () => {
    const localUri = FileSystem.documentDirectory + 'shared_image.jpg';
  
    const download = await FileSystem.downloadAsync(resultImage, localUri);
  
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(download.uri);
    } else {
      Alert.alert('Sharing not available');
    }
  };

  const handleSubmit = async () => {
    const lookData = {
      user_id: userId,
      title: "My tryon Look",
      image: resultImage,
      is_public: false
    }
    const response = await createUserLookbook({ ...lookData });
    if (!response.success) {
      Alert.alert("Error occured while creating look book.")
    } else {
      Alert.alert("Look book created successfully.")
      router.push("/(home)/lookbook")
    }
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => {
            router.push('/pages/mylookDetails')
          }}>
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Try On Look</Text>
          <TouchableOpacity style={styles.headerIconBtn}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <Path d="M21 6.5C21 8.15685 19.6569 9.5 18 9.5C16.3431 9.5 15 8.15685 15 6.5C15 4.84315 16.3431 3.5 18 3.5C19.6569 3.5 21 4.84315 21 6.5Z" stroke="#141B34" strokeWidth={1.5} />
              <Path d="M9 12C9 13.6569 7.65685 15 6 15C4.34315 15 3 13.6569 3 12C3 10.3431 4.34315 9 6 9C7.65685 9 9 10.3431 9 12Z" stroke="#141B34" strokeWidth={1.5} />
              <Path d="M21 17.5C21 19.1569 19.6569 20.5 18 20.5C16.3431 20.5 15 19.1569 15 17.5C15 15.8431 16.3431 14.5 18 14.5C19.6569 14.5 21 15.8431 21 17.5Z" stroke="#141B34" strokeWidth={1.5} />
              <Path d="M8.72852 10.7495L15.2285 7.75M8.72852 13.25L15.2285 16.2495" stroke="#141B34" strokeWidth={1.5} />
            </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Main Result Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: resultImage }} style={styles.mainImage} />
        </View>
        <TouchableOpacity onPress={shareImage} style={styles.videoButton}>
          <Text style={styles.videoButtonText}>Share Image</Text>
        </TouchableOpacity>

        {/* Upload Arrow */}
        <View style={styles.uploadArrowContainer}>
          <Svg width={18} height={20} viewBox="0 0 15 16" fill="none">
            <Path d="M1.5 6.80005L7.5 0.800049M7.5 0.800049L13.5 6.80005M7.5 0.800049V15.2" stroke="black" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </View>

        {/* Combination Preview */}
        <View style={styles.combinationContainer}>
          <LinearGradient
            colors={['#C6F8FF', '#007AF7', '#C6F8FF', '#007AF7']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <View style={styles.combinationCard}>
              <View style={styles.combinationContent}>
                {/* Clothing Item */}
                <View style={styles.itemContainer}>
                  <Image source={{ uri: clothingItem }} style={styles.itemImage} />
                </View>

                {/* Plus Icon */}
                <View style={styles.plusContainer}>
                  <Svg width={16} height={16} viewBox="0 0 13 12" fill="none">
                    <Path d="M6.49512 0.964844V11.0353" stroke="black" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                    <Path d="M11.5352 5.99512L1.46472 5.99512" stroke="black" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                </View>

                {/* Original Photo */}
                <View style={styles.photoContainer}>
                  <Image source={{ uri: originalPhoto }} style={styles.photoImage} />
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Shop The Look Button */}
          <PrimaryButton title='Add to LookBook' onPress={handleSubmit} />

          {/* Create Video Button */}
          <TouchableOpacity
            onPress={() => router.push({
              pathname: '/pages/postvideo',
              params: { image: resultImage }
            })}
            style={styles.videoButton}
          >
            <Text style={styles.videoButtonText}>Create Post</Text>
          </TouchableOpacity>

          {/* <SecondaryButton title='Add in LookBook' onPress={()=>{}} /> */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerWrapper: {
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingTop: 15,
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
    fontFamily: FontFamily?.HelveticaNeue?.Medium || 'System',
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
  scrollContent: {
    flex: 1,
  },
  imageContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 450,
    borderRadius: 24,
    resizeMode: 'cover',
  },
  uploadArrowContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  combinationContainer: {
    paddingHorizontal: 76,
    paddingBottom: 32,
  },
  gradientBorder: {
    borderRadius: 22,
    padding: 2, // This creates the border width
  },
  combinationCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  combinationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plusContainer: {
    marginHorizontal: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    fontSize: 18,
    fontWeight: '600',
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  shopButton: {
    backgroundColor: '#1A2B32',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopButtonText: {
    fontSize: 16,
    fontFamily: FontFamily?.HelveticaNeue?.Medium || 'System',
    fontWeight: '600',
    color: '#fff',
  },
  videoButton: {
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#1A2B32',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoButtonText: {
    fontSize: 16,
    fontFamily: FontFamily?.HelveticaNeue?.Regular || 'System',
    fontWeight: '600',
    color: '#1A2B32',
  },
});