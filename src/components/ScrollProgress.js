import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const ProgressContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 9999;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.gradient};
  transform-origin: 0%;
`;

const ScrollProgress = () => {
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <ProgressContainer>
      <ProgressBar
        style={{ scaleX: scrollProgress / 100 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      />
    </ProgressContainer>
  );
};

export default ScrollProgress;
