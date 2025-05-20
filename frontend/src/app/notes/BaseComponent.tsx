"use client"

import { motion } from 'framer-motion';
import React from 'react';

<<<<<<< HEAD
abstract class BaseComponent<P = object, S = object> extends React.Component<P, S> {
=======
abstract class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
  protected defaultAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeInOut" }
  };

  protected hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.2 }
  };

  protected tapAnimation = {
    scale: 0.98
  };

  public abstract render(): React.ReactNode;

  protected wrapWithMotion(
    children: React.ReactNode,
<<<<<<< HEAD
    customAnimation?: Partial<import('framer-motion').AnimationProps>,
=======
    customAnimation?: any,
>>>>>>> 492fe3069fa30d915b761271c537d20db9136272
    className?: string
  ) {
    return (
      <motion.div
        {...(customAnimation || this.defaultAnimation)}
        className={className}
        whileHover={this.hoverAnimation}
        whileTap={this.tapAnimation}
      >
        {children}
      </motion.div>
    );
  }
}

export default BaseComponent;