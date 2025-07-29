// useOnboardingStore.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface ChatOnboardingData {
    height?: string;
    weather?: string;
    location?: string;
}

interface OnboardingState {
    data: ChatOnboardingData;
    step: number;
    completed: boolean;
    setStep: (step: number) => void;
    updateData: (key: keyof ChatOnboardingData, value: string) => void;
    completeOnboarding: () => Promise<void>;
    loadFromStorage: () => Promise<void>;
}

export const useChatOnboardingStore = create<OnboardingState>((set) => ({
    data: {},
    step: 0,
    completed: false,
    setStep: (step) => set({ step }),
    updateData: (key, value) =>
        set((state) => ({
            data: { ...state.data, [key]: value },
        })),
    completeOnboarding: async () => {
        const { data } = useChatOnboardingStore.getState();
        await AsyncStorage.setItem('userPreferences', JSON.stringify(data));
        await AsyncStorage.setItem('onboardingComplete', 'true');
        set({ completed: true, step: 0 });
    },
    loadFromStorage: async () => {
        const saved = await AsyncStorage.getItem('userPreferences');
        const done = await AsyncStorage.getItem('onboardingComplete');
        if (done === 'true') {
            set({
                completed: true,
                data: saved ? JSON.parse(saved) : {},
            });
        }
    },
}));
