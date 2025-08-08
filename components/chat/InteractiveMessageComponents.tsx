import { FontFamily } from '@/constants/Fonts';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export interface OutfitItem {
    id: string;
    name: string;
    image: string;
    category?: string;
}

export interface OutfitRecommendation {
    title: string;
    items: string[];
    generateAction?: () => void;
}

// Height Selection Component
export const HeightSelectionMessage = ({ onSelect }: { onSelect: (height: string) => void }) => {
    const [selectedHeight, setSelectedHeight] = useState<string>('');
    
    const heights = ['Under 150 cm', '150-165 cm', '165-175 cm', 'Over 175 cm'];
    
    const handleSelect = (height: string) => {
        setSelectedHeight(height);
        setTimeout(() => onSelect(height), 100);
    };

    return (
        <View style={styles.interactiveContainer}>
            <Text style={styles.questionText}>How tall are you?</Text>
            <Text style={styles.subText}>Just pick the one that&apos;s closest 👇</Text>
            
            <View style={styles.optionsGrid}>
                {heights.map((height) => (
                    <TouchableOpacity
                        key={height}
                        style={[
                            styles.optionButton,
                            selectedHeight === height && styles.selectedOption
                        ]}
                        onPress={() => handleSelect(height)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.optionText,
                            selectedHeight === height && styles.selectedOptionText
                        ]}>
                            {height}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

// Fit Preference Component
export const FitPreferenceMessage = ({ onSelect }: { onSelect: (fit: string) => void }) => {
    const [selectedFit, setSelectedFit] = useState<string>('');
    
    const fits = ['Slim fit', 'Regular', 'Oversized'];
    
    const handleSelect = (fit: string) => {
        setSelectedFit(fit);
        onSelect(fit)
    };

    return (
        <View style={styles.interactiveContainer}>
            <Text style={styles.questionText}>How do you like your clothes to fit?</Text>
            <Text style={styles.subText}>What&apos;s your usual vibe?</Text>
            
            <View style={styles.optionsRow}>
                {fits.map((fit) => (
                    <TouchableOpacity
                        key={fit}
                        style={[
                            styles.optionButton,
                            selectedFit === fit && styles.selectedOption
                        ]}
                        onPress={() => handleSelect(fit)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.optionText,
                            selectedFit === fit && styles.selectedOptionText
                        ]}>
                            {fit}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

// Outfit Carousel Component
export const OutfitCarouselMessage = ({ 
    outfits, 
    onTryNow,
    onRegenerate 
}: { 
    outfits: OutfitItem[];
    onTryNow: (outfitId: string) => void;
    onRegenerate: () => void;
}) => {
    return (
        <View style={styles.carouselContainer}>
            <Text style={styles.inspirationText}>
                All set! You&apos;re totally gonna own the night! 😎
            </Text>
            <Text style={styles.subText}>
                Now give me just a sec... pulling some 🔥 inspiration for your concert look! 🎸
            </Text>
            
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.carousel}
                contentContainerStyle={styles.carouselContent}
            >
                {outfits.map((outfit) => (
                    <View key={outfit.id} style={styles.outfitCard}>
                        <Image 
                            source={{ uri: outfit.image }} 
                            style={styles.outfitImage}
                            resizeMode="cover"
                        />
                        <TouchableOpacity 
                            style={styles.tryButton}
                            onPress={() => onTryNow(outfit.id)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.tryButtonText}>Try Now</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            
            <TouchableOpacity 
                style={styles.regenerateButton}
                onPress={onRegenerate}
                activeOpacity={0.7}
            >
                <Text style={styles.regenerateText}>🔄 Regenerate</Text>
            </TouchableOpacity>
        </View>
    );
};

// Outfit Recommendations List
export const OutfitRecommendationsMessage = ({ 
    recommendations,
    title,
    description 
}: { 
    recommendations: OutfitRecommendation[];
    title: string;
    description: string;
}) => {
    return (
        <View style={styles.recommendationsContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descriptionText}>{description}</Text>
            
            {recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationCard}>
                    <Text style={styles.recTitle}>{rec.title}</Text>
                    {rec.items.map((item, itemIndex) => (
                        <Text key={itemIndex} style={styles.recItem}>• {item}</Text>
                    ))}
                    
                    {rec.generateAction && (
                        <TouchableOpacity 
                            style={styles.generateButton}
                            onPress={rec.generateAction}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.generateButtonText}>Generate visuals</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

// Capsule Wardrobe Message
export const CapsuleWardrobeMessage = ({ 
    wardrobeItems,
    onViewVisuals 
}: { 
    wardrobeItems: {
        dayLook: string[];
        eveningVibe: string[];
        extras: string[];
    };
    onViewVisuals: () => void;
}) => {
    return (
        <View style={styles.wardrobeContainer}>
            <Text style={styles.wardrobeTitle}>
                Here&apos;s your capsule travel wardrobe — Bali edition 🌺
            </Text>
            
            <View style={styles.wardrobeSection}>
                <Text style={styles.sectionTitle}>Day Look:</Text>
                {wardrobeItems.dayLook.map((item, index) => (
                    <Text key={index} style={styles.wardrobeItem}>• {item}</Text>
                ))}
            </View>
            
            <View style={styles.wardrobeSection}>
                <Text style={styles.sectionTitle}>Evening Vibe:</Text>
                {wardrobeItems.eveningVibe.map((item, index) => (
                    <Text key={index} style={styles.wardrobeItem}>• {item}</Text>
                ))}
            </View>
            
            <View style={styles.wardrobeSection}>
                <Text style={styles.sectionTitle}>Extras:</Text>
                {wardrobeItems.extras.map((item, index) => (
                    <Text key={index} style={styles.wardrobeItem}>• {item}</Text>
                ))}
            </View>
            
            <Text style={styles.askText}>Wanna see how these look on you?</Text>
            
            <TouchableOpacity 
                style={styles.yesButton}
                onPress={onViewVisuals}
                activeOpacity={0.8}
            >
                <Text style={styles.yesButtonText}>Yes, please</Text>
            </TouchableOpacity>
        </View>
    );
};

export const PremiumUpgradeMessage = ({ 
    onUpgrade,
    onWaitUntilTomorrow 
}: { 
    onUpgrade: () => void;
    onWaitUntilTomorrow: () => void;
}) => {
    return (
        <View style={styles.premiumContainer}>
            <Text style={styles.premiumTitle}>
                Whoa, style superstar — you&apos;ve maxed out your free creative sparks for today!
            </Text>
            
            <Text style={styles.premiumSubtitle}>On the free plan, you get:</Text>
            <Text style={styles.freeFeature}>✨ 5 image prompts/day</Text>
            <Text style={styles.freeFeature}>🎥 1 video/day</Text>
            
            <Text style={styles.premiumOffer}>But why stop there? Go Premium to unlock:</Text>
            <Text style={styles.premiumFeature}>🚀 50 images/day</Text>
            <Text style={styles.premiumFeature}>🎬 10 videos/day</Text>
            
            <Text style={styles.pricingText}>
                All for just $5/month or $1.25/week.
            </Text>
            
            <Text style={styles.subscribeText}>
                Subscribe now and keep your fashion magic flowing! 💫
            </Text>
            
            <TouchableOpacity 
                style={styles.upgradeButton}
                onPress={onUpgrade}
                activeOpacity={0.8}
            >
                <Text style={styles.upgradeButtonText}>Upgrade & Keep Styling</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.waitButton}
                onPress={onWaitUntilTomorrow}
                activeOpacity={0.7}
            >
                <Text style={styles.waitButtonText}>I&apos;ll wait until tomorrow</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    interactiveContainer: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        marginVertical: 8,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
    questionText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 8,
    },
    subText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#666',
        marginBottom: 16,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionsRow: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },
    optionButton: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#E5E5EA',
        borderRadius: 20,
        minWidth: 80,
        alignItems: 'center',
    },
    selectedOption: {
        backgroundColor: '#007AFF',
    },
    optionText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#000',
    },
    selectedOptionText: {
        color: '#FFF',
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    carouselContainer: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        marginVertical: 8,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
    inspirationText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 8,
    },
    carousel: {
        marginVertical: 16,
    },
    carouselContent: {
        paddingHorizontal: 4,
    },
    outfitCard: {
        width: 160,
        marginRight: 12,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    outfitImage: {
        width: '100%',
        height: 200,
    },
    tryButton: {
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        marginHorizontal: 12,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
        alignItems: 'center',
    },
    tryButtonText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
    },
    regenerateButton: {
        alignSelf: 'center',
        padding: 8,
    },
    regenerateText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#666',
    },
    recommendationsContainer: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        marginVertical: 8,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
    titleText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#666',
        marginBottom: 16,
    },
    recommendationCard: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    recTitle: {
        fontSize: 15,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 8,
    },
    recItem: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#333',
        marginBottom: 4,
    },
    generateButton: {
        backgroundColor: '#E5E5EA',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    generateButtonText: {
        fontSize: 12,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#000',
    },
    wardrobeContainer: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        marginVertical: 8,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
    wardrobeTitle: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 16,
    },
    wardrobeSection: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 15,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 8,
    },
    wardrobeItem: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#333',
        marginBottom: 4,
    },
    askText: {
        fontSize: 15,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginTop: 8,
        marginBottom: 12,
    },
    yesButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        alignSelf: 'center',
    },
    yesButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#FFF',
    },
    premiumContainer: {
        padding: 16,
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        marginVertical: 8,
        maxWidth: '85%',
        alignSelf: 'flex-start',
    },
    premiumTitle: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 12,
    },
    premiumSubtitle: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#666',
        marginBottom: 8,
    },
    freeFeature: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#333',
        marginBottom: 4,
    },
    premiumOffer: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginTop: 12,
        marginBottom: 8,
    },
    premiumFeature: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#333',
        marginBottom: 4,
    },
    pricingText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#666',
        marginTop: 12,
        marginBottom: 8,
    },
    subscribeText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#000',
        marginBottom: 16,
    },
    upgradeButton: {
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 24,
        alignSelf: 'center',
        marginBottom: 12,
    },
    upgradeButtonText: {
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        color: '#FFF',
    },
    waitButton: {
        paddingHorizontal: 24,
        paddingVertical: 8,
        alignSelf: 'center',
    },
    waitButtonText: {
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Regular,
        color: '#666',
    },
});
