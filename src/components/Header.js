import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const HeaderContainer = styled(motion.header)`
  position: fixed;
  top: 4px;
  left: 0;
  right: 0;
  background: ${props => `${props.theme.primary}ee`};
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid ${props => `${props.theme.primary}30`};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const Logo = styled(motion.a)`
  font-size: 21px;
  font-weight: 600;
  text-decoration: none;
  color: #ffffff;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.accent};
  }
`;

const NavMenu = styled(motion.div)`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    left: ${props => props.isOpen ? '0' : '-100%'};
    top: 74px;
    flex-direction: column;
    background-color: ${props => props.theme.primary};
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
  }
`;

const NavLink = styled(motion.a)`
  text-decoration: none;
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 20px;

  &:hover {
    color: ${props => props.theme.accent};
    background: rgba(255, 255, 255, 0.1);
  }

  ${props => props.isActive && `
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  `}
`;

const MobileToggle = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Bar = styled.div`
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  margin: 3px 0;
  transition: 0.3s;
  transform-origin: center;

  ${props => props.isOpen && props.index === 0 && 'transform: rotate(45deg) translate(6px, 6px);'}
  ${props => props.isOpen && props.index === 1 && 'opacity: 0;'}
  ${props => props.isOpen && props.index === 2 && 'transform: rotate(-45deg) translate(6px, -6px);'}
`;

const Header = ({ currentSection }) => {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home', section: 'home' },
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Experience', href: '#experience', section: 'experience' },
    { name: 'Skills', href: '#skills', section: 'skills' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Contact', href: '#contact', section: 'contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <HeaderContainer
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <NavContainer>
        <Logo
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#home');
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Kartik Chadha
        </Logo>

        <NavMenu isOpen={mobileMenuOpen}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.name}
              href={item.href}
              isActive={currentSection === item.section}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
            </NavLink>
          ))}
        </NavMenu>

        <MobileToggle onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {[0, 1, 2].map((index) => (
            <Bar key={index} index={index} isOpen={mobileMenuOpen} />
          ))}
        </MobileToggle>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
