import React, { createContext, useContext, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

const themes = {
  home: {
    primary: '#007ACC',
    secondary: '#0066cc',
    background: '#ffffff',
    text: '#1d1d1f',
    accent: '#e6f3ff',
    gradient: 'linear-gradient(135deg, #007ACC 0%, #0066cc 100%)',
    particles: '#007ACC20',
    // Interactive properties
    animation: 'floating',
    particleCount: 'normal',
    backgroundPattern: 'gradient',
    interactionStyle: 'hover-scale'
  },
  about: {
    primary: '#007ACC',
    secondary: '#0066cc',
    background: '#ffffff',
    text: '#1d1d1f',
    accent: '#e6f3ff',
    gradient: 'linear-gradient(135deg, #007ACC 0%, #0066cc 100%)',
    particles: '#007ACC20',
    // Interactive properties
    animation: 'pulse',
    particleCount: 'dense',
    backgroundPattern: 'dots',
    interactionStyle: 'hover-glow'
  },
  experience: {
    primary: '#007ACC',
    secondary: '#0066cc',
    background: '#ffffff',
    text: '#1d1d1f',
    accent: '#e6f3ff',
    gradient: 'linear-gradient(135deg, #007ACC 0%, #0066cc 100%)',
    particles: '#007ACC20',
    // Interactive properties
    animation: 'vehicles',
    particleCount: 'traffic',
    backgroundPattern: 'roads',
    interactionStyle: 'hover-drive'
  },
  skills: {
    primary: '#007ACC',
    secondary: '#0066cc',
    background: '#ffffff',
    text: '#1d1d1f',
    accent: '#e6f3ff',
    gradient: 'linear-gradient(135deg, #007ACC 0%, #0066cc 100%)',
    particles: '#007ACC20',
    // Interactive properties
    animation: 'rotate',
    particleCount: 'animated',
    backgroundPattern: 'waves',
    interactionStyle: 'hover-bounce'
  },
  projects: {
    primary: '#007ACC',
    secondary: '#0066cc',
    background: '#ffffff',
    text: '#1d1d1f',
    accent: '#e6f3ff',
    gradient: 'linear-gradient(135deg, #007ACC 0%, #0066cc 100%)',
    particles: '#007ACC20',
    // Interactive properties
    animation: 'morph',
    particleCount: 'burst',
    backgroundPattern: 'geometric',
    interactionStyle: 'hover-3d'
  },
  contact: {
    primary: '#007ACC',
    secondary: '#0066cc',
    background: '#ffffff',
    text: '#1d1d1f',
    accent: '#e6f3ff',
    gradient: 'linear-gradient(135deg, #007ACC 0%, #0066cc 100%)',
    particles: '#007ACC20',
    // Interactive properties
    animation: 'ripple',
    particleCount: 'flowing',
    backgroundPattern: 'organic',
    interactionStyle: 'hover-magnetic'
  }
};

const ThemeProvider = ({ children, currentSection }) => {
  const theme = useMemo(() => {
    return themes[currentSection] || themes.home;
  }, [currentSection]);

  return (
    <StyledThemeProvider theme={theme}>
      <ThemeContext.Provider value={{ theme, currentSection }}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;
