import React from 'react';
import './TechStack.css';

const fallbackItems = [
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
];

const TechStack = ({ content }) => {
  const row1 = content?.items || fallbackItems;
  const title = content?.title || 'Skilled or';
  const highlightedText = content?.highlightedText || 'Knowledge';

  // Duplicate for seamless loop in future if needed
  const marquee1 = [...row1, ...row1];

  return (
    <section id="tech-stack" className="tech-stack-section">
      <div className="tech-stack-container">
        <div className="tech-stack-header text-center">
          <h2 className="tech-stack-title animate-fade-in">
            {title}
            <span className="text-gradient-accent"> {highlightedText} </span>
          </h2>
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
        {/* <div className="marquee-wrapper reverse">
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
        </div> */}
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="tech-glow-1"></div>
    </section>
  );
};

export default TechStack;
