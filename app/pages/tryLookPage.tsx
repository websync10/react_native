import HeaderWithShare from '@/components/headerwithShare';
import { FontFamily } from '@/constants/Fonts';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Animated as RNAnimated, StyleSheet, View } from 'react-native';



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
    useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/pages/tryLookOutput'); // Adjust path as needed
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <HeaderWithShare title='Try on Look' onBack={() => { router.back(); } }/>

      {/* Processing Card */}
      <View style={styles.cardWrapper}>
        <RNAnimated.View style={{ width: '100%',
    height: 450,
 borderRadius: 24, overflow: 'hidden' }}>
          <LinearGradient
            colors={['#D9DBE2', '#F9F9F9', '#D9DBE2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.card, { position: 'absolute', width: '100%', height: '100%' }]}
          >
            {/* <AnimatedGradient /> */}
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
    paddingHorizontal:4,
  },
  cardWrapper: {
    alignItems: 'center',
    width:'100%',
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