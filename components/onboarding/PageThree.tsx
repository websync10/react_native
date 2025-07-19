"use client"

import { useOnboardingStore } from "@/lib/stores/onboardingStore";
import { styleOptions } from "@/lib/utils/size-options";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type React from "react";
import { useEffect, useState } from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

interface StyleOption {
    id: string
    title: string
    description: string
    image: any
}

const PageThree = () => {
    const [selectedStyles, setSelectedStyles] = useState<string[]>([])
    const {gender, style, setField} = useOnboardingStore()

    useEffect(() => {
        if (style && style.length > 0) {
          setSelectedStyles(style); 
        }
      }, []);
    
      useEffect(() => {
        setField("style", selectedStyles);
      }, [selectedStyles]);
    
    const toggleStyle = (styleId: string) => {
        setSelectedStyles((prev) => {
            if (prev.includes(styleId)) {
                return prev.filter((id) => id !== styleId)
            } else if (prev.length < 3) {
                return [...prev, styleId]
            }
            return prev
        })
    }

    const handleCancel = () => {
        setField("style", [""]);
    }

    const renderStyleCard = (style: StyleOption) => {
        const isSelected = selectedStyles.includes(style.id)

        return (
            <TouchableOpacity
                key={style.id}
                onPress={() => toggleStyle(style.id)}
                style={[styles.styleCard, isSelected ? styles.styleCardSelected : styles.styleCardDefault]}
                activeOpacity={0.7}
            >
                <View style={styles.styleImageContainer}>
                    <Image
                        source={style.image}
                        style={styles.styleImage}
                        defaultSource={require("../../assets/images/bag.png")}
                    />
                </View>
                <View style={styles.styleContent}>
                    <Text style={styles.styleTitle}>{style.title}</Text>
                    <Text style={styles.styleDescription}>{style.description}</Text>
                </View>
                <View style={styles.selectionIndicatorContainer}>
                    <View
                        style={[
                            styles.selectionIndicator,
                            isSelected ? styles.selectionIndicatorSelected : styles.selectionIndicatorDefault,
                        ]}
                    >
                        {isSelected && <View style={styles.selectionIndicatorDot} />}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.push("/(auth)/pagetwo")}>
                    <Icon name="arrow-back-ios" size={20} color="#555" style={{ left: 5 }} />
                </TouchableOpacity>
                <View style={styles.progressBar}>
                    <LinearGradient
                        colors={['blue', 'lightblue', "lightblue", 'white']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.container}
                    >
                    </LinearGradient>
                </View>
                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>3 of 4</Text>
                </View>
            </View>

            <View style={styles.titleSection}>
                <Text style={styles.title}>What's Your Style?</Text>
                <Text style={styles.subtitle}>
                    Select up to 3 styles — AI will suggest outfits that match your preferences.
                </Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.styleOptionsContainer}>{styleOptions.map(renderStyleCard)}</View>
            </ScrollView>

            <View style={styles.bottomActions}>
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/pagefour")}
                    style={[
                        styles.continueButton,
                        selectedStyles.length === 0 ? styles.continueButtonDisabled : styles.continueButtonEnabled,
                    ]}
                >
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    chevronIcon: {
        width: 24,
        height: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    chevronText: {
        fontSize: 24,
        color: "#6b7280",
        fontWeight: "bold",
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
    stepText: {
        fontSize: 14,
        color: "#6b7280",
        fontWeight: "500",
    },
    titleSection: {
        paddingHorizontal: 25,
        paddingVertical: 25,
        marginBottom: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#111827",
        marginBottom: 8,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 18,
        color: "#6b7280",
        lineHeight: 20,
        textAlign: "center"
    },
    scrollView: {
        flex: 1,
    },
    styleOptionsContainer: {
        paddingHorizontal: 10,
        paddingBottom: 16,
    },
    styleCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 13,
        height: 150,
        borderRadius: 12,
        borderWidth: 2,
        marginBottom: 12,
    },
    styleCardDefault: {
        borderColor: "#e5e7eb",
        backgroundColor: "#ffffff",
    },
    styleCardSelected: {
        borderColor: "#3b82f6",
        backgroundColor: "#eff6ff",
    },
    styleImageContainer: {
        width: 94,
        height: 108,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: "#f3f4f6",
    },
    styleImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    styleContent: {
        flex: 1,
        marginLeft: 16,
    },
    styleTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 4,
    },
    styleDescription: {
        fontSize: 16,
        color: "#888",
        lineHeight: 16,
    },
    selectionIndicatorContainer: {
        display: "flex",
        alignItems: "flex-start",
        height: "80%"
    },
    selectionIndicator: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 2,

    },
    selectionIndicatorDefault: {
        borderColor: "#d1d5db",
        backgroundColor: "transparent",
    },
    selectionIndicatorSelected: {
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
    },
    selectionIndicatorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#ffffff",
    },
    bottomActions: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 24,
    },
    continueButton: {
        width: '100%',
        height: 60,
        backgroundColor: 'black',
        fontSize: 20,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    continueButtonEnabled: {
        backgroundColor: "black",
    },
    continueButtonDisabled: {
        backgroundColor: "black",
    },
    continueButtonText: {
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
    progressText: {
        fontSize: 20,
        color: '#333',
        marginTop: 10,
    },
})

export default PageThree
