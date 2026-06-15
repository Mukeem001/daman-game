import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';
import { config } from '../config/config';

function Safe() {
  const navigate = useNavigate();
  const { setfootershow, usebalance, setusebalance } = useContext(MyContext);
  const [safeBalance, setSafeBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [tab, setTab] = useState('deposit'); // 'deposit' | 'withdraw'
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setfootershow('none');
  }, []);

  const handleTransfer = () => {
    const val = parseFloat(amount);
    if (!val || val <= 0) { setMsg('Please enter a valid amount'); return; }

    if (tab === 'deposit') {
      if (val > Number(usebalance)) { setMsg('Insufficient wallet balance'); return; }
      setSafeBalance(prev => prev + val);
      setusebalance(prev => (Number(prev) - val).toFixed(2));
      setMsg(`₹${val.toFixed(2)} deposited to Safe`);
    } else {
      if (val > safeBalance) { setMsg('Insufficient safe balance'); return; }
      setSafeBalance(prev => prev - val);
      setusebalance(prev => (Number(prev) + val).toFixed(2));
      setMsg(`₹${val.toFixed(2)} withdrawn from Safe`);
    }
    setAmount('');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Safe</h2>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #f5a623, #f5d97a)', margin: 16, borderRadius: 14, padding: '24px 20px', textAlign: 'center', boxShadow: '0 2px 8px rgba(245,166,35,0.3)' }}>
        <div style={{ fontSize: 40 }}>🔒</div>
        <p style={{ margin: '8px 0 4px', color: '#5a3e00', fontSize: 13 }}>Safe Balance</p>
        <h2 style={{ margin: 0, color: '#5a3e00', fontWeight: 700, fontSize: 28 }}>₹{safeBalance.toFixed(2)}</h2>
        <p style={{ margin: '8px 0 0', color: '#7a5a00', fontSize: 12 }}>Daily interest rate: 0.1% · Calculated every 1 min</p>
      </div>

      <div style={{ margin: '0 16px', background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.07)' }}>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: '1px solid #eee', marginBottom: 16 }}>
          {['deposit', 'withdraw'].map(t => (
            <div key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: '10px 0', textAlign: 'center', cursor: 'pointer', background: tab === t ? '#f0522a' : '#fff', color: tab === t ? '#fff' : '#666', fontWeight: tab === t ? 600 : 400, fontSize: 14, textTransform: 'capitalize' }}>
              {t === 'deposit' ? 'Deposit to Safe' : 'Withdraw from Safe'}
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 8, fontSize: 13, color: '#888' }}>
          {tab === 'deposit' ? `Wallet balance: ₹${Number(usebalance || 0).toFixed(2)}` : `Safe balance: ₹${safeBalance.toFixed(2)}`}
        </div>

        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount"
          style={{ width: '100%', borderRadius: 8, border: '1px solid #ddd', padding: '12px 14px', fontSize: 15, boxSizing: 'border-box', outline: 'none', marginBottom: 12 }}
        />

        {msg && <p style={{ color: msg.includes('Insufficient') ? '#e53935' : '#43a047', fontSize: 13, margin: '0 0 10px' }}>{msg}</p>}

        <button
          onClick={handleTransfer}
          style={{ width: '100%', background: '#f0522a', color: '#fff', border: 'none', borderRadius: 8, padding: '13px 0', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Safe;
