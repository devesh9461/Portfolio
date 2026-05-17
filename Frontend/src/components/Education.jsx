import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import './Education.css';

const Education = () => {
  const educationData = [
    {
      degree: "Polytechnic Diploma in Computer Science",
      institution: "Dr. RadhaKrishnan Polytechnic College (DRPC Jaipur)",
      duration: "2024 - 2027",
      isCurrent: true,
      location: "Jaipur, Rajasthan",
      description: "Focused on core computer science subjects like Data Structures, Algorithms, DBMS, Web Development, Computer network, and Software Engineering etc. Maintained a consistent academic record - 9.87/10.00 CGPA."
    },
    {
      degree: "RBSE Secondary Education (X)",
      institution: "Pink City International Sr. Sec. School Hingonia",
      duration: "2023 - 2024",
      isCompleted: true,
      location: "Jaipur, Rajasthan",
      description: "Completed with a focus on Science and Mathematics. Participated in various co-curricular activities & Score 83% Marks overall."
    }
  ];

  return (
    <section id="education" className="education-section section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">My Journey</span>
          <h2 className="section-title">Education <span className="text-gradient-accent">Qualification</span></h2>
        </div>

        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div key={index} className="education-card animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="edu-icon-wrapper">
                <GraduationCap className="edu-icon" size={24} />
              </div>
              <div className="edu-content">
                <div className="edu-header">
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <div className="edu-meta">
                    <span className="edu-duration">
                      <Calendar size={14} />
                      {edu.duration}
                    </span>
                  </div>
                </div>
                <div className="edu-institution-row">
                  {(edu.isCurrent || edu.isCompleted) && (
                    <span className={`edu-current-status ${edu.isCompleted ? 'edu-status-completed' : ''}`}>
                      <span className={`edu-status-dot ${edu.isCompleted ? 'edu-status-dot-completed' : ''}`} aria-hidden="true"></span>
                      {edu.isCompleted ? 'Completed' : 'Pursuing'}
                    </span>
                  )}
                  <h4 className="edu-institution">{edu.institution}</h4>
                </div>
                <p className="edu-location">
                  <MapPin size={14} />
                  {edu.location}
                </p>
                <p className="edu-description">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
