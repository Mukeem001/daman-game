import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

const steps = [
  { title: 'Create Account', desc: 'Sign up with your mobile number and set a secure password.' },
  { title: 'Add Balance', desc: 'Go to Wallet → Deposit to add funds to your account.' },
  { title: 'Choose a Game', desc: 'Browse games from the home screen and select one to play.' },
  { title: 'Place Your Bet', desc: 'Select your preferred option and enter your bet amount.' },
  { title: 'Win & Withdraw', desc: 'Winnings are credited instantly. Go to Wallet → Withdraw to cash out.' },
];

function Guide() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Beginner's Guide</h2>
      </div>
      <div style={{ padding: 16 }}>
        {steps.map((step, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '16px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', display: 'flex', gap: 14 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f0522a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: '#222', marginBottom: 4 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guide;
