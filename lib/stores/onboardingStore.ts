import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OnboardingState {
    userId: string;
    fullName: string;
    username: string;
    gender: string;
    dob: string;
    skin_tone: string;
    size: string;
    image: string;
    style: string[];
    body_shape: string;
    isOnobarded: boolean;

    setField: <K extends keyof OnboardingState>(
        key: K,
        value: OnboardingState[K]
    ) => void;

    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            userId: "",
            fullName: "",
            username: "",
            gender: "",
            dob: "",
            skin_tone: "",
            size: "XL",
            image: "",
            style: [""],
            body_shape: "",
            isOnobarded: false,

            setField: (key, value) => set((state) => ({ ...state, [key]: value })),
            reset: () =>
                set({
                    userId: "",
                    fullName: "",
                    username: "",
                    gender: "",
                    dob: "",
                    skin_tone: "",
                    size: "",
                    image: "",
                    style: [""],
                    body_shape: "",
                    isOnobarded: false,
                }),
        }),
        {
            name: 'onboarding-store',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
