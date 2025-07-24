import HeaderWithLogo from '@/components/headerwithlogo'
import PrimaryButton from '@/components/PrimaryButton'
import StyleCard from '@/components/StyleCard'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const FemalePickstyle = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>('')

  const styleOptions = [
    {
      id: 'minimal',
      title: 'Minimal',
      description: 'Relaxed everyday looks perfect for daily activities',
      imageSource: require('../../assets/images/styles/minimal-female.png'),
    },
    {
      id: 'casual',
      title: 'Casual',
      description: 'Relaxed everyday looks perfect for daily activities',
      imageSource: require('../../assets/images/styles/casual-female.png'),
    },
    {
      id: 'professional',
      title: 'Professional',
      description: 'Sophisticated outfits for work and business meetings',
      imageSource: require('../../assets/images/styles/professional-female.png'),
    },
    {
      id: 'vintage',
      title: 'Vintage',
      description: 'Latest fashion trends and statement pieces',
      imageSource: require('../../assets/images/styles/vintage-female.png'),
    },
    {
      id: 'athleisure',
      title: 'Athleisure',
      description: 'Timeless pieces for special occasions and events',
      imageSource: require('../../assets/images/styles/athleisure-female.png'),
    },
    {
      id: 'bohemian',
      title: 'Bohemian',
      description: 'Timeless pieces for special occasions and events',
      imageSource: require('../../assets/images/styles/bohemian-female.png'),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <HeaderWithLogo />

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarActive} />
            <View style={styles.progressBarActive} />
          </View>
          <Text style={styles.progressText}>
            <Text style={{ fontWeight: '900', fontSize: 20 }}>2</Text>/2
          </Text>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>Pick Your Style</Text>
          <Text style={styles.subtitle}>AI recommends styling based on your profile</Text>

          {/* Style Options */}
          <View style={styles.styleGrid}>
            {styleOptions.map((style) => (
              <StyleCard
                key={style.id}
                title={style.title}
                imageSource={style.imageSource}
                isSelected={selectedStyle === style.id}
                onPress={() => setSelectedStyle(style.id)}
              />
            ))}
          </View>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <PrimaryButton 
            title="Next"
            onPress={() => {
              if (selectedStyle) {
                console.log('Selected style:', selectedStyle)
                router.replace('/(home)')
              } else {
                console.log('Please select a style first')
              }
            }} 
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollView: {
        flex: 1,
    },
    
    // Progress Section
    progressSection: {
        paddingHorizontal: 20,
        marginBottom: 18,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        gap: 16,
    },
    progressContainer: {
        flexDirection: 'row',
        width: '80%',
        gap: 8,
        marginBottom: 10,
    },
    progressBarActive: {
        flex: 1,
        height: 6,
        backgroundColor: '#000',
        borderRadius: 2,
    },
    progressText: {
    fontSize: 14,
    fontWeight: 400,
    color: '#000',
    top:-6,
  },
    // Content
    contentSection: {
        paddingHorizontal: 20,
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00272E',
        textAlign: 'center',
        marginBottom: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#737373',
        textAlign: 'center',
        marginBottom: 36,
    },
    styleGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 40,
        paddingHorizontal: 4,
    },
    buttonContainer: {
        marginHorizontal: 20,
        // marginBottom: 40,
        marginTop: 10,
    },
})

export default FemalePickstyle