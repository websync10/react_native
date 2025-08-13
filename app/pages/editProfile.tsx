
import CustomAlert from '@/components/CustomAlert';
import Header from '@/components/Header';
import DatePickerField from '@/components/onboarding/DatePickerField';
import PrimaryButton from '@/components/PrimaryButton';
import SecondaryButton from '@/components/SecondaryButton';
import { FontFamily } from '@/constants/Fonts';
import { updateProfile } from '@/lib/actions/users/updateProfile';
import { useProfileRefresh } from '@/lib/contexts/ProfileRefreshContext';
import { uploadToCloudinary } from '@/lib/services/upload-images/uploadToCloudinary';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { useCustomAlert } from '@/lib/utils/customAlert';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditProfileScreen = () => {
  const { userId, fullName, username, gender, image, dob, setField } = useOnboardingStore();
  const { triggerProfileRefresh } = useProfileRefresh();
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const { alertState, showError, showInfo, showSuccess, showConfirmation, hideAlert } = useCustomAlert();
  const [showImagePickerModal, setShowImagePickerModal] = useState(false);

  const handleGenderChange = (gender: string) => {
    setField("gender", gender);
    setHasChanges(true);
  };

  const handleFieldChange = (field: string, value: string) => {
    setField(field as any, value);
    setHasChanges(true);
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      showError('Permission Denied', 'We need gallery permission to proceed.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
      setHasChanges(true);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      showError('Permission Denied', 'We need camera permission to proceed.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0].uri);
      setHasChanges(true);
    }
  };

  const showImagePickerOptions = () => {
    setShowImagePickerModal(true);
  };

  const handleSave = async () => {
    if (!hasChanges) {
      showInfo('No Changes', 'No changes to save.');
      return;
    }

    setUploading(true);

    try {
      let cloudUrl: string | null = image || null; // Use existing image by default

      // Upload image if changed
      if (localImage) {
        const uploadedUrl = await uploadToCloudinary(localImage);
        if (uploadedUrl) {
          cloudUrl = uploadedUrl;
          setField('image', uploadedUrl);
        } else {
          showError('Upload Failed', 'Could not upload image. Please try again.');
          setUploading(false);
          return;
        }
      }

      // Prepare profile data for database update
      const profileData = {
        full_name: fullName,
        username: username,
        avatar_url: cloudUrl || null,
      };

      // Update the profiles table
      const result = await updateProfile(userId, profileData);
      
      if (result.success) {
        // Trigger profile refresh to update sidebar and other components
        triggerProfileRefresh();
        
        // Show success message
        showSuccess('Success', 'Profile updated successfully!', () => {
          setHasChanges(false);
          setLocalImage(null);
        });
      } else {
        showError('Error', 'Failed to update profile in database. Please try again.');
      }
    } catch (error) {
      showError('Error', 'Failed to update profile. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      showConfirmation(
        'Discard Changes',
        'Are you sure you want to discard your changes?',
        () => router.back(),
        'Cancel',
        'Discard'
      );
    } else {
      router.back();
    }
  };

  const displayImage = localImage || image;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: 32 }]}>
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
                source={displayImage ? { uri: displayImage } : require('@/assets/images/logo.png')}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.cameraButton} onPress={showImagePickerOptions}>
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
                onChangeText={(text) => handleFieldChange("fullName", text)}
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
                onChangeText={(text) => handleFieldChange("username", text)}
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
            {/* Date of Birth */}
            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Date of birth</Text>
              <DatePickerField 
                styles={styles} 
                onDateChange={() => setHasChanges(true)}
              />
            </View>
          </View>

          {/* Save Button */}
          <View style={styles.buttons}>
            <PrimaryButton
              title={uploading ? "Saving..." : "Save"}
              onPress={handleSave}
              disabled={!hasChanges || uploading}
            />
            <SecondaryButton title='Cancel' onPress={handleCancel} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      {/* Custom Image Picker Modal */}
      <Modal
        visible={showImagePickerModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowImagePickerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Image</Text>
            <Text style={styles.modalSubtitle}>Choose how you want to select an image</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowImagePickerModal(false);
                  openCamera();
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={24} color="#fff" />
                <Text style={styles.modalButtonText}>Camera</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowImagePickerModal(false);
                  pickFromGallery();
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="images" size={24} color="#fff" />
                <Text style={styles.modalButtonText}>Gallery</Text>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowImagePickerModal(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <CustomAlert
        visible={alertState.visible}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={hideAlert}
        onConfirm={alertState.onConfirm}
        confirmText={alertState.confirmText}
        cancelText={alertState.cancelText}
        showCancel={alertState.showCancel}
      />
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
    marginTop: 8,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: FontFamily.HelveticaNeue.Bold,
    color: '#00332E',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: FontFamily.HelveticaNeue.Regular,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#00332E',
    gap: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#D9DBE2',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontFamily: FontFamily.HelveticaNeue.Medium,
  },
});

export default EditProfileScreen;
