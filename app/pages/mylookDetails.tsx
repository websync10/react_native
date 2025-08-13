import HeaderWithShare from '@/components/headerwithShare';
import PrimaryButton from '@/components/PrimaryButton';
import { FontFamily } from '@/constants/Fonts';
import { supabase } from '@/lib/supabase';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Path, Svg } from 'react-native-svg';
import { TryOnLook } from './tryOnHistory';
export default function MyLookDetails() {
  const [selectedThumb, setSelectedThumb] = React.useState(0);
  const [looksData, setLooksData] = useState<TryOnLook[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useLocalSearchParams();
  const initialImage = params.image as string;

  const fetchLooks = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('tryondb').select('*').order('created_at', { ascending: true }).limit(3)

    if (error) {
      console.error('Error fetching looks:', error.message);
    } else {
      setLooksData(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchLooks();
  }, []);
  console.log(initialImage)
  const thumbnails = [{ uri: initialImage }, ...looksData.map((look) => ({ uri: look.image }))];
  return (
    <ScrollView style={styles.container}>
      <HeaderWithShare title='Details' onBack={() => { router.push('/(home)/lookbook'); }} />

      <View style={{ paddingHorizontal: 16 }}>
        <View style={styles.imageContainer}>
          <Image source={thumbnails[selectedThumb]} style={styles.mainImage} />
          {
            selectedThumb !== 0 && (
              <TouchableOpacity style={styles.tryOnButton}
                onPress={() => router.push({
                  pathname: '/pages/tryLookPage',
                  params: { outfitImage: thumbnails[selectedThumb]?.uri }
                })}
              >
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path d="M13.6603 21.1438C14.5575 16.9657 17.8212 13.702 21.9993 12.8048C17.8212 11.9076 14.5575 8.64387 13.6603 4.46578C12.7631 8.64387 9.49938 11.9076 5.32129 12.8048C9.49938 13.702 12.7631 16.9657 13.6603 21.1438Z" fill="black" />
                  <Path d="M5.32294 9.50195C5.68045 7.83707 6.98098 6.53653 8.64587 6.17902C6.98099 5.8215 5.68045 4.52097 5.32294 2.85608C4.96542 4.52097 3.66489 5.8215 2 6.17902C3.66489 6.53653 4.96542 7.83707 5.32294 9.50195Z" fill="black" />
                </Svg>
                <Text style={styles.tryOnText}>Try On Look</Text>
              </TouchableOpacity>
            )
          }
        </View>

        <View style={styles.thumbnailStickyWrapper}>
          <View style={styles.thumbnailContainer}>
            {thumbnails.map((img, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => setSelectedThumb(idx)}
                style={styles.thumbnailTouchable}
              >
                <View style={[
                  styles.thumbnailWrapper,
                  selectedThumb === idx && styles.selectedThumbnailWrapper
                ]}>
                  <Image
                    source={img}
                    style={styles.thumbnail}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.detailsSection}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>{looksData[selectedThumb]?.type}</Text>
            {/* <Text style={styles.productPrice}>USD $40.77</Text> */}
          </View>
          <Text style={styles.productDesc}>AI-generated based on your travel prompt and streetwear style</Text>
        </View>

        {/* Color Options */}
        {/* <View style={styles.colorSec}>
          <Text style={styles.chooseColor}>Choose Color</Text>
          <View style={styles.colorRow}>
            {['#6B4F3D', '#4FC3F7', '#FF8A65', '#FF5252', '#9575CD'].map((color, idx) => (
              <TouchableOpacity key={color} onPress={() => setSelectedColor(idx)}>
                <View style={styles.colorCircleWrapper}>
                  {selectedColor === idx ? (
                    <View style={[styles.selectedColorCircle, { borderColor: color }]}>
                      <View style={[styles.innerColorCircle, { backgroundColor: color }]} />
                    </View>
                  ) : (
                    <View style={[styles.colorCircle, { backgroundColor: color }]} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View> */}
        {/* Shop Now Button */}
        <PrimaryButton title='See More' onPress={() => {router.push("/pages/tryOnHistory")}} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingVertical: 32,
  },
  headerWrapper: {
    paddingHorizontal: 0,
    marginBottom: 0,
    backgroundColor: '#fff',
    // paddingTop: 8,
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
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#1A2B32',
    textAlign: 'center',
    flex: 1,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    // backgroundColor: '#F5F6F7',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 22,
    height: 22,
    tintColor: '#1A2B32',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 16,
  },
  mainImage: {
    width: '100%',
    height: 380,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  tryOnButton: {
    position: 'absolute',
    bottom: 16,
    left: '50%',
    transform: [{ translateX: -70 }],
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tryOnText: {
    fontFamily: FontFamily.HelveticaNeue.Medium,
    fontSize: 16,
    color: '#222',
    top: -2,
  },
  thumbnailStickyWrapper: {
    backgroundColor: '#fff',
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  thumbnailTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailWrapper: {
    width: 84,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedThumbnailWrapper: {
    borderColor: '#D1D5DB',
  },
  thumbnail: {
    width: 72,
    height: 72,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  detailsSection: {
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 4,
  },
  productTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000000',
    marginBottom: 4,
    lineHeight: 24,
    flex: 1,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#000',
    marginBottom: 4,
    marginLeft: 12,
    alignSelf: 'flex-start',
  },
  productDesc: {
    fontSize: 14,
    color: '#8288A0',
    fontFamily: FontFamily.HelveticaNeue.Regular,
    marginBottom: 16,
    lineHeight: 21,
    width: 300,
  },
  chooseColor: {
    fontSize: 15,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#8288A0',
    marginBottom: 8,
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  colorSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 42,
    marginBottom: -12,
  },
  colorCircleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  selectedColorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerColorCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    top: -.1,
    left: -.1,
  },
});
