import React, { useMemo, useState } from 'react';
import { BriefcaseBusiness, CalendarClock, MessageSquare, Sparkles, UserCheck } from 'lucide-react';
import './Contact.css';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_FALLBACKS = ['http://localhost:5000', 'http://127.0.0.1:5000'];

const predictiveFieldConfig = [
  {
    id: 'startDate',
    label: 'Available Start Date',
    type: 'date',
    priorityFor: ['hr'],
  },
  {
    id: 'contractType',
    label: 'Contract Type',
    type: 'select',
    options: ['Internship', 'Full-time', 'Contract', 'Remote project'],
    priorityFor: ['hr', 'collab'],
  },
  {
    id: 'decisionWindow',
    label: 'Decision Window',
    type: 'select',
    options: ['This week', '2 weeks', 'This month', 'Flexible'],
    priorityFor: ['hr'],
  },
  {
    id: 'projectScope',
    label: 'Project Scope',
    type: 'select',
    options: ['API build', 'Full-stack MVP', 'AI integration', 'Automation'],
    priorityFor: ['collab'],
  },
];

const fallbackContactContent = {
  statusText: 'System Status: Accepting Requests',
  title: 'Contact',
  highlightedText: 'Now',
  subtitle: 'I am available for high-impact internship opportunities and visionary project collaborations.',
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
};

const templateIconByKey = {
  userCheck: UserCheck,
  messageSquare: MessageSquare,
};

const fieldIconById = {
  startDate: CalendarClock,
  contractType: BriefcaseBusiness,
  decisionWindow: CalendarClock,
  projectScope: Sparkles,
};

const getTemplatePriorityFields = (template) => {
  if (template?.priorityFields?.length) {
    return template.priorityFields;
  }

  if (template?.id === 'hr') {
    return ['startDate', 'contractType', 'decisionWindow'];
  }

  if (template?.id === 'collab') {
    return ['projectScope', 'contractType'];
  }

  return [];
};

const Contact = ({ content }) => {
  const sectionContent = content || fallbackContactContent;
  const templates = sectionContent.templates || fallbackContactContent.templates;
  const templateById = useMemo(
    () => Object.fromEntries(templates.map((template) => [template.id, template])),
    [templates]
  );

  const [activeTemplate, setActiveTemplate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    startDate: '',
    contractType: '',
    decisionWindow: '',
    projectScope: '',
  });
  const [formStatus, setFormStatus] = useState({
    state: 'idle',
    message: '',
  });

  const activeTemplateConfig = templateById[activeTemplate];
  const priorityFields = useMemo(
    () => getTemplatePriorityFields(activeTemplateConfig),
    [activeTemplateConfig]
  );

  const sortedPredictiveFields = useMemo(
    () =>
      [...predictiveFieldConfig].sort((leftField, rightField) => {
        const leftPriority = priorityFields.includes(leftField.id) ? 0 : 1;
        const rightPriority = priorityFields.includes(rightField.id) ? 0 : 1;
        return leftPriority - rightPriority;
      }),
    [priorityFields]
  );

  const applyTemplate = (templateId) => {
    const template = templateById[templateId];

    if (!template) {
      return;
    }

    setActiveTemplate(templateId);
    setFormStatus({ state: 'idle', message: '' });
    setFormData((previous) => ({
      ...previous,
      subject: template.subject,
      message: template.message,
      ...template.metadataDefaults,
    }));
  };

  const updateFormField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const buildMessagePayload = () => {
    const telemetryLines = predictiveFieldConfig
      .map((field) => {
        const value = formData[field.id];
        return value ? `${field.label}: ${value}` : null;
      })
      .filter(Boolean);

    if (!telemetryLines.length) {
      return formData.message;
    }

    return `${formData.message}\n\nContact Telemetry:\n${telemetryLines.join('\n')}`;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formStatus.state === 'loading') {
      return;
    }

    setFormStatus({
      state: 'loading',
      message: 'Sending your message...',
    });

    try {
      const candidates = API_BASE_URL ? [API_BASE_URL] : ['', ...API_FALLBACKS];
      let response = null;
      let payload = null;
      let networkError = null;
      const submissionPayload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: buildMessagePayload(),
      };

      for (const baseUrl of candidates) {
        try {
          response = await fetch(`${baseUrl}/api/contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(submissionPayload),
          });

          try {
            payload = await response.json();
          } catch {
            payload = null;
          }

          if (response.status === 404 && !API_BASE_URL) {
            continue;
          }

          networkError = null;
          break;
        } catch (error) {
          networkError = error;
        }
      }

      if (!response && networkError) {
        throw new Error('Cannot reach backend server. Start backend on port 5000.');
      }

      if (!response) {
        throw new Error('Unable to connect contact form to backend API.');
      }

      if (!response.ok) {
        const errorMessage =
          payload?.errors?.[0] || payload?.message || 'Unable to submit the form right now.';
        throw new Error(errorMessage);
      }

      setFormStatus({
        state: 'success',
        message: payload?.message || 'Message submitted successfully.',
      });

      setActiveTemplate('');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        startDate: '',
        contractType: '',
        decisionWindow: '',
        projectScope: '',
      });
    } catch (error) {
      setFormStatus({
        state: 'error',
        message: error.message || 'Something went wrong while sending your message.',
      });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header text-left">
          <div className="status-badge">
            <span className="pulse-dot-orange"></span>
            <span className="text-sm tracking-widest uppercase">{sectionContent.statusText}</span>
          </div>
          <h2 className="section-title text-4xl mt-4">
            {sectionContent.title}
            <span className="text-gradient">{sectionContent.highlightedText}</span>
          </h2>
          <p className="section-subtitle max-w-xl">{sectionContent.subtitle}</p>
        </div>

        <div className="contact-grid mt-12">
          <div className="intelligence-panel flex-col gap-6">
            <div className="templates-card glass-card">
              <div className="card-icon-header">
                <Sparkles className="text-saffron" size={20} />
                <h3 className="text-lg font-bold">{sectionContent.quickFillTitle}</h3>
              </div>
              <p className="text-sm text-secondary mt-2">{sectionContent.quickFillDescription}</p>
              <div className="template-btns mt-6 flex-col gap-3">
                {templates.map((template) => {
                  const Icon = templateIconByKey[template.iconKey] || MessageSquare;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      className={`template-btn ${activeTemplate === template.id ? 'active' : ''}`}
                      onClick={() => applyTemplate(template.id)}
                    >
                      <Icon size={16} />
                      <span>{template.label}</span>
                      <small>{template.intentSummary || 'Optimizes the form for this conversation.'}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="form-panel glass-card">
            <form className="collab-form flex-col gap-6" onSubmit={handleSubmit}>
              <div className="form-row grid md:grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">
                    Identity
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(event) => updateFormField('name', event.target.value)}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">
                    Endpoint (Email)
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(event) => updateFormField('email', event.target.value)}
                    required
                  />
                </div>
              </div>

              <div className={`predictive-fields ${activeTemplate ? 'active' : ''}`}>
                {sortedPredictiveFields.map((field) => {
                  const FieldIcon = fieldIconById[field.id] || Sparkles;
                  const isPriority = priorityFields.includes(field.id);

                  return (
                    <div
                      key={field.id}
                      className={`input-group predictive-field ${isPriority ? 'is-priority' : ''}`}
                    >
                      <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">
                        <FieldIcon size={13} />
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={formData[field.id]}
                          onChange={(event) => updateFormField(field.id, event.target.value)}
                        >
                          <option value="">Select signal</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={formData[field.id]}
                          onChange={(event) => updateFormField(field.id, event.target.value)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="input-group">
                <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">
                  Protocol (Subject)
                </label>
                <input
                  type="text"
                  placeholder="Subject of collaboration"
                  value={formData.subject}
                  onChange={(event) => updateFormField('subject', event.target.value)}
                  required
                />
              </div>

              <div className="input-group">
                <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">
                  Payload (Message)
                </label>
                <textarea
                  rows="5"
                  placeholder="Transmit your message..."
                  value={formData.message}
                  onChange={(event) => updateFormField('message', event.target.value)}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn-glow flex items-center justify-center gap-3"
                disabled={formStatus.state === 'loading'}
              >
                {formStatus.state === 'loading' ? 'Submitting...' : 'Click to Submit'}
              </button>

              {formStatus.message ? (
                <p className={`form-status ${formStatus.state}`} aria-live="polite">
                  {formStatus.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
