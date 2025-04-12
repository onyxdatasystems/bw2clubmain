// src/components/core/BaseComponent.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

export abstract class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {
  protected defaultAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  protected cardHoverAnimation = {
    whileHover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
    },
    transition: { type: "spring", stiffness: 300 }
  };

  protected getResponsiveClasses(size: 'sm' | 'md' | 'lg') {
    return {
      container: size === 'sm' ? 'w-full' : size === 'md' ? 'w-10/12' : 'w-8/12',
      card: size === 'sm' ? 'w-full' : 'w-[221px]'
    };
  }
}