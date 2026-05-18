import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              Creating<span className="text-gradient-accent"> .Something New</span>
            </div>
            <p className="footer-tagline">
              Able to Crafting intelligent digital experiences with precision and passion. 
              Inspired by India's tech revolution.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/deveshjangid" target="_blank" rel="noreferrer" className="footer-icon" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/devesh-jangid" target="_blank" rel="noreferrer" className="footer-icon" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="footer-icon" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#about">About Me</a></li>
              <li><a href="#skills">Technical Skills</a></li>
              <li><a href="#projects">Project Gallery</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li><a href="#" className="flex items-center gap-1">Resume <ExternalLink size={12} /></a></li>
              <li><a href="#">Latest Blogs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={16} className="contact-icon" />
                <span>devesh11e@gmail.com</span>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>Jaipur, Rajasthan, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-flex">
            <p className="copyright">&copy; {new Date().getFullYear()} Devesh Jangid. All rights reserved.</p>
            <p className="footer-built">Learning. Building. Improving.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
