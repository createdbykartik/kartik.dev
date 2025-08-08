import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';
import VehicleOverlay from './VehicleOverlay';

const BackgroundContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2; /* above sections (which are z-index:1) */
  pointer-events: none;
  overflow: hidden;
`;

const ParticleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  background: ${props => props.theme.primary}30;
  border-radius: 50%;
`;

const GeometricShape = styled(motion.div)`
  position: absolute;
  border: 2px solid ${props => props.theme.primary}20;
  background: ${props => props.theme.primary}10;
`;

const WavePattern = styled(motion.svg)`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.1;
`;

const InteractiveBackground = ({ currentSection }) => {
  const { theme } = useTheme();

  const generateParticles = () => {
    // Particles disabled globally per request
    return null;
  };

  const sectionKey = (currentSection || '').toLowerCase();
  // const showBalloons = sectionKey !== 'skills' && sectionKey !== 'projects'; // no longer gating balloons

  const getParticleAnimation = () => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    switch (theme.animation) {
      case 'floating':
        return { y: [-20, 20], x: [-10, 10] };
      case 'pulse':
        return { scale: [1, 1.3, 1], opacity: [0.3, 0.7, 0.3] };
      case 'vehicles':
        return { x: [0, screenWidth + 100] }; // Vehicles move across screen
      case 'rotate':
        return { rotate: [0, 360], scale: [1, 1.2, 1] };
      case 'morph':
        return { borderRadius: ['50%', '20%', '50%'], scale: [1, 1.5, 1] };
      case 'ripple':
        return { scale: [1, 2, 1], opacity: [0.3, 0.1, 0.3] };
      default:
        return { y: [-10, 10] };
    }
  };

  const renderBackgroundPattern = () => {
    switch (theme.backgroundPattern) {
      case 'roads':
        return null; // Roads are now handled in VehicleOverlay
        
      case 'dots':
        return (
          <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.05 }}>
            <defs>
              <pattern id="dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="3" fill={theme.primary} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        );
      
      case 'lines':
        return (
          <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.05 }}>
            <defs>
              <pattern id="lines" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0,0 L40,40 M40,0 L0,40" stroke={theme.primary} strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#lines)" />
          </svg>
        );
      
      case 'waves':
        return (
          <WavePattern viewBox="0 0 1200 120">
            <motion.path
              d="M0,0 C150,100 300,0 600,50 C900,100 1050,0 1200,50 L1200,120 L0,120 Z"
              fill={theme.primary}
              animate={{ 
                d: [
                  "M0,0 C150,100 300,0 600,50 C900,100 1050,0 1200,50 L1200,120 L0,120 Z",
                  "M0,50 C150,0 300,100 600,0 C900,50 1050,100 1200,0 L1200,120 L0,120 Z",
                  "M0,0 C150,100 300,0 600,50 C900,100 1050,0 1200,50 L1200,120 L0,120 Z"
                ]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </WavePattern>
        );
      
      case 'geometric':
        return (
          <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
            {Array.from({ length: 8 }, (_, i) => (
              <GeometricShape
                key={i}
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  left: `${Math.random() * 80 + 10}%`,
                  top: `${Math.random() * 80 + 10}%`,
                  borderRadius: i % 2 === 0 ? '50%' : '20%'
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        );
      
      case 'organic':
        return (
          <svg width="100%" height="100%" style={{ position: 'absolute', opacity: 0.05 }}>
            <motion.path
              d="M100,200 C200,100 400,300 600,200 C800,100 1000,300 1100,200"
              stroke={theme.primary}
              strokeWidth="3"
              fill="none"
              animate={{
                d: [
                  "M100,200 C200,100 400,300 600,200 C800,100 1000,300 1100,200",
                  "M100,300 C200,200 400,100 600,300 C800,200 1000,100 1100,300",
                  "M100,200 C200,100 400,300 600,200 C800,100 1000,300 1100,200"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <BackgroundContainer
      animate={{
        background: [
          'rgba(0, 122, 204, 0.02)',
          'rgba(0, 122, 204, 0.05)',
          'rgba(0, 122, 204, 0.02)'
        ]
      }}
      transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
    >
      {sectionKey !== 'projects' && sectionKey !== 'skills' && renderBackgroundPattern()}
      <ParticleContainer>{generateParticles()}</ParticleContainer>
      {/* Balloons overlay always visible on all sections */}
      <VehicleOverlay active side="right" width={240} />
    </BackgroundContainer>
  );
};

export default InteractiveBackground;
