import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

function CustomerService() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  const openTelegram = () => {
    window.open('https://t.me/your_support_username', '_blank');
  };

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Customer Service</h2>
      </div>
      <div style={{ padding: 20, textAlign: 'center' }}>
        <div style={{ marginTop: 40, fontSize: 56 }}>🎧</div>
        <h3 style={{ marginTop: 16, color: '#333', fontWeight: 600, fontSize: 18 }}>24/7 Support</h3>
        <p style={{ color: '#888', fontSize: 14, marginBottom: 32 }}>Our team is here to help you anytime</p>
        <button
          onClick={openTelegram}
          style={{ background: '#229ED9', color: '#fff', border: 'none', borderRadius: 8, padding: '14px 32px', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          <span>📱</span> Contact via Telegram
        </button>
      </div>
    </div>
  );
}

export default CustomerService;
