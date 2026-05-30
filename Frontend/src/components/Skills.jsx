import { useEffect, useMemo, useState } from 'react';
import { Activity, Code2, Cpu, Database, Network, Server } from 'lucide-react';
import './Skills.css';

const fallbackSkillCategories = [
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
];

const iconByKey = {
  code: <Code2 size={20} />,
  server: <Server size={20} />,
  database: <Database size={20} />,
  network: <Network size={20} />,
  cpu: <Cpu size={20} />,
};

const signalToLabel = (signal) => {
  if (signal >= 85) {
    return 'Production Muscle';
  }

  if (signal >= 72) {
    return 'Shipping Ready';
  }

  if (signal >= 58) {
    return 'Active Build';
  }

  return 'Ramping';
};

const buildTrendFromSignal = (signal, offset) => {
  const safeSignal = Number.isFinite(signal) ? signal : 64;
  const floor = Math.max(22, safeSignal - 34);

  return Array.from({ length: 6 }, (_, index) => {
    const wave = ((index + 1) * (offset + 3) * 7) % 18;
    return Math.min(94, Math.round(floor + index * 6 + wave));
  });
};

const normalizeCategory = (category, index) => {
  const legacySkills = category.skills || [];
  const telemetry = category.telemetry?.length
    ? category.telemetry
    : legacySkills.map((skill, skillIndex) => ({
        label: skill.name,
        value: signalToLabel(skill.level || 64),
        signal: skill.level || 64,
        trend: buildTrendFromSignal(skill.level || 64, skillIndex),
      }));

  const fallbackLabels = [
    `[${category.title || 'System'}]`,
    index === 0 ? '[Backend Architecture]' : '[Execution Layer]',
    index === 1 ? '[Data Pipelines]' : '[Asynchronous Systems]',
  ];

  return {
    id: category.id || `skill-category-${index}`,
    title: category.title || 'System Competence',
    iconKey: category.iconKey || 'cpu',
    summary: category.summary || category.simple || 'Practical engineering capability mapped as system telemetry.',
    labels: category.labels?.length ? category.labels : fallbackLabels,
    systems: category.systems?.length ? category.systems : legacySkills.map((skill) => skill.name),
    telemetry,
  };
};

const Skills = ({ content }) => {
  const [pulseTick, setPulseTick] = useState(0);
  const sectionTitle = content?.title || 'Technical';
  const highlightedTitle = content?.highlightedText || 'Telemetry';
  const sectionSubtitle =
    content?.subtitle || 'Competence mapped through systems, signals, and shipped execution.';
  const skillCategories = useMemo(
    () => (content?.categories?.length ? content.categories : fallbackSkillCategories).map(normalizeCategory),
    [content]
  );

  useEffect(() => {
    const pulseTimer = window.setInterval(() => {
      setPulseTick((currentTick) => (currentTick + 1) % 1000);
    }, 1400);

    return () => window.clearInterval(pulseTimer);
  }, []);

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
          {skillCategories.map((category) => (
            <article key={category.id} className="skill-card card" aria-labelledby={`skill-title-${category.id}`}>
              <div className="skill-card-header">
                <div className="skill-title-block">
                  <span className="category-icon">{iconByKey[category.iconKey] || iconByKey.cpu}</span>
                  <div>
                    <span className="skill-node-id">NODE::{category.id}</span>
                    <h3 id={`skill-title-${category.id}`} className="skill-category-title">
                      {category.title}
                    </h3>
                  </div>
                </div>
                <span className="skill-live-state">
                  <Activity size={14} />
                  T+{String(pulseTick).padStart(3, '0')}
                </span>
              </div>

              <p className="skill-summary">{category.summary}</p>

              <div className="skill-labels" aria-label={`${category.title} metadata`}>
                {category.labels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>

              <div className="skill-system-row">
                {category.systems.map((system) => (
                  <span key={system}>{system}</span>
                ))}
              </div>

              <div className="telemetry-grid">
                {category.telemetry.map((signal, signalIndex) => (
                  <div
                    key={`${category.id}-${signal.label}`}
                    className="telemetry-row"
                    style={{ '--signal-level': `${signal.signal || 64}%`, '--pulse-delay': `${signalIndex * 90}ms` }}
                  >
                    <div className="telemetry-copy">
                      <span className="telemetry-label">{signal.label}</span>
                      <strong>{signal.value}</strong>
                    </div>
                    <div className="micro-graph" aria-hidden="true">
                      {(signal.trend || buildTrendFromSignal(signal.signal, signalIndex)).map((point, pointIndex) => (
                        <span
                          key={`${signal.label}-${pointIndex}`}
                          style={{ height: `${point}%`, animationDelay: `${pointIndex * 80 + signalIndex * 40}ms` }}
                        />
                      ))}
                    </div>
                    <div className="signal-rail" aria-hidden="true">
                      <span></span>
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
