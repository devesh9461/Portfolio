import React, { useState, useEffect } from 'react';
import { Mail, MapPin, Send, Zap, UserCheck, Clock, Sparkles, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [activeTemplate, setActiveTemplate] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const templates = {
    hr: {
      subject: "Opportunity: Python Developer / Junior Role",
      message: "Hi Devesh, I am reaching out from [Company Name] because we are impressed with your portfolio. We'd love to discuss a potential role in our team."
    },
    collab: {
      subject: "Project Collaboration Proposal",
      message: "Hey Devesh! I saw your 'Intelligence' artifacts and I have an idea for a project that blends AI with Python. Let's build something cool together."
    }
  };

  const applyTemplate = (type) => {
    setActiveTemplate(type);
    setFormData({
      ...formData,
      subject: templates[type].subject,
      message: templates[type].message
    });
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header text-left">
          <div className="status-badge">
            <span className="pulse-dot-orange"></span>
            <span className="text-sm tracking-widest uppercase">System Status: Accepting Requests</span>
          </div>
          <h2 className="section-title text-4xl mt-4">Initiate <span className="text-gradient">Collaboration</span></h2>
          <p className="section-subtitle max-w-xl">
            My neural network is currently at 85% capacity. I am available for high-impact internship opportunities and visionary project collaborations.
          </p>
        </div>

        <div className="contact-grid mt-12">
          {/* Left: Intelligence Panel */}
          <div className="intelligence-panel flex-col gap-6">
            <div className="templates-card glass-card">
              <div className="card-icon-header">
                <Sparkles className="text-saffron" size={20} />
                <h3 className="text-lg font-bold">AI Quick-Fill</h3>
              </div>
              <p className="text-sm text-secondary mt-2">Select your profile for a pre-optimized template.</p>
              <div className="template-btns mt-6 flex-col gap-3">
                <button 
                  className={`template-btn ${activeTemplate === 'hr' ? 'active' : ''}`}
                  onClick={() => applyTemplate('hr')}
                >
                  <UserCheck size={16} /> I'm hiring (HR/Recruiter)
                </button>
                <button 
                  className={`template-btn ${activeTemplate === 'collab' ? 'active' : ''}`}
                  onClick={() => applyTemplate('collab')}
                >
                  <MessageSquare size={16} /> Let's collaborate
                </button>
              </div>
            </div>
          </div>

          {/* Right: Collaboration Form */}
          <div className="form-panel glass-card">
            <form className="collab-form flex-col gap-6">
              <div className="form-row grid md:grid-cols-2 gap-6">
                <div className="input-group">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">Identity</label>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">Endpoint (Email)</label>
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">Protocol (Subject)</label>
                <input 
                  type="text" 
                  placeholder="Subject of collaboration" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="input-group">
                <label className="text-xs uppercase tracking-widest font-bold text-muted mb-2 block">Payload (Message)</label>
                <textarea 
                  rows="5" 
                  placeholder="Transmit your message..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="submit-btn-glow flex items-center justify-center gap-3">
                <Zap size={18} /> INITIATE HANDSHAKE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
