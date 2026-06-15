import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

const tiers = [
  { tier: 'Tier 1', label: 'Direct Referral', rate: '0.6%', desc: 'Direct subordinates you personally invited' },
  { tier: 'Tier 2', label: 'Level 2', rate: '0.4%', desc: 'Subordinates invited by your Tier 1' },
  { tier: 'Tier 3', label: 'Level 3', rate: '0.3%', desc: 'Subordinates invited by your Tier 2' },
  { tier: 'Tier 4', label: 'Level 4', rate: '0.2%', desc: 'Subordinates invited by your Tier 3' },
  { tier: 'Tier 5', label: 'Level 5', rate: '0.1%', desc: 'Subordinates invited by your Tier 4' },
];

function RebateRatio() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Rebate Ratio</h2>
      </div>

      <div style={{ margin: 16, background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: 13, color: '#666', lineHeight: 1.6 }}>
          You earn commission from your subordinates' daily bet volume.<br />
          Commission is paid at <b>12:00 AM midnight</b> every day.
        </p>
      </div>

      <div style={{ padding: '0 16px 16px' }}>
        {tiers.map((item, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '16px', marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: '#333' }}>{item.tier}</div>
              <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>{item.desc}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#f0522a' }}>{item.rate}</div>
              <div style={{ fontSize: 11, color: '#bbb' }}>of bet volume</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RebateRatio;
