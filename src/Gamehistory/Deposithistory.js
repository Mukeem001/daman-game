import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './gamehisstyle/page-wallet-RechargeHistory-087ac70f.css';

function Deposithistory() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [selectedChannel, setSelectedChannel] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');
    const [allChannels, setAllChannels] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
        return;
      }
      fetchDepositHistory(token);
    }, [navigate]);

    const fetchDepositHistory = async (token) => {
      try {
        setLoading(true);
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';
        
        const response = await fetch(`${API_BASE_URL}api/pay/user-orders`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Orders fetched:', data);
          const ordersList = data.orders || [];
          setOrders(ordersList);
          
          // Extract unique channels from orders
          const channels = [...new Set(ordersList.map(o => o.paymentChannel))];
          setAllChannels(channels);
        } else {
          console.error('Failed to fetch orders');
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching deposit history:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert('Order ID copied!');
      });
    };

    // Filter orders based on selected channel and date
    const filteredOrders = orders.filter(order => {
      const channelMatch = selectedChannel === 'all' || order.paymentChannel === selectedChannel;
      
      let dateMatch = true;
      if (selectedDate) {
        const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
        dateMatch = orderDate === selectedDate;
      }
      
      return channelMatch && dateMatch;
    });

    // Handle channel tab click
    const handleChannelClick = (channel) => {
      setSelectedChannel(channel);
    };

    // Handle date selection
    const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
    };

   

  

  

  return (


    <>
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-wallet-RechargeHistory-087ac70f.css" /> */}
  
<div data-v-f851bd18="" className="rechargeh__container" style={{ "fontFamily": "'Roboto', 'Inter', sans-serif" }}>
            <div data-v-12a80a3e="" data-v-f851bd18="" className="navbar white">
                <div data-v-12a80a3e="" className="navbar-fixed">
                    <div data-v-12a80a3e="" className="navbar__content">
                        <div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left" /></div>
                        <div data-v-12a80a3e="" className="navbar__content-center">
                            <div data-v-12a80a3e="" className="navbar__content-title">Deposit history</div>
                        </div>
                        <div data-v-12a80a3e="" className="navbar__content-right" />
                    </div>
                </div>
            </div>
            <div data-v-f851bd18="" className="rechargeh__header_box">
                <div data-v-f851bd18="" className="fun-tabs tabs" is-auto-load="true" activeclassname="tab_active">
                    <div className="fun-tabs__tab-list" style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", transitionDuration: "360ms", transform: "translate3d(0px, 0px, 0px)" }}>
                        <div className="fun-tab-item funtab_item" style={{ color: selectedChannel === 'all' ? "rgb(22, 119, 255)" : "#999", cursor: 'pointer' }} onClick={() => handleChannelClick('all')}>
                            <div className="fun-tab-item__wrap">
                                <div className="fun-tab-item__label">
                                    <div data-v-f851bd18="" className={`tab_item ${selectedChannel === 'all' ? 'tab_active' : ''}`}><svg data-v-f851bd18="" className="svg-icon icon-all">
                                            <use href="#icon-all" />
                                        </svg><span data-v-f851bd18="">All</span></div>
                                </div>
                            </div>
                        </div>
                        {allChannels.map((channel, index) => {
                            // Map channel names to icons (you can customize this based on your channels)
                            const channelIcons = {
                                'ArUpi Pay': 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20250513173810wh39.png',
                                'UPI x QR': 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_202308080410066jdc.png',
                                'E-Wallet': 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20230824183241hlx2.png',
                                'Paytm x QR': 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20230824184753jw3f.png',
                                'USDT': 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_2023080804094137ww.png',
                                'AR Pay': 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20250106111201vari.jpg'
                            };
                            
                            const icon = channelIcons[channel] || 'https://ossimg.envyenvelope.com/daman/payNameIcon/payNameIcon_20250513173810wh39.png';
                            
                            return (
                                <div key={channel} className="fun-tab-item funtab_item" style={{ color: selectedChannel === channel ? "rgb(22, 119, 255)" : "#999", cursor: 'pointer' }} onClick={() => handleChannelClick(channel)}>
                                    <div className="fun-tab-item__wrap">
                                        <div className="fun-tab-item__label">
                                            <div data-v-f851bd18="" className={`tab_item ${selectedChannel === channel ? 'tab_active' : ''}`}>
                                                <img data-v-f851bd18="" src={icon} alt="" />
                                                <span data-v-f851bd18="">{channel}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="fun-tabs__active-line" style={{ transition: "300ms", width: 0, height: 3, transform: "translate3d(53.5px, 0px, 0px)", backgroundColor: "rgb(22, 119, 255)" }}>
                        </div>
                    </div>
                </div>
                <div data-v-f851bd18="" className="query_select">
                    <div data-v-f851bd18="" className="ar-searchbar__selector">
                        <div data-v-f851bd18="" className="selectorA" style={{ cursor: 'pointer' }}>
                            <span data-v-f851bd18="" className="ar-searchbar__selector-default">{selectedChannel === 'all' ? 'All' : selectedChannel}</span>
                            <i data-v-f851bd18="" className="van-badge__wrapper van-icon van-icon-arrow-down" />
                        </div>
                    </div>
                    <div className="ar-searchbar__selector">
                        <input 
                            type="date" 
                            className="noSelect" 
                            value={selectedDate} 
                            onChange={handleDateChange}
                            style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>
            <div data-v-61888f52="" data-v-f851bd18="" className="infiniteScroll" id="refresh8a0cae71dcee4c1cb05cfc0e8b14a74e">
                <div data-v-f851bd18="" className="rechargeh__container-content">
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <p>Loading deposit history...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>
                            <p>No deposits found</p>
                        </div>
                    ) : (
                        filteredOrders.map((order, index) => {
                            const statusClass = order.status === 'failed' || order.status === 'rejected' ? 'fail' : order.status === 'pending' ? 'recharge' : 'recharge';
                            const statusText = {
                                'pending': 'To Be Paid',
                                'utr_submitted': 'UTR Submitted',
                                'approved': 'Approved',
                                'failed': 'Failed',
                                'rejected': 'Failed'
                            }[order.status] || 'To Be Paid';

                            const formattedDate = new Date(order.createdAt).toLocaleString('en-IN');

                            return (
                                <div key={order._id} data-v-f851bd18="" className="rechargeh__container-content__item">
                                    <div data-v-f851bd18="" className="rechargeh__container-content__item-header">
                                        <span data-v-f851bd18="" className="recharge_tit">Deposit</span>
                                        <div data-v-f851bd18="" className={`recharge_right ${statusClass}`}>
                                            {statusText}
                                        </div>
                                    </div>
                                    <div data-v-f851bd18="" role="separator" className="van-divider van-divider--hairline divier"></div>
                                    <div data-v-f851bd18="" className="rechargeh__container-content__item-body">
                                        <div data-v-f851bd18="">
                                            <span data-v-f851bd18="">Balance</span>
                                            <span data-v-f851bd18="" className="price">₹{order.amount.toFixed(2)}</span>
                                        </div>
                                        <div data-v-f851bd18="">
                                            <span data-v-f851bd18="">Type</span>
                                            <span data-v-f851bd18="">{order.paymentMethod} - {order.paymentChannel}</span>
                                        </div>
                                        <div data-v-f851bd18="">
                                            <span data-v-f851bd18="">Time</span>
                                            <span data-v-f851bd18="">{formattedDate}</span>
                                        </div>
                                        <div data-v-f851bd18="">
                                            <span data-v-f851bd18="">Order number</span>
                                            <div data-v-f851bd18="" className="order">
                                                <span data-v-f851bd18="">{order._id}</span>
                                                <svg data-v-f851bd18="" className="svg-icon icon-copy" onClick={() => copyToClipboard(order._id)} style={{ cursor: 'pointer' }}>
                                                    <use href="#icon-copy" />
                                                </svg>
                                            </div>
                                        </div>
                                        {order.utrNumber && (
                                            <div data-v-f851bd18="">
                                                <span data-v-f851bd18="">UTR Number</span>
                                                <span data-v-f851bd18="">{order.utrNumber}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div data-v-f851bd18="" className="report">Submit Receipt</div>
                                </div>
                            );
                        })
                    )}
                </div>
                <div data-v-61888f52="" className="infiniteScroll__loading">
                    <div data-v-61888f52="">No more</div>
                </div>
            </div>
        </div>

        </>
    
  )
}

export default Deposithistory
