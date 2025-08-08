import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';
import { useInView } from 'react-intersection-observer';

const AboutSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 20px;
  z-index: 1;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div``;

const AboutParagraph = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  opacity: 0.9;
`;

const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: ${props => `${props.theme.primary}10`};
  border: 2px solid ${props => `${props.theme.primary}20`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px ${props => props.theme.primary}20;
    background: ${props => `${props.theme.primary}15`};
  }
`;

const StatNumber = styled.span`
  display: block;
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.text};
  opacity: 0.8;
`;

const SkillsSection = styled.div``;

const SkillsTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: ${props => props.theme.primary};
`;

const SkillTags = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const SkillTag = styled(motion.span)`
  padding: 0.7rem 1.2rem;
  background: ${props => props.theme.gradient};
  color: white;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px ${props => props.theme.primary}40;
  }
`;

const BackgroundShape = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  opacity: 0.05;
  z-index: 0;
`;

const About = ({ scrollY }) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  const skills = [
    'TypeScript', 'Python', 'AWS', 'CI/CD', 'Docker', 
    'Infrastructure as Code', 'Git', 'MySQL'
  ];

  const stats = [
    { number: '8+', label: 'Years Experience' },
    { number: '3', label: 'AWS Certifications' },
    { number: '15+', label: 'Technologies' }
  ];

  const parallaxY = scrollY * 0.3;

  return (
    <AboutSection id="about" ref={ref}>
      <BackgroundShape
        style={{ 
          top: '10%', 
          right: '10%',
          transform: `translateY(${-parallaxY * 0.2}px)` 
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </SectionTitle>

        <AboutContent>
          <AboutText>
            <AboutParagraph
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Dynamic Platform/DevOps Engineer with over 8 years of experience in bridging 
              Development and Operations, specialising in scalable AWS solutions. Expertise in 
              TypeScript, Infrastructure as Code, and CI/CD practices drives the creation of efficient, 
              cloud-native applications.
            </AboutParagraph>

            <AboutParagraph
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A strong foundation in backend development, coupled with a serverless-first mindset, 
              enhances the ability to modernise legacy systems and implement robust orchestration platforms. 
              Committed to delivering high-quality software that meets customer needs while ensuring smooth deployment processes.
            </AboutParagraph>

            <StatsContainer
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <StatNumber>{stat.number}</StatNumber>
                  <StatLabel>{stat.label}</StatLabel>
                </StatCard>
              ))}
            </StatsContainer>
          </AboutText>

          <SkillsSection>
            <SkillsTitle>Core Technologies</SkillsTitle>
            <SkillTags
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {skills.map((skill, index) => (
                <SkillTag
                  key={skill}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </SkillTag>
              ))}
            </SkillTags>
          </SkillsSection>
        </AboutContent>
      </Container>
    </AboutSection>
  );
};

export default About;
