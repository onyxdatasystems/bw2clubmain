// LogoutButton.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

interface LogoutButtonProps {
  onClick?: () => void;
  className?: string;
}

interface LogoutButtonState {
  isMobile: boolean;
}

class LogoutButton extends React.Component<LogoutButtonProps, LogoutButtonState> {
  constructor(props: LogoutButtonProps) {
    super(props);
    this.state = {
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth < 768 });
  };

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  get buttonSizeClasses() {
    const baseClasses = 'flex items-center gap-3 rounded-lg transition-colors duration-200';
    if (this.state.isMobile) {
      return `${baseClasses} px-4 py-2 text-sm`;
    }
    return `${baseClasses} px-6 py-3 text-base`;
  }

  render() {
    const { className = '' } = this.props;
    const iconSize = this.state.isMobile ? 14 : 17;

    return (
      <motion.button
        onClick={this.handleClick}
        className={`${this.buttonSizeClasses} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Log out"
      >
        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.6 }}>
          <Image 
            src="https://dashboard.codeparrot.ai/api/image/Z-95O-GYgKEKiAjb/frame-48.png"
            alt="Logout icon"
            width={iconSize}
            height={iconSize}
            className="object-contain"
          />
        </motion.div>
        <span className="text-[#292b32] font-medium leading-[140%] tracking-[-0.066px]">
          Log Out
        </span>
      </motion.button>
    );
  }
}

export default LogoutButton;