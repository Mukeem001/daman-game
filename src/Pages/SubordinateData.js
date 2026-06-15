import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import config from '../config/config';

function SubordinateData() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);
  const [activeTab, setActiveTab] = useState(1);
  const [tiers, setTiers] = useState({ tier1: [], tier2: [], tier3: [], tier4: [], tier5: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setfootershow('none');
    fetchSubordinates();
  }, []);

  const fetchSubordinates = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${config.API_BASE_URL}/api/promotion/subordinates`, {
        headers: { 'auto-token': token }
      });
      const json = await res.json();
      if (json.success) setTiers(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentList = tiers[`tier${activeTab}`] || [];

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Subordinate Data</h2>
      </div>

      {/* Tier tabs */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #eee', overflowX: 'auto' }}>
        {[1, 2, 3, 4, 5].map(t => (
          <div key={t} onClick={() => setActiveTab(t)}
            style={{ flex: '0 0 auto', padding: '12px 20px', cursor: 'pointer', fontSize: 14, fontWeight: activeTab === t ? 600 : 400, color: activeTab === t ? '#f0522a' : '#666', borderBottom: activeTab === t ? '2px solid #f0522a' : '2px solid transparent' }}>
            Tier {t} ({(tiers[`tier${t}`] || []).length})
          </div>
        ))}
      </div>

      <div style={{ padding: 16 }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#aaa' }}>Loading...</div>
        ) : currentList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#aaa' }}>
            <div style={{ fontSize: 48 }}>👥</div>
            <p>No Tier {activeTab} subordinates yet</p>
          </div>
        ) : (
          currentList.map((u, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, padding: '14px 16px', marginBottom: 10, boxShadow: '0 1px 3px rgba(0,0,0,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15, color: '#222' }}>{u.name || u.usernumber}</div>
                <div style={{ fontSize: 12, color: '#999', marginTop: 3 }}>UID: {u.usernumber}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#f0522a', fontWeight: 600 }}>₹{Number(u.userbalance || 0).toFixed(2)}</div>
                <div style={{ fontSize: 11, color: '#bbb' }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN') : ''}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SubordinateData;
