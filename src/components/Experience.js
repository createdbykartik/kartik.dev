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
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    align-items: flex-start; /* allow content to start from top */
    padding: 5rem 0 3rem; /* a bit more top padding so header/name has room */
    overflow: visible; /* avoid clipping any shadows */
    min-height: auto; /* let content size the section */
  }
`;

const CONTENT_GUTTER = 280; // px, must match overlay width

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
  padding-right: ${CONTENT_GUTTER + 20}px; /* create space for right-side cars */

  @media (max-width: 900px) {
    padding-right: 20px; /* collapse gutter on small screens */
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

const TimelineItem = styled(motion.div)`
  margin-bottom: 3rem;
  padding: 2rem;
  background: ${props => `${props.theme.primary}10`};
  border-radius: 20px;
  border-left: 4px solid ${props => props.theme.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
    box-shadow: 0 10px 30px ${props => props.theme.primary}20;
    background: ${props => `${props.theme.primary}15`};
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    padding: 1.25rem;
  }
`;

const TimelineDate = styled.div`
  font-size: 0.9rem;
  color: ${props => props.theme.primary};
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const TimelineCompany = styled.h4`
  font-size: 1.1rem;
  color: ${props => props.theme.primary};
  margin-bottom: 1rem;
  opacity: 0.9;
`;

const TimelineDescription = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const HighlightItem = styled.li`
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
  opacity: 0.9;

  &:before {
    content: "▶";
    position: absolute;
    left: 0;
    color: ${props => props.theme.primary};
    font-size: 0.8rem;
  }
`;

const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.3 });

  const experiences = [
    {
      period: "May 2025 - Present",
      title: "Senior Consultant",
      company: "Mantel Group, Melbourne",
      description: "Engaged in a cloud migration initiative to lift and shift on-premises infrastructure to AWS, utilizing modern migration tools and Infrastructure as Code practices.",
      highlights: [
        "Orchestrated large-scale cloud migration projects for Windows and Linux servers to AWS",
        "Implemented The Cloud Migration Factory to enable migrations at scale",
        "Developed Terraform code to import migrated instances for Infrastructure as Code persistence",
        "Conducted network discovery for on-premises servers to define security groups for migrated servers",
        "Ensured seamless transition of on-premises workloads to cloud environments"
      ]
    },
    {
      period: "Nov 2022 - May 2025",
      title: "Senior Engineer (Platform)",
      company: "Versent Pty Ltd, Melbourne",
      description: "Engaged to support and enhance Woodside Energy's asset management suite through cloud-native solutions and modern DevOps practices.",
      highlights: [
        "Led development using TypeScript with AWS CDK, Serverless Framework, and CloudFormation",
        "Implemented CI/CD pipelines using GitHub Actions and AWS CodePipeline",
        "Modernized legacy application deployment pipelines",
        "Designed multi-tenant SaaS architecture for asset management suite",
        "Deployed orchestration platform (Orkes Conductor) on AWS EKS"
      ]
    },
    {
      period: "Sep 2018 - Oct 2022",
      title: "Software Engineer",
      company: "AC3 Pty Ltd, Melbourne",
      description: "Designed architecture and developed software solutions using cloud infrastructure to meet customer business applications and requirements.",
      highlights: [
        "Designed and analyzed user requirements for cloud-based business applications",
        "Integrated third-party applications with Amazon Web Services",
        "Maintained program code and technical documentation",
        "Tested, debugged, and rectified application issues for client support"
      ]
    }
  ];

  return (
    <Section id="experience" ref={ref}>
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        >
          Experience
        </SectionTitle>
        <Timeline>
          {experiences.map((exp, index) => (
            <TimelineItem
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <TimelineDate>{exp.period}</TimelineDate>
              <TimelineTitle>{exp.title}</TimelineTitle>
              <TimelineCompany>{exp.company}</TimelineCompany>
              <TimelineDescription>{exp.description}</TimelineDescription>
              {exp.highlights && (
                <HighlightsList>
                  {exp.highlights.map((highlight, highlightIndex) => (
                    <HighlightItem key={highlightIndex}>
                      {highlight}
                    </HighlightItem>
                  ))}
                </HighlightsList>
              )}
            </TimelineItem>
          ))}
        </Timeline>
      </Container>
    </Section>
  );
};

export default Experience;
