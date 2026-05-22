import React from 'react';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import './Education.css';

const fallbackEducation = {
  journeyLabel: 'My Journey',
  title: 'Education',
  highlightedText: 'Qualification',
  items: [
    {
      degree: 'Polytechnic Diploma in Computer Science',
      institution: 'Dr. RadhaKrishnan Polytechnic College (DRPC Jaipur)',
      duration: '2024 - 2027',
      status: 'pursuing',
      location: 'Jaipur, Rajasthan',
      description:
        'Focused on core computer science subjects like Data Structures, Algorithms, DBMS, Web Development, Computer Networks, and Software Engineering. Maintained a consistent academic record with 9.87/10.00 CGPA.',
    },
    {
      degree: 'RBSE Secondary Education (X)',
      institution: 'Pink City International Sr. Sec. School Hingonia',
      duration: '2023 - 2024',
      status: 'completed',
      location: 'Jaipur, Rajasthan',
      description:
        'Completed with a focus on Science and Mathematics. Participated in co-curricular activities and scored 83 percent overall.',
    },
  ],
};

const Education = ({ content }) => {
  const sectionContent = content || fallbackEducation;
  const educationData = sectionContent.items || fallbackEducation.items;

  return (
    <section id="education" className="education-section section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle">{sectionContent.journeyLabel}</span>
          <h2 className="section-title">
            {sectionContent.title} <span className="text-gradient-accent">{sectionContent.highlightedText}</span>
          </h2>
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
                  {edu.status ? (
                    <span className={`edu-current-status ${edu.status === 'completed' ? 'edu-status-completed' : ''}`}>
                      <span className={`edu-status-dot ${edu.status === 'completed' ? 'edu-status-dot-completed' : ''}`} aria-hidden="true"></span>
                      {edu.status === 'completed' ? 'Completed' : 'Pursuing'}
                    </span>
                  ) : null}
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
