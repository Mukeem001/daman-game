import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import config from '../config/config';

function CommissionDetail() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setfootershow('none');
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.API_BASE_URL}/api/promotion/commission-history`, {
        headers: { 'auto-token': token }
      });
      const json = await res.json();
      if (json.success) setHistory(json.history);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Commission Detail</h2>
      </div>

      <div style={{ padding: 16 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#aaa' }}>Loading...</div>
        ) : history.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#aaa' }}>
            <div style={{ fontSize: 48 }}>💰</div>
            <p>No commission records yet</p>
            <p style={{ fontSize: 13 }}>Commissions are paid at midnight based on subordinate bet volume</p>
          </div>
        ) : (
          history.map((item, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#43a047' }}>+₹{Number(item.amount).toFixed(2)}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 3 }}>Tier {item.tier} • From: {item.fromUserId?.usernumber || 'User'}</div>
                  <div style={{ fontSize: 12, color: '#aaa', marginTop: 2 }}>Volume: ₹{Number(item.betVolume || 0).toFixed(2)}</div>
                </div>
                <div style={{ fontSize: 12, color: '#bbb', textAlign: 'right' }}>
                  {new Date(item.date).toLocaleDateString('en-IN')}<br />
                  {new Date(item.date).toLocaleTimeString('en-IN')}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommissionDetail;
