import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';

import './wistyle/page-wallet-Withdraw-fdc3993e.css';

function Withdraw() {
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const [selectedMethod, setSelectedMethod] = useState('upi');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [userBalance, setUserBalance] = useState(0);
    const [withdrawalHistory, setWithdrawalHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
        return;
      }
      fetchUserBalance(token);
      fetchWithdrawalHistory(token);
    }, [navigate]);

    const fetchUserBalance = async (token) => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';
        const response = await fetch(`${API_BASE_URL}api/user/Getuser`, {
          headers: { 
            'Content-Type': 'application/json',
            'auto-token': token 
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUserBalance(data.userbalance || 0);
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    const fetchWithdrawalHistory = async (token) => {
      try {
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';
        const response = await fetch(`${API_BASE_URL}api/withdraw/history`, {
          headers: { 
            'Content-Type': 'application/json',
            'auto-token': token 
          }
        });
        if (response.ok) {
          const data = await response.json();
          setWithdrawalHistory(data.withdrawals || []);
        }
      } catch (error) {
        console.error('Error fetching withdrawal history:', error);
      }
    };

    const handleMethodSelect = (method) => {
      setSelectedMethod(method);
      setMessage('');
    };

    const handleWithdraw = async () => {
      const amount = parseFloat(withdrawAmount);

      if (!withdrawAmount || isNaN(amount)) {
        setMessage('❌ Please enter valid amount');
        return;
      }

      if (!selectedMethod) {
        setMessage('❌ Please select a withdrawal method');
        return;
      }

      if (amount < 100) {
        setMessage('❌ Minimum withdrawal amount is ₹100');
        return;
      }

      if (amount > 30000) {
        setMessage('❌ Maximum withdrawal amount is ₹30,000');
        return;
      }

      if (amount > userBalance) {
        setMessage('❌ Insufficient balance');
        return;
      }

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';

        console.log('Sending withdrawal request:', { amount, method: selectedMethod });

        const response = await fetch(`${API_BASE_URL}api/withdraw/request`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auto-token': token
          },
          body: JSON.stringify({
            amount: amount,
            method: selectedMethod
          })
        });

        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);

        if (response.ok) {
          setMessage('✅ Withdrawal request submitted successfully!');
          setWithdrawAmount('');
          // Balance is updated by backend
          if (data.userBalance !== undefined) {
            setUserBalance(data.userBalance);
          }
          setTimeout(() => fetchWithdrawalHistory(token), 1000);
        } else {
          if (data.error && data.error.includes('beneficiary')) {
            setMessage('❌ Please add a beneficiary first before withdrawing!');
          } else {
            setMessage(`❌ ${data.error || data.message || 'Failed to submit withdrawal request'}`);
          }
        }
      } catch (error) {
        console.error('Error submitting withdrawal:', error);
        setMessage('❌ Error submitting withdrawal request');
      } finally {
        setLoading(false);
      }
    };

    const handleAddBeneficiary = () => {
      localStorage.setItem('selectedWithdrawMethod', selectedMethod);
      navigate('/add-beneficiary');
    };

    const {usebalance} = context;

    // Helper function to format date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/\//g, '-');
    };

    // Helper function to display method name
    const getMethodName = (method) => {
      const methodMap = {
        'upi': 'UPI',
        'bank_card': 'Bank Card',
        'arpay': 'ARPay',
        'usdt': 'USDT'
      };
      return methodMap[method] || method;
    };

    // Helper function to get status color
    const getStatusClass = (status) => {
      const statusMap = {
        'completed': 'stateG',
        'pending': 'stateY',
        'approved': 'stateG',
        'rejected': 'stateR'
      };
      return statusMap[status] || 'stateG';
    };

  return (
    <>

    <>
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-OtherPay-0370b97c.css" />
	<link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-Recharge-7c46403d.css" />
	<link rel="stylesheet" href="https://damanclub.in/assets/css/page-test-index.vue_vue_type_script_setup_true_lang-3cbdbbc4.css" />
	<link rel="stylesheet" href="https://damanclub.in/assets/css/page-promotion-MyInvitation-66710573.css" /> */}
    
	{/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-Withdraw-fdc3993e.css" /> */}


	{/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-RechargeHistory-087ac70f.css" /> */}
	{/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-WithdrawHistory-f3ead95e.css" /> */}
    
    
    </>
    
   <div data-v-80a607a5="" className="withdraw__container" style={{"FontFamily": "'Roboto', 'Inter', sans-serif" }}>
			<div data-v-12a80a3e="" data-v-80a607a5="" className="navbar">
				<div data-v-12a80a3e="" className="navbar-fixed">
					<div data-v-12a80a3e="" className="navbar__content">
						<div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left" /></div>
						<div data-v-12a80a3e="" className="navbar__content-center">
							<div data-v-12a80a3e="" className="navbar__content-title">Withdraw</div>
						</div>
						<div data-v-12a80a3e="" className="navbar__content-right"><span data-v-80a607a5="">Withdrawal
								history</span></div>
					</div>
				</div>
			</div>
			<div data-v-80a607a5="" className="withdraw__container-content">
				<div data-v-0879c174="" data-v-80a607a5="" className="balanceAssets">
					<div data-v-0879c174="" className="balanceAssets__header">
						<div data-v-0879c174="" className="balanceAssets__header__left"><img data-v-0879c174="" src="https://damanclub.in/assets/png/balance-e39ce400.webp" /> Available
							balance</div>
					</div>
					<div data-v-0879c174="" className="balanceAssets__main">
							<p data-v-0879c174="">₹{userBalance.toFixed(2)}</p><img data-v-0879c174="" src="https://damanclub.in/assets/png/refresh-8e0efe26.webp" alt="" style={{cursor: 'pointer'}} onClick={() => { const token = localStorage.getItem("token"); token && fetchUserBalance(token); }} />
					</div>
				</div>
				<div data-v-9bae072d="" data-v-80a607a5="" className="withdrawWay">
				<div data-v-9bae072d="" className={`c2c Ar ${selectedMethod === 'arpay' ? 'select' : ''}`}  style={{"top": "-0.06667rem", cursor: 'pointer'}} onClick={() => handleMethodSelect('arpay')}><img data-v-9bae072d="" src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_20260413231759vmno.png" />
					<div data-v-9bae072d="">
						<div data-v-9bae072d="">ARPay</div>
						<p data-v-9bae072d="">Supports UPI for fast payment, and bonuses for withdrawals</p>
					</div>
				</div>
				<div data-v-9bae072d="" className={selectedMethod === 'bank_card' ? 'select' : ''} style={{cursor: 'pointer'}} onClick={() => handleMethodSelect('bank_card')}>
					<div data-v-9bae072d=""><img data-v-9bae072d="" src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_202309141300357sjg.png" />
					</div><span data-v-9bae072d=""> BANK CARD</span>
				</div>
				<div data-v-9bae072d="" className={selectedMethod === 'upi' ? 'select' : ''} style={{cursor: 'pointer'}} onClick={() => handleMethodSelect('upi')}>
					<div data-v-9bae072d=""><img data-v-9bae072d="" src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon2_20250927154559f8cv.jpg" />
					</div><span data-v-9bae072d="">UPI</span>
				</div>
				<div data-v-9bae072d="" className={selectedMethod === 'usdt' ? 'select' : ''} style={{cursor: 'pointer'}} onClick={() => handleMethodSelect('usdt')}>
					<div data-v-9bae072d=""><img data-v-9bae072d="" src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_20230914130048fq13.png" />
					</div><span data-v-9bae072d="">USDT</span>
				</div>
			</div>
			<div data-v-fe54ed07="" data-v-80a607a5="" className="c2cUpi noUpi" style={{cursor: 'pointer'}} onClick={handleAddBeneficiary}>Add UPI</div>
				<div data-v-ef5c8333="" data-v-80a607a5="" className="addWithdrawType" style={{ display: "none" }}>
					<div data-v-ef5c8333="" className="addWithdrawType-top"><img data-v-ef5c8333="" src="https://damanclub.in/assets/png/add-1ad7f3f5.webp" /><span data-v-ef5c8333="">Add
							UPI</span></div>
					<div data-v-ef5c8333="" className="addWithdrawType-text">Need to add beneficiary information to be able
						to withdraw money</div>
				</div>
				<div data-v-cb5583fe="" className="explain" style={{}}>
					<div data-v-cb5583fe="" className="input">
						<div data-v-cb5583fe="" className="place-div">₹</div><input data-v-cb5583fe="" placeholder="Please enter the amount" className="inp" type="number" value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} />
					</div>
					<div data-v-cb5583fe="" className="balance bank">
						<div data-v-cb5583fe=""><span data-v-cb5583fe="">Withdrawable balance <h6 data-v-cb5583fe="" className="yellow">₹{userBalance.toFixed(2)}</h6></span><input data-v-cb5583fe="" type="button" value="All" onClick={() => setWithdrawAmount(userBalance.toString())} /></div>
						<div data-v-cb5583fe=""><span data-v-cb5583fe="">Withdrawal amount received</span>
							<div data-v-cb5583fe="" className="rightD"><span data-v-cb5583fe="" className="yellow">₹{(withdrawAmount ? parseFloat(withdrawAmount) : 0).toFixed(2)}</span>
							</div>
						</div>
					</div>
				</div>
				<div data-v-cb5583fe="" className="explain usdt" style={{ display: "none" }}>
					<div data-v-cb5583fe="" className="head"><img data-v-cb5583fe="" src="" /></div>
					<div data-v-cb5583fe="" className="input">
						<div data-v-cb5583fe="" className="place-div">₹</div><input data-v-cb5583fe="" type="number" placeHolder="Please enter withdrawal amount" className="inp" />
					</div>
					<div data-v-cb5583fe="" className="balance usdt">
						<div data-v-cb5583fe=""><span data-v-cb5583fe="">Withdrawable balance <h6 data-v-cb5583fe="" className="yellow">₹18.83</h6></span><input data-v-cb5583fe="" type="button" value="All" /></div>
					</div>
				</div>
			<div data-v-80a607a5="" className="recycleBtnD" style={{marginTop: '20px', padding: '10px', position: 'relative', zIndex: 999, pointerEvents: 'auto'}}>
				<button 
					data-v-80a607a5="" 
					className="recycleBtn" 
					onClick={handleWithdraw} 
					disabled={loading} 
					style={{
						width: '100%', 
						padding: '14px 20px', 
						fontSize: '16px', 
						fontWeight: '600', 
						border: 'none', 
						borderRadius: '6px', 
						backgroundColor: loading ? '#ccc' : '#667eea', 
						color: 'white', 
						cursor: loading ? 'not-allowed' : 'pointer', 
						transition: 'all 0.3s ease',
						pointerEvents: 'auto',
						opacity: loading ? 0.7 : 1,
						boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)'
					}}
				>
					{loading ? '⏳ Processing...' : '💳 Withdraw'}
				</button>
			</div>
				{message && <div style={{padding: '14px 12px', textAlign: 'center', marginTop: '15px', fontSize: '15px', fontWeight: '500', color: message.includes('✅') ? '#28a745' : '#f44336', backgroundColor: message.includes('✅') ? '#d4edda' : '#f8d7da', border: `2px solid ${message.includes('✅') ? '#28a745' : '#f44336'}`, borderRadius: '6px'}}>{message}</div>}
				<div data-v-76eb7f31="" data-v-80a607a5="" className="Recharge__container-intro">
					<div data-v-76eb7f31="" className="br">
						<p data-v-76eb7f31="">Need to bet <span data-v-470caa86="" className="red">₹0.00</span> to be able
							to withdraw</p>
						<p data-v-76eb7f31="">Withdraw time <span data-v-76eb7f31="" className="red">00:00-23:55</span></p>
						<p data-v-76eb7f31="">Inday Remaining Withdrawal Times<span data-v-76eb7f31="" className="red">3</span></p>
						<p data-v-76eb7f31="">Withdrawal amount range <span data-v-76eb7f31="" className="red">₹100.00-₹30,000.00</span></p>
						<p data-v-76eb7f31="">Please confirm your beneficial account information before withdrawing. If
							your inhtmlFormation is incorrect, our company will not be liable for the amount of loss</p>
						<p data-v-76eb7f31="">If your beneficial information is incorrect, please contact customer
							service</p>
					</div>
				</div>
				<div data-v-30972a14="" className="rechargeh__container">
					<div data-v-30972a14="" className="rechargeh__container-head"><svg data-v-30972a14="" className="svg-icon icon-historyHead">
							<use href="#icon-historyHead" />
						</svg>
						<h1 data-v-30972a14="">Withdrawal history</h1>
					</div>
					<div data-v-30972a14="" className="rechargeh__container-content">
						{withdrawalHistory && withdrawalHistory.length > 0 ? (
							withdrawalHistory.map((withdrawal, index) => (
								<div key={withdrawal._id || index} data-v-30972a14="" className="rechargeh__container-content__item">
									<div data-v-30972a14="" className="rechargeh__container-content__item-header ar-1px-b">
										<span data-v-30972a14="">Withdraw</span>
										<span data-v-30972a14="" className={getStatusClass(withdrawal.status)}>
											{withdrawal.status ? withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1) : 'Pending'}
										</span>
									</div>
									<div data-v-30972a14="" className="rechargeh__container-content__item-body">
										<div data-v-30972a14="">
											<span data-v-30972a14="">Balance</span>
											<span data-v-30972a14="">₹{withdrawal.amount ? withdrawal.amount.toFixed(2) : '0.00'}</span>
										</div>
										<div data-v-30972a14="">
											<span data-v-30972a14="">Type</span>
											<span data-v-30972a14="">{getMethodName(withdrawal.method)}</span>
										</div>
										<div data-v-30972a14="">
											<span data-v-30972a14="">Time</span>
											<span data-v-30972a14="">{formatDate(withdrawal.createdAt)}</span>
										</div>
										<div data-v-30972a14="">
											<span data-v-30972a14="">Order number</span>
											<span data-v-30972a14="">{withdrawal._id}</span>
											<svg data-v-30972a14="" className="svg-icon icon-copy">
												<use href="#icon-copy" />
											</svg>
										</div>
									</div>
								</div>
							))
						) : (
							<div style={{padding: '20px', textAlign: 'center', color: '#999'}}>
								<p>No withdrawal history yet</p>
							</div>
						)}
					</div>
					<div data-v-30972a14="" className="rechargeh__container-footer"><button data-v-30972a14="">All
							history</button></div>
				</div>
			</div>
		<div data-v-3e71d3da="" data-v-80a607a5="" className="dialog inactive c2c" style={{pointerEvents: 'none', display: 'none'}}>
				<div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
					<div data-v-3e71d3da="" className="dialog__container-img"><img data-v-80a607a5="" className="succeedImg" data-origin="https://damanclub.in/assets/png/succeed-83674414.webp" src="https://damanclub.in/assets/png/succeed-83674414.webp" /></div>
					<div data-v-3e71d3da="" className="dialog__container-title">
						<h1 data-v-3e71d3da="">C2C withdrawal successful</h1>
					</div>
					<div data-v-3e71d3da="" className="dialog__container-content">
						<div data-v-80a607a5="" className="c2cTip">
							<h1 data-v-80a607a5="">Please come back and click [Confirm Payment] after receiving the
								transfer</h1>
							<p data-v-80a607a5="">C2C withdrawal rewards will be automatically issued after you click
								<span>[Confirm Arrival]</span>!
							</p>
						</div>
					</div>
					<div data-v-3e71d3da="" className="dialog__container-footer"><button data-v-3e71d3da="">Confirm</button></div>
				</div>
				<div data-v-3e71d3da="" className="dialog__outside" />
			</div>
		<div data-v-3e71d3da="" data-v-80a607a5="" className="dialog inactive" style={{pointerEvents: 'none', display: 'none'}}>
				<div data-v-3e71d3da="" className="dialog__container" role="dialog" tabIndex={0}>
					<div data-v-3e71d3da="" className="dialog__container-img"><img data-v-3e71d3da="" className="" alt="" data-origin="https://damanclub.in/assets/png/tip-0498e3f9.webp" src="https://damanclub.in/assets/png/tip-0498e3f9.webp" /></div>
					<div data-v-3e71d3da="" className="dialog__container-title">
						<h1 data-v-3e71d3da="" />
					</div>
					<div data-v-3e71d3da="" className="dialog__container-content">
						<h1 data-v-80a607a5="">You must recharge to enable the withdrawal function</h1>
					</div>
					<div data-v-3e71d3da="" className="dialog__container-footer"><button data-v-3e71d3da="">Confirm</button></div><img data-v-3e71d3da="" className="close_img" src="https://damanclub.in/assets/png/close-84ce5e6a.webp" />
				</div>
				<div data-v-3e71d3da="" className="dialog__outside" />
			</div>
		</div>
    
    </>
  )
}

export default Withdraw
