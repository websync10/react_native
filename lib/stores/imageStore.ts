import { create } from 'zustand';

type ImageStore = {
    generatedImages: string[][]; // array of image arrays
    addImages: (images: string[]) => void;
    clearImages: () => void;
};

export const useImageStore = create<ImageStore>((set) => ({
    generatedImages: [],
    addImages: (images) =>
        set((state) => ({
            generatedImages: [...state.generatedImages, images],
        })),
    clearImages: () => set({ generatedImages: [] }),
}));
