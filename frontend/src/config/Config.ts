// src/config/Config.ts
export class AppConfig {
    static readonly breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
  
    static readonly colors = {
      primary: '#8585D5',
      secondary: '#6767B7',
      accent: '#FFEFF7',
      light: '#F6F6F6',
      dark: '#292B32'
    };
  
    static readonly transitions = {
      fast: 0.15,
      medium: 0.3,
      slow: 0.5
    };
  }
  
  export const Animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 }
    },
    scaleIn: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1 }
    },
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    },
    tap: {
      scale: 0.98
    }
  };