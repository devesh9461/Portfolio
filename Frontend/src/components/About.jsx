import React from 'react';
import './About.css';

const fallbackAbout = {
  title: 'About',
  highlightedText: 'Me',
  subtitle: 'A journey of hard work, discipline, and growth',
  noteLabel: 'From my notebook',
  noteTitle: 'Designing with intention. Building with consistency.',
  paragraphs: [
    'I am Devesh, a Python Developer focused on backend systems and modern web development.',
    'I enjoy solving real-world problems with practical architecture and clear communication.',
    'My approach is simple: understand the user need, build cleanly, and deliver work that users can confidently use without any problem.',
  ],
  highlights: [
    'Backend-first mindset with Intermediate Python and API development foundations.',
    'Full-stack execution using React, Node.js, and MySQL/MongoDB for practical products.',
    'Focused on clean code, collaboration, and shipping reliable user experiences.',
  ],
  signature: '- Devesh Jangid',
};

const About = ({ content }) => {
  const sectionContent = content || fallbackAbout;
  const paragraphs = sectionContent.paragraphs || fallbackAbout.paragraphs;
  const aboutHighlights = sectionContent.highlights || fallbackAbout.highlights;

  return (
    <section id="about" className="section about-section sarvam-theme">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title sarvam-heading">
            {sectionContent.title} <span className="text-saffron">{sectionContent.highlightedText}</span>
          </h2>
          <p className="section-subtitle">{sectionContent.subtitle}</p>
        </div>

        <div className="about-content-grid">
          <article className="about-note-card">
            <span className="about-note-label">{sectionContent.noteLabel}</span>
            <h3 className="about-note-title">{sectionContent.noteTitle}</h3>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="about-note-copy">
                {paragraph}
              </p>
            ))}

            <ul className="about-highlights">
              {aboutHighlights.map((item, index) => (
                <li key={item}>
                  <span className="highlight-index">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="about-signature">{sectionContent.signature}</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default About;
