import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import TechStack from './components/TechStack';

import About from './components/About';
import Certifications from './components/Certifications';
import Education from './components/Education';
import { defaultPortfolioContent } from './content/defaultPortfolioContent';
import { fetchPortfolioContent } from './utils/contentApi';

function App() {
  const [content, setContent] = useState(defaultPortfolioContent);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolioContent = async () => {
      try {
        const remoteContent = await fetchPortfolioContent();
        if (isMounted) {
          setContent({
            ...defaultPortfolioContent,
            ...remoteContent,
          });
        }
      } catch (error) {
        console.error('Using local fallback content:', error);
      }
    };

    loadPortfolioContent();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Navbar content={content.navbar} />
      <main>
        <Hero content={content.hero} />
        <TechStack content={content.techStack} />
        <About content={content.about} />
        <Skills content={content.skills} />
        <Education content={content.education} />
        <Projects sectionContent={content.projectsSection} projects={content.projects} />
        <Certifications content={content.certifications} />
        <Contact content={content.contact} />
      </main>
      <Footer content={content.footer} site={content.site} />
      <Chatbot />
    </>
  );
}

export default App;
