'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import SettingsScreen from './SettingsScreen';
import ContactUsScreen from './ContactUsScreen';
import TermsAndConditionsScreen from './TermsAndConditionsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import CookiesScreen from './CookiesScreen';
import FAQsScreen from './FAQsScreen';

type ScreenType = 
  | 'settings' 
  | 'contact' 
  | 'terms' 
  | 'privacy' 
  | 'cookies' 
  | 'faqs';

export default function SettingsLayout() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('settings');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isSmall = useMediaQuery({ maxWidth: 640 });
  const isMedium = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isLarge = useMediaQuery({ minWidth: 1025 });

  // Close mobile menu when screen size changes to large
  useEffect(() => {
    if (isLarge) {
      setIsMobileMenuOpen(false);
    }
  }, [isLarge]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'contact': return <ContactUsScreen />;
      case 'terms': return <TermsAndConditionsScreen />;
      case 'privacy': return <PrivacyPolicyScreen />;
      case 'cookies': return <CookiesScreen />;
      case 'faqs': return <FAQsScreen />;
      default: return <SettingsScreen onSelect={setCurrentScreen} />;
    }
  };

  const renderMobileMenuButton = () => (
    <motion.button
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg md:hidden"
      whileTap={{ scale: 0.9 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </motion.button>
  );

  const renderMobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg p-4"
        >
          <SettingsScreen 
            onSelect={(screen) => {
              setCurrentScreen(screen);
              setIsMobileMenuOpen(false);
            }} 
            isMobileMenu
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderBackButton = () => (
    <motion.button
      onClick={() => setCurrentScreen('settings')}
      className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow-lg"
      whileTap={{ scale: 0.9 }}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button (only on small screens) */}
      {isSmall && renderMobileMenuButton()}

      {/* Mobile menu (only on small screens) */}
      {isSmall && renderMobileMenu()}

      {/* Back button (when not on settings screen) */}
      {currentScreen !== 'settings' && renderBackButton()}

      {/* Main content area */}
      <div className="container mx-auto p-4">
        {/* Small screens: Single column */}
        {isSmall && (
          <motion.div
            key={`small-${currentScreen}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderScreen()}
          </motion.div>
        )}

        {/* Medium screens: Two columns */}
        {isMedium && (
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-1"
            >
              <SettingsScreen onSelect={setCurrentScreen} />
            </motion.div>
            <motion.div
              key={`medium-${currentScreen}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-1"
            >
              {renderScreen()}
            </motion.div>
          </div>
        )}

        {/* Large screens: Three columns */}
        {isLarge && (
          <div className="grid grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-1"
            >
              <SettingsScreen onSelect={setCurrentScreen} />
            </motion.div>
            <motion.div
              key={`large-${currentScreen}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="col-span-2"
            >
              {renderScreen()}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}