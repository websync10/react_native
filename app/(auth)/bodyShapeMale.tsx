import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
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

const BodyShapeMale = () => {
  const [selectedShape, setSelectedShape] = useState<string>('')

  const handleContinue = () => {
    if (selectedShape) {
      console.log('Selected body shape:', selectedShape)
      router.push('/(home)')
    } else {
      console.log('Please select a body shape first')
    }
  }

const handleGoBack = () => {
    router.push('/(auth)/yourStyleMale')
}

  const bodyShapeOptions = [
    {
      id: 'rectangle',
      title: 'Rectangle',
      description: 'Shoulders and hips are roughly the same width; torso goes straight down with little taper at the waist. Think tall, lean frames.',
    },
    {
      id: 'triangle',
      title: 'Triangle',
      description: 'Hips and waist are wider than the shoulders, giving a bottom-heavy appearance. Often seen in men who carry weight in the belly or lower body.',
    },
    {
      id: 'inverted-triangle',
      title: 'Inverted Triangle',
      description: 'Broad shoulders and chest, narrowing dramatically to a slim waist and hips. Classic "V-shape" many bodybuilders chase.',
    },
    {
      id: 'oval-round',
      title: 'Oval (or Round)',
      description: 'Midsection is wider than shoulders and hips, with more weight carried around the belly area.',
    },
    {
      id: 'trapezoid',
      title: 'Trapezoid',
      description: 'Widest at the shoulders, slightly narrower at the waist and hips, but not as exaggerated as the inverted triangle. Often considered the "ideal" male shape in fashion.',
    },
  ]

  const renderBodyShapeCard = (shape: any) => (
    <TouchableOpacity
      key={shape.id}
      style={[
        styles.shapeCard,
        selectedShape === shape.id && styles.shapeCardSelected
      ]}
      onPress={() => setSelectedShape(shape.id)}
    >
      <View style={styles.shapeCardContent}>
        <Text style={styles.shapeTitle}>{shape.title}</Text>
        <Text style={styles.shapeDescription}>{shape.description}</Text>
      </View>
    </TouchableOpacity>
  )

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
            <Text style={styles.progressCounterCurrent}>4</Text>
            <Text style={styles.progressCounterTotal}> of 4</Text>
          </View>
        </View>

        {/* Progress Divider */}
        <View style={styles.progressDivider} />

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>What&apos;s Your Body Shape?</Text>
          <Text style={styles.subtitle}>AI will recommend outfits based on your selection.</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Body Shape Options */}
            <View style={styles.shapeList}>
              {bodyShapeOptions.map(renderBodyShapeCard)}
            </View>

            <View style={styles.buttonContainer}>
              {/* Continue Button */}
              <PrimaryButton 
                title="Save"
                onPress={handleContinue}
              />
              
              {/* Secondary Button */}
              <SecondaryButton 
                title="Cancel"
                onPress={() => router.back()}
              />
            </View>
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
    marginBottom: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: 48,
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
    width: '100%', // 4 of 4 = 100%
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
    color: '#343640',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 2,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  subtitle: {
    fontSize: 14,
    color: '#8288A0',
    textAlign: 'center',
    marginBottom: 36,
    // fontFamily: 'HelveticaNeueLight',
    // fontWeight: '400',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  formSection: {
    gap: 30,
    marginBottom: 60,
  },
  shapeList: {
    gap: 16,
  },
  
  // Shape Card Styles
  shapeCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    padding: 16,
    alignItems: 'flex-start',
  },
  shapeCardSelected: {
    borderColor: '#000',
    backgroundColor: '#fff ',
  },
  shapeCardContent: {
    flex: 1,
  },
  shapeTitle: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#1F242D',
    marginBottom: 8,
  },
  shapeDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    textAlign: 'justify'
  },
  buttonContainer: {
    gap: 12,
  },
})

export default BodyShapeMale