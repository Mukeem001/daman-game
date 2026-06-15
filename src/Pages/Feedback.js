import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';

function Feedback() {
  const navigate = useNavigate();
  const { setfootershow } = useContext(MyContext);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setfootershow('none');
  }, []);

  const handleSubmit = () => {
    if (text.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ fontFamily: "'Roboto','Inter',sans-serif", minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ background: '#fff', padding: '16px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
        <span onClick={() => navigate(-1)} style={{ fontSize: 22, cursor: 'pointer', marginRight: 12, color: '#333' }}>&#8592;</span>
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 600, color: '#333' }}>Feedback</h2>
      </div>
      <div style={{ padding: 20 }}>
        {submitted ? (
          <div style={{ textAlign: 'center', marginTop: 60, color: '#4caf50' }}>
            <div style={{ fontSize: 48 }}>✓</div>
            <p style={{ marginTop: 12, fontSize: 15 }}>Thank you for your feedback!</p>
          </div>
        ) : (
          <>
            <p style={{ color: '#555', fontSize: 14, marginBottom: 12 }}>Share your feedback or suggestions with us:</p>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Write your feedback here..."
              rows={6}
              style={{ width: '100%', borderRadius: 8, border: '1px solid #ddd', padding: 12, fontSize: 14, resize: 'none', boxSizing: 'border-box', outline: 'none' }}
            />
            <button
              onClick={handleSubmit}
              style={{ marginTop: 16, width: '100%', background: '#f0522a', color: '#fff', border: 'none', borderRadius: 8, padding: '13px 0', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Feedback;
