
import Header from '@/components/Header';
import PrimaryButton from '@/components/PrimaryButton';
import { FontFamily } from '@/constants/Fonts';
import { router } from 'expo-router';
import React, { useState } from 'react';
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
  View,
} from 'react-native';

const EditProfileScreen = () => {
  const [fullName, setFullName] = useState('Robert Lowsky');
  const [username, setUsername] = useState('robertlowsky');
  const [selectedGender, setSelectedGender] = useState('Male');
  const [dateOfBirth, setDateOfBirth] = useState('November 27, 2000');

  const handleGenderChange = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleSave = () => {
    // Save logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}

          <Header title='Edit Profile' />

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://picsum.photos/120/120' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton}>
                <View style={styles.cameraIconBg}>
                  <Image
                    source={require('@/assets/images/icons/camera.png')}
                    style={styles.cameraIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Full Name */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Full name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Full name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
            {/* Username */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            {/* Gender */}
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
                  <Text style={styles.genderText}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.genderOption,
                    selectedGender === 'Female' && styles.genderOptionSelected,
                  ]}
                  onPress={() => handleGenderChange('Female')}
                >
                  <Text style={styles.genderText}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Date of Birth */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={styles.dateInput}
                  placeholder="Date of birth"
                  placeholderTextColor="#999"
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
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

          {/* Save Button */}
          <View style={styles.buttons}>
            {/* onPress={handleSave} */}
            <PrimaryButton title="Save" onPress={()=>{router.push('/findYourFitMale')}} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 20,
    color: '#00332E',
    fontFamily: FontFamily.HelveticaNeue.Medium,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop:8,
  },
  avatarContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#f0f0f0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cameraIconBg: {
    backgroundColor: '#0A0A0A',
    borderRadius: 20,
    padding: 6,
  },
  cameraIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  formSection: {
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
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
    paddingTop: 104,
  },
});

export default EditProfileScreen;
