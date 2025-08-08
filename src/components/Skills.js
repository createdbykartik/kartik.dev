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

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const SkillCategory = styled(motion.div)`
  background: ${props => `${props.theme.primary}10`};
  padding: 2rem;
  border-radius: 20px;
  border: 2px solid ${props => `${props.theme.primary}20`};
`;

const SkillItem = styled.div`
  margin-bottom: 1rem;
`;

const SkillName = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const SkillBar = styled.div`
  height: 8px;
  background: ${props => `${props.theme.primary}20`};
  border-radius: 4px;
  overflow: hidden;
`;

const SkillProgress = styled(motion.div)`
  height: 100%;
  background: ${props => props.theme.gradient};
  border-radius: 4px;
`;

const Skills = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  const skillCategories = [
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", level: 95 },
        { name: "Infrastructure as Code", level: 90 },
        { name: "CI/CD", level: 90 },
        { name: "Docker", level: 85 }
      ]
    },
    {
      title: "Programming",
      skills: [
        { name: "TypeScript", level: 95 },
        { name: "Python", level: 85 },
        { name: "Git", level: 90 },
        { name: "MySQL", level: 80 }
      ]
    },
    {
      title: "Leadership & Soft Skills",
      skills: [
        { name: "Customer Facing", level: 90 },
        { name: "Teamwork", level: 90 },
        { name: "Leadership", level: 90 }
      ]
    }
  ];

  return (
    <Section id="skills" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        >
          Skills
        </SectionTitle>
        <SkillsGrid>
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategory
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: categoryIndex * 0.2 }}
            >
              <h3 style={{ marginBottom: '1.5rem' }}>{category.title}</h3>
              {category.skills.map((skill, skillIndex) => (
                <SkillItem key={skill.name}>
                  <SkillName>
                    <span>{skill.name}</span>
                    <span>{skill.level}%</span>
                  </SkillName>
                  <SkillBar>
                    <SkillProgress
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: categoryIndex * 0.2 + skillIndex * 0.1 }}
                    />
                  </SkillBar>
                </SkillItem>
              ))}
            </SkillCategory>
          ))}
        </SkillsGrid>
      </Container>
    </Section>
  );
};

export default Skills;
