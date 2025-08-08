import { FontFamily } from '@/constants/Fonts';
import { uploadToCloudinary } from '@/lib/services/upload-images/uploadToCloudinary';
import { ChatMessage, useChatStore } from '@/lib/stores/chatStore';
import { useOnboardingStore } from '@/lib/stores/onboardingStore';
import { Feather, Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CapsuleWardrobeMessage, FitPreferenceMessage, HeightSelectionMessage, OutfitCarouselMessage, OutfitRecommendationsMessage, PremiumUpgradeMessage } from '../chat/InteractiveMessageComponents';
import HeaderWithLogo from '../headerwithlogo';
import MobileSidebar from './Sidebar';

// Extended ChatMessage interface to include images
interface ExtendedChatMessage extends ChatMessage {
    images?: string[];
}

interface HomePageProps {
    userData: User | null
}

const HomePage = ({
    userData
}: HomePageProps) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [input, setInput] = useState('');
    const inputRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);
    const { bottom } = useSafeAreaInsets();

    const { messages, addMessage, loadMessages, clearMessages } = useChatStore();

    const [chatStarted, setChatStarted] = useState(false);
    const [initialMessageCount, setInitialMessageCount] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const hasLoadedInitialMessages = useRef(false);
    const { userId } = useOnboardingStore();

    const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
    const [isFirstInteraction, setIsFirstInteraction] = useState(true);
    const [optionsShown, setOptionsShown] = useState(false);
    const [userPreferences, setUserPreferences] = useState<{
        height?: string;
        fit?: string;
        weather?: string;
        location?: string;
        initialRequest?: string;
    }>({});
    const [isTyping, setIsTyping] = useState(false);

    // New state to track which message options should be shown
    const [showOptionsForMessage, setShowOptionsForMessage] = useState<string | null>(null);

    const { width: screenWidth } = Dimensions.get('window');

    useEffect(() => {
        const loadInitialMessages = async () => {
            if (!hasLoadedInitialMessages.current) {
                await loadMessages();
                hasLoadedInitialMessages.current = true;
            }
        };
        loadInitialMessages();
    }, [loadMessages]);

    useEffect(() => {
        if (hasLoadedInitialMessages.current && initialMessageCount === 0) {
            setInitialMessageCount(messages.length);
            if (messages.length > 0) {
                setIsFirstInteraction(false);
                setOptionsShown(true);
            }
        }
    }, [messages.length, initialMessageCount]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const generateId = () => (Date.now() + Math.random().toString(36).slice(2));

    const handleClearChat = () => {
        clearMessages();
        setChatStarted(false);
        setIsFirstInteraction(true);
        setOptionsShown(false);
        setUserPreferences({});
        setTypingMessageId(null);
        setShowDropdown(false);
        setShowOptionsForMessage(null);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        setChatStarted(true);
        const userMsg: ChatMessage = { id: generateId(), role: 'user', content: input };
        addMessage(userMsg);

        const userInput = input;
        setInput('');
        inputRef.current?.blur();

        if (isFirstInteraction && !optionsShown) {
            setUserPreferences(prev => ({ ...prev, initialRequest: userInput }));
            setIsFirstInteraction(false);

            setTimeout(() => {
                const aiMsgId = generateId();
                const optionsMsg: ChatMessage = {
                    id: aiMsgId,
                    role: 'assistant',
                    content: "Hey! I'd love to help you put together the perfect outfit. Let me start by getting to know you better:",
                    type: 'height-selection'
                };
                setTypingMessageId(aiMsgId);
                addMessage(optionsMsg);
                setIsTyping(true);
                setOptionsShown(true);
            }, 800);
            return;
        }

        await callAPI(userInput);
    };

    const callAPI = async (userInput: string, includePreferences = false) => {
        try {
            console.log("connecting to backend!")
            let messages = [{ role: 'user', content: userInput }];

            if (includePreferences && userPreferences.initialRequest) {
                messages = [
                    { role: 'user', content: userPreferences.initialRequest },
                    { role: 'assistant', content: 'I understand you need outfit help. Let me use your preferences.' },
                    { role: 'user', content: `My height is ${userPreferences.height} and I prefer ${userPreferences.fit} fit. ${userInput}` }
                ];
            }

            const res = await axios.post(`https://953f2cc7882f.ngrok-free.app/api/ai-chat/${userId}`, {
                messages: messages,
            });
            const savedImage = await uploadToCloudinary(res.data.images)

            setTimeout(() => {
                const aiMsgId = generateId();
                const aiMsg: ChatMessage = {
                    id: aiMsgId,
                    role: 'assistant',
                    content: res.data.reply,
                    type: res.data.type,
                    data: res.data.data,
                    images: res.data.images
                };

                setTypingMessageId(aiMsgId);
                addMessage(aiMsg);
            }, 500);

        } catch (err) {
            console.error('[❌] Backend error:', err);
            setTimeout(() => {
                const errorMsgId = generateId();
                setTypingMessageId(errorMsgId);
                addMessage({
                    id: errorMsgId,
                    role: 'assistant',
                    content: 'Oops! Something went wrong. Try again later.',
                });
            }, 500);
        }
    };

    const TypewriterText = ({
        text,
        textStyle,
        shouldAnimate = false,
        onComplete
    }: {
        text: string;
        textStyle: any;
        shouldAnimate?: boolean;
        onComplete?: () => void;
    }) => {
        const [displayText, setDisplayText] = useState(shouldAnimate ? '' : text);
        const [isTyping, setIsTyping] = useState(false);
        const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

        useEffect(() => {
            if (!shouldAnimate) {
                setDisplayText(text);
                setIsTyping(false);
                return;
            }

            if (!text || text.length === 0) {
                setDisplayText('');
                setIsTyping(false);
                return;
            }

            setDisplayText('');
            setIsTyping(true);

            const typingSpeed = 25;
            let currentIndex = 0;

            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }

            intervalRef.current = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText(text.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                    setIsTyping(false);
                    onComplete?.();
                }
            }, typingSpeed);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };
        }, [text, shouldAnimate, onComplete]);

        return (
            <Text style={textStyle}>
                {displayText}
                {isTyping && <Text style={{ opacity: 0.6, color: '#666' }}>▎</Text>}
            </Text>
        );
    };

    const ImageGallery = ({ images }: { images: string[] }) => {
        if (!images || images.length === 0) return null;
        console.log("images", images)
        return (
            <View style={styles.imageGallery}>
                {images.map((imageUrl, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.imageContainer}
                        activeOpacity={0.8}
                    >
                        <Image
                            source={{ uri: imageUrl }}
                            style={[
                                styles.messageImage,
                                { width: images.length === 1 ? screenWidth * 0.7 : screenWidth * 0.45 }
                            ]}
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const AnimatedBubble = ({ msg, children }: { msg: ExtendedChatMessage; children: React.ReactNode }) => {
        return (
            <View
                style={[
                    styles.messageRow,
                    msg.role === 'user' ? styles.alignEnd : styles.alignStart,
                ]}
            >
                {children}
            </View>
        );
    };

    const renderItem = (msg: ExtendedChatMessage, index: number) => {
        return (
            <AnimatedBubble key={index} msg={msg}>
                <AnimatedMessageContent msg={msg} />
            </AnimatedBubble>
        );
    };

    const AnimatedMessageContent = ({ msg }: { msg: ChatMessage }) => {
        const shouldShowTyping = msg.role === 'assistant' && msg.id === typingMessageId;
        const shouldShowOptions = showOptionsForMessage === msg.id;

        const handleTypewriterComplete = () => {
            if (shouldShowTyping) {
                setTypingMessageId(null);
                if (msg.type) {
                    setShowOptionsForMessage(msg.id); 
                }
            }
        };

        const handleHeightSelect = (height: string) => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: height });

            setUserPreferences(prev => ({ ...prev, height }));
            setShowOptionsForMessage(null);

            setTimeout(() => {
                const aiMsgId = generateId();
                const fitMsg: ChatMessage = {
                    id: aiMsgId,
                    role: 'assistant',
                    content: 'Perfect! Now tell me about your style preferences:',
                    type: 'fit-preference'
                };
                setTypingMessageId(aiMsgId);
                addMessage(fitMsg);
            }, 800);
        };

        const handleFitSelect = (fit: string) => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: fit });

            setUserPreferences(prev => ({ ...prev, fit }));
            setShowOptionsForMessage(null);

            setTimeout(() => {
                const aiMsgId = generateId();
                const weatherMsg: ChatMessage = {
                    id: aiMsgId,
                    role: 'assistant',
                    content: 'Great! What\'s the weather like where you are?',
                    type: 'weather-selection'
                };
                setTypingMessageId(aiMsgId);
                addMessage(weatherMsg);
            }, 800);
        };

        const handleWeatherSelect = (weather: string) => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: weather });

            setUserPreferences(prev => ({ ...prev, weather }));
            setShowOptionsForMessage(null);

            setTimeout(() => {
                const aiMsgId = generateId();
                const locationMsg: ChatMessage = {
                    id: aiMsgId,
                    role: 'assistant',
                    content: 'Almost done! Where are you located?',
                    type: 'location-selection'
                };
                setTypingMessageId(aiMsgId);
                addMessage(locationMsg);
            }, 800);
        };

        const handleLocationSelect = (location: string) => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: location });

            const updatedPreferences = { ...userPreferences, location };
            setUserPreferences(updatedPreferences);
            setShowOptionsForMessage(null);

            setTimeout(() => {
                const aiMsgId = generateId();
                const continueMsg: ChatMessage = {
                    id: aiMsgId,
                    role: 'assistant',
                    content: 'Perfect! Let me create some outfit suggestions for you...',
                };
                setTypingMessageId(aiMsgId);
                addMessage(continueMsg);

                setTimeout(() => {
                    const contextMessage = `Based on my preferences: I'm ${updatedPreferences.height} tall, prefer ${updatedPreferences.fit} fit clothing, it's ${updatedPreferences.weather} weather, and I'm located in ${location}. ${updatedPreferences.initialRequest}`;
                    callAPI(contextMessage, true);
                }, 1500);
            }, 800);
        };

        const handleTryNow = (outfitId: string) => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: `I want to try outfit ${outfitId}` });
        };

        const handleRegenerate = () => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: 'Generate new outfits' });
        };

        const handleViewVisuals = () => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: 'Yes, please show me visuals' });
        };

        const handleUpgrade = () => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: 'I want to upgrade to premium' });
        };

        const handleWaitUntilTomorrow = () => {
            const responseId = generateId();
            addMessage({ id: responseId, role: 'user', content: 'I will wait until tomorrow' });
        };

        return (
            <>
                {msg.role === 'assistant' && (
                    <View style={styles.avatar}>
                        <Image
                            source={require('@/assets/images/icons/chatResIcon.png')}
                            style={styles.avatarIcon}
                            resizeMode="contain"
                        />
                    </View>
                )}

                {msg.type && msg.role === 'assistant' ? (
                    <View>
                        <View style={[styles.messageBubble, styles.aiBubble]}>
                            <TypewriterText
                                text={msg.content}
                                shouldAnimate={shouldShowTyping}
                                onComplete={handleTypewriterComplete}
                                textStyle={[styles.messageText, { color: '#000000' }]}
                            />
                        </View>

                        {shouldShowOptions && msg.images && (
                            <ImageGallery images={msg.images} />
                        )}

                        {shouldShowOptions && (
                            <>
                                {msg.type === 'height-selection' && (
                                    <HeightSelectionMessage onSelect={handleHeightSelect} />
                                )}
                                {msg.type === 'fit-preference' && (
                                    <FitPreferenceMessage onSelect={handleFitSelect} />
                                )}
                                {msg.type === 'weather-selection' && (
                                    <WeatherSelectionMessage onSelect={handleWeatherSelect} />
                                )}
                                {msg.type === 'location-selection' && (
                                    <LocationSelectionMessage onSelect={handleLocationSelect} />
                                )}
                                {msg.type === 'outfit-carousel' && msg.data && (
                                    <OutfitCarouselMessage
                                        outfits={msg.data.outfits}
                                        onTryNow={handleTryNow}
                                        onRegenerate={handleRegenerate}
                                    />
                                )}
                                {msg.type === 'outfit-recommendations' && msg.data && (
                                    <OutfitRecommendationsMessage
                                        title={msg.data.title}
                                        description={msg.data.description}
                                        recommendations={msg.data.recommendations}
                                    />
                                )}
                                {msg.type === 'capsule-wardrobe' && msg.data && (
                                    <CapsuleWardrobeMessage
                                        wardrobeItems={msg.data.wardrobeItems}
                                        onViewVisuals={handleViewVisuals}
                                    />
                                )}
                                {msg.type === 'premium-upgrade' && (
                                    <PremiumUpgradeMessage
                                        onUpgrade={handleUpgrade}
                                        onWaitUntilTomorrow={handleWaitUntilTomorrow}
                                    />
                                )}
                            </>
                        )}
                    </View>
                ) : (
                    <View>
                        <View style={[
                            styles.messageBubble,
                            msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                        ]}>
                            <TypewriterText
                                text={msg.content}
                                shouldAnimate={shouldShowTyping}
                                onComplete={handleTypewriterComplete}
                                textStyle={[
                                    styles.messageText,
                                    { color: msg.role === 'user' ? '#FFFFFF' : '#000000' }
                                ]}
                            />
                        </View>

                        {msg.images && msg.role === 'assistant' && (
                            <ImageGallery images={msg.images} />
                        )}
                    </View>
                )}
            </>
        );
    };

    const WeatherSelectionMessage = ({ onSelect }: { onSelect: (weather: string) => void }) => (
        <View style={styles.optionsContainer}>
            {['Hot & Sunny ☀️', 'Warm & Pleasant 🌤️', 'Cool & Breezy 🌬️', 'Cold & Chilly ❄️', 'Rainy 🌧️'].map((weather, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => onSelect(weather)}
                >
                    <Text style={styles.optionButtonText}>{weather}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const LocationSelectionMessage = ({ onSelect }: { onSelect: (location: string) => void }) => (
        <View style={styles.optionsContainer}>
            {['Office/Work 🏢', 'Casual Outing 🚶', 'Date Night 💕', 'Beach/Vacation 🏖️', 'Party/Event 🎉', 'Home/Relaxing 🏠'].map((location, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.optionButton}
                    onPress={() => onSelect(location)}
                >
                    <Text style={styles.optionButtonText}>{location}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const OptionsDropdown = () => {
        if (!showDropdown) return null;

        return (
            <View style={styles.optionsDropdown}>
                <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={handleClearChat}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dropdownItemText}>🗑️ Clear Chat</Text>
                </TouchableOpacity>
            </View>
        );
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
                    hidden={false}
                    animated={true}
                />
                <HeaderWithLogo userData={userData} />

                <MobileSidebar
                    visible={sidebarVisible}
                    onClose={() => setSidebarVisible(false)}
                    userData={userData}
                />

                {!chatStarted ? (
                    <>
                        <View style={styles.mainContent}>
                            <Text style={styles.greeting}>How can I help you today? 👋</Text>
                            <Text style={styles.subtitle}>Ask Myuze for outfit ideas</Text>
                        </View>

                        <View style={styles.bottomSection}>
                            <OptionsDropdown />
                            <BlurView intensity={20} style={styles.inputBlurContainer}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Ask me anything..."
                                        placeholderTextColor="#999"
                                        value={input}
                                        onChangeText={setInput}
                                        onSubmitEditing={sendMessage}
                                    />
                                    <TouchableOpacity
                                        style={styles.optionsButton}
                                        onPress={() => setShowDropdown(!showDropdown)}
                                        activeOpacity={0.7}
                                    >
                                        <Text style={styles.optionsButtonText}>⋯</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.sendButton}
                                        onPress={sendMessage}
                                        activeOpacity={0.8}
                                    >
                                        <Ionicons name="arrow-up" size={20} color="#fff" />
                                    </TouchableOpacity>
                                </View>
                            </BlurView>
                        </View>
                    </>
                ) : (
                    <ScrollView
                        ref={scrollRef}
                        style={styles.chatList}
                        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: bottom + 120 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {messages.map(renderItem)}
                    </ScrollView>
                )}

                {chatStarted && (
                    <View style={styles.bottomSection}>
                        <OptionsDropdown />
                        <BlurView intensity={150} style={styles.inputBlurContainer}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    ref={inputRef}
                                    style={styles.textInput}
                                    placeholder="Ask me anything..."
                                    placeholderTextColor="#999"
                                    value={input}
                                    onChangeText={setInput}
                                    onSubmitEditing={sendMessage}
                                />
                                <TouchableOpacity
                                    style={styles.optionsButton}
                                    onPress={() => setShowDropdown(!showDropdown)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.optionsButtonText}>⋯</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sendButton}
                                    onPress={sendMessage}
                                    activeOpacity={0.8}
                                >
                                    <Feather name="arrow-up" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </BlurView>
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingTop: 16,
    },
    optionsContainer: {
        marginTop: 8,
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 8,
    },
    optionButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignSelf: 'flex-start'
    },
    optionButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    dropdownItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    imageGallery: {
        marginTop: 8,
        marginLeft: 44,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    imageContainer: {
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    messageImage: {
        height: 200,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
    },
    testButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginLeft: 10,
    },
    testButtonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    testButtonInput: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
    },
    testButtonInputText: {
        color: '#666',
        fontSize: 12,
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 16,
        marginTop: -40,
    },
    largeLogo: {
        marginBottom: 40,
    },
    shoppingBag: {
        width: 120,
        height: 120,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    greeting: {
        fontSize: 28,
        fontFamily: FontFamily.HelveticaNeue.Medium,
        textAlign: 'center',
        color: '#343640',
        paddingHorizontal: 18,
        lineHeight: 34,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        color: '#8288A0',
        textAlign: 'center',
        fontFamily: FontFamily.HelveticaNeue.Regular,
        lineHeight: 22,
    },
    bottomSection: {
        paddingBottom: 30,
        paddingTop: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 24,
        backgroundColor: 'transparent',
    },
    helpText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 100,
        borderWidth: 0.5,
        borderColor: 'rgba(238, 238, 238, 0.8)',
        paddingHorizontal: 20,
        paddingVertical: 4,
        width: "100%",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputBlurContainer: {
        borderRadius: 100,
        overflow: 'hidden',
        width: '100%',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: '#000',
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    sendButton: {
        width: 48,
        height: 48,
        backgroundColor: '#000',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: -14,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    navIcon: {
        width: 24,
        height: 24,
        marginBottom: 4,
    },
    navText: {
        fontSize: 12,
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    navTextActive: {
        color: '#000',
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    navTextInactive: {
        color: '#8288A0',
    },
    messageBubble: {
        minWidth: '20%',
        maxWidth: '85%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        alignSelf: 'flex-start',
    },
    userBubble: {
        backgroundColor: '#007AFF',
        alignSelf: 'flex-end',
        borderRadius: 16,
        minWidth: '20%',
        maxWidth: '100%',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    aiBubble: {
        backgroundColor: '#F0F0F0',
        alignSelf: 'flex-start',
        minWidth: '20%',
        maxWidth: '85%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
    },
    interactiveMessage: {
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
        minWidth: '20%',
        maxWidth: '85%',
        padding: 0,
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
        color: '#000',
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    chatList: { flex: 1 },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
        paddingHorizontal: -6,
    },
    alignEnd: {
        justifyContent: 'flex-end',
    },
    alignStart: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        // backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
        marginBottom: 4,
        marginRight: 12,
    },
    avatarIcon: {
        width: 40,
        height: 40,
    },
    avatarText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    typingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 2,
    },
    typingDot: {
        fontSize: 20,
        color: '#666',
        marginHorizontal: 2,
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
    clearButton: {
        backgroundColor: '#FF3B30',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginVertical: 10,
        alignSelf: 'center',
    },
    clearButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    optionsButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 8,
        alignSelf: "flex-start"
    },
    optionsButtonText: {
        color: '#666',
        fontSize: 16,
        fontFamily: FontFamily.HelveticaNeue.Medium,
    },
    optionsDropdown: {
        position: 'absolute',
        bottom: 70,
        right: 20,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 8,
        minWidth: 160,
        maxHeight: 300,
        zIndex: 1000,
    },
    optionItem: {
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 14,
        color: '#333',
        fontFamily: FontFamily.HelveticaNeue.Regular,
    },
});

export default HomePage;