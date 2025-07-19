"use client"

import { useOnboardingStore } from "@/lib/stores/onboardingStore"
import { supabase } from "@/lib/supabase"
import { femaleBodyShapes } from "@/lib/utils/female-body-shape"
import { maleBodyShapes } from "@/lib/utils/male-body-shape"
import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import type React from "react"
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"
import Icon from 'react-native-vector-icons/MaterialIcons'

const PageFour = () => {
    const {
        userId,
        fullName,
        username,
        dob,
        skin_tone,
        size,
        image,
        style,
        gender,
        body_shape,
        setField
    } = useOnboardingStore()
    const bodyShapes = gender === "female" ? femaleBodyShapes : maleBodyShapes

    const handleSave = async () => {
        const userData = {
            user_id: userId,
            full_name: fullName,
            username: username,
            gender: gender,
            dob: dob,
            skin_tone: skin_tone,
            size: size,
            image: image,
            style: style,
            body_shape: body_shape,
        };

        const { error } = await supabase
            .from('users')
            .insert([userData]);

        router.push("/(home)")

        if (error) {
            console.error('Error saving user:', error.message);
            Alert.alert("Error Occured! in page four")
        } else {
            console.log('User saved successfully!');
            Alert.alert("Data Saved Successfully!")
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(auth)/pagethree")}>
                    <Icon name="arrow-back-ios" size={20} color="#555" style={{ left: 5 }} />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                    <LinearGradient
                        colors={['blue', 'lightblue', "lightblue", 'lightblue']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.container}
                    >
                    </LinearGradient>
                </View>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>4 of 4</Text>
                </View>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.title}>What's Your Body Shape?</Text>
                <Text style={styles.subtitle}>AI will recommend outfits based on your selection.</Text>

                <View style={styles.optionsContainer}>
                    {bodyShapes.map((shape) => (
                        <TouchableOpacity
                            key={shape.id}
                            style={[styles.option, body_shape === shape.title && styles.selectedOption]}
                            onPress={() => setField("body_shape", shape.title)}
                        >
                            <View style={styles.optionContent}>
                                <Text style={styles.optionTitle}>{shape.title}</Text>
                                <Text style={styles.optionDescription}>{shape.description}</Text>
                            </View>
                            <View style={styles.radioContainer}>
                                <View style={[styles.radioButton, body_shape === shape.title && styles.radioButtonSelected]}>
                                    {body_shape === shape.id && <View style={styles.radioButtonInner} />}
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.saveButton]}
                    onPress={handleSave}
                    disabled={!body_shape}
                >
                    <Text style={[styles.saveButtonText]}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 24,
        borderBottomWidth: 0.3,
        borderColor: "#999",
        width: '100%',
        alignSelf: 'stretch',
    },
    backButton: {
        padding: 10,
        borderColor: "black",
        borderWidth: 0.5,
        borderRadius: "50%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    backArrow: {
        fontSize: 20,
        color: "#333333",
    },
    progressContainer: {
        top: -6,
        display: "flex",
        flexDirection: "row",
        width: "auto",
        justifyContent: "space-between"
    },
    progressBar: {
        width: '50%',
        height: 15,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressFill: {
        height: "75%",
        borderRadius: 4,
    },
    progressText: {
        fontSize: 20,
        color: '#333',
        marginTop: 10,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#333333",
        marginTop: 24,
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 17,
        color: "#666666",
        marginBottom: 32,
        textAlign: "center",
    },
    optionsContainer: {
        gap: 16,
    },
    option: {
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 16,
        height: 150,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        backgroundColor: "#ffffff",
    },
    selectedOption: {
        borderColor: "#6366f1",
        backgroundColor: "#f8f9ff",
    },
    optionContent: {
        flex: 1,
        marginRight: 12,
    },
    optionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#333333",
        marginBottom: 4,
    },
    optionDescription: {
        fontSize: 17,
        color: "#777",
        lineHeight: 20,
    },
    radioContainer: {
        paddingTop: 2,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#e0e0e0",
        alignItems: "center",
        justifyContent: "center",
    },
    radioButtonSelected: {
        borderColor: "#6366f1",
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: "#6366f1",
    },
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    saveButton: {
        width: '100%',
        height: 60,
        backgroundColor: 'black',
        fontSize: 20,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    saveButtonText: {
        fontSize: 22,
        fontWeight: "bold",
        color: '#fff',
    },
    cancelButton: {
        width: '100%',
        height: 60,
        backgroundColor: 'white',
        fontSize: 20,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    cancelButtonText: {
        fontSize: 22,
        fontWeight: "normal",
        color: '#999',
    },
})

export default PageFour
