import { create } from 'zustand';
import { Ad } from '../types/page';

interface AdStore {
  ads: Ad[];
  setAds: (ads: Ad[]) => void;
}

export const useAdStore = create<AdStore>((set) => ({
  ads: [],
  setAds: (ads) => set({ ads }),
}));
