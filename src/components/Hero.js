import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';
import { useInView } from 'react-intersection-observer';
import useMousePosition from '../hooks/useMousePosition';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: relative;
  overflow: hidden;
`;

const ParticlesBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.gradient};
  opacity: 0.05;
  z-index: 0;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 1;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
    padding-top: calc(3.5rem + env(safe-area-inset-top, 0px));
  }
`;

const HeroContent = styled(motion.div)`
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 1rem;
  line-height: 1.1;
  font-weight: 700;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
  font-weight: 500;
`;

const HeroDescription = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.text};
  line-height: 1.6;
  opacity: 0.9;
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Button = styled(motion.a)`
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid ${props => props.theme.primary};
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &.primary {
    background: ${props => props.theme.gradient};
    color: white;
    border: none;

    &:hover {
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 15px 30px ${props => props.theme.primary}40;
      filter: brightness(1.1);
    }
  }

  &.secondary {
    background: transparent;
    color: ${props => props.theme.primary};

    &:hover {
      background: ${props => props.theme.primary};
      color: white;
      transform: translateY(-3px) scale(1.02);
      box-shadow: 0 10px 25px ${props => props.theme.primary}30;
    }
  }
`;

const ProfileCard = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const ProfileImage = styled(motion.img)`
  width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid ${props => props.theme.primary};
  box-shadow: 0 20px 40px ${props => props.theme.primary}20;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

  &:hover {
    transform: scale(1.08) rotate(2deg);
    box-shadow: 0 30px 60px ${props => props.theme.primary}40;
    border-width: 6px;
    filter: contrast(1.1) saturate(1.2);
  }

  &:active {
    transform: scale(1.05) rotate(-1deg);
  }

  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const FloatingElements = styled(motion.div)`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  opacity: 0.1;
`;

const Hero = ({ scrollY }) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });
  const mousePosition = useMousePosition();
  const profileRef = useRef(null);

  // Create magnetic effect for profile image
  const magneticX = useSpring(0, { stiffness: 100, damping: 20 });
  const magneticY = useSpring(0, { stiffness: 100, damping: 20 });

  React.useEffect(() => {
    if (profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mousePosition.x - centerX, 2) + Math.pow(mousePosition.y - centerY, 2)
      );
      
      if (distance < 200) {
        const strength = (200 - distance) / 200;
        magneticX.set((mousePosition.x - centerX) * strength * 0.1);
        magneticY.set((mousePosition.y - centerY) * strength * 0.1);
      } else {
        magneticX.set(0);
        magneticY.set(0);
      }
    }
  }, [mousePosition, magneticX, magneticY]);

  const parallaxY = scrollY * 0.5;

  return (
    <HeroSection id="home" ref={ref}>
      <ParticlesBackground
        animate={{
          background: [
            theme.gradient,
            `linear-gradient(135deg, ${theme.primary}40 0%, ${theme.secondary}40 100%)`,
            theme.gradient
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Floating Elements */}
      <FloatingElements
        style={{ top: '10%', left: '10%', transform: `translateY(${-parallaxY * 0.2}px)` }}
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <FloatingElements
        style={{ top: '60%', right: '15%', transform: `translateY(${-parallaxY * 0.3}px)` }}
        animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <HeroContainer>
        <HeroContent
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8 }}
        >
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Hi, I'm <span>Kartik Chadha</span>
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Senior Platform Engineer
          </HeroSubtitle>
          
          <HeroDescription
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Dynamic Platform/DevOps Engineer with over 8 years of experience in bridging 
            Development and Operations, specialising in scalable AWS solutions and cloud-native applications.
          </HeroDescription>
          
          <ButtonContainer
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              className="primary"
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </Button>
            <Button
              className="secondary"
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </Button>
          </ButtonContainer>
        </HeroContent>

        <ProfileCard
          ref={profileRef}
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ 
            transform: `translateY(${-parallaxY * 0.1}px)`,
            x: magneticX,
            y: magneticY
          }}
        >
          <ProfileImage
            src={`${process.env.PUBLIC_URL}/assets/kartik-profile.jpg`}
            alt="Kartik Chadha Profile"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </ProfileCard>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;
