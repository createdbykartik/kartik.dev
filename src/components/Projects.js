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

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${props => `${props.theme.primary}10`};
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid ${props => `${props.theme.primary}20`};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px ${props => props.theme.primary}20;
  }
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.primary};
`;

const ProjectDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const TechTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const TechTag = styled.span`
  padding: 0.3rem 0.8rem;
  background: ${props => props.theme.gradient};
  color: white;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  const projects = [
    {
      title: "Implementing Orkes within Woodside",
      description: "Designed and implemented the deployment of Orkes (workflow orchestration platform) within Woodside's AWS environment using AWS CDK and EKS.",
      technologies: ["AWS CDK", "TypeScript", "EKS", "PostgreSQL", "Helm"]
    },
    {
      title: "PaaS Solution for Petronas",
      description: "Engineered a Platform-as-a-Service solution for energy customer to empower workforce with asset & equipment management capabilities using AWS and modern DevOps practices.",
      technologies: ["AWS", "CDK", "Serverless", "CI/CD", "GitHub Actions"]
    },
    {
      title: "Billing Automation Engine",
      description: "Revamped existing billing application using modern AWS services, reducing processing time from 1 hour 40 minutes to just 1 minute 12 seconds and cutting costs by 97%.",
      technologies: ["Python", "AWS", "Serverless", "CloudFormation", "Docker"]
    }
  ];

  return (
    <Section id="projects" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        >
          Featured Projects
        </SectionTitle>
        <ProjectsGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechTags>
                  {project.technologies.map((tech, techIndex) => (
                    <TechTag key={techIndex}>{tech}</TechTag>
                  ))}
                </TechTags>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </Container>
    </Section>
  );
};

export default Projects;
