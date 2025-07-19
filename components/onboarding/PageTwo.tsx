import { styles } from '@/assets/styles/fitting-styles';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HumanFigurePicker from './HumanFigurePicker';

const PageTwo = () => {
    const [showSkinToneDropdown, setShowSkinToneDropdown] = useState(false)
    const [showSizeDropdown, setShowSizeDropdown] = useState(false)
    const router = useRouter();

    const { gender, skin_tone, size, setField } = useOnboardingStore()

    const skinToneOptions = ["Yellow", "Fair", "Medium", "Olive", "Brown", "Dark"]
    const sizeOptionsM = ["XS", "S", "M", "L", "XL", "XXL"]
    const sizeOptionsF = ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL"]

    const handleSave = () => {
        router.push("/(auth)/pagethree")
    };

    const handleCancel = () => {
        setField("skin_tone", "");
        setField("size", "");
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(auth)/onboarding")}>
                    <Icon name="arrow-back-ios" size={20} color="#555" style={{ left: 5 }} />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                    <LinearGradient
                        colors={['blue', 'lightblue', "white", 'white']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.container}
                    >
                    </LinearGradient>
                </View>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>2 of 4</Text>
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>Help Us Find Your Fit</Text>
                <Text style={styles.subtitle}>Please complete your try-on information</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>What's your skin tone?</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity onPress={() => setShowSkinToneDropdown(!showSkinToneDropdown)} style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{skin_tone}</Text>
                            <ChevronDown size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {showSkinToneDropdown && (
                            <View style={styles.dropdownMenu}>
                                {skinToneOptions.map((option, index) => (
                                    <TouchableOpacity
                                        key={option}
                                        onPress={() => {
                                            setField("skin_tone", option)
                                            setShowSkinToneDropdown(false)
                                        }}
                                        style={[styles.dropdownItem, index === skinToneOptions.length - 1 && styles.dropdownItemLast]}
                                    >
                                        <Text style={styles.dropdownItemText}>{option}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
                <View style={styles.sizeSection}>
                    <Text style={styles.label}>Clothing Size</Text>
                    <View style={styles.dropdownContainer}>
                        <TouchableOpacity
                            onPress={() => setShowSizeDropdown(!showSizeDropdown)}
                            style={styles.dropdown}
                        >
                            <Text style={styles.dropdownText}>{size}</Text>
                            <ChevronDown size={20} color="#6B7280" />
                        </TouchableOpacity>

                        {showSizeDropdown && (
                            <View style={styles.dropdownMenu}>
                                {(gender === 'Male' ? sizeOptionsM : sizeOptionsF).map((option, index, array) => (
                                    <TouchableOpacity
                                        key={option || `empty-${index}`}
                                        onPress={() => {
                                            setField("size", option)
                                            setShowSizeDropdown(false)
                                        }}
                                        style={[
                                            styles.dropdownItem,
                                            index === array.length - 1 && styles.dropdownItemLast
                                        ]}
                                    >
                                        <Text style={styles.dropdownItemText}>
                                            {option || 'Select Size'}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                <Text style={styles.helpText}>Help us understand your clothing size to imprve
                    your fitting.</Text>

                <View style={styles.section}>
                    <Text style={styles.label}>Profile Photo</Text>

                    <HumanFigurePicker />
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                        <View style={styles.roundedCheckbox}>
                            <Icon name="check" size={10} color="white" />
                        </View>
                        <Text style={styles.infoText}>
                            Please keep the shooting environment clean and lighting appropriate for best fitting effect.
                        </Text>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.roundedCheckbox}>
                            <Icon name="check" size={10} color="white" />
                        </View>
                        <Text style={styles.infoText}>Please wear fitted clothes and keep your hands out of your pockets.</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={styles.roundedCheckbox}>
                            <Icon name="check" size={10} color="white" />
                        </View>
                        <Text style={styles.infoText}>Your photo stays private and securely stored — never shared.</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

export default PageTwo;