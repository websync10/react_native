import { styles } from '@/assets/styles/page-one-styles';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const PageOne = () => {
    const [showPicker, setShowPicker] = useState(false);
    const { fullName, username, gender, dob, setField } = useOnboardingStore();

    const handleDateChange = (event: any, date?: Date) => {
        setShowPicker(Platform.OS === 'ios')
        if (date) {
            const formatted = date.toISOString().split('T')[0];
            setField("dob", formatted)
        }
    }

    const handleCancel = () => {
        setField("fullName", "");
        setField("username", "");
        setField("gender", "");
        setField("dob", "");
    }

    const handleSave = () => {
        if (fullName != "" && username != "" && gender != "" && dob != "") {
            console.log('Form saved:', {
                fullName,
                username,
                gender,
                dob,
            });
            router.push({
                pathname: '/(auth)/pagetwo',
            });
        } else {
            Alert.alert("Please fill the field to proceed!")
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(auth)/login")}>
                    <Icon name="arrow-back-ios" size={20} color="#555" style={{ left: 5 }} />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                    <LinearGradient
                        colors={['lightblue', 'white', "white", 'white']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.container}
                    >
                    </LinearGradient>
                </View>

                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>1 of 4</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Let's Get to Know You</Text>
                <Text style={styles.subtitle}>Please complete your try-on information</Text>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Full name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter full name"
                        placeholderTextColor="#999"
                        value={fullName}
                        onChangeText={(text) => setField('fullName', text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter username"
                        placeholderTextColor="#999"
                        value={username}
                        onChangeText={(text) => setField("username", text)}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Gender</Text>
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                gender === 'Male' && styles.genderButtonSelected,
                            ]}
                            onPress={() => setField('gender', 'Male')}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === 'Male' && styles.genderTextSelected,
                                ]}
                            >
                                Male
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.genderButton,
                                gender === 'Female' && styles.genderButtonSelected,
                            ]}
                            onPress={() => setField('gender', 'Female')}
                        >
                            <Text
                                style={[
                                    styles.genderText,
                                    gender === 'Female' && styles.genderTextSelected,
                                ]}
                            >
                                Female
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date of birth</Text>

                    <TouchableOpacity onPress={() => setShowPicker(true)}>
                        <View style={styles.dateInputContainer}>
                            <TextInput
                                style={styles.dateInput}
                                placeholder="Enter your birth"
                                placeholderTextColor="#999"
                                value={dob}
                                editable={false}
                                pointerEvents="none"
                            />
                            <Icon name="calendar-today" size={20} color="#666" />
                        </View>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={new Date(dob)}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            maximumDate={new Date()}
                        />
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default PageOne;