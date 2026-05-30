import React, { useState, useEffect } from 'react';
import { Command, Menu, X, Mail, Search, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Navbar.css';

const defaultNavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ content }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = content?.navLinks || defaultNavLinks;
  const logoText = content?.logoText || 'Devesh Jangid';
  const socialLinks = content?.socialLinks || {};
  const assistantLabelDesktop = content?.assistantLabelDesktop || 'AI ASSISTANT';
  const assistantLabelMobile = content?.assistantLabelMobile || 'Talk to AI Assistant';
  const assistantPromptDesktop =
    content?.assistantPromptDesktop || 'System ready. Awaiting input.';
  const assistantPromptMobile =
    content?.assistantPromptMobile || 'Hello! I am exploring your portfolio.';
  const contactEmail = socialLinks.email || 'contact@example.com';
  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="logo animated-logo">
          {logoText}
          <span></span>
        </a>

        <button
          type="button"
          className="command-nav-btn desktop-only"
          onClick={openCommandPalette}
          aria-label="Open command palette"
        >
          <Search size={15} />
          <span>Command</span>
          <kbd>K</kbd>
        </button>

        <div className="nav-right active-interface-hub desktop-only">
          <div className="nav-divider"></div>
          <div className="social-links">
            {socialLinks.github ? (
              <a href={socialLinks.github} target="_blank" rel="noreferrer" aria-label="GitHub Repository">
                <FaGithub size={16} />
              </a>
            ) : null}
            {socialLinks.linkedin ? (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
                <FaLinkedin size={16} />
              </a>
            ) : null}
          </div>

          <button
            className="ai-nav-btn"
            aria-label="Launch AI Assistant"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent('open-chatbot', { detail: assistantPromptDesktop })
              )
            }
          >
            <Sparkles size={12} />
            <span>{assistantLabelDesktop}</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            type="button"
            className="mobile-command-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              openCommandPalette();
            }}
          >
            <Command size={18} />
            Command
          </button>
          <div className="mobile-socials">
            {socialLinks.github ? (
              <a href={socialLinks.github} target="_blank" rel="noreferrer">
                <FaGithub size={22} />
              </a>
            ) : null}
            {socialLinks.linkedin ? (
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin size={22} />
              </a>
            ) : null}
            <a href={`mailto:${contactEmail}`}>
              <Mail size={22} />
            </a>
          </div>

          <button
            className="ai-nav-btn mobile-ai-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-chatbot', { detail: assistantPromptMobile }));
            }}
          >
            <Sparkles size={16} />
            {assistantLabelMobile}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
