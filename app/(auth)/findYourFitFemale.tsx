import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import { FontFamily } from '@/constants/Fonts'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Svg, { Circle, Defs, Filter, G, Path } from 'react-native-svg'

const FindYourFitFemaleScreen = () => {
  const [selectedSkinTone, setSelectedSkinTone] = useState('Medium')
  const [selectedSize, setSelectedSize] = useState('')
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)

  // Skin tone options with colors
  const getSkinToneOptions = () => {
    return [
      { name: 'Very Light', color: '#efd1c8' },
      { name: 'Light', color: '#e9b697' },
      { name: 'Fair', color: '#e5a189' },
      { name: 'Medium Light', color: '#edd1a9' },
      { name: 'Medium', color: '#f2c69e' },
      { name: 'Medium Dark', color: '#eda46d' },
      { name: 'Olive', color: '#d0aa82' },
      { name: 'Tan', color: '#c28847' },
      { name: 'Brown', color: '#c17733' },
      { name: 'Golden Brown', color: '#a9571f' },
      { name: 'Dark', color: '#814829' },
      { name: 'Deep Brown', color: '#512e17' },
    ]
  }

  // Female size options
  const getSizeOptions = () => {
    return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  }

  const handleSkinToneSelect = (toneName: React.SetStateAction<string>) => {
    setSelectedSkinTone(toneName)
  }

  const handleContinue = () => {
    // Navigate to next step - you can customize this based on your flow
    router.push('/(auth)/yourStyleFemale')
  }

  const handleGoBack = () => {
    router.push('/(auth)/accountsetup')
  }

  const selectedSkinToneData = getSkinToneOptions().find(tone => tone.name === selectedSkinTone)

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
            <Text style={styles.progressCounterCurrent}>2</Text>
            <Text style={styles.progressCounterTotal}> of 4</Text>
          </View>
        </View>

        {/* Progress Divider */}
        <View style={styles.progressDivider} />

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>Help Us Find Your Fit</Text>
          <Text style={styles.subtitle}>Please complete your try-on information</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Enhanced Skin Tone Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>What&apos;s your skin tone?</Text>
              
              {/* Selected Skin Tone Display */}
              <Animated.View 
                style={[
                  styles.selectedSkinToneDisplay,
                  
                ]}
              >
                <View style={styles.selectedSkinToneContent}>
                  <View style={[
                    styles.selectedColorIndicator,
                    { backgroundColor: selectedSkinToneData?.color || '#E0AC69' }
                  ]} />
                  <Text style={styles.selectedSkinToneText}>
                    {selectedSkinTone}
                  </Text>
                </View>
              </Animated.View>

              {/* Interactive Skin Tone Slider */}
              <View style={styles.skinToneSliderContainer}>
                <View style={styles.skinToneGradient}>
                  {getSkinToneOptions().map((tone, index) => {
                    const isSelected = selectedSkinTone === tone.name
                    return (
                      <TouchableOpacity
                        key={tone.name}
                        style={[
                          styles.skinToneOption,
                          { backgroundColor: tone.color },
                          isSelected && styles.skinToneOptionSelected
                        ]}
                        onPress={() => handleSkinToneSelect(tone.name)}
                        activeOpacity={0.8}
                      >
                        {isSelected && (
                          <View style={styles.selectedIndicator}>
                            <Svg width={22} height={50} viewBox="0 0 22 50" fill="none">
                              <Path d="M10.9561 1V49" strokeWidth={1.5} stroke="black" strokeLinecap="round" />
                              <G filter="url(#filter0_d_100_1911)">
                                <Circle cx={11} cy={25} r={8} fill="#030318" />
                                <Circle cx={11} cy={25} r={8} stroke="white" />
                              </G>
                              <Defs>
                                <Filter
                                  id="filter0_d_100_1911"
                                  x={0.5}
                                  y={16.5}
                                  width={21}
                                  height={21}
                                  filterUnits="userSpaceOnUse"
                                  // colorInterpolationFilters="sRGB"
                                >
                                </Filter>
                              </Defs>
                            </Svg>

                            {/* <View style={styles.selectedDot} /> */}
                          </View>
                        )}
                      </TouchableOpacity>
                    )
                  })}
                </View>
                
              </View>
            </View>

            {/* Size Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Clothing size</Text>
              <TouchableOpacity 
                style={[
                  styles.dropdownButton,
                  showSizeDropdown && styles.dropdownButtonActive
                ]}
                onPress={() => setShowSizeDropdown(!showSizeDropdown)}
                activeOpacity={0.7}
              >
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>
                    {selectedSize || 'XL'}
                  </Text>
                  <Image 
                    source={require('@/assets/images/icons/leftarrow.png')} 
                    style={[
                      styles.dropdownArrowImage,
                      showSizeDropdown && styles.dropdownArrowImageRotated
                    ]} 
                  />
                </View>
              </TouchableOpacity>
              
              {/* Size Options Dropdown */}
              {showSizeDropdown && (
                <View style={styles.dropdownOptions}>
                  <ScrollView 
                    style={styles.dropdownScrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    scrollIndicatorInsets={{ right: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    {getSizeOptions().map((size, index) => (
                      <TouchableOpacity
                        key={size}
                        style={[
                          styles.dropdownOption,
                          selectedSize === size && styles.dropdownOptionSelected,
                          index === getSizeOptions().length - 1 && styles.dropdownOptionLast
                        ]}
                        onPress={() => {
                          setSelectedSize(size)
                          setShowSizeDropdown(false)
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          selectedSize === size && styles.dropdownOptionTextSelected
                        ]}>
                          {size}
                        </Text>
                        {selectedSize === size && (
                          <Text style={styles.checkMark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
              
              <Text style={styles.sizeSubtext}>
                Help us understand your clothing size to improve your fitting.
              </Text>
            </View>

            {/* Profile Photo Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Profile Photo</Text>
              <View style={styles.photoUploadContainer}>
                <View style={styles.figureContainer}>
                  <Image
                    source={require('../../assets/images/femalevector.png')}
                    style={styles.humanFigure}
                    resizeMode="contain"
                  />
                </View>

                {/* Horizontal Line */}
                <View style={styles.horizontalLine} />

                {/* Camera and Gallery Icons */}
                <View style={styles.photoActions}>
                  <TouchableOpacity style={styles.photoActionButton}>
                    <Text style={styles.photoActionText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoActionButton}>
                    <Text style={styles.photoActionText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={{width:18, height:18,}} source={require('@/assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Please keep the shooting environment clean and lighting appropriate for best fitting effect.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={{width:18, height:18,}} source={require('@/assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Please wear fitted clothes and keep your hands out of your pockets.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={{width:18, height:18,}} source={require('@/assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Your photo stays private and securely stored — never shared!
                </Text>
              </View>
            </View>

            <View style={{gap:12,}}>
              {/* Continue Button */}
              <PrimaryButton 
                title="Continue"
                onPress={handleContinue}
              />
              
              {/* Secondary Button */}
              <SecondaryButton 
                title="Skip for now"
                onPress={() => router.push('/(home)')}
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
    left:-2
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
    width: '50%', // 2 of 4 = 50%
    backgroundColor: '#4A90E2',
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
    marginBottom: 60,
  },
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#00272E',
    marginBottom: 2,
  },

  // Enhanced Skin Tone Selection
  selectedSkinToneDisplay: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    height: 56,
    justifyContent: 'center',
  },
  selectedSkinToneContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedColorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedSkinToneText: {
    fontSize: 16,
    color: '#333',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },

  // Interactive Skin Tone Slider
  skinToneSliderContainer: {
    marginTop: 20,
    // marginBottom: 8,
  },
  skinToneGradient: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 12,
  },
  skinToneOption: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    minWidth: 0,
    margin: 0,
    padding: 0,
  },
  skinToneOptionSelected: {
    borderWidth: 0,
    // borderColor: '#000',
    transform: [{ scale: 1.05 }],
    zIndex: 10,
    // borderRadius: 25,
    // margin: -1.5,
  },
  selectedIndicator: {
    width: '1%',
    height: '1%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow:'visible',
  },
  selectedDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#000',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
  },

  // Dropdown (for size selection)
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    height: 56,
  },
  dropdownButtonActive: {
    borderColor: '#000000',
    borderWidth: 2,
    backgroundColor: '#F8F8F8',
  },
  dropdownContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  dropdownArrowImage: {
    width: 6,
    height: 12,
    transform: [{ rotate: '270deg' }],
  },
  dropdownArrowImageRotated: {
    transform: [{ rotate: '90deg' }],
  },
  sizeSubtext: {
    fontSize: 14,
    color: '#8288A0',
    marginTop: 8,
    lineHeight: 21,
    letterSpacing: -0.24,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },

  // Dropdown Options Styles
  dropdownOptions: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    marginTop: 1,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    zIndex: 1000,
    maxHeight: 300,
  },
  dropdownScrollView: {
    flexGrow: 1,
  },
  dropdownOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    minHeight: 48,
  },
  dropdownOptionLast: {
    borderBottomWidth: 0,
  },
  dropdownOptionSelected: {
    backgroundColor: '#F5F5F5',
    borderBottomColor: '#E0E0E0',
    borderLeftWidth: 2,
    borderLeftColor: '#000000',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  dropdownOptionTextSelected: {
    color: '#000000',
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
  checkMark: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
  },

  // Profile Photo
  photoUploadContainer: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    backgroundColor: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  figureContainer: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  horizontalLine: {
    width: '112%',
    height: 1.5,
    backgroundColor: '#D9DBE2',
    marginVertical: 16,
  },
  humanFigure: {
    width: 115,
    height: 226,
    opacity: 1,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    gap: 12,
  },
  photoActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#030318',
    width:'49%'
  },
  photoActionText: {
    fontSize: 14,
    color: '#333',
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },

  // Info
  infoSection: {
    gap: 16,
    marginTop: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#8288A0',
    lineHeight: 20,
    flex: 1,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
})

export default FindYourFitFemaleScreen