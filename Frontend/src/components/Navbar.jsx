import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#" className="logo animated-logo">
          Devesh Jangid<span></span>
        </a>



        {/* Desktop Nav */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-right desktop-only">
          <div className="nav-divider"></div>
          <div className="social-links">
            <a href="https://github.com/deveshjangid" target="_blank" rel="noreferrer" aria-label="GitHub Repository"><FaGithub size={16} /></a>
            <a href="https://linkedin.com/in/devesh-jangid" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile"><FaLinkedin size={16} /></a>
          </div>

          <button
            className="ai-nav-btn"
            aria-label="Launch AI Assistant"
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: 'System ready. Awaiting input.' }))}
          >
            <Sparkles size={12} />
            <span>AI ASSISTANT</span>
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
          <div className="mobile-socials">
            <a href="https://github.com/deveshjangid" target="_blank" rel="noreferrer"><FaGithub size={22} /></a>
            <a href="https://linkedin.com/in/devesh-jangid" target="_blank" rel="noreferrer"><FaLinkedin size={22} /></a>
            <a href="mailto:contact@example.com"><Mail size={22} /></a>
          </div>

          <button
            className="ai-nav-btn mobile-ai-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-chatbot', { detail: 'Hello! I am exploring your portfolio.' }));
            }}
          >
            <Sparkles size={16} />
            Talk to AI Assistant
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
