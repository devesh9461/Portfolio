import React, { useMemo, useState } from 'react';
import { UserCheck, Sparkles, MessageSquare } from 'lucide-react';
import './Contact.css';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_FALLBACKS = ['http://localhost:5000', 'http://127.0.0.1:5000'];

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
      label: 'I am hiring (HR/Recruiter)',
      iconKey: 'userCheck',
      subject: 'Opportunity: Python Developer / Junior Role',
      message:
        'Hi Devesh, I am reaching out from [Company Name] because we are impressed with your knowledge. We would love to discuss a potential role in our team.',
    },
    {
      id: 'collab',
      label: 'Let us collaborate',
      iconKey: 'messageSquare',
      subject: 'Project Collaboration Proposal',
      message:
        'Hey Devesh! I saw your work and I have an idea for a project that blends AI with Python. Let us build something cool together.',
    },
  ],
};

const templateIconByKey = {
  userCheck: UserCheck,
  messageSquare: MessageSquare,
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
  });
  const [formStatus, setFormStatus] = useState({
    state: 'idle',
    message: '',
  });

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
    }));
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

      for (const baseUrl of candidates) {
        try {
          response = await fetch(`${baseUrl}/api/contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
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
                      <Icon size={16} /> {template.label}
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
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        name: event.target.value,
                      })
                    }
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
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        email: event.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">
                  Protocol (Subject)
                </label>
                <input
                  type="text"
                  placeholder="Subject of collaboration"
                  value={formData.subject}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      subject: event.target.value,
                    })
                  }
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
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      message: event.target.value,
                    })
                  }
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
