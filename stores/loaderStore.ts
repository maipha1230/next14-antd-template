import { create } from 'zustand'

interface LoaderState {
    isShowLoading: boolean;
    showLoading: () => void;
    hideLoading: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
    isShowLoading: false,
    showLoading: () => set({ isShowLoading: true }),
    hideLoading: () => set({ isShowLoading: false }),
}));
