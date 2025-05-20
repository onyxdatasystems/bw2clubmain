import { create } from 'zustand';
import { Media } from '../types/page';

interface MediaStore {
  media: Media[];
  setMedia: (media: Media[]) => void;
}

export const useMediaStore = create<MediaStore>((set) => ({
  media: [],
  setMedia: (media) => set({ media }),
}));
