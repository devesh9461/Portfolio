import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import heroSketch from '../assets/hero_sketch.png';
import './Hero.css';

const defaultCoreTechIcons = [
  { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
];

const Hero = ({ content }) => {
  const availabilityText = content?.availabilityText || 'Available for new opportunities';
  const title = content?.title || 'Python Learner -> Building towards Backend Development';
  const highlightedText = content?.highlightedText || 'hardworking. curious.';
  const subtitle =
    content?.subtitle ||
    'I am a disciplined developer focusing on backend Python systems, MERN applications, and AI integrations. Ready to contribute to engineering teams.';
  const primaryCta = content?.primaryCta || { label: 'View My Work', href: '#projects' };
  const secondaryCta = content?.secondaryCta || { label: 'Resume', href: '#' };
  const coreTechLabel = content?.coreTechLabel || 'Core Tech Stack';
  const coreTechIcons = content?.coreTechIcons || defaultCoreTechIcons;
  const heroImage = content?.image || heroSketch;

  return (
    <section id="home" className="hero-section flex items-center">
      <div className="hero-bg-gradient"></div>

      <div className="container hero-container">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="inline-badge animate-reveal">
              <span className="pulse-dot"></span>
              <span className="typing-text">{availabilityText}</span>
            </div>

            <h1 className="hero-title animate-reveal" style={{ animationDelay: '0.2s' }}>
              {title} <br />
              <span className="handwritten-text highlighter"> {highlightedText}</span>
            </h1>

            <p className="hero-subtitle animate-reveal" style={{ animationDelay: '0.4s' }}>
              {subtitle}
            </p>

            <div className="hero-actions animate-reveal" style={{ animationDelay: '0.6s' }}>
              <a href={primaryCta.href} className="btn btn-primary gap-2">
                {primaryCta.label} <ArrowRight size={18} />
              </a>
              <a href={secondaryCta.href} className="btn btn-outline gap-2">
                {secondaryCta.label} <Download size={18} />
              </a>
            </div>

            <div className="tech-stack-preview animate-reveal" style={{ animationDelay: '0.8s' }}>
              <div className="tech-header">
                <span className="tech-label">{coreTechLabel}</span>
              </div>
              <div className="tech-icons">
                {coreTechIcons.map((tech) => (
                  <img key={tech.name} src={tech.icon} alt={tech.name} />
                ))}
              </div>
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="hero-image-circle">
              <img src={heroImage} alt="Devesh Jangid" className="hero-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
