import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Withdrawhistory() {

    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('all');
    const [withdrawHistory, setWithdrawHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
      } else {
        fetchWithdrawHistory(token);
      }
    }, [navigate, selectedTab]);

    const fetchWithdrawHistory = async (token) => {
      setLoading(true);
      setMessage('');
      try {
        const response = await fetch(`${API_BASE_URL}api/withdraw/history`, {
          method: 'GET',
           headers: { 
            'Content-Type': 'application/json',
            'auto-token': token 
          }
        });

        const data = await response.json();
        console.log("🎯 Withdrawal History Response:", data);

        if (data.success && Array.isArray(data.withdrawals)) {
          let filtered = data.withdrawals;

          // Filter by method based on selected tab
          if (selectedTab !== 'all') {
            const methodMap = {
              'arpay': 'arpay',
              'bank': 'bank_card',
              'upi': 'upi',
              'usdt': 'usdt'
            };
            const methodFilter = methodMap[selectedTab];
            filtered = data.withdrawals.filter(w => w.method === methodFilter);
          }

          console.log("📊 Filtered Withdrawals:", filtered);
          setWithdrawHistory(filtered);
        } else {
          setMessage(data.error || 'Failed to fetch withdrawal history');
        }
      } catch (error) {
        console.error("❌ Error fetching withdrawal history:", error);
        setMessage('Error fetching withdrawal history');
      } finally {
        setLoading(false);
      }
    };

    const getMethodLabel = (method) => {
      const labels = {
        'arpay': 'ARPay',
        'bank_card': 'BANK CARD',
        'upi': 'UPI',
        'usdt': 'USDT'
      };
      return labels[method] || method;
    };

    const getStatusClass = (status) => {
      const statusMap = {
        'completed': 'stateG',
        'approved': 'stateG',
        'pending': 'stateY',
        'rejected': 'stateR'
      };
      return statusMap[status] || '';
    };

    const getStatusLabel = (status) => {
      const labels = {
        'completed': 'Completed',
        'approved': 'Approved',
        'pending': 'Pending',
        'rejected': 'Rejected'
      };
      return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).replace(/,/g, '');
    };

  return (
    <>

<link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-WithdrawHistory-f3ead95e.css" />


    <div data-v-e4760c44="" className="rechargeh__container"
			style={{'--f13b4d11-currentFontFamily': "'Roboto', 'Inter', sans-serif"}}>
			<div data-v-12a80a3e="" data-v-e4760c44="" className="navbar white">
				<div data-v-12a80a3e="" className="navbar-fixed">
					<div data-v-12a80a3e="" className="navbar__content">
						<div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e=""
								className="van-badge__wrapper van-icon van-icon-arrow-left"></i></div>
						<div data-v-12a80a3e="" className="navbar__content-center">
							<div data-v-12a80a3e="" className="navbar__content-title">Withdrawal history</div>
						</div>
						<div data-v-12a80a3e="" className="navbar__content-right"></div>
					</div>
				</div>
			</div>
			<div data-v-e4760c44="" className="rechargeh__container_header">
				<div data-v-e4760c44="" className="van-tabs van-tabs--card onlineGames__container-tabBar">
					<div className="van-tabs__wrap">
						<div role="tablist" className="van-tabs__nav van-tabs__nav--card van-tabs__nav--complete"
							aria-orientation="horizontal">
							<div 
								onClick={() => setSelectedTab('all')}
								id="van-tabs-1-0" 
								role="tab"
								className={`van-tab van-tab--card van-tab--grow ${selectedTab === 'all' ? 'van-tab--active' : ''}`} 
								tabIndex={selectedTab === 'all' ? "0" : "-1"}
								aria-selected={selectedTab === 'all'}
								aria-controls="van-tab-2" 
								data-allow-mismatch="attribute"
								style={{cursor: 'pointer'}}
							>
								<span className="van-tab__text">
									<div data-v-e4760c44="" className="tabDiv"><svg data-v-e4760c44=""
											className="svg-icon icon-all">
												<use xlinkHref="#icon-all"></use>
										</svg> All</div>
								</span>
							</div>
							<div 
								onClick={() => setSelectedTab('arpay')}
								id="van-tabs-1-1" 
								role="tab" 
								className={`van-tab van-tab--card van-tab--grow ${selectedTab === 'arpay' ? 'van-tab--active' : ''}`} 
								tabIndex={selectedTab === 'arpay' ? "0" : "-1"}
								aria-selected={selectedTab === 'arpay'}
								aria-controls="van-tab-3" 
								data-allow-mismatch="attribute"
								style={{cursor: 'pointer'}}
							>
								<span className="van-tab__text">
									<div data-v-e4760c44="" className="tabDiv"><img data-v-e4760c44=""
											src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_20260413231759vmno.png"/>
										ARPay</div>
								</span>
							</div>
							<div 
								onClick={() => setSelectedTab('bank')}
								id="van-tabs-1-2" 
								role="tab" 
								className={`van-tab van-tab--card van-tab--grow ${selectedTab === 'bank' ? 'van-tab--active' : ''}`} 
								tabIndex={selectedTab === 'bank' ? "0" : "-1"}
								aria-selected={selectedTab === 'bank'}
								aria-controls="van-tab-4" 
								data-allow-mismatch="attribute"
								style={{cursor: 'pointer'}}
							>
								<span className="van-tab__text">
									<div data-v-e4760c44="" className="tabDiv"><img data-v-e4760c44=""
											src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_202309141300357sjg.png"/>
										BANK CARD</div>
								</span>
							</div>
							<div 
								onClick={() => setSelectedTab('upi')}
								id="van-tabs-1-3" 
								role="tab" 
								className={`van-tab van-tab--card van-tab--grow ${selectedTab === 'upi' ? 'van-tab--active' : ''}`} 
								tabIndex={selectedTab === 'upi' ? "0" : "-1"}
								aria-selected={selectedTab === 'upi'}
								aria-controls="van-tab-5" 
								data-allow-mismatch="attribute"
								style={{cursor: 'pointer'}}
							>
								<span className="van-tab__text">
									<div data-v-e4760c44="" className="tabDiv"><img data-v-e4760c44=""
											src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_20250927154559c19q.jpg"/>
										UPI</div>
								</span>
							</div>
							<div 
								onClick={() => setSelectedTab('usdt')}
								id="van-tabs-1-4" 
								role="tab" 
								className={`van-tab van-tab--card van-tab--grow ${selectedTab === 'usdt' ? 'van-tab--active' : ''}`} 
								tabIndex={selectedTab === 'usdt' ? "0" : "-1"}
								aria-selected={selectedTab === 'usdt'}
								aria-controls="van-tab-6" 
								data-allow-mismatch="attribute"
								style={{cursor: 'pointer'}}
							>
								<span className="van-tab__text">
									<div data-v-e4760c44="" className="tabDiv"><img data-v-e4760c44=""
											src="https://ossimg.envyenvelope.com/daman/payNameIcon/WithBeforeImgIcon_20230914130048fq13.png"/>
										USDT</div>
								</span>
							</div>
						</div>
					</div>
					<div className="van-tabs__content"></div>
				</div>
				<div data-v-e4760c44="" className="ar">
					<div data-v-e4760c44="" className="ar-searchbar">
						<div data-v-fa757a88="" data-v-e4760c44="" className="ar-searchbar__selector">
							<div data-v-fa757a88=""><span data-v-fa757a88=""
									className="ar-searchbar__selector-default">All</span><i data-v-fa757a88=""
									className="van-badge__wrapper van-icon van-icon-arrow-down"></i>
							</div>
						</div>
						<div className="ar-searchbar__selector">
							<div><span className="noSelect">Choose a date</span><i
									className="van-badge__wrapper van-icon van-icon-arrow-down"></i>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<div data-v-cbab7763="" data-v-e4760c44="" className="infiniteScroll"
				id="refreshc1e840383bf54c33934d77771c85dd92">
				<div data-v-e4760c44="" className="rechargeh__container-content">
					{message && (
						<div style={{ textAlign: 'center', padding: '20px', color: '#ff6b6b' }}>
							{message}
						</div>
					)}
					{loading ? (
						<div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
							Loading...
						</div>
					) : withdrawHistory.length === 0 ? (
						<div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>
							No withdrawal history found
						</div>
					) : (
						withdrawHistory.map((withdrawal, index) => (
							<div key={withdrawal._id || index} data-v-e4760c44="" className="rechargeh__container-content__item">
								<div data-v-e4760c44="" className="rechargeh__container-content__item-header ar-1px-b">
									<span data-v-e4760c44="">Withdraw</span>
									<span data-v-e4760c44="" className={getStatusClass(withdrawal.status)}>
										{getStatusLabel(withdrawal.status)}
									</span>
								</div>
								<div data-v-e4760c44="" className="rechargeh__container-content__item-body">
									<div data-v-e4760c44="">
										<span data-v-e4760c44="">Balance</span>
										<span data-v-e4760c44="">₹{parseFloat(withdrawal.amount || 0).toFixed(2)}</span>
									</div>
									<div data-v-e4760c44="">
										<span data-v-e4760c44="">Type</span>
										<span data-v-e4760c44="">{getMethodLabel(withdrawal.method)}</span>
									</div>
									<div data-v-e4760c44="">
										<span data-v-e4760c44="">Time</span>
										<span data-v-e4760c44="">{formatDate(withdrawal.createdAt)}</span>
									</div>
									<div data-v-e4760c44="">
										<span data-v-e4760c44="">Order number</span>
										<span data-v-e4760c44="">{withdrawal._id || '-'}</span>
										<svg data-v-e4760c44="" className="svg-icon icon-copy" style={{cursor: 'pointer'}}>
											<use xlinkHref="#icon-copy"></use>
										</svg>
									</div>
									<div data-v-e4760c44="">
										<span data-v-e4760c44="">Remarks</span>
									</div>
									<div data-v-e4760c44="">
										<textarea
											data-v-e4760c44="" 
											className="textarea" 
											name="remark" 
											cols="30" 
											rows="10" 
											readOnly
											defaultValue={withdrawal.notes || ''}
											style={{display: 'none'}}
										></textarea>
									</div>
								</div>
							</div>
						))
					)}
				</div>
				<div data-v-cbab7763="" className="infiniteScroll__loading">
					<div data-v-cbab7763="">No more</div>
				</div>
			</div>
		</div>
   
    </>
  )
}

export default Withdrawhistory
