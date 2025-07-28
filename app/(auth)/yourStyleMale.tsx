import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import StyleCardHorizontal from '@/components/StyleCardHorizontal'
import { FontFamily } from '@/constants/Fonts'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const MalePickstyle = () => {
  const [selectedStyle, setSelectedStyle] = useState<string[]>([])

  const handleContinue = () => {
    if (selectedStyle.length > 0) {
      console.log('Selected style:', selectedStyle)
      router.push('/(auth)/bodyShapeMale')
    } else {
      console.log('Please select a style first')
    }
  }

  const handleGoBack = () => {
    router.push('/(auth)/findYourFitMale')
  }

  const styleOptions = [
    {
      id: 'streetwear',
      title: 'Streetwear',
      description: 'Urban and trendy styles with modern edge',
      imageSource: require('../../assets/images/styles/streetwear-male.png'),
    },
    {
      id: 'classic',
      title: 'Classic',
      description: 'Timeless and sophisticated looks for any occasion',
      imageSource: require('../../assets/images/styles/classic-male.png'),
    },
    {
      id: 'businesscausal',
      title: 'Business Causal',
      description: 'Professional attire for work and formal meetings',
      imageSource: require('../../assets/images/styles/businesscasual-male.png'),
    },
    {
      id: 'workwear',
      title: 'Workwear',
      description: 'Athletic and active wear for fitness and sports',
      imageSource: require('../../assets/images/styles/workwear-male.png'),
    },
    {
      id: 'minimal',
      title: 'Minimal',
      description: 'Balanced blend of formal and casual elements',
      imageSource: require('../../assets/images/styles/minimal-male.png'),
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Progress Section */}
        <View style={styles.progressSection}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Image 
              source={require('@/assets/images/icons/leftarrow.png')} 
              style={styles.backArrowIcon}
            />
          </TouchableOpacity>
          
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={['#595CFF', '#C6F8FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressFill}
              />
            </View>
          </View>
          
          <View style={styles.progressCounterContainer}>
            <Text style={styles.progressCounterCurrent}>3</Text>
            <Text style={styles.progressCounterTotal}> of 4</Text>
          </View>
        </View>

        {/* Progress Divider */}
        <View style={styles.progressDivider} />

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>Pick Your Style</Text>
          <Text style={styles.subtitle}>Select up to 3 styles — AI will suggest outfits that match.</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Style Options */}
            <View style={styles.styleList}>
              {styleOptions.map((style) => (
                <StyleCardHorizontal
                  key={style.id}
                  title={style.title}
                  description={style.description}
                  imageSource={style.imageSource}
                isSelected={selectedStyle.includes(style.id)}
                onPress={() => {
                  if (selectedStyle.includes(style.id)) {
                    setSelectedStyle(selectedStyle.filter((id) => id !== style.id))
                  } else if (selectedStyle.length < 3) {
                    setSelectedStyle([...selectedStyle, style.id])
                  }
                }}
                />
              ))}
            </View>

            <View style={{gap:12, marginTop:-12,}}>

            {/* Continue Button */}
            <PrimaryButton 
              title="Continue"
              onPress={handleContinue}
            />
            
            {/* Secondary Button */}
            <SecondaryButton 
              title="Skip for now"
              onPress={() => router.push('/(home)')}
            /></View>
          </View>
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
    paddingVertical: 16, 
    // marginBottom: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top:6
  },
  backButton: {
    position: 'absolute',
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrowIcon: {
    width: 8,
    height: 16,
    left: -2,
  },
  progressBarContainer: {
    flex: 1,
    marginLeft: 60,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: '#F5F6F8',
    borderRadius: 50,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '75%', // 3 of 4 = 75%
    borderRadius: 50,
  },
  progressCounterContainer: {
    flexDirection: 'row',
    minWidth: 50,
    justifyContent: 'flex-end',
  },
  progressCounterCurrent: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#1F242D',
  },
  progressCounterTotal: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Regular,
    color: '#4E617B',
  },
  progressDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginTop: 10,
  },

  // Content
  contentSection: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#343640',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    color: '#8288A0',
    textAlign: 'center',
    marginBottom: 36,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  formSection: {
    gap: 30,
    marginBottom: 60, // Extra space before buttons
  },
  styleList: {
    // paddingBottom: 20,
  },
  styleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 20,
    paddingHorizontal: 4,
  },
  
})

export default MalePickstyle