<<<<<<< HEAD
// src/providers.tsx
'use client';

import { store } from '@/store/store';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
=======
// redux/provider.tsx
"use client";

import { Provider } from "react-redux";
import { store } from "./store";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
