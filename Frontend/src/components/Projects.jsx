import React from 'react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const projectsList = [
    {
      id: 1,
      title: 'Client Lead Management System (Mini CRM)',
      description: 'A VS Code extension that uses OpenAI models to suggest code completions and refactoring in real-time.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
      tags: ['HTML / CSS / JavaScript', 'Node.js', 'MySQL'],
      github: '#',
      live: '#'
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'A full-stack modern e-commerce solution with Stripe integration, headless CMS, and responsive design.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
      tags: ['Next.js', 'Tailwind', 'Stripe', 'Sanity'],
      github: '#',
      live: '#'
    },
    {
      id: 3,
      title: 'Financial Dashboard',
      description: 'Real-time financial data visualization dashboard with customizable widgets and dark mode support.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      tags: ['Vue.js', 'D3.js', 'Firebase'],
      github: '#',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
          <p className="section-subtitle">A selection of my recent work</p>
        </div>

        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <div key={project.id} className="project-card card">
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
                <div className="project-links">
                  <a href={project.github} className="icon-link" aria-label="GitHub Source">
                    <FaGithub size={20} />
                  </a>
                  <a href={project.live} className="icon-link" aria-label="Live Demo">
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-desc">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
