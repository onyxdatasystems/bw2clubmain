
'use client';
<<<<<<< HEAD
import React from 'react';

export abstract class BaseComponent<P = object, S = object> extends React.Component<P, S> {
=======

import React from 'react';
import { motion } from 'framer-motion';

export abstract class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
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