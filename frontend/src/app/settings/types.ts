// 1. types.ts
export enum ScreenType {
    SETTINGS = 'settings',
    CONTACT = 'contact',
    TERMS = 'terms',
    PRIVACY = 'privacy',
    COOKIES = 'cookies',
    FAQS = 'faqs'
  }
  
  export interface MenuItem {
    id: ScreenType;
    text: string;
    icon: string;
  }