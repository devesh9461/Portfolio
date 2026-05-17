import React from 'react';
import './TechStack.css';

const TechStack = () => {
  const row1 = [
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' },
    { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  ];

  const row2 = [
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  ];

  // Duplicate for seamless loop
  const marquee1 = [...row1, ...row1, ...row1];
  const marquee2 = [...row2, ...row2, ...row2];

  return (
    <section className="tech-stack-section">
      <div className="tech-stack-container">
        <div className="tech-stack-header text-center">
          <h2 className="tech-stack-title animate-fade-in">Skilled or<span className="text-gradient-accent"> Knowledge </span></h2>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track">
            {marquee1.map((tech, index) => (
              <div key={index} className="tech-item">
                <div className="tech-card">
                  <img src={tech.icon} alt={tech.name} />
                  <span>{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second track scrolling reverse */}
        <div className="marquee-wrapper reverse">
          <div className="marquee-track reverse">
            {marquee2.map((tech, index) => (
              <div key={index} className="tech-item">
                <div className="tech-card">
                  <img src={tech.icon} alt={tech.name} />
                  <span>{tech.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="tech-glow-1"></div>
      <div className="tech-glow-2"></div>
    </section>
  );
};

export default TechStack;
