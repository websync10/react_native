import PrimaryButton from '@/components/PrimaryButton'
import HeaderWithLogo from '@/components/headerwithlogo'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

const AccountSetupScreen = () => {
  const [fullName, setFullName] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedSkinTone, setSelectedSkinTone] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [showSizeDropdown, setShowSizeDropdown] = useState(false)
  const [showSkinToneDropdown, setShowSkinToneDropdown] = useState(false)

  // Skin tone options with colors
  const getSkinToneOptions = () => {
    return [
      { name: 'Yellow', color: '#F1C27D' },
      { name: 'Fair', color: '#FDBCB4' },
      { name: 'Medium', color: '#E0AC69' },
      { name: 'Olive', color: '#C68642' },
      { name: 'Tan', color: '#8D5524' },
      { name: 'Dark', color: '#6B4423' }
    ]
  }

  // Size options based on gender
  const getSizeOptions = () => {
    if (selectedGender === 'Male') {
      return ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    } else if (selectedGender === 'Female') {
      return ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    }
    return ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] // Default to male sizes
  }

  // Reset size when gender changes
  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender)
    setSelectedSize('') // Reset size when gender changes
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <HeaderWithLogo />

        {/* Progress Section */}
        <View style={styles.progressSection}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBarActive} />
            <View style={styles.progressBarInactive} />
          </View>
            <Text style={styles.progressText}>
            <Text style={{ fontWeight: '900', fontSize: 18 }}>1</Text>/2
            </Text>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.title}>Set up your account</Text>
          <Text style={styles.subtitle}>Please complete your try-on information</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Full Name Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Full Name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            {/* Gender Section */}
            <View style={styles.genderSection}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderOptions}>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'Male' && styles.genderOptionSelected,
                  ]}
                  onPress={() => handleGenderChange('Male')}
                >
                  <View
                    style={[
                      styles.radioButton,
                      selectedGender === 'Male' && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedGender === 'Male' && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'Female' && styles.genderOptionSelected,
                  ]}
                  onPress={() => handleGenderChange('Female')}
                >
                  <View
                    style={[
                      styles.radioButton,
                      selectedGender === 'Female' && styles.radioButtonSelected,
                    ]}
                  >
                    {selectedGender === 'Female' && <View style={styles.radioButtonInner} />}
                  </View>
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Skin Tone Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Skin Tone</Text>
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
                    { backgroundColor: getSkinToneOptions().find(tone => tone.name === selectedSkinTone)?.color || '#F1C27D' }
                  ]} />
                  <Text style={styles.dropdownText}>
                    {selectedSkinTone || 'Yellow'}
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
                          selectedSkinTone === tone.name && styles.dropdownOptionSelected,
                          index === getSkinToneOptions().length - 1 && styles.dropdownOptionLast
                        ]}
                        onPress={() => {
                          setSelectedSkinTone(tone.name)
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
                            selectedSkinTone === tone.name && styles.dropdownOptionTextSelected
                          ]}>
                            {tone.name}
                          </Text>
                        </View>
                        {selectedSkinTone === tone.name && (
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
              <Text style={styles.inputLabel}>Size</Text>
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
                  {selectedSize || (selectedGender === 'Female' ? 'XXS' : 'XS')}
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
                Share your usual size to help us suggest the best fit
              </Text>
            </View>

            {/* Profile Photo Section */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Profile Photo</Text>
              <View style={styles.photoUploadContainer}>
                <View style={styles.dashedBorder}>
                  <Image
                    source={
                      selectedGender === 'Female' 
                        ? require('../../assets/images/femalevector.png')
                        : require('../../assets/images/MaleVector.png')
                    }
                    style={styles.humanFigure}
                    resizeMode="contain"
                  />
                </View>

                {/* Camera and Gallery Icons */}
                <View style={styles.photoActions}>
                  <TouchableOpacity style={styles.photoActionButton}>
                    <View style={styles.photoIconContainer}>
                        <Image style={styles.photoActionImage} source={require('../../assets/images/icons/gallery.png')} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.photoActionButton}>
                    <View style={styles.photoIconContainer}>
                      <Image style={styles.photoActionImage} source={require('../../assets/images/icons/camera.png')} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Info Section */}
            <View style={styles.infoSection}>
              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={styles.photoActionImage} source={require('../../assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Please keep the shooting environment clean and lighting appropriate for best fitting effect.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={styles.photoActionImage} source={require('../../assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Please wear fitted clothes and keep your hands out of your pockets.
                </Text>
              </View>

              <View style={styles.infoItem}>
                <View style={styles.checkIcon}>
                  <Image style={styles.photoActionImage} source={require('../../assets/images/icons/tick-circle.png')} />
                </View>
                <Text style={styles.infoText}>
                  Your photo stays private and securely stored — never shared!
                </Text>
              </View>
            </View>

            {/* Next Button */}
            <PrimaryButton 
              title="Next"
              onPress={() => {
                if (selectedGender === 'Male') {
                  router.push('/(auth)/MalePickstyle')
                } else if (selectedGender === 'Female') {
                  router.push('/(auth)/FemalePickstyle')
                } else {
                  // Optional: Show alert or validation message if no gender is selected
                  console.log('Please select a gender first')
                }
              }} 
            />
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
    marginBottom: 18,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    gap:16,
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
  progressBarInactive: {
    flex: 1,
    height: 6,
    backgroundColor: '#D3D3D3',
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
  formSection: {
    gap: 30,
  },
  inputSection: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#00272E',
    marginBottom: 2,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    height: 56,
  },
  // Gender
  genderSection: {
    gap: 16,
  },
  genderOptions: {
    flexDirection: 'row',
    gap: 16,
  },
  genderOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingRight: 32,
    paddingLeft:16,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    backgroundColor: '#FFFFFF',
    // flex: 1,
    gap: 12,
  },
  genderOptionSelected: {
    borderColor: '#000',
    backgroundColor: '#F8F8F8',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#000',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  genderText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  // Dropdown
  dropdownButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#D3D3D3',
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
    backgroundColor: '#FFD700',
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 14,
    color: '#666',
    transform: [{ rotate: '0deg' }],
  },
  dropdownArrowRotated: {
    transform: [{ rotate: '180deg' }],
    color: '#000000',
  },
  dropdownArrowImage: {
    width: 6,
    height: 12,
    transform: [{ rotate: '270deg' }], // Initially points down (left arrow rotated to point down)
  },
  dropdownArrowImageRotated: {
    transform: [{ rotate: '90deg' }], // Points up when dropdown is open
  },
  sizeSubtext: {
    fontSize: 14,
    color: '#737373',
    marginTop: 8,
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
  },
  dropdownOptionTextSelected: {
    color: '#000000',
    fontWeight: '600',
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
    borderColor: '#000000',
    backgroundColor: '#F8F8F8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dashedBorder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  humanFigure: {
    width: 120,
    height: 240,
    opacity: 0.6,
  },
  profilePlusButton: {
    position: 'absolute',
    top: 60,
    left: 80,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF1493',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profilePlusIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  photoActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 16,
  },
  photoActionButton: {
    width: 48,
    height: 48,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  photoIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoActionIcon: {
    fontSize: 24,
  },
  photoActionImage: {
    width: 24,
    height: 24,
  },
  // Info
  infoSection: {
    gap: 20,
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    color: '#737373',
    lineHeight: 24,
    flex: 1,
  },
  // Next Button
  nextButton: {
    backgroundColor: '#000000',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})

export default AccountSetupScreen
