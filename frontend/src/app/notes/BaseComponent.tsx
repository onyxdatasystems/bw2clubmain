"use client"

import { motion } from 'framer-motion';
import React from 'react';

abstract class BaseComponent<P = {}, S = {}> extends React.Component<P, S> {
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
    customAnimation?: any,
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