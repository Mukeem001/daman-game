import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

function Settings() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Settings</h2>
      </div>
      <div style={{ padding: 16 }}>
        {[
          { label: 'Change Password', icon: '🔒' },
          { label: 'Privacy Policy', icon: '📄' },
          { label: 'Terms & Conditions', icon: '📋' },
        ].map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 8, padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize: 15, color: '#333' }}>{item.icon}&nbsp; {item.label}</span>
            <span style={{ color: '#bbb' }}>&#8250;</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Settings;
