import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

const rules = [
  { title: '1. How to invite?', desc: 'Share your invitation link or code with friends. When they register using your code, they become your Tier 1 subordinate.' },
  { title: '2. How does commission work?', desc: 'You earn commission from your subordinates\' daily bet volume. Commission is automatically credited to your wallet at midnight every day.' },
  { title: '3. Commission tiers', desc: 'You earn from 5 tiers:\n• Tier 1 (direct): 0.6% of their bet volume\n• Tier 2: 0.4%\n• Tier 3: 0.3%\n• Tier 4: 0.2%\n• Tier 5: 0.1%' },
  { title: '4. When is commission paid?', desc: 'Commission from the previous day\'s bet volume is calculated and deposited to your wallet every night at 12:00 AM.' },
  { title: '5. Who can be my subordinate?', desc: 'Any user who registers using your invitation link or enters your invitation code during signup becomes your Tier 1 subordinate.' },
  { title: '6. Is there a limit?', desc: 'There is no limit on the number of subordinates you can invite. The more active subordinates you have, the more commission you earn.' },
];

function InvitationRules() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);

  useEffect(() => {
    setfootershow('none');
  }, []);

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Invitation Rules</h2>
      </div>

      <div style={{ padding: 16 }}>
        {rules.map((rule, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '16px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: '#f0522a', marginBottom: 8 }}>{rule.title}</div>
            <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{rule.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvitationRules;
