import React from 'react';
import './About.css';

const About = () => {
  const aboutHighlights = [
    'Backend-first mindset with strong Python and API development foundations.',
    'Full-stack execution using React, Node.js, and MongoDB for practical products.',
    'Focused on clean code, collaboration, and shipping reliable user experiences.',
  ];

  return (
    <section id="about" className="section about-section sarvam-theme">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title sarvam-heading">About <span className="text-saffron">Me</span></h2>
          <p className="section-subtitle">A journey of hard work, discipline, and growth</p>
        </div>

        <div className="about-content-grid">
          <article className="about-note-card">
            <span className="about-note-label">From my notebook</span>
            <h3 className="about-note-title">Designing with intention. Building with consistency.</h3>
            <p className="about-note-copy">
              I am Devesh, a software engineer focused on backend systems and modern web development.
              I enjoy solving real-world problems with practical architecture and clear communication.
            </p>
            <p className="about-note-copy">
              My approach is simple: understand the user need, build cleanly, and deliver work that teams
              can confidently maintain.
            </p>

            <ul className="about-highlights">
              {aboutHighlights.map((item, index) => (
                <li key={item}>
                  <span className="highlight-index">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="about-signature">- Devesh Jangid</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
