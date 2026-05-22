import { useState } from 'react';
import { HelpCircle, ChevronUp, Code, Server, Database } from 'lucide-react';
import './Skills.css';

const fallbackSkillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    iconKey: 'code',
    simple:
      'Everything you see and interact with on a website: layout, buttons, colors, and animations. It is the face of the application.',
    skills: [
      { name: 'React.js', level: 60 },
      { name: 'JavaScript', level: 75 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend Development',
    iconKey: 'server',
    simple:
      'The brain behind the scenes that handles logic, users, and security. It keeps everything stable under the hood.',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 55 },
      { name: 'Python', level: 85 },
      { name: 'FastAPI', level: 65 },
    ],
  },
  {
    id: 'tools',
    title: 'Database and Tools',
    iconKey: 'database',
    simple:
      'Databases store application data, and tools like Git and Docker help build and ship software reliably.',
    skills: [
      { name: 'MySQL', level: 75 },
      { name: 'MongoDB', level: 55 },
      { name: 'Git and GitHub', level: 90 },
      { name: 'Docker', level: 65 },
    ],
  },
];

const iconByKey = {
  code: <Code size={20} />,
  server: <Server size={20} />,
  database: <Database size={20} />,
};

const Skills = ({ content }) => {
  const [activeExplanation, setActiveExplanation] = useState(null);
  const sectionTitle = content?.title || 'Technical';
  const highlightedTitle = content?.highlightedText || 'Skills';
  const sectionSubtitle = content?.subtitle || 'Technologies and tools I work with';
  const skillCategories = content?.categories || fallbackSkillCategories;

  const toggleExplanation = (id) => {
    setActiveExplanation(activeExplanation === id ? null : id);
  };

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {sectionTitle} <span className="text-gradient">{highlightedTitle}</span>
          </h2>
          <p className="section-subtitle">{sectionSubtitle}</p>
        </div>

        <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <article key={idx} className="skill-card card" aria-labelledby={`skill-title-${category.id}`}>
              <div className="skill-card-header flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="category-icon">{iconByKey[category.iconKey] || iconByKey.code}</span>
                  <h3 id={`skill-title-${category.id}`} className="skill-category-title">
                    {category.title}
                  </h3>
                </div>
                <button
                  className={`simple-toggle ${activeExplanation === category.id ? 'active' : ''}`}
                  onClick={() => toggleExplanation(category.id)}
                  aria-label="Toggle simple explanation"
                  aria-expanded={activeExplanation === category.id}
                >
                  {activeExplanation === category.id ? <ChevronUp size={18} /> : <HelpCircle size={18} />}
                </button>
              </div>

              <div className={`simple-explanation ${activeExplanation === category.id ? 'open' : ''}`}>
                <p>{category.simple}</p>
              </div>

              <button className="understand-btn" onClick={() => toggleExplanation(category.id)}>
                Understand in Simple Words
              </button>

              <div className="skill-list">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-item">
                    <div className="skill-info flex justify-between">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percent">{skill.level}%</span>
                    </div>
                    <div className="skill-bar-bg">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
