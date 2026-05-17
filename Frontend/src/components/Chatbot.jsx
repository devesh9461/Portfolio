import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, GraduationCap } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: "Hi! I'm Devesh's AI assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpenChat = (event) => {
      setIsOpen(true);
      if (event.detail) {
        handleSendMessage(event.detail);
      }
    };
    window.addEventListener('open-chatbot', handleOpenChat);
    return () => window.removeEventListener('open-chatbot', handleOpenChat);
  }, []);

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('stack') || lowerInput.includes('tech')) {
      return "Devesh is proficient in the MERN stack (MongoDB, Express, React, Node.js). He also loves Python and is currently exploring advanced UI animations!";
    }
    if (lowerInput.includes('contact') || lowerInput.includes('hire')) {
      return "You can reach Devesh via the contact form on this site, or find him on LinkedIn and GitHub! He's always open to exciting new opportunities.";
    }
    if (lowerInput.includes('who') || lowerInput.includes('about')) {
      return "I'm a digital twin of Devesh, a passionate Software Engineer. I'm here to answer questions about his projects and skills.";
    }
    if (lowerInput.includes('react')) {
      return "React is one of Devesh's core strengths. He's built multiple high-performance apps using hooks, context API, and framer-motion for animations.";
    }
    
    return "That's a great question! Devesh is always learning. Feel free to reach out to him directly through the contact section for more details!";
  };

  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = { id: Date.now() + 1, type: 'bot', text: getBotResponse(text) };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
      {/* Chat Bubble */}
      {!isOpen && (
        <div className="chatbot-elements-container">
          {isAcademicOpen ? (
            <div className="academic-window animate-slide-up">
              <div className="academic-header">
                <h5>Academic Performance</h5>
                <button className="close-btn" onClick={() => setIsAcademicOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              <table className="academic-table">
                <thead>
                  <tr>
                    <th>Subject</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Python Backend</td>
                    <td>A+</td>
                  </tr>
                  <tr>
                    <td>Data Structures</td>
                    <td>A</td>
                  </tr>
                  <tr>
                    <td>MERN Stack</td>
                    <td>A+</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <button className="academic-bubble animate-fade-in" onClick={() => setIsAcademicOpen(true)}>
              <GraduationCap size={24} />
            </button>
          )}
          
          <button className="chat-bubble animate-bounce" onClick={() => setIsOpen(true)}>
            <Sparkles className="sparkle-icon" size={16} />
            <MessageSquare size={24} />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window animate-slide-up">
          <div className="chat-header">
            <div className="bot-info">
              <div className="bot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <h4>Devesh AI</h4>
                <span className="status-online">Online</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message-bubble ${msg.type}`}>
                <div className="avatar">
                  {msg.type === 'bot' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="text">{msg.text}</div>
              </div>
            ))}
            {isTyping && (
              <div className="message-bubble bot typing">
                <div className="avatar"><Bot size={14} /></div>
                <div className="typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <div className="quick-actions">
              <button onClick={() => handleSendMessage("What's your tech stack?")}>Tech Stack</button>
              <button onClick={() => handleSendMessage("How to contact?")}>Contact</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="input-container">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
