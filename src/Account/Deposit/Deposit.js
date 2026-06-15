import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './depostyle/page-wallet-Recharge-7c46403d.css';
import './depostyle/page-wallet-OtherPay-0370b97c.css';
import { MyContext } from '../../Context/MyContext';

function Deposit() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('UPI-QR');
    const [selectedChannel, setSelectedChannel] = useState('UPI-QR'); // New state for channel selection
    const [loading, setLoading] = useState(false);
    const [userBalance, setUserBalance] = useState(0);

    const paymentChannels = [
        { name: 'UPI-QR', range: '100 - 50K' },
        { name: 'OSPay - UPI x QR', range: '200 - 50K' },
        { name: 'WinPay-UPI', range: '200 - 20K' },
        { name: 'TimePay-UPI X QR', range: '100 - 50K' },
        { name: 'FullPay - UPI X QR', range: '100 - 50K' },
        { name: 'BonusPay UPI × QR', range: '500 - 20K', bonus: '1%' },
        { name: 'YayaPay - UPI x QR', range: '100 - 50K' },
        { name: 'FstPay-UPI', range: '500 - 50K' },
        { name: '77Pay - UPI x QR', range: '500 - 50K', bonus: '1%' },
        { name: 'CpuPay UPI x QR', range: '500 - 50K' },
        { name: 'AGPAY - UPI x QR', range: '300 - 50K' },
        { name: 'SpeedPay - UPI x QR', range: '100 - 50K' },
        { name: 'Umoney - UPI x QR', range: '100 - 2K' },
        { name: 'WorldPay - UPI x QR', range: '100 - 10K' },
        { name: 'NewNinePay-UPI', range: '300 - 50K' },
        { name: 'FlashPay - UPI x QR', range: '100 - 50K' },
        { name: 'OrigoPay - UPI x QR', range: '500 - 10K' },
    ];

     const context = useContext(MyContext);
    
      const { setfootershow} = context;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signup");
        }
    }, [navigate]);

      useEffect(() => {
        setfootershow("none");
      }, []);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';

    // ============ FETCH USER BALANCE ============
    useEffect(() => {
      const fetchUserBalance = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log("🔑 Token exists:", !!token);
          if (!token) return;

          const apiUrl = `${API_BASE_URL}api/user/Getuser`;
          console.log("🌐 Fetching from URL:", apiUrl);

          const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'auto-token': token 
            }
          });

          console.log("📡 Response status:", response.status);
          const data = await response.json();
          console.log("👤 User Balance Response:", data);
          if (data && data.userbalance !== undefined) {
            setUserBalance(data.userbalance);
          }
        } catch (error) {
          console.error("❌ Error fetching user balance:", error);
        }
      };

      fetchUserBalance();
    }, [API_BASE_URL]);

    const handleChannelSelect = (channelName) => {
        // Simply select the channel, don't create order
        setSelectedChannel(channelName);
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (value) {
            setAmount(value);
        }
    };

    const handleDeposit = async () => {
        const finalAmount = amount || customAmount;
        
        if (!selectedChannel) {
            alert('Please select a payment channel');
            return;
        }
        
        if (!finalAmount || isNaN(finalAmount) || finalAmount < 100) {
            alert('Please select or enter amount (minimum ₹100)');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}api/pay/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    amount: parseFloat(finalAmount),
                    paymentMethod: selectedMethod,
                    paymentChannel: selectedChannel,
                    status: 'pending'
                })
            });

            const data = await response.json();

            if (response.ok && data.order) {
                // Navigate to VerifyUTR page with order data
                navigate('/deposit/verify-utr', {
                    state: {
                        orderId: data.order._id,
                        amount: finalAmount,
                        method: selectedMethod,
                        channel: selectedChannel,
                        barcode: data.order.barcode || 'N/A'
                    }
                });
            } else {
                alert('Error creating order: ' + (data.error || data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };



    return (
       <>

        <link rel="stylesheet" href="./depostyle/page-wallet-Recharge-7c46403d.css" />
    <link rel="stylesheet" href="./depostyle/page-wallet-OtherPay-0370b97c.css" />  
    
<>

{/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-Championship-0dbc2b73.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-PointMall-e476b613.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" /> */}
  {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-GoogleVerify-5698c1af.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-SettingCenter-48faf3e2.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-index.vue_vue_type_script_setup_true_lang-d9204ab3.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-index.vue_vue_type_style_index_0_scoped_a78765c7_lang-fdb9c9a2.css" /> */}


  {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-OtherPay-0370b97c.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-Recharge-7c46403d.css" />
     */}
    
    
    </>

       <div data-v-36cc3380="" className="Recharge__box" style={{ "fontFamily": "'Roboto', 'Inter', sans-serif" }}>
            <div data-v-36cc3380="" className="Recharge__container">
                <div data-v-12a80a3e="" data-v-36cc3380="" className="navbar white">
                    <div data-v-12a80a3e="" className="navbar-fixed">
                        <div data-v-12a80a3e="" className="navbar__content">
                            <div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left" />
                            </div>
                            <div data-v-12a80a3e="" className="navbar__content-center">
                                <div data-v-12a80a3e="" className="navbar__content-title">Deposit</div>
                            </div>
                            <div data-v-12a80a3e="" className="navbar__content-right">
                                <div data-v-36cc3380="" className="title">Deposit history</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-v-98c90f53="" data-v-36cc3380="" className="balanceAssets">
                    <div data-v-98c90f53="" className="balanceAssets__header">
                        <div data-v-98c90f53="" className="balanceAssets__header__left"><img data-v-98c90f53="" src="https://damanclub.in/assets/png/balance-e39ce400.webp" /> Balance</div>
                    </div>
                    <div data-v-98c90f53="" className="balanceAssets__main">
                        <p data-v-98c90f53="">₹{parseFloat(userBalance || 0).toFixed(2)}</p><img data-v-98c90f53="" src="https://damanclub.in/assets/png/refresh-8e0efe26.webp" alt="" />
                    </div>
                </div>
                <div data-v-4f3d8608="">
                  
                    <div data-v-4f3d8608="" className="Recharge__container-tabcard">
                        {[
                            { name: 'UPI-QR', icon: 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20250513173810wh39.png', bonus: null },
                            { name: 'UPI x QR', icon: 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon2_20230808041006978u.png', bonus: '+1%' },
                            { name: 'E-Wallet', icon: 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20230824183241hlx2.png', bonus: '+1%' },
                            { name: 'Paytm x QR', icon: 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20230824184753jw3f.png', bonus: '+1%' },
                            { name: 'USDT-TRC20', icon: 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_2023080804094137ww.png', bonus: null },
                            { name: 'ARPay', icon: 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20250106111201vari.jpg', bonus: null },
                        ].map((method, idx) => (
                            <div 
                                key={idx}
                                data-v-4f3d8608="" 
                                className={`Recharge__container-tabcard__items ${selectedMethod === method.name ? 'active' : ''}`}
                                onClick={() => setSelectedMethod(method.name)}
                                style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                            >
                                <div data-v-4f3d8608="" className="centers">
                                    {method.bonus && <div data-v-4f3d8608="" className="gift"><span data-v-4f3d8608=""> {method.bonus} </span></div>}
                                    <div data-v-4f3d8608="" className="Recharge__container-tabcard__top"><img data-v-4f3d8608="" className="img" src={method.icon} alt={method.name} /></div>
                                    <div data-v-4f3d8608="" className="Recharge__container-tabcard__bot">{method.name}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div data-v-3e71d3da="" data-v-362d668a="" data-v-4f3d8608="" className="dialog inactive newDialog">
                    <div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
                        <div data-v-3e71d3da="" className="dialog__container-title">
                            <h1 data-v-3e71d3da="">Bind phone number</h1>
                        </div>
                        <div data-v-3e71d3da="" className="dialog__container-content">
                            <div data-v-50aa8bb0="" data-v-362d668a="" className="phoneInput__container">
                                <div data-v-50aa8bb0="" className="phoneInput__container-label"><svg data-v-50aa8bb0="" className="svg-icon icon-phone">
                                        <use href="#icon-phone" />
                                    </svg><span data-v-50aa8bb0="">Phone number</span></div>
                                <div data-v-50aa8bb0="" className="phoneInput__container-input">
                                    <div data-v-5067ef5e="" data-v-50aa8bb0="" className="dropdown">
                                        <div data-v-5067ef5e="" className="dropdown__value"><span data-v-5067ef5e="">+91</span><i data-v-5067ef5e="" className="van-badge__wrapper van-icon van-icon-arrow-down" />
                                        </div>
                                        <div data-v-5067ef5e="" className="dropdown__list">
                                            <div data-v-5067ef5e="" className="dropdown__list-item active"><span data-v-5067ef5e="">+91</span> India (भारत)</div>
                                        </div>
                                    </div><input data-v-50aa8bb0="" type="text" name="userNumber" placeHolder="Please enter the phone number" />
                                </div>
                            </div>
                            <div data-v-c17848a2="" data-v-362d668a="" className="verifyInput__container">
                                <div data-v-c17848a2="" className="verifyInput__container-label"><svg data-v-c17848a2="" className="svg-icon icon-verify">
                                        <use href="#icon-verify" />
                                    </svg><span data-v-c17848a2="">Verification Code</span></div>
                                <div data-v-c17848a2="" className="verifyInput__container-input"><input data-v-c17848a2="" type="text" placeHolder="Please enter the confirmation code" maxLength={6} /><button data-v-c17848a2="" className=""><span data-v-c17848a2="">Send</span></button></div>
                                <div data-v-c17848a2="" className="verifyInput__container-tip" style={{ display: "none" }}><i data-v-c17848a2="" className="van-badge__wrapper van-icon van-icon-warning-o" /><span data-v-c17848a2="">Did not receive verification code?</span><span data-v-c17848a2="">Contact customer service</span></div>
                            </div>
                        </div>
                        <div data-v-3e71d3da="" className="dialog__container-footer">
                            <div data-v-362d668a="" className="footer"><button data-v-362d668a="" className="sure">Confirm</button><button data-v-362d668a="" className="cancel">Cancel</button></div>
                        </div>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__outside" />
                </div>
                <div data-v-9e03166f="" className="Recharge__content">
                    <div data-v-9e03166f="" className="Recharge__content-quickInfo boxStyle">
                        <div data-v-9e03166f="" className="Recharge__content-quickInfo__title">
                            <div data-v-9e03166f="" className="title"><svg data-v-9e03166f="" className="svg-icon icon-quickpay2">
                                    <use href="#icon-quickpay2" />
                                </svg>
                                <p data-v-9e03166f="">Select channel</p>
                            </div>
                        </div>
                        <div data-v-9e03166f="" className="rechargeTypes_list">
                            {paymentChannels.map((channel, idx) => (
                                <div 
                                    key={idx}
                                    data-v-9e03166f="" 
                                    className={`Recharge__content-quickInfo__item ${selectedChannel === channel.name ? 'item_active' : ''}`}
                                    onClick={() => handleChannelSelect(channel.name)}
                                    style={{ cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', opacity: loading && selectedChannel !== channel.name ? 0.6 : 1 }}
                                >
                                    <div data-v-9e03166f="" className="other">
                                        <div data-v-9e03166f="">{channel.name}</div>
                                        <div data-v-9e03166f="">Balance:{channel.range}</div>
                                        {channel.bonus && <div data-v-9e03166f="" className="bouns">{channel.bonus} bonus</div>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>{ /* 孟加拉的转账类型选择 */ }{ /* 银行列表 */ }{ /* <div className="toActive" @click="goActive('wallet/recharge', 'RSN')" v-if="store.rsnInfo.walletActivationStatus === 0 && isRsnpay">
                                                             			{{$t('RNSActive')}}
                                                             		</div> */ }{ /* 充值金额选择 */ }
                    <div data-v-9e03166f="" className="Recharge__content-paymoney boxStyle">
                        <div data-v-9e03166f="" className="Recharge__content-paymoney__title"><svg data-v-9e03166f="" className="svg-icon icon-saveWallet">
                                <use href="#icon-saveWallet" />
                            </svg>
                            <p data-v-9e03166f="">Deposit amount</p>
                        </div>
                        <div data-v-9e03166f="" className="Recharge__content-paymoney__money-list">
                            {[200, 400, 500, 1000, 1200, 1500, 2000, 3000, 5000].map((amountValue, idx) => (
                                <div 
                                    key={idx}
                                    data-v-9e03166f="" 
                                    className={`Recharge__content-paymoney__money-list__item ${amount === amountValue.toString() ? 'active' : ''}`}
                                    onClick={() => setAmount(amountValue.toString())}
                                    style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                                >
                                    <div data-v-9e03166f="" className="amount">
                                        <span data-v-9e03166f="">₹</span> 
                                        {amountValue >= 1000 ? (amountValue / 1000) + 'K' : amountValue}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div data-v-9e03166f="" className="Recharge__content-paymoney__money-input">
                            <div data-v-9e03166f="" className="place-div">₹</div>
                            <div data-v-9e03166f="" className="van-cell van-field amount-input" modelmodifiers="[object Object]">
                                <div className="van-cell__value van-field__value">
                                    <div className="van-field__body">
                                        <input 
                                            type="tel" 
                                            inputMode="numeric" 
                                            id="van-field-1-input" 
                                            className="van-field__control" 
                                            placeholder="₹100.00 - ₹50,000.00" 
                                            autoComplete="new-password" 
                                            value={customAmount}
                                            onChange={handleCustomAmountChange}
                                            data-allow-mismatch="attribute" 
                                        />
                                    </div>
                                </div>
                            </div>
                            <div data-v-9e03166f="" className="place-right"><img data-v-9e03166f="" src="https://damanclub.in/assets/png/clean-82487515.webp" alt="" /></div>
                        </div>
                    </div>
                    <div data-v-9e03166f="" className="Recharge__content-waitPay boxStyle" style={{ display: "none" }}><img data-v-9e03166f="" src="https://damanclub.in/assets/png/tip-0498e3f9.webp" alt="" />
                        <div data-v-9e03166f="" className="wait_text">You have 1 unpaid order</div>
                        <div data-v-9e03166f="" className="go_pay">Go pay</div>
                    </div>
                    <div data-v-9e03166f="" className="Recharge__content-fixed">
                        <div data-v-9e03166f="" className="Recharge__content-fixed-box">
                            <div data-v-9e03166f="">
                                <p data-v-9e03166f="">Recharge Method:</p>
                                <h2 data-v-9e03166f="">{selectedMethod}</h2>
                                {(amount || customAmount) && (
                                    <p data-v-9e03166f="" style={{ fontSize: '14px', marginTop: '5px', color: '#666' }}>
                                        Amount: ₹{amount || customAmount}
                                    </p>
                                )}
                            </div>
                            <div 
                                data-v-9e03166f="" 
                                className="Recharge__container-rechageBtn"
                                onClick={handleDeposit}
                                disabled={loading}
                                style={{ 
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    opacity: loading ? 0.6 : 1,
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? 'Processing...' : 'Deposit'}
                            </div>
                        </div>
                    </div>
                </div>
                <div data-v-7cba6004="" data-v-36cc3380="" className="Recharge__container-intro">
                    <div data-v-7cba6004="" className="Recharge__container-intro__title">
                        <div data-v-7cba6004="" className="img"><svg data-v-7cba6004="" className="svg-icon icon-shuoming">
                                <use href="#icon-shuoming" />
                            </svg></div>
                        <p data-v-7cba6004="">Recharge instructions</p>
                    </div>
                    <div data-v-7cba6004="" className="Recharge__container-intro__lists">
                       
                        <div data-v-7cba6004="" className="item">
                            <p data-v-7cba6004="">If the transfer time is up, please fill out the deposit form again.
                            </p>
                            <p data-v-7cba6004="">The transfer amount must match the order you created, otherwise the
                                money cannot be credited successfully.</p>
                            <p data-v-7cba6004="">If you transfer the wrong amount, our company will not be responsible
                                htmlFor the lost amount!</p>
                            <p data-v-7cba6004="">Note: do not cancel the deposit order after the money has been
                                transferred.</p>
                        </div>
                    </div>
                </div>
                <div data-v-9f5f4114="" data-v-36cc3380="" className="record__main" payid="3">
                    <div data-v-9f5f4114="" className="record__main-title"><svg data-v-9f5f4114="" className="svg-icon icon-historyHead">
                            <use href="#icon-historyHead" />
                        </svg><span data-v-9f5f4114="">Deposit history</span></div>
                    <div data-v-f84b843f="" data-v-9f5f4114="" className="empty__container mgt40"><svg data-v-f84b843f="" className="svg-icon icon-empty">
                            <use href="#icon-empty" />
                        </svg>
                        <p data-v-f84b843f="">No data</p>
                    </div>
                </div>
            </div>



            <div data-v-3e71d3da="" data-v-36cc3380="" className="dialog inactive">
                <div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
                    <div data-v-3e71d3da="" className="dialog__container-img"><img data-v-3e71d3da="" className="" alt="" data-origin="https://damanclub.in/assets/png/tip-0498e3f9.webp" src="https://damanclub.in/assets/png/tip-0498e3f9.webp" /></div>
                    <div data-v-3e71d3da="" className="dialog__container-title">
                        <h1 data-v-3e71d3da="">Invalid amount</h1>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-content">
                        <div data-v-36cc3380="" className="cancen_model_cnt">Please select another amount</div>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-footer"><button data-v-3e71d3da="">OK</button><button data-v-3e71d3da="">Cancel</button></div>
                </div>
                <div data-v-3e71d3da="" className="dialog__outside" />
            </div>
            <div data-v-3e71d3da="" data-v-36cc3380="" className="dialog inactive">
                <div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
                    <div data-v-3e71d3da="" className="dialog__container-img"><img data-v-3e71d3da="" className="" alt="" data-origin="" src="https://damanclub.in/assets/png/avatar-2f23f3bd.webp" /></div>
                    <div data-v-3e71d3da="" className="dialog__container-title">
                        <h1 data-v-3e71d3da="">You have been disabled from C2C transactions for 0 hours</h1>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-content">
                        <div data-v-36cc3380="" className="forbidden_tip">0 hours remaining</div>
                        <div data-v-36cc3380="" className="forbidden1">Because your transactions failed 0 times in a row
                        </div>
                        <div data-v-36cc3380="" className="forbidden2">C2C recharge is prohibited within 0 hours</div>
                        <div data-v-36cc3380="" className="forbidden3">If you have any questions, please contact customer
                            service</div>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-footer"><button data-v-3e71d3da="">Sure</button></div>
                </div>
                <div data-v-3e71d3da="" className="dialog__outside" />
            </div>
            <div data-v-3e71d3da="" data-v-36cc3380="" className="dialog inactive">
                <div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
                    <div data-v-3e71d3da="" className="dialog__container-img"><img data-v-3e71d3da="" className="" alt="" data-origin="https://damanclub.in/assets/png/tip-0498e3f9.webp" src="https://damanclub.in/assets/png/tip-0498e3f9.webp" /></div>
                    <div data-v-3e71d3da="" className="dialog__container-title">
                        <h1 data-v-3e71d3da="">safety warning</h1>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-content">
                        <div data-v-36cc3380="" className="cancen_model_cnt">Please use your own PIX account to obtain the
                            order and QR code htmlFor recharge. Do not use the QR code provided by others to pay.</div>
                    </div>
                    <div data-v-3e71d3da="" className="dialog__container-footer"><button data-v-3e71d3da="">Confirm</button></div>
                </div>
                <div data-v-3e71d3da="" className="dialog__outside" />
            </div>
        </div>
       </>
    );
}

export default Deposit;
