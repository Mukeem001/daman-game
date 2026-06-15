import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../Context/MyContext';



function VerifyUTR() {
    const navigate = useNavigate();
    const location = useLocation();
    const [utr, setUtr] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(5 * 60 + 37); // 5:37

    const orderData = location.state || {};
    const { orderId, amount, method, barcode, channel } = orderData;

    const context = useContext(MyContext);
    
    const { setfootershow} = context;

      useEffect(() => {
        setfootershow("none");
      }, []);

    
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("VerifyUTR - Token:", token ? "✅ Exists" : "❌ Missing");
        console.log("VerifyUTR - Location State:", orderData);
        console.log("VerifyUTR - OrderID:", orderId);
        
        if (!token) {
            console.warn("No token found, redirecting to signup");
            navigate("/signup");
            return;
        }
        
        if (!orderId) {
            console.warn("No orderId found, redirecting to deposit");
            navigate("/deposit");
            return;
        }
        
        console.log("✅ Order data loaded successfully");
    }, [navigate]);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    };

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';

    const handleUTRSubmit = async (e) => {
        e.preventDefault();
        
        if (!utr.trim()) {
            alert('Please enter UTR number');
            return;
        }

        if (utr.trim().length < 12) {
            alert('UTR should be at least 12 characters');
            return;
        }

        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const response = await fetch(`${API_BASE_URL}api/pay/submit-utr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orderId: orderId,
                    utrNumber: utr.trim()
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('UTR submitted successfully. Waiting for admin approval.');
                navigate('/wallet');
            } else {
                alert('Error: ' + (data.error || data.message || 'Failed to submit UTR'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit UTR');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (barcode) {
            navigator.clipboard.writeText(barcode).then(() => {
                alert('Barcode copied!');
            });
        }
    };

    const openUPI = (url) => {
        window.location.href = url;
    };

    return (
        <div style={{ 
            width: '100%', 
            maxWidth: '100vw',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
            isolation: 'isolate'
        }}>
            {/* HEADER */}
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 16px',
                backgroundColor: 'rgba(0,0,0,0.15)',
                backdropFilter: 'blur(10px)',
                position: 'sticky',
                top: 0,
                zIndex: 10
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '12px',
                    color: '#fff'
                }}>
                    <div style={{ fontWeight: '400', opacity: 0.9 }}>⏱️</div>
                    <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '14px',
                        backgroundColor: 'rgba(255,255,255,0.25)',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        backdropFilter: 'blur(10px)',
                        minWidth: '50px',
                        textAlign: 'center'
                    }}>
                        {formatTime(timeRemaining)}
                    </div>
                </div>
                <div style={{
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}>
                    ₹{parseFloat(amount || 0).toFixed(2)}
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                overflowY: 'auto',
                alignItems: 'center'
            }}>
                {/* QR Section */}
                <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                    <p style={{ 
                        fontWeight: '600', 
                        marginBottom: '8px',
                        fontSize: '14px',
                        color: '#fff'
                    }}>📱 Scan to Pay</p>
                </div>

                <div style={{ 
                    textAlign: 'center',
                    padding: '16px',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    marginBottom: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    border: '3px solid #f093fb'
                }}>
                    {barcode ? (
                        <img 
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(barcode)}`} 
                            alt="Payment Barcode" 
                            width="140" 
                            height="140"
                            style={{ 
                                display: 'inline-block',
                                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))'
                            }}
                        />
                    ) : (
                        <p style={{ color: '#999', padding: '40px 20px' }}>Loading barcode...</p>
                    )}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <p style={{ fontSize: '11px', color: '#fff', fontStyle: 'italic', opacity: 0.9 }}>⚠️ Don't use same QR twice</p>
                </div>

                {/* Divider */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    margin: '12px 0',
                    width: '100%',
                    maxWidth: '280px'
                }}>
                    <div style={{ flex: 1, height: '1.5px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                    <span style={{ color: '#fff', fontSize: '12px', fontWeight: '600' }}>OR</span>
                    <div style={{ flex: 1, height: '1.5px', backgroundColor: 'rgba(255,255,255,0.3)' }} />
                </div>

                {/* Horizontal icon row */}
                <p style={{ 
                    textAlign: 'center',
                    fontSize: '12px', 
                    color: '#fff',
                    marginBottom: '12px',
                    fontWeight: '600'
                }}>Select Payment App:</p>

                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 12px 0',
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    maxWidth: '300px'
                }}>
                    {[
                        { name: 'Paytm', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png', url: `paytmmp://cash_wallet?pa=${barcode}&cu=INR&pn=Payment for Order ${orderId}&am=${amount}&tn=DhanCash` },
                        { name: 'PhonePe', logo: 'https://ospay.win/static/images/india_transaction/PhonePe.svg?v=2b10bf6dc98fe328e4bb5a6e8db7038d91a5eb1fc91483228bc1ca58215b4e7a8c4918b5f4f30d0f4e47dd02a57c6a850a730ff4488d9b4f2554ba36c6b58ebc ', url: `phonepe://pay?pa=${barcode}&cu=INR&pn=Payment for Order ${orderId}&am=${amount}&tn=DhanCash` },
                        { name: 'GooglePay', logo: 'https://ospay.win/static/images/india_transaction/Google.svg?v=1ece158fd31584476355675073ddd3a43c72d6e4450426254d59e0dc135b0b30e3ef29e18f6d736907c3264e606e5230ef6cff3bcb4dfa6c596c4db8c33dfc9c', url: `tez://upi/pay?pa=${barcode}&cu=INR&pn=Payment for Order ${orderId}&am=${amount}&tn=DhanCash` },
                        { name: 'UPI', logo: 'https://ospay.win/static/images/india_transaction/Bank UPI.svg?v=925a4808d841fa76d6f872ba626efeb4fd70af8ca4a12534f5ec17500d794d3af4ebfd89db42dbc851184ba2337129078a2a8cef7c70d549dcd94637236864ef', url: `upi://pay?pa=${barcode}&cu=INR&pn=Payment for Order ${orderId}&am=${amount}&tn=DhanCash` }
                    ].map(app => (
                        <li
                            key={app.name}
                            onClick={() => openUPI(app.url)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px) scale(1.08)';
                                e.currentTarget.style.boxShadow = '0 12px 24px rgba(240, 147, 251, 0.4)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '6px',
                                cursor: 'pointer',
                                padding: '12px 10px',
                                backgroundColor: '#fff',
                                borderRadius: '12px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                border: '2px solid #f093fb',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                minWidth: '68px'
                            }}
                        >
                            <img 
                                src={app.logo} 
                                alt={app.name} 
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    objectFit: 'contain',
                                    transition: 'transform 0.3s ease'
                                }} 
                            />
                            <span style={{ 
                                fontSize: '10px', 
                                textAlign: 'center',
                                fontWeight: '600',
                                color: '#764ba2'
                            }}>{app.name}</span>
                        </li>
                    ))}
                </ul>

                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                    <p style={{ fontWeight: '600', fontSize: '12px', color: '#fff' }}>👇 Or Copy Account</p>
                </div>
            </main>

            {/* FLOATING BOTTOM */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                backgroundColor: '#fff',
                borderRadius: '24px 24px 0 0',
                boxShadow: '0 -8px 24px rgba(0,0,0,0.15)',
                maxWidth: '100%'
            }}>
                {/* Order Info - FIRST */}
                <div style={{
                    padding: '14px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                    fontWeight: '600',
                    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
                    border: '2px solid rgba(255,255,255,0.3)'
                }}>
                    <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>📋 Order Details</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div>
                            <div style={{ fontSize: '10px', opacity: 0.9 }}>Order ID:</div>
                            <div style={{ fontSize: '11px', fontFamily: 'monospace', backgroundColor: 'rgba(0,0,0,0.15)', padding: '4px 6px', borderRadius: '4px', marginTop: '2px', wordBreak: 'break-all' }}>{orderId}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '10px', opacity: 0.9 }}>Amount:</div>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', marginTop: '2px' }}>💰 ₹{parseFloat(amount || 0).toFixed(2)}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '10px', opacity: 0.9 }}>Channel:</div>
                            <div style={{ fontSize: '11px', marginTop: '2px' }}>{channel || method || 'N/A'}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '10px', opacity: 0.9 }}>Status:</div>
                            <div style={{ fontSize: '11px', backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px', marginTop: '2px', display: 'inline-block' }}>⏳ Pending</div>
                        </div>
                    </div>
                </div>

                {/* UPI ID Copy Row */}
                <div>
                    <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px', fontWeight: '600' }}>Account ID</div>
                    <div style={{
                        display: 'flex',
                        gap: '8px',
                        backgroundColor: '#f0f0f0',
                        borderRadius: '10px',
                        padding: '10px',
                        border: '2px solid #f093fb'
                    }}>
                        <input 
                            type="text" 
                            value={barcode || 'N/A'} 
                            readOnly
                            style={{
                                flex: 1,
                                border: 'none',
                                backgroundColor: 'transparent',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                                color: '#333',
                                outline: 'none'
                            }}
                        />
                        <button 
                            type="button" 
                            onClick={copyToClipboard}
                            style={{
                                padding: '6px 14px',
                                backgroundColor: '#f093fb',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '11px',
                                fontWeight: '700',
                                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
                                whiteSpace: 'nowrap'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 6px 16px rgba(240, 147, 251, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(240, 147, 251, 0.3)';
                            }}
                        >
                            Copy
                        </button>
                    </div>
                </div>

                {/* UTR Form */}
                <form onSubmit={handleUTRSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                }}>
                    <div>
                        <div style={{ fontSize: '11px', color: '#666', marginBottom: '6px', fontWeight: '600' }}>Enter UTR (12 digits)</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input 
                                type="text" 
                                maxLength={12} 
                                autoComplete="off" 
                                placeholder="e.g., 123456789012" 
                                value={utr}
                                onChange={(e) => setUtr(e.target.value)}
                                disabled={loading}
                                style={{
                                    flex: 1,
                                    padding: '10px 12px',
                                    border: '2px solid #f093fb',
                                    borderRadius: '8px',
                                    fontSize: '13px',
                                    opacity: loading ? 0.6 : 1,
                                    cursor: loading ? 'not-allowed' : 'text',
                                    backgroundColor: '#f0f0f0',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                onFocus={(e) => {
                                    e.currentTarget.style.borderColor = '#667eea';
                                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.currentTarget.style.borderColor = '#f093fb';
                                    e.currentTarget.style.boxShadow = 'none';
                                }}
                            />
                            <button 
                                type="submit" 
                                disabled={loading}
                                style={{
                                    padding: '10px 18px',
                                    backgroundColor: loading ? '#ccc' : '#667eea',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    minWidth: '90px',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}
                                onMouseEnter={(e) => {
                                    if (!loading) {
                                        e.currentTarget.style.transform = 'translateY(-2px) scale(1.05)';
                                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                                }}
                            >
                                {loading ? 'Wait...' : 'Submit'}
                            </button>
                        </div>
                    </div>
                    <div style={{
                        fontSize: '10px',
                        color: '#999',
                        fontStyle: 'italic',
                        paddingLeft: '4px'
                    }}>
                        If not detected, enter UTR & submit.
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VerifyUTR;
