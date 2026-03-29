import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export type MessageType = 
    | 'text'
    | 'height-selection'
    | 'fit-preference'
    | 'outfit-carousel'
    | 'outfit-recommendations'
    | 'capsule-wardrobe'
    | 'premium-upgrade';

export type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    type?: MessageType;
    data?: any; // Additional data for interactive messages
};

interface ChatState {
    messages: ChatMessage[];
    addMessage: (msg: ChatMessage) => void;
    loadMessages: () => Promise<void>;
    clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    messages: [],
    addMessage: (msg) => {
        const updated = [...get().messages, msg];
        AsyncStorage.setItem('chatMessages', JSON.stringify(updated));
        set({ messages: updated });
    },
    loadMessages: async () => {
        const data = await AsyncStorage.getItem('chatMessages');
        if (data) {
            set({ messages: JSON.parse(data) });
        }
    },
    clearMessages: () => {
        AsyncStorage.removeItem('chatMessages');
        set({ messages: [] });
    },
}));
