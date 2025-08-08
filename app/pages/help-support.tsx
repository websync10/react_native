import Header from '@/components/Header';
import PrimaryButton from '@/components/PrimaryButton';
import { FontFamily } from '@/constants/Fonts';
import { createHelp } from '@/lib/actions/help&support/createHelp';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

export default function HelpSupportScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { userId } = useOnboardingStore()

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            Alert.alert('Error', 'Please fill in both the title and description fields.');
            return;
        }

        const helpData = {
            userId: userId,
            title: title,
            problem: description,
        }
        const response = await createHelp({ helpData })
        if (response.success) {
            setIsSubmitting(false);
            Alert.alert(
                'Success',
                'Your support request has been submitted successfully. We will get back to you soon.',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setTitle('');
                            setDescription('');
                        }
                    }
                ]
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#ffffff"
                    translucent={false}
                />

                {/* Header */}
                <Header title='Help & Support' />

                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Description */}
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.description}>
                            If you are experiencing any issues, please let us know,
                            We will try to solve them as soon as possible.
                        </Text>
                    </View>

                    {/* Title Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputLabel}>Title</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter title"
                                placeholderTextColor="#A0A0A0"
                                value={title}
                                onChangeText={setTitle}
                                maxLength={100}
                            />
                        </View>
                    </View>

                    {/* Description Input */}
                    <View style={styles.inputSection}>
                        <Text style={styles.inputLabel}>Explain the problem</Text>
                        <View style={[styles.inputContainer, styles.textAreaContainer]}>
                            <TextInput
                                style={[styles.textInput, styles.textArea]}
                                placeholder="Type your message"
                                placeholderTextColor="#A0A0A0"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={8}
                                textAlignVertical="top"
                                maxLength={1000}
                            />
                        </View>
                    </View>
                </ScrollView>

                {/* Submit Button */}
                <View style={{ padding: 24 }}>
                    <PrimaryButton title='Submit' onPress={handleSubmit} />
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D9D9D9',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000000',
        textAlign: 'center',
    },
    placeholder: {
        width: 40,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    descriptionContainer: {
        paddingVertical: 24,
    },
    description: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22,
    },
    inputSection: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#000000',
        marginBottom: 8,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#E5E5EA',
        borderRadius: 12,
        // backgroundColor: '#FAFAFA',
    },
    textAreaContainer: {
        height: 160,
    },
    textInput: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#000000',
    },
    textArea: {
        height: '100%',
        paddingTop: 14,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingBottom: 34,
        paddingTop: 16,
    },
    submitButton: {
        backgroundColor: '#000000',
        borderRadius: 100,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    submitButtonDisabled: {
        backgroundColor: '#E5E5EA',
    },
    submitButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#FFFFFF',
    },
    submitButtonTextDisabled: {
        color: '#8E8E93',
    },
});
