import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

const levels = [
  { level: 'VIP 1', recharge: '₹1,000', reward: '₹10', bonus: '0.5%' },
  { level: 'VIP 2', recharge: '₹5,000', reward: '₹50', bonus: '1%' },
  { level: 'VIP 3', recharge: '₹10,000', reward: '₹150', bonus: '1.5%' },
  { level: 'VIP 4', recharge: '₹30,000', reward: '₹500', bonus: '2%' },
  { level: 'VIP 5', recharge: '₹1,00,000', reward: '₹2,000', bonus: '3%' },
];

function Vip() {
  const navigate = useNavigate();
  const { setfootershow, usebalance } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: 'linear-gradient(135deg, #c8a94a, #f5d97a)', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.12)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#5a3e00' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#5a3e00' }}>VIP Club</h2>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #c8a94a, #f5d97a)', padding: '24px 20px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 52 }}>👑</div>
        <h2 style={{ margin: '8px 0 4px', color: '#5a3e00', fontWeight: 700, fontSize: 20 }}>VIP Membership</h2>
        <p style={{ margin: 0, color: '#7a5a00', fontSize: 13 }}>Upgrade your level for exclusive rewards</p>
        <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.4)', borderRadius: 10, padding: '10px 20px', display: 'inline-block' }}>
          <span style={{ color: '#5a3e00', fontWeight: 600, fontSize: 14 }}>Current Balance: </span>
          <span style={{ color: '#5a3e00', fontWeight: 700, fontSize: 16 }}>₹{Number(usebalance || 0).toFixed(2)}</span>
        </div>
      </div>

      <div style={{ padding: 16 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 15, color: '#444', fontWeight: 600 }}>VIP Level Benefits</h3>
        {levels.map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#c8a94a' }}>{item.level}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>Required recharge: {item.recharge}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: '#333' }}>Upgrade reward: <b>{item.reward}</b></div>
              <div style={{ fontSize: 12, color: '#666' }}>Rebate: {item.bonus}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Vip;
