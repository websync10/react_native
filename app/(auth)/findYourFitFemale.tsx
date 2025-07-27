import { openCamera, pickFromGallery } from '@/components/onboarding/HumanFigurePicker'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import { FontFamily } from '@/constants/Fonts'
import { useOnboardingStore } from '@/lib/stores/onboardingStore'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const FindYourFitFemaleScreen = () => {
  const [showSkinToneDropdown, setShowSkinToneDropdown] = useState(false)
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)

  const { image, skin_tone, size, setField } = useOnboardingStore()

  const getSkinToneOptions = () => {
    return [
      { name: 'Very Light', color: '#F2C69E' },
      { name: 'Light', color: '#EDA46D' },
      { name: 'Fair', color: '#FDBCB4' },
      { name: 'Medium Light', color: '#EDD1A9' },
      { name: 'Medium', color: '#E0AC69' },
      { name: 'Medium Dark', color: '#D0AA82' },
      { name: 'Olive', color: '#C68642' },
      { name: 'Tan', color: '#C28847' },
      { name: 'Brown', color: '#E5A189' },
      { name: 'Golden', color: '#A9571F' },
      { name: 'Dark Brown', color: '#814929' },
      { name: 'Deep Brown', color: '#C17733' },
      { name: 'Very Dark', color: '#8D5524' },
      { name: 'Espresso', color: '#814829' },
      { name: 'Ebony', color: '#512E17' }
    ]
  }

  // Female size options
  const getSizeOptions = () => {
    return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
  }

  const handleContinue = () => {
    // Navigate to next step - you can customize this based on your flow
    router.push('/(auth)/yourStyleFemale')
  }

  const handleGoBack = () => {
    router.push('/(auth)/accountsetup')
  }

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
            {/* Skin Tone Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>What&apos;s your skin tone?</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  showSkinToneDropdown && styles.dropdownButtonActive
                ]}
                onPress={() => setShowSkinToneDropdown(!showSkinToneDropdown)}
                activeOpacity={0.7}
              >
                <View style={styles.dropdownContent}>
                  <View style={[
                    styles.colorIndicator,
                    { backgroundColor: getSkinToneOptions().find(tone => tone.name === skin_tone)?.color || '#F1C27D' }
                  ]} />
                  <Text style={styles.dropdownText}>
                    {skin_tone || 'Limestone'}
                  </Text>
                  <Image
                    source={require('@/assets/images/icons/leftarrow.png')}
                    style={[
                      styles.dropdownArrowImage,
                      showSkinToneDropdown && styles.dropdownArrowImageRotated
                    ]}
                  />
                </View>
              </TouchableOpacity>

              {/* Skin Tone Slider/Options */}
              <View style={styles.skinToneSlider}>
                <View style={styles.skinToneGradient}>
                  {getSkinToneOptions().map((tone, index) => (
                    <TouchableOpacity
                      key={tone.name}
                      style={[
                        styles.skinToneOption,
                        { backgroundColor: tone.color },
                        skin_tone === tone.name && styles.skinToneOptionSelected
                      ]}
                      onPress={() => {
                        setField("skin_tone", tone.name)
                        setShowSkinToneDropdown(false)
                      }}
                    />
                  ))}
                </View>
              </View>

              {/* Skin Tone Options Dropdown */}
              {showSkinToneDropdown && (
                <View style={styles.dropdownOptions}>
                  <ScrollView
                    style={styles.dropdownScrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={true}
                    scrollIndicatorInsets={{ right: 1 }}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                  >
                    {getSkinToneOptions().map((tone, index) => (
                      <TouchableOpacity
                        key={tone.name}
                        style={[
                          styles.dropdownOption,
                          skin_tone === tone.name && styles.dropdownOptionSelected,
                          index === getSkinToneOptions().length - 1 && styles.dropdownOptionLast
                        ]}
                        onPress={() => {
                          setField("skin_tone", tone.name)
                          setShowSkinToneDropdown(false)
                        }}
                        activeOpacity={0.7}
                      >
                        <View style={styles.skinToneOptionContent}>
                          <View style={[
                            styles.skinToneColorIndicator,
                            { backgroundColor: tone.color }
                          ]} />
                          <Text style={[
                            styles.dropdownOptionText,
                            skin_tone === tone.name && styles.dropdownOptionTextSelected
                          ]}>
                            {tone.name}
                          </Text>
                        </View>
                        {skin_tone === tone.name && (
                          <Text style={styles.checkMark}>✓</Text>
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
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
                    {size || 'XL'}
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
                    {getSizeOptions().map((s, index) => (
                      <TouchableOpacity
                        key={s}
                        style={[
                          styles.dropdownOption,
                          size === s && styles.dropdownOptionSelected,
                          index === getSizeOptions().length - 1 && styles.dropdownOptionLast
                        ]}
                        onPress={() => {
                          setField("size", s)
                          setShowSizeDropdown(false)
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={[
                          styles.dropdownOptionText,
                          size === s && styles.dropdownOptionTextSelected
                        ]}>
                          {s}
                        </Text>
                        {s === s && (
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
                    source={
                      image
                        ? { uri: image }
                        : require('../../assets/images/femalevector.png')
                    }
                    style={image == "" ? styles.humanFigure : styles.imageFigure}
                    resizeMode="contain"
                  />
                </View>

                {/* Horizontal Line */}
                <View style={styles.horizontalLine} />

                {/* Camera and Gallery Icons */}
                <View style={styles.photoActions}>
                  <TouchableOpacity style={styles.photoActionButton}
                    onPress={async () => {
                      const uri = await pickFromGallery();
                      if (uri) {
                        setField("image", uri);
                      }
                    }}>

                    <Text style={styles.photoActionText}>Gallery</Text>

                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoActionButton}
                    onPress={async () => {
                      const uri = await openCamera();
                      if (uri) {
                        setField("image", uri);
                      }
                    }}>

                    <Text style={styles.photoActionText}>Camera</Text>

                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={{ width: 18, height: 18, }} source={require('@/assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Please keep the shooting environment clean and lighting appropriate for best fitting effect.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={{ width: 18, height: 18, }} source={require('@/assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Please wear fitted clothes and keep your hands out of your pockets.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={{ width: 18, height: 18, }} source={require('@/assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Your photo stays private and securely stored — never shared!
                </Text>
              </View>
            </View>

            <View style={{ gap: 12, }}>

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
  imageFigure: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
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
  backArrow: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
  },
  backArrowIcon: {
    width: 8,
    height: 16,
    left: -2
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
    width: '50%',
    borderRadius: 50,
  },
  progressCounter: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 50,
    textAlign: 'center',

  },
  progressCounterContainer: {
    flexDirection: 'row',
    minWidth: 50,
    justifyContent: 'flex-end',
    alignItems: "center",
  },
  progressCounterCurrent: {
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#1F242D',
    top: Platform.OS === 'ios' ? -2 : 0,
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
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: FontFamily.HelveticaNeue.Medium,
    color: '#00272E',
    marginBottom: 2,
  },

  // Skin Tone Slider
  skinToneSlider: {
    marginTop: 16,
    marginBottom: 8,
  },
  skinToneGradient: {
    flexDirection: 'row',
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 8,
  },
  skinToneOption: {
    flex: 1,
    height: '100%',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  skinToneOptionSelected: {
    borderColor: '#000',
    transform: [{ scale: 1.1 }],
  },

  // Dropdown
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
  colorIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F1C27D',
    marginRight: 12,
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

  // Skin Tone Specific Styles
  skinToneOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  skinToneColorIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },

  // Profile Photo
  photoUploadContainer: {
    borderRadius: 12,
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
  dashedBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  humanFigure: {
    width: 115,
    height: 226,
    opacity: 1,
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '49%'
  },
  photoIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  photoActionImage: {
    width: 32,
    height: 32,
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
  bulletPoint: {
    fontSize: 16,
    color: '#333',
    fontFamily: FontFamily.HelveticaNeue.Regular,
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
