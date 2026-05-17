import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section flex items-center">
      {/* Background Gradient Mesh */}
      <div className="hero-bg-gradient"></div>

      <div className="container hero-container">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="inline-badge animate-reveal">
              <span className="pulse-dot"></span>
              <span className="typing-text">Available for new opportunities</span>
            </div>

            <h1 className="hero-title animate-reveal" style={{ animationDelay: '0.2s' }}>
              Python Learner → Building towards Backend Development <br />
              <span className="handwritten-text highlighter"> hardworking. curious.</span>
            </h1>

            <p className="hero-subtitle animate-reveal" style={{ animationDelay: '0.4s' }}>
              I'm a disciplined developer focusing on backend Python systems, MERN applications, and AI integrations. Ready to contribute to engineering teams.
            </p>

            <div className="hero-actions animate-reveal" style={{ animationDelay: '0.6s' }}>
              <a href="#projects" className="btn btn-primary gap-2">
                View My Work <ArrowRight size={18} />
              </a>
              <a href="#" className="btn btn-outline gap-2">
                Resume <Download size={18} />
              </a>
            </div>

            <div className="tech-stack-preview animate-reveal" style={{ animationDelay: '0.8s' }}>
              <div className="tech-header">
                <span className="tech-label">Core Tech Stack</span>
              </div>
              <div className="tech-icons">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node" />
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-circle">
              <img
                src="src/assets/hero_sketch.png"
                alt="Devesh Jangid"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
