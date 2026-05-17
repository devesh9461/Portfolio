import React from 'react';
import './Certifications.css';
import { Award, ExternalLink } from 'lucide-react';

const Certifications = () => {
  const certs = [
    {
      title: "Python Backend Specialist",
      issuer: "Coursera / DeepLearning.AI",
      about: "Advanced certification in building scalable Python backend systems and APIs.",
      link: "#"
    },
    {
      title: "MERN Stack Developer",
      issuer: "Udemy / Full Stack Academy",
      about: "Comprehensive certification covering React, Node.js, Express, and MongoDB.",
      link: "#"
    },
    {
      title: "AI Integration Engineer",
      issuer: "Google Cloud / Sarvam AI",
      about: "Specialized training in integrating AI models and LLMs into web applications.",
      link: "#"
    }
  ];

  return (
    <section id="certifications" className="section certifications-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">My <span className="text-saffron">Certifications</span></h2>
          <p className="section-subtitle">Validation of my skills and dedication to continuous learning</p>
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
