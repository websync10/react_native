import { ChatMessage, useChatStore } from '@/lib/stores/chatStore';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
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
import Icon from 'react-native-vector-icons/Feather';
import MobileSidebar from './Sidebar';

interface HomePageProps {
    userData: User | null
}

const HomePage = ({
    userData
}: HomePageProps) => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const inputRef = useRef<TextInput>(null);
    const scrollRef = useRef<ScrollView>(null);
    const { bottom } = useSafeAreaInsets();

    const { messages, addMessage, loadMessages, clearMessages } = useChatStore();

    const [chatStarted, setChatStarted] = useState(false);
    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setChatStarted(true);
        const userMsg: ChatMessage = { role: 'user', content: input };
        addMessage(userMsg);
        setInput('');
        inputRef.current?.blur();

        console.log('[🔄] Connecting to backend...');
        setIsTyping(true);
        try {
            const res = await axios.post('http://192.168.111.110:3000/api/rag', { query: input });
            console.log('[✅] Connected to backend. Received response.');
            const aiMsg: ChatMessage = { role: 'assistant', content: res.data.answer };
            addMessage(aiMsg);
        } catch (err: any) {
            console.error('[❌] Backend connection failed:', err.message);
            addMessage({ role: 'assistant', content: 'Something went wrong. Try again.' });
        } finally {
            setIsTyping(false);
        }
    };

    const renderItem = (msg: ChatMessage, index: number) => (
        <View
            key={index}
            style={[
                styles.messageRow,
                msg.role === 'user' ? styles.alignEnd : styles.alignStart
            ]}
        >
            {msg.role === 'assistant' && (
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>🤖</Text>
                </View>
            )}
            <View
                style={[
                    styles.messageBubble,
                    msg.role === 'user' ? styles.userBubble : styles.aiBubble,
                ]}
            >
                <Text style={styles.messageText}>{msg.content}</Text>
            </View>
            {msg.role === 'user' && (
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>🧑</Text>
                </View>
            )}
        </View>
    );
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setSidebarVisible(true)}>
                        <Icon name="menu" size={24} color="#333" />
                    </TouchableOpacity>

                    <MobileSidebar
                        visible={sidebarVisible}
                        onClose={() => setSidebarVisible(false)}
                        userData={userData}
                    />

                    <View style={styles.logoContainer}>
                        <View style={styles.logoIcon}>
                            <Text style={styles.logoText}>M</Text>
                        </View>
                        <Text style={styles.brandText}>Myuze</Text>
                    </View>

                    <TouchableOpacity>
                        <Icon name="bell" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {!chatStarted ? (
                    <>
                        <View style={styles.mainContent}>
                            <View style={styles.largeLogo}>
                                <View style={styles.shoppingBag}>
                                    <Text style={styles.largeLogoText}>M</Text>
                                </View>
                            </View>
                            <Text style={styles.greeting}>Hi there 👋</Text>
                            <Text style={styles.subtitle}>Ask Myuze for outfit ideas</Text>
                        </View>

                        <View style={styles.bottomSection}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Ask me anything..."
                                    placeholderTextColor="#999"
                                    value={input}
                                    onChangeText={setInput}
                                    onSubmitEditing={sendMessage}
                                />
                                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                                    <Icon name="arrow-up" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                ) : (
                    <ScrollView
                        ref={scrollRef}
                        style={styles.chatList}
                        contentContainerStyle={{ padding: 16, paddingBottom: bottom + 100 }}
                    >
                        {messages.map(renderItem)}
                        {isTyping && (
                            <View style={[styles.messageRow, styles.alignStart]}>
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>🤖</Text>
                                </View>
                                <View style={styles.aiBubble}>
                                    <Text style={styles.messageText}>Typing…</Text>
                                </View>
                            </View>
                        )}
                    </ScrollView>
                )}

                {chatStarted && (
                    <View style={styles.bottomSection}>
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
                            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                                <Icon name="arrow-up" size={20} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#f8f9fa',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoIcon: {
        width: 24,
        height: 24,
        backgroundColor: '#007AFF',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    logoText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    brandText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    largeLogo: {
        marginBottom: 40,
    },
    shoppingBag: {
        width: 120,
        height: 120,
        backgroundColor: '#007AFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    largeLogoText: {
        color: '#fff',
        fontSize: 48,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    bottomSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
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
        backgroundColor: '#e9ecef',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 4,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 12,
        color: '#333',
    },
    sendButton: {
        width: 36,
        height: 36,
        backgroundColor: '#333',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        marginTop: 4,
        color: '#333',
        fontWeight: '500',
    },
    navTextInactive: {
        color: '#666',
    },
    homeIndicator: {
        width: 134,
        height: 5,
        backgroundColor: '#333',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 8,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 16,
        marginBottom: 12,
    },
    userBubble: {
        backgroundColor: '#d1f1ff',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    aiBubble: {
        backgroundColor: '#f0f0f0',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        fontSize: 15,
    },
    chatList: { flex: 1 },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    alignEnd: {
        justifyContent: 'flex-end',
    },
    alignStart: {
        justifyContent: 'flex-start',
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    avatarText: {
        fontSize: 14,
    },
});

export default HomePage;