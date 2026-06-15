import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

function AgentService() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Agent Customer Service</h2>
      </div>

      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ marginTop: 40, fontSize: 56 }}>🤝</div>
        <h3 style={{ marginTop: 16, color: '#333', fontWeight: 600, fontSize: 18 }}>Agent Support</h3>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
          Our agent support team is available 24/7 to help you grow your network and resolve any issues.
        </p>
        <button
          onClick={() => window.open('https://t.me/your_agent_support', '_blank')}
          style={{ background: '#229ED9', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12, width: '100%', justifyContent: 'center' }}
        >
          <span>📱</span> Contact via Telegram
        </button>
        <button
          onClick={() => navigate('/customerservice')}
          style={{ background: '#f0522a', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'center' }}
        >
          <span>🎧</span> Contact Support
        </button>
      </div>
    </div>
  );
}

export default AgentService;
