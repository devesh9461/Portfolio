import React from 'react';
import { Mail, MapPin, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const fallbackFooter = {
  logoPrefix: 'Creating',
  logoHighlight: ' .Something New',
  tagline:
    "Able to craft intelligent digital experiences with precision and passion. Inspired by India's tech revolution.",
  socialLinks: [
    { platform: 'github', href: 'https://github.com/deveshjangid' },
    { platform: 'linkedin', href: 'https://linkedin.com/in/devesh-jangid' },
    { platform: 'twitter', href: '#' },
  ],
  navigationLinks: [
    { label: 'About Me', href: '#about' },
    { label: 'Technical Skills', href: '#skills' },
    { label: 'Project Gallery', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
  resourceLinks: [
    { label: 'Resume', href: '#', external: true },
    { label: 'Latest Blogs', href: '#', external: false },
  ],
  contact: {
    email: 'devesh11e@gmail.com',
    location: 'Jaipur, Rajasthan, India',
  },
  builtText: 'Learning. Building. Improving.',
};

const socialIconByPlatform = {
  github: FaGithub,
  linkedin: FaLinkedin,
  twitter: FaTwitter,
};

const Footer = ({ content, site }) => {
  const sectionContent = content || fallbackFooter;
  const socialLinks = sectionContent.socialLinks || fallbackFooter.socialLinks;
  const navigationLinks = sectionContent.navigationLinks || fallbackFooter.navigationLinks;
  const resourceLinks = sectionContent.resourceLinks || fallbackFooter.resourceLinks;
  const contact = sectionContent.contact || fallbackFooter.contact;
  const copyrightName = site?.copyrightName || site?.ownerName || 'Devesh Jangid';

  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="footer-logo">
              {sectionContent.logoPrefix}
              <span className="text-gradient-accent">{sectionContent.logoHighlight}</span>
            </div>
            <p className="footer-tagline">{sectionContent.tagline}</p>
            <div className="footer-socials">
              {socialLinks.map((social) => {
                const Icon = socialIconByPlatform[social.platform] || FaGithub;
                return (
                  <a
                    key={`${social.platform}-${social.href}`}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="footer-icon"
                    aria-label={social.platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              {resourceLinks.map((resource) => (
                <li key={resource.label}>
                  <a href={resource.href} className={resource.external ? 'flex items-center gap-1' : ''}>
                    {resource.label} {resource.external ? <ExternalLink size={12} /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Get in Touch</h4>
            <ul className="footer-contact">
              <li>
                <Mail size={16} className="contact-icon" />
                <span>{contact.email}</span>
              </li>
              <li>
                <MapPin size={16} className="contact-icon" />
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-flex">
            <p className="copyright">
              &copy; {new Date().getFullYear()} {copyrightName}. All rights reserved.
            </p>
            <p className="footer-built">{sectionContent.builtText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
