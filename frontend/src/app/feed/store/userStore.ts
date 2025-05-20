import { create } from 'zustand';
import { User } from '../types/page';

interface UserStore {
  currentUser: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  setUser: (user) => set({ currentUser: user }),
}));
