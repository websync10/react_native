import HeaderWithShare from '@/components/headerwithShare';
import { FontFamily } from '@/constants/Fonts';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Animated as RNAnimated,
  StyleSheet,
  View
} from 'react-native';

function BlinkingText({ children, style }: { children: React.ReactNode; style?: any }) {
  const opacity = React.useRef(new RNAnimated.Value(1)).current;
  React.useEffect(() => {
    const animate = () => {
      RNAnimated.sequence([
        RNAnimated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        RNAnimated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate();
    return () => opacity.stopAnimation();
  }, [opacity]);

  return (
    <RNAnimated.Text style={[style, { opacity }]}>{children}</RNAnimated.Text>
  );
}

export default function TryLookPage() {
  const params = useLocalSearchParams();
  const outfitImage = params.outfitImage as string;
  const { userId, image } = useOnboardingStore()
  if (!image || image == "") {
    Alert.alert("user image not found. Please update your image from edit profile.")
    return 
  }
  const userImage = image;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("is running loaded also")
    if (!outfitImage) return;

    async function processTryOn() {
      try {
        const response = await fetch(`https://34c9237df877.ngrok-free.app/api/virtual-tryon/${userId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ model_image: userImage, garment_image: outfitImage, category: "tops" }),
        });
        const data = await response.json();

        if (response.ok && data.tryon_image) {
          router.push({
            pathname: '/pages/tryLookOutput',
            params: {
              tryonImage: data.tryon_image,
              userImage,
              outfitImage,
            },
          });
        } else {
          alert('Try-on failed: ' + (data.error || 'Unknown error'));
          setLoading(false);
        }
      } catch (err) {
        alert('Error occured');
        setLoading(false);
      }
    }

    processTryOn();
  }, [outfitImage]);

  return (
    <View style={styles.container}>
      <HeaderWithShare title='Try on Look' onBack={() => { router.back(); }} />

      <View style={styles.cardWrapper}>
        <RNAnimated.View style={{
          width: '100%',
          height: 450,
          borderRadius: 24, overflow: 'hidden'
        }}>
          <LinearGradient
            colors={['#D9DBE2', '#F9F9F9', '#D9DBE2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, { position: 'absolute', width: '100%', height: '100%' }]}
          >
          </LinearGradient>
          <View style={[styles.processingContent, { position: 'absolute', width: '100%', height: '100%' }]}>
            <Image source={require('../../assets/images/baglogo.png')} style={styles.processingIcon} />
            <BlinkingText style={styles.processingText}>Processing...</BlinkingText>
          </View>
        </RNAnimated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 4,
  },
  cardWrapper: {
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    height: 380,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  processingContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  processingIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  processingText: {
    fontSize: 18,
    color: '#666',
    fontFamily: FontFamily.HelveticaNeue.Regular,
    marginTop: 8,
  },
});