import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import { FontFamily } from '@/constants/Fonts'
import { useOnboardingStore } from '@/lib/stores/onboardingStore'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import React from 'react'
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

const AccountSetupScreen = () => {
  const { fullName, username, gender, dob, setField } = useOnboardingStore();

  // Reset size when gender changes
  const handleGenderChange = (gender: string) => {
    setField("gender", gender)
  }

  const handleGoBack = () => {
    router.push('/(auth)/login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          {/* <HeaderWithLogo /> */}

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
              <Text style={styles.progressCounterCurrent}>1</Text>
              <Text style={styles.progressCounterTotal}> of 4</Text>
            </View>
          </View>

          {/* Progress Divider */}
          <View style={styles.progressDivider} />

          {/* Content Section */}
          <View style={styles.contentSection}>
            <Text style={styles.title}>Let&apos;s Get to Know You</Text>
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
                  onChangeText={(text) => setField("fullName", text)}
                  autoCapitalize="words"
                />
              </View>
              {/* Username Section */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={(text) => setField("username", text)}
                  autoCapitalize="none"
                />
              </View>

              {/* Gender Section */}
              <View style={styles.genderSection}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.genderOptions}>
                  <TouchableOpacity
                    style={[
                      styles.genderOption,
                      gender === 'Male' && styles.genderOptionSelected,
                    ]}
                    onPress={() => handleGenderChange('Male')}
                  >
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.genderOption,
                      gender === 'Female' && styles.genderOptionSelected,
                    ]}
                    onPress={() => handleGenderChange('Female')}
                  >
                    <Text style={styles.genderText}>Female</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Date of Birth Section */}
              <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Date of birth</Text>
                <View style={styles.dateInputContainer}>
                  <TextInput
                    style={styles.dateInput}
                    placeholder="Enter your birth"
                    placeholderTextColor="#999"
                    value={dob}
                    onChangeText={(dob) => setField("dob", dob)}
                  />
                  <TouchableOpacity style={styles.calendarButton}>
                    <View style={styles.calendarIcon}>
                      <View style={styles.calendarTop} />
                      <View style={styles.calendarBody}>
                        <View style={styles.calendarGrid}>
                          <View style={styles.calendarDot} />
                          <View style={styles.calendarDot} />
                          <View style={styles.calendarDot} />
                          <View style={styles.calendarDot} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Fixed Bottom Buttons */}
          <View style={styles.buttons}>
            <PrimaryButton
              title="Save"
              onPress={() => {
                if (gender === 'Male') {
                  router.push('/(auth)/findYourFitMale')
                } else if (gender === 'Female') {
                  router.push('/(auth)/findYourFitFemale')
                } else {
                  console.log('Please select a gender first')
                }
              }}
            />
            <SecondaryButton title='Cancel' onPress={() => { }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  scrollContentContainer: {
    flexGrow: 1,
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
    width: '25%', // 1 of 4 = 25%
    backgroundColor: '#4A90E2',
    borderRadius: 50,
  },
  progressCounter: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#333',
    minWidth: 50,
    textAlign: 'right',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  progressCounterContainer: {
    flexDirection: 'row',
    minWidth: 50,
    justifyContent: 'flex-end',
  },
  progressCounterCurrent: {
    fontSize: 16,
    color: '#1F242D',
    fontFamily: FontFamily.HelveticaNeue.Bold,
  },
  progressCounterTotal: {
    fontSize: 16,
    color: '#4E617B',
    fontFamily: FontFamily.HelveticaNeue.Regular,
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
    fontFamily: FontFamily.HelveticaNeue.Bold,
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
    color: '#00272E',
    marginBottom: 2,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#D9DBE2',
    height: 56,
    fontFamily: FontFamily.HelveticaNeue.Regular,
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
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    backgroundColor: '#FFFFFF',
    flex: 1,
    gap: 12,
  },
  genderOptionSelected: {
    borderColor: '#000',
    backgroundColor: '#F8F8F8',
  },
  genderText: {
    fontSize: 16,
    color: '#000',
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },

  // Date of Birth
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D9DBE2',
    height: 56,
    paddingHorizontal: 16,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 16,
  },
  calendarButton: {
    padding: 4,
  },
  calendarIcon: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarTop: {
    width: 16,
    height: 2,
    backgroundColor: '#666',
    borderRadius: 1,
    marginBottom: 1,
  },
  calendarBody: {
    width: 18,
    height: 14,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 12,
    height: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calendarDot: {
    width: 2,
    height: 2,
    backgroundColor: '#666',
    borderRadius: 1,
    margin: 0.5,
  },
  buttons: {
    gap: 12,
    marginHorizontal: 20,
    paddingBottom: 64, // Safe area bottom padding
  }
})

export default AccountSetupScreen
