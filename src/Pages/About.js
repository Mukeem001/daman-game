import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

function About() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>About Us</h2>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 56 }}>💎</div>
          <h2 style={{ margin: '12px 0 4px', color: '#f0522a', fontWeight: 700, fontSize: 22 }}>DhanCash</h2>
          <p style={{ color: '#888', fontSize: 13, margin: 0 }}>Version 1.0.0</p>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', color: '#555', fontSize: 14, lineHeight: 1.7 }}>
          <p>DhanCash is a secure and trusted online gaming platform offering exciting lottery and prediction games.</p>
          <p>We are committed to providing a fair, transparent, and entertaining experience for all our users.</p>
          <p style={{ marginBottom: 0 }}>For any queries, please contact our customer support team.</p>
        </div>
      </div>
    </div>
  );
}

export default About;
