import React from 'react';
import './Certifications.css';
import { Award, ExternalLink } from 'lucide-react';

const fallbackCerts = {
  title: 'My',
  highlightedText: 'Certifications',
  subtitle: 'Validation of my skills and dedication to continuous learning',
  items: [
    {
      title: 'Python Essential 1',
      issuer: 'Cisco Networking Academy',
      about: 'Essential certification in building Python core and fundamentals.',
      link: '#',
    },
    {
      title: 'JavaScript Essentials 1',
      issuer: 'Cisco Networking Academy',
      about: 'Essential certification in logic building and JavaScript fundamentals.',
      link: '#',
    },
    {
      title: 'AI Integration Engineer',
      issuer: 'Google Cloud / Sarvam AI',
      about: 'Specialized training in integrating AI models and LLMs into web applications.',
      link: '#',
    },
  ],
};

const Certifications = ({ content }) => {
  const sectionContent = content || fallbackCerts;
  const certs = sectionContent.items || fallbackCerts.items;

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">
            {sectionContent.title} <span className="text-saffron">{sectionContent.highlightedText}</span>
          </h2>
          <p className="section-subtitle">{sectionContent.subtitle}</p>
        </div>

        <div className="certs-grid mt-12">
          {certs.map((cert, index) => (
            <div key={index} className="cert-card card">
              <div className="cert-icon-wrapper">
                <Award size={32} className="cert-icon" />
              </div>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-about">{cert.about}</p>
              <a href={cert.link} className="btn btn-outline cert-btn gap-2">
                View Certificate <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
