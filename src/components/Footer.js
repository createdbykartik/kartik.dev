import React from 'react';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const FooterContainer = styled.footer`
  background: ${props => props.theme.primary};
  color: white;
  text-align: center;
  padding: 2rem 0;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  p {
    margin-bottom: 0.5rem;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <p>&copy; 2025 Kartik Chadha. All rights reserved.</p>
        <p>Senior Platform Engineer | AWS Certified | Melbourne, Australia</p>
        <p>Built with ❤️ using GPT-5 — GitHub Copilot</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
