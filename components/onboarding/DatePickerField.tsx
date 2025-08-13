import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
    Alert,
    Button,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function DatePickerField({ styles, onDateChange }: { styles: any; onDateChange?: () => void }) {
    const [showPicker, setShowPicker] = useState(false);
    const { dob, setField } = useOnboardingStore()
    const [date, setDate] = useState(dob ? new Date(dob) : new Date(2000));

    const handleChange = (event: any, selectedDate: any) => {
        if (!selectedDate) return;

        const today = new Date();
        const birthDate = new Date(selectedDate);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        const isBirthdayPassed = m > 0 || (m === 0 && today.getDate() >= birthDate.getDate());

        const finalAge = isBirthdayPassed ? age : age - 1;

        if (finalAge < 13) {
            Alert.alert("Oops!", "You must be at least 13 years old to continue.");
            setField("dob", "")
            return;
        }

        setDate(selectedDate);
        setField('dob', selectedDate.toISOString().split('T')[0]);
        onDateChange?.();

        if (Platform.OS === 'android') {
            setShowPicker(false);
            if (selectedDate) {
                setDate(selectedDate);
                setField('dob', selectedDate.toISOString().split('T')[0]);
            }
        } else {
            if (selectedDate) setDate(selectedDate);
        }
    };

    const closeIOSPicker = () => {
        setShowPicker(false);
        setField('dob', date.toISOString().split('T')[0]);
        onDateChange?.();
    };

    return (
        <View style={styles.dateInputContainer}>
            <TextInput
                style={styles.dateInput}
                placeholder="Enter your birth"
                value={dob}
                editable={false}
                placeholderTextColor="#999"
            />

            <TouchableOpacity
                style={styles.calendarButton}
                onPress={() => setShowPicker(true)}
            >
                {/* Your calendar icon */}
                <Text>📅</Text>
            </TouchableOpacity>

            {/* Android Picker */}
            {showPicker && Platform.OS === 'android' && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={handleChange}
                    maximumDate={new Date()}
                />
            )}

            {/* iOS Picker inside Modal */}
            {Platform.OS === 'ios' && (
                <Modal visible={showPicker} transparent animationType="slide">
                    <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                        <View style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderTopLeftRadius: 16,
                            borderTopRightRadius: 16,
                            height: 150,
                            justifyContent: 'center',
                            alignItems: "center",
                            gap: 20,
                        }}>
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={handleChange}
                                style={{ height: 200 }}
                            />
                            <Button title="Done" onPress={closeIOSPicker} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}
