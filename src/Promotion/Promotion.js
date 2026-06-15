import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import config from '../config/config';

import './promostyle/page-promotion-index.vue_vue_type_script_setup_true_lang-a2693a7f.css';
import './promostyle/page-promotion-index.vue_vue_type_style_index_0_scoped_600663f7_lang-c8ba773a.css';

function Promotion() {

    const navigate = useNavigate();
    const { userinfo } = useContext(MyContext);

    const [promoStats, setPromoStats] = useState(null);
    const [inviteCode, setInviteCode] = useState('');
    const [copyMsg, setCopyMsg] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchInvitationCode = useCallback(async (token) => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/user/Getuser`, {
          headers: { 'auto-token': token }
        });
        const json = await res.json();
        if (json?.invitationCode) setInviteCode(json.invitationCode);
      } catch (err) {
        console.error("Getuser fallback error:", err);
      }
    }, []);

    const fetchPromoStats = useCallback(async (token) => {
      try {
        // Add timestamp to URL to prevent browser caching (no extra headers needed)
        const res = await fetch(`${config.API_BASE_URL}/api/promotion/mypromo?_=${Date.now()}`, {
          headers: { 'auto-token': token }
        });
        const json = await res.json();
        if (json.success) {
          setPromoStats(json);
          if (json.invitationCode) setInviteCode(json.invitationCode);
        }
      } catch (err) {
        console.error("Promo stats fetch error:", err);
      }
    }, []);

    const handleRefresh = useCallback(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      setRefreshing(true);
      await fetchPromoStats(token);
      setRefreshing(false);
      setCopyMsg('Stats refreshed!');
      setTimeout(() => setCopyMsg(''), 1500);
    }, [fetchPromoStats]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) { navigate("/signup"); return; }
      fetchPromoStats(token);
      fetchInvitationCode(token);

      // Auto-refresh every 30 seconds to show new subordinates + commission updates
      const timer = setInterval(() => {
        fetchPromoStats(token);
      }, 30000);
      return () => clearInterval(timer);
    }, [navigate, fetchPromoStats, fetchInvitationCode]);

    const displayCode = inviteCode || promoStats?.invitationCode || userinfo?.invitationCode || '------';
    const inviteLink = `${window.location.origin}/signup?ref=${displayCode}`;

    const copyCode = () => {
      navigator.clipboard.writeText(displayCode).then(() => {
        setCopyMsg('Code copied!');
        setTimeout(() => setCopyMsg(''), 2000);
      });
    };

    const copyLink = () => {
      navigator.clipboard.writeText(inviteLink).then(() => {
        setCopyMsg('Link copied!');
        setTimeout(() => setCopyMsg(''), 2000);
      });
    };

  return (
   <>
<link rel="stylesheet" href="./promostyle/page-promotion-index.vue_vue_type_script_setup_true_lang-a2693a7f.css" />
    <link rel="stylesheet" href="./promostyle/page-promotion-index.vue_vue_type_style_index_0_scoped_600663f7_lang-c8ba773a.css" />

{copyMsg && (
  <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: '#333', color: '#fff', padding: '8px 20px', borderRadius: 20, fontSize: 13, zIndex: 9999 }}>
    {copyMsg}
  </div>
)}

{promoStats?.newTodaySubordinates > 0 && (
  <div
    onClick={() => navigate('/subordinate-data')}
    style={{
      position: 'fixed', top: 60, right: 12, background: 'linear-gradient(135deg,#f7b733,#fc4a1a)',
      color: '#fff', padding: '10px 14px', borderRadius: 12, fontSize: 13, zIndex: 9998,
      boxShadow: '0 4px 12px rgba(0,0,0,0.25)', cursor: 'pointer', maxWidth: 200,
    }}
  >
    🎉 <strong>{promoStats.newTodaySubordinates}</strong> new member{promoStats.newTodaySubordinates > 1 ? 's' : ''} joined today!
    {promoStats.newTodayList?.slice(0, 2).map((u, i) => (
      <div key={i} style={{ fontSize: 11, marginTop: 2, opacity: 0.9 }}>
        {u.usernumber ? `+91${u.usernumber}` : u.name}
      </div>
    ))}
  </div>
)}

<div data-v-12a80a3e="" data-v-600663f7="" className="navbar white"
            style={{fontFamily: "'Roboto', 'Inter', sans-serif"}}>
            <div data-v-12a80a3e="" className="navbar-fixed">
                <div data-v-12a80a3e="" className="navbar__content">
                    <div data-v-12a80a3e="" className="navbar__content-left"></div>
                    <div data-v-12a80a3e="" className="navbar__content-center">
                        <div data-v-12a80a3e="" className="navbar__content-title">Agency</div>
                    </div>
                    <div data-v-12a80a3e="" className="navbar__content-right" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {/* Refresh button */}
                      <span
                        onClick={handleRefresh}
                        style={{ cursor: 'pointer', fontSize: 18, opacity: refreshing ? 0.4 : 1, transition: 'opacity 0.3s', userSelect: 'none' }}
                        title="Refresh stats"
                      >
                        {refreshing ? '⏳' : '🔄'}
                      </span>
                      <span onClick={() => navigate('/subordinate-data')} style={{ cursor: 'pointer' }}>
                        <svg data-v-600663f7="" className="svg-icon icon-subordinate">
                          <use xlinkHref="#icon-subordinate"></use>
                        </svg>
                      </span>
                    </div>
                </div>
            </div>
        </div>
        <div data-v-6cf5705a="" data-v-600663f7="" className="container"
            style={{fontFamily: "'Roboto', 'Inter', sans-serif"}}>
            <div data-v-6cf5705a="" className="amount">₹{Number(promoStats?.weekCommission || 0).toFixed(2)}</div>
            <div data-v-6cf5705a="" className="amount_txt">Yesterday's total commission</div>
            <div data-v-6cf5705a="" className="tip">Upgrade the level to increase commission income</div>
            <div data-v-6cf5705a="" className="info_content">
                <div data-v-6cf5705a="" className="info">
                    <div data-v-6cf5705a="" className="head"><svg data-v-6cf5705a=""
                            className="svg-icon icon-directSubordinates">
                            <use xlinkHref="#icon-directSubordinates"></use>
                        </svg> Direct subordinates</div>
                    <div data-v-6cf5705a="" className="line1 r">
                        <div data-v-6cf5705a="">{promoStats?.tiers?.tier1 || 0}</div> number of register
                    </div>
                    <div data-v-6cf5705a="" className="line2 r">
                        <div data-v-6cf5705a="">{promoStats?.directDeposit || 0}</div> Deposit number
                    </div>
                    <div data-v-6cf5705a="" className="line3 r">
                        <div data-v-6cf5705a="">₹{Number(promoStats?.tier1TodayVolume || 0).toFixed(2)}</div> Today bet volume
                    </div>
                    <div data-v-6cf5705a="" className="line1 r">
                        <div data-v-6cf5705a="">{promoStats?.newTodaySubordinates || 0}</div> New today
                    </div>
                </div>
                <div data-v-6cf5705a="" className="info">
                    <div data-v-6cf5705a="" className="head u2"><svg data-v-6cf5705a=""
                            className="svg-icon icon-teamSubordinates">
                            <use xlinkHref="#icon-teamSubordinates"></use>
                        </svg>Team subordinates</div>
                    <div data-v-6cf5705a="" className="line1">
                        <div data-v-6cf5705a="">{promoStats?.totalSubordinates || 0}</div> number of register
                    </div>
                    <div data-v-6cf5705a="" className="line2">
                        <div data-v-6cf5705a="">{promoStats?.totalSubordinates || 0}</div> Total members
                    </div>
                    <div data-v-6cf5705a="" className="line3">
                        <div data-v-6cf5705a="">₹{Number(promoStats?.todayVolume || 0).toFixed(2)}</div> Today team volume
                    </div>
                    <div data-v-6cf5705a="" className="line1">
                        <div data-v-6cf5705a="">₹{Number(promoStats?.lifetimeVolume || 0).toFixed(2)}</div> Lifetime volume
                    </div>
                </div>
            </div>
        </div>
        <div data-v-600663f7="" className="content" style={{fontFamily: "'Roboto', 'Inter', sans-serif"}}>
            <div data-v-600663f7="" className="shareBtnContainer">
              <button data-v-600663f7="" className="shareBtn" onClick={copyLink}>Copy Invitation Link</button>
            </div>
            <div data-v-600663f7="" className="promote__cell">
                <div data-v-600663f7="" className="promote__cell-item" onClick={copyCode} style={{ cursor: 'pointer' }}>
                    <div data-v-600663f7="" className="label"><svg data-v-600663f7="" className="svg-icon icon-copy_Code">
                            <use xlinkHref="#icon-copy_Code"></use>
                        </svg><span data-v-600663f7="">Copy invitation code</span></div>
                    <div data-v-600663f7="" className="arrow"><span data-v-600663f7="">{displayCode} <svg data-v-600663f7=""
                                className="svg-icon icon-copy">
                                <use xlinkHref="#icon-copy"></use>
                            </svg></span></div>
                </div>
                <div data-v-600663f7="" className="promote__cell-item" onClick={() => navigate('/subordinate-data')} style={{ cursor: 'pointer' }}>
                    <div data-v-600663f7="" className="label"><svg data-v-600663f7="" className="svg-icon icon-team_port">
                            <use xlinkHref="#icon-team_port"></use>
                        </svg><span data-v-600663f7="">Subordinate data</span></div>
                    <div data-v-600663f7="" className="arrow"><i data-v-600663f7=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                            style={{color: 'var(--text_color_L1)', fontSize: '24px'}}>   </i></div>
                </div>
                <div data-v-600663f7="" className="promote__cell-item" onClick={() => navigate('/commission-detail')} style={{ cursor: 'pointer' }}>
                    <div data-v-600663f7="" className="label"><svg data-v-600663f7="" className="svg-icon icon-commission">
                            <use xlinkHref="#icon-commission"></use>
                        </svg><span data-v-600663f7="">Commission detail</span></div>
                    <div data-v-600663f7="" className="arrow"><i data-v-600663f7=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                            style={{color: 'var(--text_color_L1)', fontSize: '24px'}}>   </i></div>
                </div>
                <div data-v-600663f7="" className="promote__cell-item" onClick={() => navigate('/invitation-rules')} style={{ cursor: 'pointer' }}>
                    <div data-v-600663f7="" className="label"><svg data-v-600663f7="" className="svg-icon icon-invite_reg">
                            <use xlinkHref="#icon-invite_reg"></use>
                        </svg><span data-v-600663f7="">Invitation rules</span></div>
                    <div data-v-600663f7="" className="arrow"><i data-v-600663f7=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                            style={{color: 'var(--text_color_L1)', fontSize: '24px'}}>   </i></div>
                </div>
                <div data-v-600663f7="" className="promote__cell-item" onClick={() => navigate('/agent-service')} style={{ cursor: 'pointer' }}>
                    <div data-v-600663f7="" className="label"><svg data-v-600663f7="" className="svg-icon icon-server">
                            <use xlinkHref="#icon-server"></use>
                        </svg><span data-v-600663f7="">Agent line customer service</span></div>
                    <div data-v-600663f7="" className="arrow"><i data-v-600663f7=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                            style={{color: 'var(--text_color_L1)', fontSize: '24px'}}>   </i></div>
                </div>
                <div data-v-600663f7="" className="promote__cell-item" onClick={() => navigate('/rebate-ratio')} style={{ cursor: 'pointer' }}>
                    <div data-v-600663f7="" className="label"><svg data-v-600663f7="" className="svg-icon icon-rebateRatio">
                            <use xlinkHref="#icon-rebateRatio"></use>
                        </svg><span data-v-600663f7="">Rebate ratio</span></div>
                    <div data-v-600663f7="" className="arrow"><i data-v-600663f7=""
                            className="van-badge__wrapper van-icon van-icon-arrow"
                            style={{color: 'var(--text_color_L1)', fontSize: '24px'}}>   </i></div>
                </div>
            </div>
            <div data-v-600663f7="" className="commission">
                <div data-v-600663f7="" className="commission__title"><svg data-v-600663f7=""
                        className="svg-icon icon-promotionData">
                        <use xlinkHref="#icon-promotionData"></use>
                    </svg><span data-v-600663f7="">promotion data</span></div>
                <div data-v-600663f7="" className="commission__body">
                    <div data-v-600663f7=""><span data-v-600663f7="">₹{Number(promoStats?.weekCommission || 0).toFixed(2)}</span><span data-v-600663f7="">This Week</span></div>
                    <span data-v-600663f7=""></span>
                    <div data-v-600663f7=""><span data-v-600663f7="">₹{Number(promoStats?.totalCommission || 0).toFixed(2)}</span><span data-v-600663f7="">Total commission</span></div>
                </div>
                <div data-v-600663f7="" className="commission__body">
                    <div data-v-600663f7=""><span data-v-600663f7="">{promoStats?.tiers?.tier1 || 0}</span><span data-v-600663f7="">direct subordinate</span></div>
                    <span data-v-600663f7=""></span>
                    <div data-v-600663f7=""><span data-v-600663f7="">{promoStats?.totalSubordinates || 0}</span><span data-v-600663f7="">Total number of subordinates in the team</span></div>
                </div>
            </div>
        </div>
   
   </>
  )
}

export default Promotion
