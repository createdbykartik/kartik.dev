import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';
import ScrollProgress from './components/ScrollProgress';
import InteractiveBackground from './components/InteractiveBackground';
import './styles/App.css';

function App() {
  const [currentSection, setCurrentSection] = useState('experience'); // Start with experience to test vehicles
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine current section based on scroll position
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPercentage = window.scrollY / (documentHeight - windowHeight);
      
      const sectionIndex = Math.floor(scrollPercentage * sections.length);
      const currentSec = sections[Math.min(sectionIndex, sections.length - 1)];
      
      if (currentSec !== currentSection) {
        console.log('Section changed to:', currentSec);
        setCurrentSection(currentSec);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSection]);

  return (
    <ThemeProvider currentSection={currentSection}>
      <div className="App">
        <InteractiveBackground currentSection={currentSection} />
        <ScrollProgress />
        <Header currentSection={currentSection} />
        
        <main>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero scrollY={scrollY} />
            <About scrollY={scrollY} />
            <Experience scrollY={scrollY} />
            <Skills scrollY={scrollY} />
            <Projects scrollY={scrollY} />
            <Contact scrollY={scrollY} />
          </motion.div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
