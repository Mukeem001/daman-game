import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';

function Footer() {

    const context = useContext(MyContext);
    const { footershow } = context;
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { path: '/', icon: 'icon-home', label: 'Home' },
        { path: '/activity', icon: 'icon-activity', label: 'Activity' },
        { path: '/promotion', icon: 'icon-promotion', label: 'Promotion', isBig: true },
        { path: '/wallet', icon: 'icon-wallet', label: 'Wallet' },
        { path: '/account', icon: 'icon-main', label: 'Account' },
    ];

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

  return (
    <>
<div data-v-6ab3f23e="" className="tabbar__container"
     style={{ "--f13b4d11-currentFontFamily": "'Roboto', 'Inter', sans-serif", display: footershow }}>

    {tabs.map((tab) => (
        <div
            key={tab.path}
            data-v-6ab3f23e=""
            className={`tabbar__container-item${isActive(tab.path) ? ' active' : ''}`}
            onClick={() => navigate(tab.path)}
            style={{ cursor: 'pointer' }}
        >
            <svg data-v-6ab3f23e="" className={`svg-icon ${tab.icon}`}>
                <use href={`#${tab.icon}`}></use>
            </svg>
            {tab.isBig && <div data-v-6ab3f23e="" className="promotionBg"></div>}
            <span data-v-6ab3f23e="">{tab.label}</span>
        </div>
    ))}

</div>
    </>
  )
}

export default Footer
