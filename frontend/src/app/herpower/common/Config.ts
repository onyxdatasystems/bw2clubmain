export class AppConfig {
    static readonly breakpoints = {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280
    };
  
    static readonly colors = {
      primary: '#7171C1',
      secondary: '#3E3574',
      accent: '#8787CB',
      light: '#F6F6F6',
      dark: '#292B32'
    };
  
    static readonly transitions = {
      fast: 0.15,
      medium: 0.3,
      slow: 0.5
    };
  }
  
  export class NavbarConfig extends AppConfig {
    static readonly menuItems = [
      { icon: '/house-fi.png', name: 'Home', path: '/' },
      { icon: '/users-fi.png', name: 'Users', path: '/users' },
      { icon: '/briefcas.png', name: 'Briefcase', path: '/briefcase' },
      { icon: '/hand-hea.png', name: 'Heart', path: '/heart' },
      { icon: '/bell-fil.png', name: 'Notifications', path: '/notifications' }
    ];
  }
  
  export class SidebarConfig extends AppConfig {
    static readonly menuItems = [
      { icon: '/gavel-sv.png', text: 'HerPower', link: '/herpower', active: true },
      { icon: '/contact.png', text: 'Thematic Groups', link: '/groups' },
      { icon: '/privacy.png', text: 'Events', link: '/events' },
      { icon: '/cookies.png', text: 'Competitions', link: '/competitions' },
      { icon: '/help-out.png', text: 'Initiatives', link: '/initiatives' },
      { icon: '/frame-48.png', text: 'EmpowerSphere', link: '/empowersphere' },
      { icon: '/frame-48.png', text: 'Settings & Privacy', link: '/settings' }
    ];
  }
  
  export class ContentConfig extends AppConfig {
    static readonly recommendedCards = [
      {
        id: 1,
        image: '/componen.png',
        title: 'Morning Story',
        category: 'Business',
        members: '123 Members',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet arcu neque...'
      },
      {
        id: 2,
        image: '/componen-2.png',
        title: 'Teletubby',
        category: 'TV Shows',
        members: '123 Members',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet arcu neque...',
        priority: true
      },
      {
        id: 3,
        image: '/componen-3.png',
        title: 'Italian Recipes',
        category: 'Food',
        members: '123 Members',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin laoreet arcu neque...'
      }
    ];
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