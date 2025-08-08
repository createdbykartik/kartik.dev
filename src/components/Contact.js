import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';
import { useInView } from 'react-intersection-observer';

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  padding: 4rem 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ContactContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ContactInfo = styled(motion.div)``;

const ContactForm = styled(motion.form)`
  background: ${props => `${props.theme.primary}10`};
  padding: 2rem;
  border-radius: 20px;
  border: 2px solid ${props => `${props.theme.primary}20`};
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => `${props.theme.primary}30`};
  border-radius: 10px;
  background: transparent;
  color: ${props => props.theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid ${props => `${props.theme.primary}30`};
  border-radius: 10px;
  background: transparent;
  color: ${props => props.theme.text};
  font-size: 1rem;
  resize: vertical;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 1rem 2rem;
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  
  i {
    font-size: 1.2rem;
    color: ${props => props.theme.primary};
    width: 24px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: ${props => props.theme.gradient};
  color: white;
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px ${props => props.theme.primary}40;
  }
`;

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <Section id="contact" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        >
          Get In Touch
        </SectionTitle>
        
        <ContactContent>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Let's discuss your next cloud project</h3>
            <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
              I'm always interested in hearing about new opportunities and projects. 
              Whether you're looking for platform engineering expertise or AWS solutions, let's connect!
            </p>
            
            <ContactItem>
              <i className="fas fa-envelope"></i>
              <span>kartikvchadha@outlook.com</span>
            </ContactItem>
            
            <ContactItem>
              <i className="fas fa-phone"></i>
              <span>+61 405 317 792</span>
            </ContactItem>
            
            <ContactItem>
              <i className="fas fa-map-marker-alt"></i>
              <span>Melbourne, Australia</span>
            </ContactItem>
            
            <SocialLinks>
              <SocialLink href="https://linkedin.com/in/kartik-chadha" target="_blank">
                <i className="fab fa-linkedin"></i>
              </SocialLink>
              <SocialLink href="https://github.com/createdbykartik" target="_blank">
                <i className="fab fa-github"></i>
              </SocialLink>
            </SocialLinks>
          </ContactInfo>

          <ContactForm
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.4 }}
          >
            <FormGroup>
              <Input type="text" placeholder="Your Name" required />
            </FormGroup>
            <FormGroup>
              <Input type="email" placeholder="Your Email" required />
            </FormGroup>
            <FormGroup>
              <Input type="text" placeholder="Subject" required />
            </FormGroup>
            <FormGroup>
              <TextArea placeholder="Your Message" required />
            </FormGroup>
            <SubmitButton
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </Container>
    </Section>
  );
};

export default Contact;
