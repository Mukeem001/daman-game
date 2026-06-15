import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';

import  './accountstyle/page-main-SettingCenter-48faf3e2.css';
import './accountstyle/page-main-index.vue_vue_type_script_setup_true_lang-d9204ab3.css';
import './accountstyle/page-activity-Championship-0dbc2b73.css';
import './accountstyle/page-main-index.vue_vue_type_style_index_0_scoped_a78765c7_lang-fdb9c9a2.css';

function Account() {

    const context = useContext(MyContext);
    const { userinfo, usebalance } = context;

    const navigate = useNavigate();
    const [showLogoutDialog, setShowLogoutDialog] = useState(false);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loginTime");
        navigate('/login');
    }

    const lastLoginTime = localStorage.getItem('loginTime')
        ? new Date(localStorage.getItem('loginTime')).toLocaleString('en-IN')
        : '--';

 

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
      }
    }, [navigate]);

  return (
   <>

   <>

        <link rel="stylesheet" href="./page-main-SettingCenter-48faf3e2.css" />
        <link rel="stylesheet" href="./page-main-index.vue_vue_type_script_setup_true_lang-d9204ab3.css" />
        <link rel="stylesheet" href="./page-activity-Championship-0dbc2b73.css" />
        <link rel="stylesheet" href="./page-main-index.vue_vue_type_style_index_0_scoped_a78765c7_lang-fdb9c9a2.css" />


   
   
   
   {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-Championship-0dbc2b73.css" />

    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-SettingCenter-48faf3e2.css" />

    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-index.vue_vue_type_script_setup_true_lang-d9204ab3.css" />

    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-index.vue_vue_type_style_index_0_scoped_a78765c7_lang-fdb9c9a2.css" /> */}
    

    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-index.vue_vue_type_script_setup_true_lang-f4947d3c.css" /> */}
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-index.vue_vue_type_style_index_0_scoped_214b87c9_lang-f98129fc.css" /> */}
   
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-turntable-components-eaf4e3eb.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-turntable-index.vue_vue_type_script_setup_true_lang-2ca1393d.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-turntable-index.vue_vue_type_style_index_0_scoped_74bb6d20_lang-a5277a26.css" /> */}
    
    


    
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-PointMall-e476b613.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" /> */}
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-GoogleVerify-193cdf16.css" /> */}
    
   
    
    
    </>

<><div data-v-5bd44e74="" data-v-a78765c7="" className="userInfo__container" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
            <div data-v-12a80a3e="" data-v-5bd44e74="" className="navbar main" style={{ display: "none" }}>
                <div data-v-12a80a3e="" className="navbar-fixed">
                    <div data-v-12a80a3e="" className="navbar__content">
                        <div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left">{ /**/ }{ /**/ }{ /**/ }</i></div>
                        <div data-v-12a80a3e="" className="navbar__content-center">{ /*v-if*/ }
                            <div data-v-12a80a3e="" className="navbar__content-title">Settings Center</div>
                        </div>
                        <div data-v-12a80a3e="" className="navbar__content-right" />
                    </div>
                </div>
            </div>
            <div data-v-5bd44e74="" className="userInfo__container-content">
                <div data-v-5bd44e74="" className="userInfo__container-content-wrapper">
                    <div data-v-5bd44e74="" className="userInfo__container-content__avatar"><img data-v-5bd44e74="" src="https://damanclub.in/assets/png/15-80f41fc6.webp" className="userAvatar" /></div>
                    <div data-v-5bd44e74="" className="userInfo__container-content__name">
                        <div data-v-5bd44e74="" className="userInfo__container-content-nickname">
                            <h3 data-v-5bd44e74="">{userinfo?.name || userinfo?.usernumber || 'User'}</h3>
                            <div data-v-5bd44e74="" className="n2" /><img data-v-5bd44e74="" className="editPencil" src="https://damanclub.in/assets/png/editPencil-c89ee923.webp" style={{ display: "none" }} />
                        </div>
                        <div data-v-5bd44e74="" className="userInfo__container-content-uid"><span data-v-5bd44e74="">UID</span><span data-v-5bd44e74="">|</span><span data-v-5bd44e74="">{userinfo?.usernumber || '--'}</span><svg data-v-5bd44e74="" className="svg-icon icon-copy">
                                <use xlinkHref="#icon-copy" />
                            </svg></div>
                        <div data-v-5bd44e74="" className="userInfo__container-content-logintime"><span data-v-5bd44e74="">Last login: </span><span data-v-5bd44e74="">{lastLoginTime}</span></div>
                        <div data-v-5bd44e74="" className="userInfo__container-content-logintime" style={{ display: "none" }}>
                            <span data-v-5bd44e74=""> </span>
                        </div>
                    </div>
                </div>{ /* <div v-show="!isSettingPage" class="userInfo__container-content-right">
                       				<img v-lazy="getIcons('main', 'myCoin')" alt="" />
                       				<span>我的金币</span>
                       			</div> */ }
                <div data-v-5bd44e74="" className="userInfo__container-content-right" style={{ display: "none" }}>
                    <h5 data-v-5bd44e74="">Change avatar</h5>
                </div>
            </div>
            <div data-v-5bd44e74="" className="userInfo__container-setting-center" style={{ display: "none" }}>
                <div data-v-5bd44e74="" className="userInfo__container-setting-center-header">
                    <div data-v-5bd44e74="" className="userInfo__container-content__avatar"><img data-v-5bd44e74="" data-img="https://damanclub.in/assets/png/avatar-2f23f3bd.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/15-80f41fc6.webp" /></div>
                    <div data-v-5bd44e74="" className="userInfo__container-setting-center-header-edit"><span data-v-5bd44e74="">Change avatar</span><i data-v-5bd44e74="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(136, 136, 136)" }}>{ /**/ }{ /**/ }{ /**/ }</i></div>
                </div>
                <div data-v-5bd44e74="" className="userInfo__container-setting-center-content ar-1px-b">
                    <h5 data-v-5bd44e74="">Nickname</h5>
                    <div data-v-5bd44e74=""><span data-v-5bd44e74="">Udbuejsnbd</span><i data-v-5bd44e74="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(136, 136, 136)" }}>{ /**/ }{ /**/ }{ /**/ }</i></div>
                </div>
                <div data-v-5bd44e74="" className="userInfo__container-setting-center-content">
                    <h5 data-v-5bd44e74="">UID</h5>
                    <div data-v-5bd44e74=""><span data-v-5bd44e74="">3388993</span><svg data-v-5bd44e74="" className="svg-icon icon-copy">
                            <use xlinkHref="#icon-copy" />
                        </svg></div>
                </div>
            </div>
            <div data-v-2c18a1cc="" data-v-5bd44e74="" className="info-dialog">{ /**/ }{ /**/ }</div>
        </div>
        <div data-v-a78765c7="" className="userinfo-content" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>{ /* 总余额及钱包 */ }
            <div data-v-7d799898="" className="totalSavings__container">
                <div data-v-7d799898="" className="totalSavings__container-header">
                    <div data-v-7d799898="" className="totalSavings__container-header-box ar-1px-b">
                        <div data-v-7d799898="" className="balance_info">
                            <div data-v-7d799898="" className="totalSavings__container-header__title"><span data-v-7d799898="">Total
                                    balance</span>{ /* <img v-lazy="getIcons('main', 'balanceIcon')" alt="" /> */ }</div>
                            <p data-v-7d799898="" className="totalSavings__container-header__subtitle"><span data-v-7d799898="">₹{Number(usebalance || 0).toFixed(2)}</span><svg data-v-7d799898="" className="svg-icon icon-refreshBalance">
                                    <use xlinkHref="#icon-refreshBalance" />
                                </svg></p>
                        </div>
                        <div data-v-7d799898="" className="comminWallet" onClick={() => navigate('/wallet')} style={{ cursor: 'pointer' }}>Enter wallet</div>
                    </div>
                </div>
                <div data-v-7d799898="" className="totalSavings__container-content">
                    <div data-v-7d799898="" className="totalSavings__container-content-item" onClick={() => navigate('/wallet')} style={{ cursor: 'pointer' }}>
                        <div data-v-7d799898=""><svg data-v-7d799898="" className="svg-icon icon-wallets">
                                <use xlinkHref="#icon-wallets" />
                            </svg><span data-v-7d799898="">ARWallet</span></div>
                    </div>
                    <div data-v-7d799898="" className="totalSavings__container-content-item" onClick={() => navigate('/deposit')} style={{ cursor: 'pointer' }}>
                        <div data-v-7d799898=""><svg data-v-7d799898="" className="svg-icon icon-rechargeIcon">
                                <use xlinkHref="#icon-rechargeIcon" />
                            </svg><span data-v-7d799898="">Deposit</span></div>
                    </div>
                    <div data-v-7d799898="" className="totalSavings__container-content-item" onClick={() => navigate('/withdraw')} style={{ cursor: 'pointer' }}>
                        <div data-v-7d799898=""><svg data-v-7d799898="" className="svg-icon icon-widthdrawBlue">
                                <use xlinkHref="#icon-widthdrawBlue" />
                            </svg><span data-v-7d799898="">Withdraw</span></div>
                    </div>
                    <div data-v-7d799898="" className="totalSavings__container-content-item" onClick={() => navigate('/vip')} style={{ cursor: 'pointer' }}>
                        <div data-v-7d799898=""><svg data-v-7d799898="" className="svg-icon icon-VipIcon">
                                <use xlinkHref="#icon-VipIcon" />
                            </svg><span data-v-7d799898="">VIP</span></div>
                    </div>
                </div>
            </div>{ /*激活绑定验证*/ }
            <div data-v-3e71d3da="" data-v-362d668a="" data-v-7d799898="" className="dialog inactive newDialog">
                <div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>{ /*v-if*/ }
                    <div data-v-3e71d3da="" className="dialog__container-title">
                        <h1 data-v-3e71d3da="">Bind phone number</h1>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-content">
                        <div data-v-50aa8bb0="" data-v-362d668a="" className="phoneInput__container">
                            <div data-v-50aa8bb0="" className="phoneInput__container-label"><svg data-v-50aa8bb0="" className="svg-icon icon-phone">
                                    <use xlinkHref="#icon-phone" />
                                </svg><span data-v-50aa8bb0="">Phone number</span></div>
                            <div data-v-50aa8bb0="" className="phoneInput__container-input">
                                <div data-v-5067ef5e="" data-v-50aa8bb0="" className="dropdown">
                                    <div data-v-5067ef5e="" className="dropdown__value"><span data-v-5067ef5e="">+91</span><i data-v-5067ef5e="" className="van-badge__wrapper van-icon van-icon-arrow-down">{ /**/ }{ /**/ }{ /**/ }</i>
                                    </div>
                                    <div data-v-5067ef5e="" className="dropdown__list">
                                        <div data-v-5067ef5e="" className="dropdown__list-item active"><span data-v-5067ef5e="">+91</span> India (भारत)</div>
                                    </div>
                                </div><input data-v-50aa8bb0="" type="text" name="userNumber" placeholder="Please enter the phone number" />
                            </div>
                        </div>
                        <div data-v-c17848a2="" data-v-362d668a="" className="verifyInput__container">
                            <div data-v-c17848a2="" className="verifyInput__container-label"><svg data-v-c17848a2="" className="svg-icon icon-verify">
                                    <use xlinkHref="#icon-verify" />
                                </svg><span data-v-c17848a2="">Verification Code</span></div>
                            <div data-v-c17848a2="" className="verifyInput__container-input"><input data-v-c17848a2="" type="text" placeholder="Please enter the confirmation code" maxLength={6} /><button data-v-c17848a2="" className=""><span data-v-c17848a2="">Send</span></button></div>
                            <div data-v-c17848a2="" className="verifyInput__container-tip" style={{ display: "none" }}><i data-v-c17848a2="" className="van-badge__wrapper van-icon van-icon-warning-o">{ /**/ }{ /**/ }{ /**/ }</i><span data-v-c17848a2="">Did not receive verification code?</span><span data-v-c17848a2="">Contact customer service</span></div>
                        </div>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-footer">
                        <div data-v-362d668a="" className="footer"><button data-v-362d668a="" className="sure">Confirm</button><button data-v-362d668a="" className="cancel">Cancel</button>
                        </div>
                    </div>{ /*v-if*/ }
                </div>
                <div data-v-3e71d3da="" className="dialog__outside" />
            </div>{ /* 保险箱 积分商城 下注-交易-充值-提现 */ }
            <div data-v-acd6d46f="" data-v-a78765c7="" className="financialServices__container">
                <div data-v-acd6d46f="" className="financialServices__container-footer">{ /* 保险箱 */ }
                    <div data-v-acd6d46f="" onClick={() => navigate('/safe')} style={{ cursor: 'pointer' }}><svg data-v-acd6d46f="" className="svg-icon icon-vault">
                            <use xlinkHref="#icon-vault" />
                        </svg>
                        <div data-v-acd6d46f="">
                            <div data-v-acd6d46f=""><span data-v-acd6d46f="">Safe</span>
                                <div data-v-acd6d46f="" className="financialServices__container-footer-des"><svg data-v-acd6d46f="" className="svg-icon icon-vaultSmallIcon">
                                        <use xlinkHref="#icon-vaultSmallIcon" />
                                    </svg>
                                    <h4 data-v-acd6d46f="">₹0.00</h4><i data-v-acd6d46f="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "var(--text_color_L2)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                                </div>
                            </div>
                            { /* <span>{{ $t('dailyRate') + dayShareRate }}%，{{ shareTime + $t('minCalculateIncome') }}</span> */ }<span data-v-acd6d46f="">The daily interest rate is 0.1%, and the income is calculated once
                                every 1 minutes.</span>
                        </div>
                    </div>{ /* 积分商城 */ }{ /*v-if*/ }
                </div>{ /* 下注-交易-充值-提现 */ }
                <div data-v-acd6d46f="" className="financialServices__container-box">
                    <div data-v-acd6d46f="" onClick={() => navigate('/gamehistory')} style={{ cursor: 'pointer' }}><svg data-v-acd6d46f="" className="svg-icon icon-betHistory">
                            <use xlinkHref="#icon-betHistory" />
                        </svg>
                        <div data-v-acd6d46f="" className="financialServices__container-box-para">
                            <h3 data-v-acd6d46f="">Game History</h3><span data-v-acd6d46f="">My game history</span>
                        </div>
                    </div>
                    <div data-v-acd6d46f="" onClick={() => navigate('/transachistory')} style={{ cursor: 'pointer' }}><svg data-v-acd6d46f="" className="svg-icon icon-tradeHistory">
                            <use xlinkHref="#icon-tradeHistory" />
                        </svg>
                        <div data-v-acd6d46f="" className="financialServices__container-box-para">
                            <h3 data-v-acd6d46f="">Transaction</h3><span data-v-acd6d46f="">My transaction
                                history</span>
                        </div>
                    </div>
                    <div data-v-acd6d46f="" onClick={() => navigate('/deposithistory')} style={{ cursor: 'pointer' }}><svg data-v-acd6d46f="" className="svg-icon icon-rechargeHistory">
                            <use xlinkHref="#icon-rechargeHistory" />
                        </svg>
                        <div data-v-acd6d46f="" className="financialServices__container-box-para">
                            <h3 data-v-acd6d46f="">Deposit</h3><span data-v-acd6d46f="">My deposit history</span>
                        </div>
                    </div>
                    <div data-v-acd6d46f="" onClick={() => navigate('/withdrawhistory')} style={{ cursor: 'pointer' }}><svg data-v-acd6d46f="" className="svg-icon icon-myWithdrawHistory">
                            <use xlinkHref="#icon-myWithdrawHistory" />
                        </svg>
                        <div data-v-acd6d46f="" className="financialServices__container-box-para">
                            <h3 data-v-acd6d46f="">Withdraw</h3><span data-v-acd6d46f="">My withdraw history</span>
                        </div>
                    </div>
                </div>
            </div>{ /* 通知 邀请奖励 礼物兑换 商品订单 游戏统计 语言变更 */ }
            <div data-v-a30d19b1="" data-v-a78765c7="" className="settingPanel__container">
                <div data-v-a30d19b1="" className="settingPanel__container-items">
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" onClick={() => navigate('/notification')} style={{ cursor: 'pointer' }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-notification">
                                <use xlinkHref="#icon-notification" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">Notification</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="">51</h5><span data-v-a30d19b1="" style={{ display: "none" }}>English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" onClick={() => navigate('/gifts')} style={{ cursor: 'pointer' }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-gifts">
                                <use xlinkHref="#icon-gifts" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">Gifts</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="" style={{ display: "none" }}>51</h5><span data-v-a30d19b1="" style={{ display: "none" }}>English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" style={{ display: "none" }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-tournament">
                                <use xlinkHref="#icon-tournament" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">My
                                Tournament</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="" style={{ display: "none" }}>51</h5><span data-v-a30d19b1="" style={{ display: "none" }}>English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" style={{ display: "none" }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-productCode">
                                <use xlinkHref="#icon-productCode" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">Product code</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="" style={{ display: "none" }}>51</h5><span data-v-a30d19b1="" style={{ display: "none" }}>English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" style={{ display: "none" }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-myDraw">
                                <use xlinkHref="#icon-myDraw" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">my
                                draw</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="" style={{ display: "none" }}>51</h5><span data-v-a30d19b1="" style={{ display: "none" }}>English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" onClick={() => navigate('/gamestatistics')} style={{ cursor: 'pointer' }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-statsIcon">
                                <use xlinkHref="#icon-statsIcon" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">Game
                                statistics</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="" style={{ display: "none" }}>51</h5><span data-v-a30d19b1="" style={{ display: "none" }}>English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                    <div data-v-a30d19b1="" className="settingPanel__container-items__item ar-1px-b" style={{ cursor: 'pointer' }}>
                        <div data-v-a30d19b1="" className="settingPanel__container-items__title"><svg data-v-a30d19b1="" className="svg-icon icon-language">
                                <use href="#icon-language" />
                            </svg>{ /* <img :src="getIcons('main', `${item.icon}`)" /> */ }<span data-v-a30d19b1="">Language</span></div>
                        <div data-v-a30d19b1="" className="settingPanel__container-items-right">
                            <h5 data-v-a30d19b1="" style={{ display: "none" }}>51</h5><span data-v-a30d19b1="">English</span><i data-v-a30d19b1="" className="van-badge__wrapper van-icon van-icon-arrow" style={{ color: "rgb(102, 102, 102)" }}>{ /**/ }{ /**/ }{ /**/ }</i>
                        </div>
                    </div>
                </div>
            </div>{ /* 服务中心 */ }
            <div data-v-159bf81f="" data-v-a78765c7="" className="serviceCenter-wrap">
                <div data-v-159bf81f="" className="serviceCenter__container">
                    <h1 data-v-159bf81f="">Service center</h1>
                    <div data-v-159bf81f="" className="serviceCenter__container-items">
                        <div data-v-159bf81f="" className="serviceCenter__container-items__item" onClick={() => navigate('/settings')} style={{ cursor: 'pointer' }}><svg data-v-159bf81f="" className="svg-icon icon-settingCenter">
                                <use href="#icon-settingCenter" />
                            </svg>{ /* <img v-lazy="getIcons('main', `${item.icon}`)" /> */ }<span data-v-159bf81f="">Settings</span></div>
                        <div data-v-159bf81f="" className="serviceCenter__container-items__item" onClick={() => navigate('/feedback')} style={{ cursor: 'pointer' }}><svg data-v-159bf81f="" className="svg-icon icon-feedback">
                                <use href="#icon-feedback" />
                            </svg>{ /* <img v-lazy="getIcons('main', `${item.icon}`)" /> */ }<span data-v-159bf81f="">Feedback</span></div>
                        <div data-v-159bf81f="" className="serviceCenter__container-items__item" onClick={() => navigate('/announcement')} style={{ cursor: 'pointer' }}><svg data-v-159bf81f="" className="svg-icon icon-notificationCenter">
                                <use href="#icon-notificationCenter" />
                            </svg>{ /* <img v-lazy="getIcons('main', `${item.icon}`)" /> */ }<span data-v-159bf81f="">Announcement</span></div>
                        <div data-v-159bf81f="" className="serviceCenter__container-items__item" onClick={() => navigate('/customerservice')} style={{ cursor: 'pointer' }}><svg data-v-159bf81f="" className="svg-icon icon-serverTicket">
                                <use href="#icon-serverTicket" />
                            </svg>{ /* <img v-lazy="getIcons('main', `${item.icon}`)" /> */ }<span data-v-159bf81f="">Customer Service</span></div>
                        <div data-v-159bf81f="" className="serviceCenter__container-items__item" onClick={() => navigate('/guide')} style={{ cursor: 'pointer' }}><svg data-v-159bf81f="" className="svg-icon icon-guide">
                                <use href="#icon-guide" />
                            </svg>{ /* <img v-lazy="getIcons('main', `${item.icon}`)" /> */ }<span data-v-159bf81f="">Beginner's Guide</span></div>
                        <div data-v-159bf81f="" className="serviceCenter__container-items__item" onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}><svg data-v-159bf81f="" className="svg-icon icon-about">
                                <use href="#icon-about" />
                            </svg>{ /* <img v-lazy="getIcons('main', `${item.icon}`)" /> */ }<span data-v-159bf81f="">About us</span></div>
                    </div>
                </div>
                <div data-v-159bf81f="" className="serviceCenter-wrap-header"><button data-v-159bf81f="" onClick={() => setShowLogoutDialog(true)}><svg data-v-159bf81f="" className="svg-icon icon-logout">
                            <use href="#icon-logout" />
                        </svg>{ /* <img v-lazy="getIcons('home', 'logout')" /> */ } Log out</button></div>{ /*退出登录弹窗*/ }
                <div data-v-3e71d3da="" data-v-159bf81f="" className={`dialog ${showLogoutDialog ? 'active' : 'inactive'}`}>
                    <div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
                        <div data-v-3e71d3da="" className="dialog__container-img"><img data-v-3e71d3da="" className="" alt="" data-origin="https://damanclub.in/assets/png/tip-0498e3f9.webp" src="https://damanclub.in/assets/png/tip-0498e3f9.webp" /></div>
                        <div data-v-3e71d3da="" className="dialog__container-title">
                            <h1 data-v-3e71d3da="">Do you want to log out?</h1>
                        </div>
                        <div data-v-3e71d3da="" className="dialog__container-content" />
                        <div data-v-3e71d3da="" className="dialog__container-footer"><button data-v-3e71d3da="" onClick={logout}>Confirm</button><button data-v-3e71d3da="" onClick={() => setShowLogoutDialog(false)}>Cancel</button></div>
                        { /*v-if*/ }
                    </div>
                    <div data-v-3e71d3da="" className="dialog__outside" />
                </div>
            </div>
        </div></>
   </>
  )
}

export default Account
