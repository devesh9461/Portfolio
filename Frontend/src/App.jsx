import React from 'react';
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

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechStack />
        <About />
        <Skills />
        <Education />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
