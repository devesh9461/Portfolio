export const defaultPortfolioContent = {
  site: {
    ownerName: 'Devesh Jangid',
    copyrightName: 'Devesh Jangid',
  },
  navbar: {
    logoText: 'Devesh Jangid',
    navLinks: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Tech Stack', href: '#tech-stack' },
      { name: 'Skills', href: '#skills' },
      { name: 'Projects', href: '#projects' },
      { name: 'Contact', href: '#contact' },
    ],
    socialLinks: {
      github: 'https://github.com/deveshjangid',
      linkedin: 'https://linkedin.com/in/devesh-jangid',
      twitter: '#',
      email: 'devesh11e@gmail.com',
    },
    assistantLabelDesktop: 'AI ASSISTANT',
    assistantLabelMobile: 'Talk to AI Assistant',
    assistantPromptDesktop: 'System ready. Awaiting input.',
    assistantPromptMobile: 'Hello! I am exploring your portfolio.',
  },
  hero: {
    availabilityText: 'Available for new opportunities',
    title: 'Python Learner -> Building towards Backend Development',
    highlightedText: 'hardworking. curious.',
    subtitle:
      'I am a disciplined developer focusing on backend Python systems, MERN applications, and AI integrations. Ready to contribute to engineering teams.',
    primaryCta: {
      label: 'View My Work',
      href: '#projects',
    },
    secondaryCta: {
      label: 'Resume',
      href: '#',
    },
    coreTechLabel: 'Core Tech Stack',
    coreTechIcons: [
      {
        name: 'React.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
    ],
  },
  techStack: {
    title: 'Systems',
    highlightedText: 'Telemetry',
    items: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      },
      {
        name: 'Express',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      },
      {
        name: 'Git',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      },
      {
        name: 'React',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      },
      {
        name: 'Python',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      },
      {
        name: 'Tailwind',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      },
      {
        name: 'HTML5',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS3',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      },
      {
        name: 'SQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      },
    ],
  },
  about: {
    title: 'About',
    highlightedText: 'Me',
    subtitle: 'A journey of hard work, discipline, and growth',
    noteLabel: 'From my notebook',
    noteTitle: 'Designing with intention. Building with consistency.',
    paragraphs: [
      'I am Devesh, a Python Developer focused on backend systems and modern web development.',
      'I enjoy solving real-world problems with practical architecture and clear communication.',
      'My approach is simple: understand the user need, build cleanly, and deliver work that users can confidently use without any problem.',
    ],
    highlights: [
      'Backend-first mindset with Intermediate Python and API development foundations.',
      'Full-stack execution using React, Node.js, and MySQL/MongoDB for practical products.',
      'Focused on clean code, collaboration, and shipping reliable user experiences.',
    ],
    signature: '- Devesh Jangid',
  },
  skills: {
    title: 'Technical',
    highlightedText: 'Telemetry',
    subtitle: 'Competence mapped through systems, signals, and shipped execution.',
    categories: [
      {
        id: 'backend-systems',
        title: 'Backend Systems',
        iconKey: 'server',
        summary: 'API contracts, validation paths, and service boundaries built for predictable behavior.',
        labels: ['[Backend Architecture]', '[API Contracts]', '[Asynchronous Systems]'],
        systems: ['Python', 'FastAPI', 'Node.js', 'Express', 'Validation'],
        telemetry: [
          { label: 'API Surface', value: 'Contract-first', signal: 88, trend: [45, 62, 58, 74, 86, 78] },
          { label: 'Runtime Logic', value: 'Python + Node', signal: 82, trend: [38, 54, 68, 64, 78, 84] },
          { label: 'Failure Paths', value: 'Guarded', signal: 76, trend: [28, 46, 50, 64, 70, 76] },
        ],
      },
      {
        id: 'data-automation',
        title: 'Data and Automation',
        iconKey: 'database',
        summary: 'Persistence, schema thinking, and repeatable workflows for practical product systems.',
        labels: ['[Data Pipelines]', '[Persistence]', '[Operational Tooling]'],
        systems: ['MySQL', 'MongoDB', 'GitHub', 'Docker', 'JSON APIs'],
        telemetry: [
          { label: 'Storage Layer', value: 'SQL + Document', signal: 80, trend: [42, 48, 61, 67, 73, 80] },
          { label: 'Data Flow', value: 'Traceable', signal: 72, trend: [30, 46, 49, 56, 68, 72] },
          { label: 'Ship Loop', value: 'Versioned', signal: 84, trend: [52, 58, 63, 76, 82, 84] },
        ],
      },
      {
        id: 'interface-systems',
        title: 'Interface Systems',
        iconKey: 'code',
        summary: 'React interfaces with fast feedback, clean state, and recruiter-friendly interaction design.',
        labels: ['[Frontend Architecture]', '[Command Interfaces]', '[Micro-Interactions]'],
        systems: ['React', 'JavaScript', 'CSS', 'Tailwind CSS', 'Accessibility'],
        telemetry: [
          { label: 'Interaction Loop', value: 'Low latency', signal: 86, trend: [40, 50, 66, 72, 79, 86] },
          { label: 'UI Systems', value: 'Composable', signal: 78, trend: [34, 44, 59, 65, 72, 78] },
          { label: 'Markup Quality', value: 'Semantic', signal: 90, trend: [55, 62, 70, 81, 86, 90] },
        ],
      },
    ],
  },
  education: {
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
  },
  projectsSection: {
    title: 'Featured',
    highlightedText: 'Systems',
    subtitle: 'Engineering modules with clear data flow, interaction loops, and implementation constraints.',
  },
  projects: [
    {
      id: 'project-mini-crm',
      title: 'Client Lead Management System (Mini CRM)',
      module: 'Lead Ops Module',
      description:
        'A lead-ops system for inbound prospects, follow-up queues, and pipeline state with a practical Node and MySQL backend.',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
      tags: ['HTML / CSS / JavaScript', 'Node.js', 'MySQL'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 'project-ecommerce-platform',
      title: 'E-Commerce Platform',
      module: 'Commerce Runtime',
      description:
        'A commerce runtime focused on product browsing, checkout flow, content operations, and responsive execution.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=800&auto=format&fit=crop',
      tags: ['Next.js', 'Tailwind', 'Stripe', 'Sanity'],
      github: '#',
      live: '#',
      featured: true,
    },
    {
      id: 'project-financial-dashboard',
      title: 'Financial Dashboard',
      module: 'Telemetry Surface',
      description:
        'A dense dashboard surface for scanning financial signals, widget state, and real-time decision support.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      tags: ['Vue.js', 'D3.js', 'Firebase'],
      github: '#',
      live: '#',
      featured: true,
    },
  ],
  certifications: {
    title: 'My',
    highlightedText: 'Certifications',
    subtitle: 'Validation of my skills and dedication to continuous learning',
    items: [
      {
        title: 'Python Essential 1',
        issuer: 'Cisco Networking Academy',
        about: 'Essential certification in building Python core and fundamentals.',
        link: '#',
      },
      {
        title: 'JavaScript Essentials 1',
        issuer: 'Cisco Networking Academy',
        about: 'Essential certification in logic building and JavaScript fundamentals.',
        link: '#',
      },
      {
        title: 'AI Integration Engineer',
        issuer: 'Google Cloud / Sarvam AI',
        about: 'Specialized training in integrating AI models and LLMs into web applications.',
        link: '#',
      },
    ],
  },
  contact: {
    statusText: 'System Status: Accepting Requests',
    title: 'Contact',
    highlightedText: 'Now',
    subtitle:
      'I am available for high-impact internship opportunities and visionary project collaborations.',
    quickFillTitle: 'Quick-Fill',
    quickFillDescription: 'Select your profile for a pre-optimized template.',
    templates: [
      {
        id: 'hr',
        label: 'I am hiring',
        iconKey: 'userCheck',
        subject: 'Opportunity: Python Developer / Junior Role',
        message:
          'Hi Devesh, I am reaching out from [Company Name] because we are impressed with your backend and full-stack work. We would love to discuss a potential role in our team.',
        intentSummary: 'Prioritizes start date, role type, and hiring timeline.',
        priorityFields: ['startDate', 'contractType', 'decisionWindow'],
        metadataDefaults: {
          contractType: 'Internship',
          decisionWindow: '2 weeks',
        },
      },
      {
        id: 'collab',
        label: 'Let us collaborate',
        iconKey: 'messageSquare',
        subject: 'Project Collaboration Proposal',
        message:
          'Hey Devesh! I saw your work and I have an idea for a project that blends AI, backend systems, and product execution. Let us build something useful together.',
        intentSummary: 'Prioritizes project scope and collaboration structure.',
        priorityFields: ['projectScope', 'contractType'],
        metadataDefaults: {
          contractType: 'Remote project',
          projectScope: 'AI integration',
        },
      },
    ],
  },
  footer: {
    logoPrefix: 'Creating',
    logoHighlight: ' .Something New',
    tagline:
      "Able to craft intelligent digital experiences with precision and passion. Inspired by India's tech revolution.",
    socialLinks: [
      {
        platform: 'github',
        href: 'https://github.com/deveshjangid',
      },
      {
        platform: 'linkedin',
        href: 'https://linkedin.com/in/devesh-jangid',
      },
      {
        platform: 'twitter',
        href: '#',
      },
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
  },
};
