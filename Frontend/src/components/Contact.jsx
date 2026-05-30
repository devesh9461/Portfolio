import React, { useState } from 'react';
import './Contact.css';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const API_FALLBACKS = ['http://localhost:5000', 'http://127.0.0.1:5000'];

const Contact = ({ content }) => {
  const statusText = content?.statusText || 'System Status: Accepting Requests';
  const title = content?.title || 'Contact';
  const highlightedText = content?.highlightedText || 'Now';
  const subtitle = content?.subtitle || 'I am available for high-impact internship opportunities and visionary project collaborations.';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    startDate: '',
    contractType: '',
    decisionWindow: '',
    projectScope: '',
    subject: '',
    message: '',
  });

  const [focusedField, setFocusedField] = useState(null);
  const [formStatus, setFormStatus] = useState({
    state: 'idle',
    message: '',
  });

  const [activeTemplate, setActiveTemplate] = useState(null);

  const applyQuickFill = (profile) => {
    if (profile === 'hr') {
      setActiveTemplate('hr');
      setFormData((prev) => ({
        ...prev,
        subject: 'Opportunity: Python Developer / Junior Role',
        message: 'Hi Devesh, I am reaching out from [Company Name] because we are impressed with your backend and full-stack work. We would love to discuss a potential role in our team.',
        contractType: 'Internship',
        decisionWindow: '2 Weeks',
      }));
    } else if (profile === 'collab') {
      setActiveTemplate('collab');
      setFormData((prev) => ({
        ...prev,
        subject: 'Project Collaboration Proposal',
        message: 'Hey Devesh! I saw your work and I have an idea for a project that blends AI, backend systems, and product execution. Let us build something useful together.',
        contractType: 'Remote Project',
        projectScope: 'AI Integration',
      }));
    }
  };

  const updateFormField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formStatus.state === 'loading') {
      return;
    }

    setFormStatus({
      state: 'loading',
      message: 'Sending message...',
    });

    try {
      const candidates = API_BASE_URL ? [API_BASE_URL] : ['', ...API_FALLBACKS];
      let response = null;
      let payload = null;
      let networkError = null;

      const formatDateToDDMMYYYY = (dateValue) => {
        if (!dateValue) return '';
        const date = new Date(dateValue);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
      };

      const submissionPayload = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        startDate: formatDateToDDMMYYYY(formData.startDate) || undefined,
        contractType: formData.contractType || undefined,
        decisionWindow: formData.decisionWindow || undefined,
        projectScope: formData.projectScope || undefined,
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
        throw new Error('Cannot reach backend server. Please verify backend is active on port 5000.');
      }

      if (!response) {
        throw new Error('Unable to connect contact form to backend API.');
      }

      if (!response.ok) {
        const errorMessage =
          payload?.errors?.[0] || payload?.message || 'Unable to send message.';
        throw new Error(errorMessage);
      }

      setFormStatus({
        state: 'success',
        message: payload?.message || 'Message sent successfully!',
      });

      setActiveTemplate(null);
      setFormData({
        name: '',
        email: '',
        startDate: '',
        contractType: '',
        decisionWindow: '',
        projectScope: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      setFormStatus({
        state: 'error',
        message: error.message || 'Something went wrong while sending message.',
      });
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header text-left">
          <div className="status-badge">
            <span className="pulse-dot-orange"></span>
            <span className="text-sm tracking-widest uppercase">{statusText}</span>
          </div>
          <h2 className="section-title text-4xl mt-4">
            {title}
            <span className="text-gradient">{highlightedText}</span>
          </h2>
          <p className="section-subtitle max-w-xl">{subtitle}</p>
        </div>

        <div className="contact-container mt-12 glass-card">
          {/* Quick Fill Section */}
          <div className="quick-fill-section">
            <h3 className="quick-fill-title">SELECT PROTOCOL PROFILE (QUICK-FILL)</h3>
            <div className="quick-fill-pills">
              <button
                type="button"
                className={`pill-btn ${activeTemplate === 'hr' ? 'active' : ''}`}
                onClick={() => applyQuickFill('hr')}
              >
                ⚡ I'm Hiring
              </button>
              <button
                type="button"
                className={`pill-btn ${activeTemplate === 'collab' ? 'active' : ''}`}
                onClick={() => applyQuickFill('collab')}
              >
                🤝 Let's Collaborate
              </button>
            </div>
          </div>

          {/* Form Section */}
          <form className="collab-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              
              {/* Identity Field */}
              <div className="input-group">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'name' ? '> ' : ''}</span>
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="What should I call you?"
                  value={formData.name}
                  onChange={(e) => updateFormField('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Endpoint Field */}
              <div className="input-group">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'email' ? '> ' : ''}</span>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="Where can I reach you?"
                  value={formData.email}
                  onChange={(e) => updateFormField('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Start Date Field */}
              <div className="input-group">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'startDate' ? '> ' : ''}</span>
                  Target Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => updateFormField('startDate', e.target.value)}
                  onFocus={() => setFocusedField('startDate')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              {/* Contract Type Dropdown */}
              <div className="input-group">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'contractType' ? '> ' : ''}</span>
                  Engagement Type
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.contractType}
                    onChange={(e) => updateFormField('contractType', e.target.value)}
                    onFocus={() => setFocusedField('contractType')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">Select contract or project type</option>
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote Project">Remote Project</option>
                  </select>
                </div>
              </div>

              {/* Decision Window Dropdown */}
              <div className="input-group">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'decisionWindow' ? '> ' : ''}</span>
                  Hiring Timeline
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.decisionWindow}
                    onChange={(e) => updateFormField('decisionWindow', e.target.value)}
                    onFocus={() => setFocusedField('decisionWindow')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">How soon do you plan to decide?</option>
                    <option value="This Week">This Week</option>
                    <option value="2 Weeks">2 Weeks</option>
                    <option value="This Month">This Month</option>
                    <option value="Flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Project Scope Dropdown */}
              <div className="input-group">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'projectScope' ? '> ' : ''}</span>
                  Project Area
                </label>
                <div className="select-wrapper">
                  <select
                    value={formData.projectScope}
                    onChange={(e) => updateFormField('projectScope', e.target.value)}
                    onFocus={() => setFocusedField('projectScope')}
                    onBlur={() => setFocusedField(null)}
                  >
                    <option value="">What are we building?</option>
                    <option value="AI Integration">AI Integration</option>
                    <option value="API Build">API Build</option>
                    <option value="Full-stack MVP">Full-stack MVP</option>
                    <option value="Automation">Automation</option>
                  </select>
                </div>
              </div>

              {/* Protocol Field */}
              <div className="input-group full-width">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'subject' ? '> ' : ''}</span>
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Python Role at [Company] / Project Idea"
                  value={formData.subject}
                  onChange={(e) => updateFormField('subject', e.target.value)}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
              </div>

              {/* Payload Field */}
              <div className="input-group full-width">
                <label className="input-label">
                  <span className="typing-indicator">{focusedField === 'message' ? '> ' : ''}</span>
                  Message *
                </label>
                <textarea
                  className="payload-textarea"
                  placeholder="Tell me a bit about your team, company, or project goals..."
                  value={formData.message}
                  onChange={(e) => updateFormField('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                ></textarea>
              </div>

            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={formStatus.state === 'loading'}
            >
              {formStatus.state === 'loading' ? 'Sending...' : 'Send Message →'}
            </button>

            {formStatus.message ? (
              <p className={`form-status ${formStatus.state}`} aria-live="polite">
                {formStatus.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
