import { useEffect, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const SCRAMBLE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789[]{}<>/';

const fallbackProjects = [
  {
    id: 'project-mini-crm',
    title: 'Client Lead Management System (Mini CRM)',
    module: 'Lead Ops Module',
    description:
      'A complete lead management app for tracking inbound prospects, follow-ups, and sales pipeline activity.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    tags: ['HTML / CSS / JavaScript', 'Node.js', 'MySQL'],
    github: '#',
    live: '#',
  },
  {
    id: 'project-ecommerce-platform',
    title: 'E-Commerce Platform',
    module: 'Commerce Runtime',
    description:
      'A full-stack modern e-commerce solution with Stripe integration, headless CMS, and responsive design.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
    tags: ['Next.js', 'Tailwind', 'Stripe', 'Sanity'],
    github: '#',
    live: '#',
  },
  {
    id: 'project-financial-dashboard',
    title: 'Financial Dashboard',
    module: 'Telemetry Surface',
    description:
      'Real-time financial data visualization dashboard with customizable widgets and dark mode support.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue.js', 'D3.js', 'Firebase'],
    github: '#',
    live: '#',
  },
];

const DecodedText = ({ active, text = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return undefined;
    }

    const startedAt = performance.now();
    const duration = 420;
    const sourceCharacters = [...text];

    const animate = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const resolvedLength = Math.floor(progress * sourceCharacters.length);
      const decodedText = sourceCharacters
        .map((character, index) => {
          if (character === ' ' || index < resolvedLength) {
            return character;
          }

          const scrambleIndex = (index * 7 + Math.floor(timestamp / 24)) % SCRAMBLE_CHARACTERS.length;
          return SCRAMBLE_CHARACTERS[scrambleIndex];
        })
        .join('');

      setDisplayText(decodedText);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, text]);

  return <span>{displayText}</span>;
};

const ProjectCard = ({ project }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      id={project.id}
      className="project-card card"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className="project-trace" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="project-image-wrapper">
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-links">
          <a href={project.github || '#'} className="icon-link" aria-label="GitHub Source">
            <FaGithub size={20} />
          </a>
          <a href={project.live || '#'} className="icon-link" aria-label="Live Demo">
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <div className="project-content">
        <span className="project-module-label">{project.module || 'Project Module'}</span>
        <h3 className="project-title">
          <DecodedText active={isActive} text={project.title} />
        </h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tags">
          {(project.tags || []).map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

const Projects = ({ sectionContent, projects }) => {
  const sectionTitle = sectionContent?.title || 'Featured';
  const highlightedTitle = sectionContent?.highlightedText || 'Projects';
  const sectionSubtitle = sectionContent?.subtitle || 'A selection of my recent work';
  const projectsList = projects?.length ? projects : fallbackProjects;

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {sectionTitle} <span className="text-gradient">{highlightedTitle}</span>
          </h2>
          <p className="section-subtitle">{sectionSubtitle}</p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
