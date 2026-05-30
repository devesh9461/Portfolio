import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Command,
  Cpu,
  Download,
  FileText,
  FolderOpen,
  MessageSquare,
  Navigation,
  Search,
  X,
} from 'lucide-react';
import './CommandPalette.css';

const fallbackNavLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Tech Stack', href: '#tech-stack' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const normalizeSearchValue = (value) => String(value || '').toLowerCase();

const scrollToTarget = (href) => {
  if (!href || href === '#') {
    return;
  }

  if (href.startsWith('#')) {
    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', href);
    }

    return;
  }

  window.open(href, '_blank', 'noopener,noreferrer');
};

const triggerDownload = (href) => {
  if (!href || href === '#') {
    scrollToTarget('#contact');
    window.dispatchEvent(
      new CustomEvent('open-chatbot', {
        detail: 'Please share your latest resume and availability.',
      })
    );
    return;
  }

  const downloadLink = document.createElement('a');
  downloadLink.href = href;
  downloadLink.download = '';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
};

const CommandPalette = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchInputRef = useRef(null);

  const commandItems = useMemo(() => {
    const navLinks = content?.navbar?.navLinks?.length
      ? content.navbar.navLinks
      : fallbackNavLinks;
    const techItems = content?.techStack?.items || [];
    const projects = content?.projects || [];
    const socialLinks = content?.navbar?.socialLinks || {};
    const resumeHref = content?.hero?.secondaryCta?.href;

    const navigationItems = navLinks.map((link) => ({
      id: `nav-${link.href}`,
      title: link.name,
      subtitle: 'Route',
      type: 'nav',
      keywords: [link.name, link.href, 'jump', 'section'],
      Icon: Navigation,
      action: () => scrollToTarget(link.href),
    }));

    const stackItems = techItems.map((tech) => ({
      id: `stack-${tech.name}`,
      title: tech.name,
      subtitle: 'Stack Signal',
      type: 'stack',
      keywords: [tech.name, 'technology', 'stack', 'skill'],
      Icon: Cpu,
      action: () => scrollToTarget('#tech-stack'),
    }));

    const projectItems = projects.map((project) => ({
      id: `project-${project.id}`,
      title: project.title,
      subtitle: project.module || 'Project Module',
      type: 'module',
      keywords: [
        project.title,
        project.description,
        project.module,
        ...(project.tags || []),
        'project',
        'case study',
      ],
      Icon: FolderOpen,
      action: () => scrollToTarget(`#${project.id}`),
    }));

    const actionItems = [
      {
        id: 'action-resume',
        title: 'Download Resume',
        subtitle: 'Action',
        type: 'action',
        keywords: ['resume', 'cv', 'download', 'profile'],
        Icon: Download,
        action: () => triggerDownload(resumeHref),
      },
      {
        id: 'action-contact',
        title: 'Start Contact Protocol',
        subtitle: 'Action',
        type: 'action',
        keywords: ['contact', 'email', 'hire', 'recruiter'],
        Icon: FileText,
        action: () => scrollToTarget('#contact'),
      },
      {
        id: 'action-assistant',
        title: 'Open AI Assistant',
        subtitle: 'Action',
        type: 'action',
        keywords: ['assistant', 'ai', 'chat', 'question'],
        Icon: MessageSquare,
        action: () =>
          window.dispatchEvent(
            new CustomEvent('open-chatbot', {
              detail: content?.navbar?.assistantPromptDesktop || 'System ready. Awaiting input.',
            })
          ),
      },
    ];

    if (socialLinks.github) {
      actionItems.push({
        id: 'action-github',
        title: 'Open GitHub',
        subtitle: 'External',
        type: 'action',
        keywords: ['github', 'source', 'code', 'repository'],
        Icon: Command,
        action: () => window.open(socialLinks.github, '_blank', 'noopener,noreferrer'),
      });
    }

    if (socialLinks.linkedin) {
      actionItems.push({
        id: 'action-linkedin',
        title: 'Open LinkedIn',
        subtitle: 'External',
        type: 'action',
        keywords: ['linkedin', 'profile', 'recruiter', 'network'],
        Icon: Command,
        action: () => window.open(socialLinks.linkedin, '_blank', 'noopener,noreferrer'),
      });
    }

    return [...actionItems, ...navigationItems, ...projectItems, ...stackItems];
  }, [content]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query).trim();

    if (!normalizedQuery) {
      return commandItems;
    }

    const queryParts = normalizedQuery.split(/\s+/);

    return commandItems.filter((item) => {
      const searchableText = normalizeSearchValue([
        item.title,
        item.subtitle,
        item.type,
        ...(item.keywords || []),
      ].join(' '));

      return queryParts.every((queryPart) => searchableText.includes(queryPart));
    });
  }, [commandItems, query]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if ((event.metaKey || event.ctrlKey) && key === 'k') {
        event.preventDefault();
        setIsOpen((currentValue) => !currentValue);
      }

      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handlePaletteOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('open-command-palette', handlePaletteOpen);

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('open-command-palette', handlePaletteOpen);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setQuery('');
    setSelectedIndex(0);
    window.requestAnimationFrame(() => searchInputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const executeItem = (item) => {
    if (!item) {
      return;
    }

    item.action();
    setIsOpen(false);
  };

  const visibleItems = filteredItems.slice(0, 10);

  const handleInputKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((currentIndex) =>
        visibleItems.length ? (currentIndex + 1) % visibleItems.length : 0
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((currentIndex) =>
        visibleItems.length
          ? (currentIndex - 1 + visibleItems.length) % visibleItems.length
          : 0
      );
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      executeItem(visibleItems[selectedIndex]);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="command-overlay" role="dialog" aria-modal="true">
      <button
        className="command-backdrop"
        aria-label="Close command palette"
        onClick={() => setIsOpen(false)}
      />

      <div className="command-panel">
        <div className="command-boot-line" aria-hidden="true"></div>
        <div className="command-search-row">
          <Search size={18} />
          <input
            ref={searchInputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Search systems, modules, actions"
            aria-label="Search portfolio commands"
          />
          <button
            type="button"
            className="command-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close command palette"
          >
            <X size={18} />
          </button>
        </div>

        <div className="command-results" role="listbox" aria-label="Portfolio commands">
          {visibleItems.length ? (
            visibleItems.map((item, index) => {
              const Icon = item.Icon;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`command-result ${selectedIndex === index ? 'active' : ''}`}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => executeItem(item)}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  <span className="command-result-icon">
                    <Icon size={16} />
                  </span>
                  <span className="command-result-copy">
                    <span className="command-result-title">{item.title}</span>
                    <span className="command-result-subtitle">{item.subtitle}</span>
                  </span>
                  <span className="command-result-type">{item.type}</span>
                </button>
              );
            })
          ) : (
            <div className="command-empty">No matching signal.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
