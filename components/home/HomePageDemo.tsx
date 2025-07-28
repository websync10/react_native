import { FontFamily } from '@/constants/Fonts';
import { ChatMessage, useChatStore } from '@/lib/stores/chatStore';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useRef, useState } from 'react';
import {
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
import {
    CapsuleWardrobeMessage,
    FitPreferenceMessage,
    HeightSelectionMessage,
    OutfitCarouselMessage,
    OutfitRecommendationsMessage,
    PremiumUpgradeMessage
} from '../chat/InteractiveMessageComponents';
import MobileSidebar from './Sidebar';


interface HomePageProps {
    userData: User | null
}

const HomePage = ({
    userData
}: HomePageProps) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [input, setInput] = useState('');
    const inputRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);
    const { bottom } = useSafeAreaInsets();

    const { messages, addMessage, loadMessages, clearMessages } = useChatStore();

    const [chatStarted, setChatStarted] = useState(false);
    const [initialMessageCount, setInitialMessageCount] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const hasLoadedInitialMessages = useRef(false);

    // Sample messages for testing UI
    const sampleRequests = [
        "Hello",
        "What should I wear to a business meeting?",
        "Can you suggest a casual weekend outfit?",
        "I need something for a date night",
        "What's trendy for summer 2024?",
        "Help me style a black dress",
        "What accessories go with this outfit?",
        "I'm looking for workout clothes",
        "Suggest formal wear for a wedding",
        "What colors look good on me?",
        "How do I style denim jackets?"
    ];

    const sampleResponses = [
        "Hello! I'm Myuze, your personal style assistant. I'm here to help you with all your fashion and outfit questions. What would you like to know about today?",
        "For a business meeting, I'd recommend a crisp white shirt with tailored trousers or a pencil skirt. Add a blazer for extra professionalism and finish with comfortable yet stylish shoes.",
        { type: 'height-selection', content: 'Let me help you find the perfect fit!' },
        { type: 'fit-preference', content: 'Tell me about your style preferences!' },
        {
            type: 'outfit-carousel',
            content: 'Check out these amazing looks!',
            data: {
                outfits: [
                    { id: '1', name: 'Concert Look 1', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop' },
                    { id: '2', name: 'Concert Look 2', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop' },
                    { id: '3', name: 'Concert Look 3', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop' }
                ]
            }
        },
        {
            type: 'outfit-recommendations',
            content: 'Here are some curated outfit ideas for you!',
            data: {
                title: 'Got it! Bali + warm = comfy + cute.',
                description: 'Here are 3 outfit ideas that scream: "Cool but effortless traveler." 🌴',
                recommendations: [
                    {
                        title: 'Outfit 1: Day Explorer',
                        items: ['Breezy linen shirt', 'Khaki shorts', 'Slide sandals', 'Straw tote']
                    },
                    {
                        title: 'Outfit 2: Sunset Dinner',
                        items: ['Sleeveless maxi dress', 'Statement earrings', 'Flat sandals']
                    },
                    {
                        title: 'Outfit 3: Beach Rider',
                        items: ['Graphic tee', 'Wide-leg pants', 'Bucket hat']
                    }
                ]
            }
        },
        {
            type: 'capsule-wardrobe',
            content: 'Your perfect travel wardrobe!',
            data: {
                wardrobeItems: {
                    dayLook: ['Linen shirt (white or sage green)', 'Relaxed-fit shorts', 'Leather sandals or canvas sneakers'],
                    eveningVibe: ['Light short-sleeve shirt (bold pattern)', 'Chino pants', 'Casual loafers or sandals'],
                    extras: ['Sunglasses', 'Woven bag', 'Optional: Light scarf or bucket hat']
                }
            }
        },
        { type: 'premium-upgrade', content: 'Ready to unlock more styling magic?' },
        "Date night calls for something that makes you feel confident! Consider a midi dress in a flattering silhouette, paired with heels and delicate jewelry. A leather jacket adds an edgy touch.",
        "Summer 2024 trends include vibrant colors, flowy fabrics, and sustainable fashion. Think linen sets, bright florals, and statement accessories that pop against neutral bases.",
        "A black dress is incredibly versatile! Dress it up with heels and statement jewelry for evening, or down with white sneakers and a denim jacket for day. Add a colorful belt to define your waist."
    ];

    const generateRandomMessage = () => {
        const randomRequest = sampleRequests[Math.floor(Math.random() * sampleRequests.length)];
        const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
        // Generate unique IDs
        const userId = Date.now().toString() + Math.random().toString(36).slice(2);
        addMessage({ id: userId, role: 'user', content: randomRequest, type: "", data: "" });
        setTimeout(() => {
            const aiId = (Date.now() + 1).toString() + Math.random().toString(36).slice(2);

            // Handle both string and object responses
            if (typeof randomResponse === 'string') {
                addMessage({ id: aiId, role: 'assistant', content: randomResponse, type: "", data: "" });
            } else {
                addMessage({
                    id: aiId,
                    role: 'assistant',
                    content: randomResponse.content,
                    type: randomResponse.type as any,
                    data: "randomResponse.data"
                });
            }
        }, 1000);
        setChatStarted(true);
    };
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
        // Set initial message count only once when messages are first loaded
        if (hasLoadedInitialMessages.current && initialMessageCount === 0) {
            setInitialMessageCount(messages.length);
        }
    }, [messages.length, initialMessageCount]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setChatStarted(true);
        const userId = Date.now().toString() + Math.random().toString(36).slice(2);
        const userMsg: ChatMessage = { id: userId, role: 'user', content: input, data: "", type: "" };
        addMessage(userMsg);

        setInput('');
        inputRef.current?.blur();

        console.log('[🔄] Generating random response for UI testing...');

        setTimeout(() => {
            const randomResponse = sampleResponses[Math.floor(Math.random() * sampleResponses.length)];
            const aiId = (Date.now() + 1).toString() + Math.random().toString(36).slice(2);

            // Handle both string and object responses
            if (typeof randomResponse === 'string') {
                const aiMsg: ChatMessage = { id: aiId, role: 'assistant', content: randomResponse, type: "", data: "" };
                setTimeout(() => {
                    addMessage(aiMsg);
                }, 100);
            } else {
                const aiMsg: ChatMessage = {
                    id: aiId,
                    role: 'assistant',
                    content: randomResponse.content,
                    type: randomResponse.type as any,
                    data: ""
                };
                setTimeout(() => {
                    addMessage(aiMsg);
                }, 100);
            }
        }, 1500);
    };

    // This component handles the typewriter text effect
    const TypewriterText = ({ text, speed, textStyle, shouldStart = true }: {
        text: string;
        speed: number;
        textStyle: any;
        shouldStart?: boolean;
    }) => {
        const [displayText, setDisplayText] = useState(speed === 0 ? text : '');

        useEffect(() => {
            if (speed === 0) {
                setDisplayText(text);
                return;
            }

            if (!shouldStart) {
                setDisplayText('');
                return;
            }

            const typingSpeed = 50; // ms per character

            let currentIndex = 0;
            setDisplayText(''); // Start with empty text

            const timer = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText(prev => prev + text[currentIndex]);
                    currentIndex++;
                } else {
                    clearInterval(timer);
                }
            }, typingSpeed);

            return () => clearInterval(timer);
        }, [text, speed, shouldStart]);

        return <Text style={textStyle}>{displayText}</Text>;
    };

    // This component handles the message bubble animation (fade, slide, scale)
    const AnimatedBubble = ({ msg, children }: { msg: ChatMessage; children: React.ReactNode }) => {
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

    const renderItem = (msg: ChatMessage, index: number) => {
        return (
            <AnimatedBubble key={msg.id || index} msg={msg}>
                <AnimatedMessageContent msg={msg} />
            </AnimatedBubble>
        );
    };

    const AnimatedMessageContent = ({ msg }: { msg: ChatMessage }) => {
        const handleHeightSelect = (height: string) => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: height, type: "", data: "" });
        };

        const handleFitSelect = (fit: string) => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: fit, type: "", data: "" });
        };

        const handleTryNow = (outfitId: string) => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: `I want to try outfit ${outfitId}`, type: "", data: "" });
        };

        const handleRegenerate = () => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: 'Generate new outfits', type: "", data: "" });
        };

        const handleViewVisuals = () => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: 'Yes, please show me visuals', type: "", data: "" });
        };

        const handleUpgrade = () => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: 'I want to upgrade to premium', type: "", data: "" });
        };

        const handleWaitUntilTomorrow = () => {
            const responseId = Date.now().toString() + Math.random().toString(36).slice(2);
            addMessage({ id: responseId, role: 'user', content: 'I will wait until tomorrow', type: "", data: "" });
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
                    // Render interactive components without bubble wrapper
                    <>
                        {msg.type === 'height-selection' && (
                            <HeightSelectionMessage onSelect={handleHeightSelect} />
                        )}
                        {msg.type === 'fit-preference' && (
                            <FitPreferenceMessage onSelect={handleFitSelect} />
                        )}
                        {msg.type === 'outfit-carousel' && msg.data && (
                            <OutfitCarouselMessage
                                outfits={JSON.parse(msg.data)}
                                onTryNow={handleTryNow}
                                onRegenerate={handleRegenerate}
                            />
                        )}
                        {msg.type === 'outfit-recommendations' && msg.data && (
                            <OutfitRecommendationsMessage
                                title={msg.data}
                                description={msg.data}
                                recommendations={JSON.parse(msg.data)}
                            />
                        )}
                        {msg.type === 'capsule-wardrobe' && msg.data && (
                            <CapsuleWardrobeMessage
                                wardrobeItems={JSON.parse(msg.data)}
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
                ) : (
                    // Render regular text message with bubble wrapper
                    <View style={[
                        styles.messageBubble,
                        msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                    ]}>
                        <TypewriterText
                            text={msg.content}
                            speed={0}
                            shouldStart={true}
                            textStyle={[
                                styles.messageText,
                                { color: msg.role === 'user' ? '#FFFFFF' : '#000000' }
                            ]}
                        />
                    </View>
                )}
            </>
        );
    };

    // Options dropdown component
    const OptionsDropdown = () => {
        const addTestMessage = (type: string) => {
            const aiId = Date.now().toString() + Math.random().toString(36).slice(2);

            switch (type) {
                case 'height':
                    addMessage({
                        id: aiId,
                        role: 'assistant',
                        content: 'Let me help you find the perfect fit!',
                        type: 'height-selection',
                        data: ""
                    });
                    break;
                case 'fit':
                    addMessage({
                        id: aiId,
                        role: 'assistant',
                        content: 'Tell me about your style preferences!',
                        type: 'fit-preference',
                        data: ""
                    });
                    break;
                case 'carousel':
                    addMessage({
                        id: aiId,
                        role: 'assistant',
                        content: 'Check out these amazing looks!',
                        type: 'outfit-carousel',
                        data: JSON.stringify({
                            outfits: [
                                { id: '1', name: 'Concert Look 1', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=400&fit=crop' },
                                { id: '2', name: 'Concert Look 2', image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=400&fit=crop' },
                                { id: '3', name: 'Concert Look 3', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=300&h=400&fit=crop' }
                            ]
                        })
                    });
                    break;
                case 'recommendations':
                    addMessage({
                        id: aiId,
                        role: 'assistant',
                        content: 'Here are some curated outfit ideas for you!',
                        type: 'outfit-recommendations',
                        data: JSON.stringify({
                            title: 'Got it! Bali + warm = comfy + cute.',
                            description: 'Here are 3 outfit ideas that scream: "Cool but effortless traveler." 🌴',
                            recommendations: [
                                {
                                    title: 'Outfit 1: Day Explorer',
                                    items: ['Breezy linen shirt', 'Khaki shorts', 'Slide sandals', 'Straw tote']
                                },
                                {
                                    title: 'Outfit 2: Sunset Dinner',
                                    items: ['Sleeveless maxi dress', 'Statement earrings', 'Flat sandals']
                                }
                            ]
                        })
                    });
                    break;
                case 'premium':
                    addMessage({
                        id: aiId,
                        role: 'assistant',
                        content: 'Ready to unlock more styling magic?',
                        type: 'premium-upgrade',
                        data: ""
                    });
                    break;
            }
            setChatStarted(true);
            setShowOptions(false);
        };

        return showOptions ? (
            <View style={styles.optionsDropdown}>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => {
                        generateRandomMessage();
                        setShowOptions(false);
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Random Message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => addTestMessage('height')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Height Selection</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => addTestMessage('carousel')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Outfit Carousel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => addTestMessage('recommendations')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Recommendations</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => addTestMessage('premium')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Premium Upgrade</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.optionItem}
                    onPress={() => {
                        clearMessages();
                        setChatStarted(false);
                        setShowOptions(false);
                    }}
                    activeOpacity={0.7}
                >
                    <Text style={styles.optionText}>Clear Chat</Text>
                </TouchableOpacity>
            </View>
        ) : null;
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
                                        onPress={() => setShowOptions(!showOptions)}
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
                                    onPress={() => setShowOptions(!showOptions)}
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
        maxWidth: '85%',
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
        // borderBottomLeftRadius: 4,
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 4,
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