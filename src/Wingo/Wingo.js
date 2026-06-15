import React, { useContext, useEffect, useState } from "react";

import { MyContext } from "../Context/MyContext";

import { useNavigate } from "react-router-dom";
import config from "../config/config";

import './wingostyle/common-7beda9ad.css';
import './wingostyle/page-saasLottery-D5-023805f7.css';
import './wingostyle/index-c366ba19.css';
import './wingostyle/page-saasLottery-SaasChangLong-927d0303.css';


function Wingo() {
  const context = useContext(MyContext);

  const { setfootershow, formattedTime, timeid, historyi, userbethistory, myhistory, setmyhistory, games, setgames } =
    context;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signup");
    }
  }, [navigate]);


  useEffect(() => {
    setfootershow("none");
  }, []);

  // ============ FETCH USER BALANCE ============
  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const apiUrl = `${process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/'}api/user/Getuser`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: { 
            'Content-Type': 'application/json',
            'auto-token': token 
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.userbalance !== undefined) {
            setUserBalance(data.userbalance);
          }
        }
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchUserBalance();
  }, []);

  // ============ TIMER DISPLAY CONFIG ============
  const timerConfig = {
    '30sec': { label: 'WinGo 30sec', seconds: 30 },
    '1min': { label: 'WinGo 1 Min', seconds: 60 },
    '3min': { label: 'WinGo 3 Min', seconds: 180 },
    '5min': { label: 'WinGo 5 Min', seconds: 300 }
  };

  const timerApiConfig = {
    '30sec': {
      historyGetItems: '/api/history30sec/getwingoitems',
    },
    '1min': {
      historyGetItems: config.ENDPOINTS.HISTORY_GET_ITEMS,
    },
    '3min': {
      historyGetItems: '/api/history3min/getwingoitems',
    },
    '5min': {
      historyGetItems: '/api/history5min/getwingoitems',
    },
  };

  const getHistoryEndpoint = () => timerApiConfig[activeTimer]?.historyGetItems || config.ENDPOINTS.HISTORY_GET_ITEMS;

  // ============ ACTIVE TIMER STATE WITH LOCALSTORAGE ============
  const [activeTimer, setActiveTimer] = useState(() => {
    return localStorage.getItem('activeTimer') || '30sec';
  });

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [waitingForResult, setWaitingForResult] = useState(false);
  const [userBalance, setUserBalance] = useState(0);

  // ============ CALCULATE REMAINING SECONDS FROM REAL TIME ============
  const calculateRemainingSeconds = () => {
    const timerStartTime = localStorage.getItem('timerStartTime');

    if (!timerStartTime) {
      return timerConfig[activeTimer].seconds;
    }

    const elapsed = Math.floor((Date.now() - parseInt(timerStartTime)) / 1000);
    const totalSeconds = timerConfig[activeTimer].seconds;
    const remaining = totalSeconds - (elapsed % totalSeconds);

    return remaining > 0 ? remaining : totalSeconds;
  };

  const handleTimerClick = (timerType) => {
    setActiveTimer(timerType);
    localStorage.setItem('activeTimer', timerType);
    setgames(timerType); // Update game type in context
    // Timer continues running - don't reset timer
  };

  const getTimerImageSrc = (timerType) => {
    return activeTimer === timerType
      ? "https://damanclub.in/assets/png/time_a-f83ed4c7.webp"
      : "https://damanclub.in/assets/png/time-5d4e96a3.webp";
  };

  // ============ INITIALIZE TIMER ON FIRST LOAD ============
  useEffect(() => {
    if (!localStorage.getItem('timerStartTime')) {
      localStorage.setItem('timerStartTime', Date.now().toString());
      localStorage.setItem('activeTimer', '30sec');
    }
  }, []);

  // ============ REAL-TIME COUNTER (Every 100ms for smooth display) ============
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingSeconds(calculateRemainingSeconds());
    }, 100);

    return () => clearInterval(interval);
  }, [activeTimer]);

  // ============ FORMAT TIME DISPLAY ============
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      minutes: String(mins).padStart(2, '0'),
      seconds: String(secs).padStart(2, '0')
    };
  };

  const timeDisplay = formatTime(remainingSeconds);

  // ============ POPUP STATE & BETTING DATA ============
  const [showPopup, setShowPopup] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedMultiplier, setSelectedMultiplier] = useState('X1');
  const [selectedAmount, setSelectedAmount] = useState(1);

  // ============ GAME HISTORY DATA ============
  const [gameHistory, setGameHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ============ USER BET HISTORY DATA ============
  const [userBetHistory, setUserBetHistory] = useState([]);
  const [userHistoryLoading, setUserHistoryLoading] = useState(false);
  const [userCurrentPage, setUserCurrentPage] = useState(1);
  const userItemsPerPage = 10;
  const [expandedBetId, setExpandedBetId] = useState(null); // Track which bet details are shown

  // ============ NAV TAB STATE ============
  const [activeTab, setActiveTab] = useState('gamehistory');

  // ============ FETCH GAME HISTORY FROM API ============
  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        setHistoryLoading(true);
        const response = await fetch(`${config.API_BASE_URL}${getHistoryEndpoint()}`);

        if (response.ok) {
          const data = await response.json();
          setGameHistory(data);
        }
      } catch (error) {
        console.error('Error fetching game history:', error);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchGameHistory();
  }, [activeTimer]);

  // ============ AUTO-FETCH WHEN TIMER COMPLETES ============
  useEffect(() => {
    const maxSeconds = timerConfig[activeTimer].seconds;

    // When timer is in last 3 seconds, mark that we are waiting for a new result
    if (remainingSeconds <= 3 && remainingSeconds > 0 && !waitingForResult) {
      setWaitingForResult(true);
    }

    // When timer resets to near max AND we were waiting → new cycle started, fetch!
    if (remainingSeconds >= maxSeconds - 2 && waitingForResult) {
      setWaitingForResult(false);

      const autoFetch = async () => {
        try {
          setHistoryLoading(true);
          const response = await fetch(`${config.API_BASE_URL}${getHistoryEndpoint()}`);

          if (response.ok) {
            const data = await response.json();
            setGameHistory(data);
            setCurrentPage(1);

            if (data && data.length > 0) {
              await updateUserBetsWithResult(data[0]);
            }
          }
        } catch (error) {
          console.error('Error in auto-fetch:', error);
        } finally {
          setHistoryLoading(false);
        }
      };

      autoFetch();
    }
  }, [remainingSeconds, activeTimer, waitingForResult]);

  // ============ FETCH USER BET HISTORY FROM API ============
  useEffect(() => {
    const fetchUserBetHistory = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        setUserHistoryLoading(true);
        const response = await fetch(`${config.API_BASE_URL}${config.ENDPOINTS.BET_HISTORY_GET}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auto-token": token
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserBetHistory(data);
        }
      } catch (error) {
        console.error('Error fetching user bet history:', error);
      } finally {
        setUserHistoryLoading(false);
      }
    };

    if (activeTab === 'myhistory') {
      fetchUserBetHistory();
    }
  }, [activeTab]);

  // ============ POPUP HANDLERS ============
  const handleBettingClick = () => {
    setShowPopup(true);
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
    setShowPopup(true);
  };

  const handleBigSmallClick = (type) => {
    setSelectedNumber(type === 'big' ? 'Big' : 'Small');
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedNumber(null);
    setQuantity(1);
    setSelectedMultiplier('X1');
    setSelectedAmount(1);
  };

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
  };

  const handleMultiplierClick = (multiplier) => {
    setSelectedMultiplier(multiplier);
  };

  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(quantity + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const totalBetAmount = selectedAmount * quantity;

  // ============ AUTO-UPDATE USER BETS WITH RESULT ============
  // Backend automatically updates pending bets via /autoupdatePendingBets endpoint
  // Frontend just needs to refresh the user bet history
  const updateUserBetsWithResult = async (latestResult) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token, skipping history refresh");
        return;
      }

      console.log("⚡ Backend auto-updating pending bets for period:", latestResult.periodno);
      
      // Wait a moment for backend to update
      setTimeout(async () => {
        console.log("🔄 Refreshing user bet history...");
        const refreshResponse = await fetch(`${config.API_BASE_URL}${config.ENDPOINTS.BET_HISTORY_GET}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auto-token": token
          }
        });

        const refreshedHistory = await refreshResponse.json();
        if (refreshResponse.ok) {
          setUserBetHistory(refreshedHistory);
          setUserCurrentPage(1); // Reset to page 1
          console.log("✅ User bet history refreshed:", refreshedHistory);
        }
      }, 1000);
    } catch (error) {
      console.error("❌ Error in updateUserBetsWithResult:", error);
    }
  };

  // ============ HANDLE BET CONFIRMATION & API CALL ============
  const handleConfirmBet = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        alert("Please login first!");
        return;
      }

      // ⚡ Use cached period (no API call)
      const currentPeriod = gameHistory.length > 0 ? gameHistory[0].periodno : "0";

      // Calculate balance BEFORE making requests
      const newBalance = userBalance - totalBetAmount;

      // Prepare bet data
      const betData = {
        priodno: parseInt(currentPeriod),
        pamount: totalBetAmount,
        tax: Math.round(totalBetAmount * 0.05 * 100) / 100,
        amountaftertax: Math.round(totalBetAmount * 0.95 * 100) / 100,
        select: selectedNumber.toString(),
        gameType: activeTimer,
        status: "pending",
        winloss: 0,
        ordertime: Math.floor(Date.now() / 1000),
        resultnumber: null,
        resultcolor: null,
        resultbigsmall: null
      };

      // ⚡ PARALLEL: Make both API calls simultaneously
      const [betResponse, balanceResponse] = await Promise.all([
        fetch(`${config.API_BASE_URL}${config.ENDPOINTS.BET_HISTORY_ADD}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auto-token": token
          },
          body: JSON.stringify(betData)
        }),
        fetch(`${config.API_BASE_URL}/api/user/userupdate`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auto-token": token
          },
          body: JSON.stringify({ userbalance: newBalance })
        })
      ]);

      // Update UI immediately (optimistic update)
      setUserBalance(newBalance);
      handleClosePopup();

      if (betResponse.ok) {
        alert("✅ Bet placed successfully!");
      } else {
        const errorData = await betResponse.json();
        alert("Bet placement failed: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // ============ PAGINATION HANDLERS ============
  // API returns newest first (sorted desc). Slice(1) removes current ongoing period (index 0).
  const reverseHistory = gameHistory.slice(1);
  const totalPages = Math.ceil(reverseHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedHistory = reverseHistory.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // ============ USER BET HISTORY PAGINATION HANDLERS ============
  const filteredUserBetHistory = userBetHistory.filter((item) => {
    const rowGameType = item.gameType || '1min';
    return rowGameType === activeTimer;
  });
  const reverseUserHistory = [...filteredUserBetHistory].reverse();
  const userTotalPages = Math.ceil(reverseUserHistory.length / userItemsPerPage);
  const userStartIndex = (userCurrentPage - 1) * userItemsPerPage;
  const userEndIndex = userStartIndex + userItemsPerPage;
  const paginatedUserHistory = reverseUserHistory.slice(userStartIndex, userEndIndex);

  const handleUserNextPage = () => {
    if (userCurrentPage < userTotalPages) {
      setUserCurrentPage(userCurrentPage + 1);
    }
  };

  const handleUserPreviousPage = () => {
    if (userCurrentPage > 1) {
      setUserCurrentPage(userCurrentPage - 1);
    }
  };

  // ============ DYNAMIC BACKGROUND CLASS FOR POPUP HEADER ============
  const getHeaderBgClass = () => {
    if (selectedNumber === 'Green') return 'green_bg';
    if (selectedNumber === 'Red') return 'red_bg';
    if (selectedNumber === 'Violet') return 'violet_bg';
    if (selectedNumber === 'Big') return 'big_bg';
    if (selectedNumber === 'Small') return 'small_bg';
    if (selectedNumber === 0 || selectedNumber === 5) return 'zero_bg';
    if ([2, 4, 6, 8].includes(selectedNumber)) return 'red_bg';
    if ([1, 3, 7, 9].includes(selectedNumber)) return 'green_bg';
    return 'green_bg'; // default
  };

  // ============ GET COLOR VALUE FOR INLINE STYLES ============
  const getButtonColorStyle = () => {
    if (selectedNumber === 'Green') return { backgroundColor: '#1bcf4f', color: '#fff' };
    if (selectedNumber === 'Red') return { backgroundColor: '#f23030', color: '#fff' };
    if (selectedNumber === 'Violet') return { backgroundColor: '#a56eda', color: '#fff' };
    if (selectedNumber === 'Big') return { backgroundColor: '#f7b500', color: '#fff' };
    if (selectedNumber === 'Small') return { backgroundColor: '#359ee4', color: '#fff' };
    if (selectedNumber === 0 || selectedNumber === 5) return { backgroundColor: '#ea1111e1', color: '#fff' };
    if ([2, 4, 6, 8].includes(selectedNumber)) return { backgroundColor: '#f23030', color: '#fff' };
    if ([1, 3, 7, 9].includes(selectedNumber)) return { backgroundColor: '#1bcf4f', color: '#fff' };
    return { backgroundColor: '#1bcf4f', color: '#fff' };
  };









  return (
    <>

      <>
      
      
      <>
      <link rel="stylesheet" href="./wingostyle/common-7beda9ad.css" />
     <link rel="stylesheet" href="./wingostyle/page-saasLottery-D5-023805f7.css" />
      <link rel="stylesheet" href="./wingostyle/index-c366ba19.css" />
       <link rel="stylesheet" href="./wingostyle/page-saasLottery-SaasChangLong-927d0303.css" />

       
      
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/common-7beda9ad.css" />

     <link rel="stylesheet" href="https://damanclub.in/assets/css/page-saasLottery-D5-023805f7.css" />

      <link rel="stylesheet" href="https://damanclub.in/assets/css/index-c366ba19.css" />
       <link rel="stylesheet" href="https://damanclub.in/assets/css/page-saasLottery-SaasChangLong-927d0303.css" /> */}





    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-ActivityDetail-a597c4a3.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-Bonus-608b6579.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-DailySignIn-724ce950.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-FirstRecharge-1994fe55.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-home-Casino-c8cf7c0b.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-home-AllGames-27352971.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-home-other-a3de12dc.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/index-a508d66f.css" /> */}

   
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-Championship-0dbc2b73.css" /> */}
   
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-PointMall-e476b613.css" />
     */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" /> */}
   
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-GoogleVerify-5698c1af.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-SettingCenter-48faf3e2.css" /> */}
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-index.vue_vue_type_script_setup_true_lang-d9204ab3.css" /> */}


    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-index.vue_vue_type_style_index_0_scoped_a78765c7_lang-fdb9c9a2.css" /> */}

   
   
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-saasLottery-VideoWinGo-13605214.css" /> */}
   
   
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-saasLottery-MotoRace-c6a96213.css" /> */}
   

   
    
    </>
      
      
      
      </>

      <div data-v-b68febd5="" className="winGo3" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
        <div data-v-63b58aab="" data-v-b68febd5="" className="lottery-info padding">
          <div data-v-63b58aab="" className="bg" />
          <div data-v-12a80a3e="" data-v-63b58aab="" className="navbar main">
            <div data-v-12a80a3e="" className="navbar-fixed">
              <div data-v-12a80a3e="" className="navbar__content">
                <div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left">{ /**/}{ /**/}{ /**/}</i>
                </div>
                <div data-v-12a80a3e="" className="navbar__content-center">
                  <div data-v-12a80a3e="" className="headLogo" style={{ backgroundImage: "url(\"https://ossimg.envyenvelope.com/daman/other/h5setting_202404231948388e2u.png\")" }}>
                  </div>
                  <div data-v-12a80a3e="" className="navbar__content-title" />
                </div>
                <div data-v-12a80a3e="" className="navbar__content-right">
                  <div data-v-63b58aab="" className="more">
                    <div data-v-63b58aab="" />
                    <div data-v-63b58aab="" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-v-63b58aab="">
            <div data-v-7b3870ea="" data-v-63b58aab="" className="Wallet__C">
              <div data-v-7b3870ea="" className="Wallet__C-balance">
                <div data-v-7b3870ea="" className="Wallet__C-balance-l1">
                  <div data-v-7b3870ea="">₹{parseFloat(userBalance || 0).toFixed(2)}</div>
                </div>
                <div data-v-7b3870ea="" className="Wallet__C-balance-l2"><svg data-v-7b3870ea="" className="svg-icon icon-lottyWallet">
                  <use xlinkHref="#icon-lottyWallet" />
                </svg>
                  <div data-v-7b3870ea="">Wallet balance</div>
                </div>
                <div data-v-7b3870ea="" className="Wallet__C-balance-l3">
                  <div data-v-7b3870ea="" onClick={() => navigate('/withdraw')} style={{cursor: 'pointer'}}>Withdraw</div>
                  <div data-v-7b3870ea="" onClick={() => navigate('/deposit')} style={{cursor: 'pointer'}}>Deposit</div>
                </div>
              </div>
            </div>
            <div data-v-63b58aab="" className="noticeBar__container lottery-notice"><svg className="svg-icon icon-noticeBarSpeaker">
              <use xlinkHref="#icon-noticeBarSpeaker" />
            </svg>
              <div className="noticeBar__container-body">
                <div className="noticeBar__container-body-text">Daman is a secured website using encryption and
                  authentication standards to protect the confidentiality of web transactions. You can see
                  a padlock at the start of your browser address bar, the link between your browser and
                  the server is encrypted. The hacker could not attach a malicious program to the server
                  that will hosts our website that could steal any of our data.</div>
              </div><button className="hotIcon">Detail</button>
            </div>
            <div data-v-8406ace2="" data-v-63b58aab="" className="timer-cards">
              <div
                data-v-8406ace2=""
                className={`timer-card ${activeTimer === '30sec' ? 'active' : ''}`}
                onClick={() => handleTimerClick('30sec')}
                style={{ cursor: 'pointer' }}
              >
                <div data-v-8406ace2="" className="clock-icon"><img data-v-8406ace2="" src={getTimerImageSrc('30sec')} className="timeIcon" alt="30sec" /></div>
                <div data-v-8406ace2="" className="card-title">WinGo 30sec</div>
              </div>
              <div
                data-v-8406ace2=""
                className={`timer-card ${activeTimer === '1min' ? 'active' : ''}`}
                onClick={() => handleTimerClick('1min')}
                style={{ cursor: 'pointer' }}
              >
                <div data-v-8406ace2="" className="clock-icon"><img data-v-8406ace2="" src={getTimerImageSrc('1min')} className="timeIcon" alt="1min" /></div>
                <div data-v-8406ace2="" className="card-title">WinGo 1 Min</div>
              </div>
              <div
                data-v-8406ace2=""
                className={`timer-card ${activeTimer === '3min' ? 'active' : ''}`}
                onClick={() => handleTimerClick('3min')}
                style={{ cursor: 'pointer' }}
              >
                <div data-v-8406ace2="" className="clock-icon"><img data-v-8406ace2="" src={getTimerImageSrc('3min')} className="timeIcon" alt="3min" /></div>
                <div data-v-8406ace2="" className="card-title">WinGo 3 Min</div>
              </div>
              <div
                data-v-8406ace2=""
                className={`timer-card ${activeTimer === '5min' ? 'active' : ''}`}
                onClick={() => handleTimerClick('5min')}
                style={{ cursor: 'pointer' }}
              >
                <div data-v-8406ace2="" className="clock-icon"><img data-v-8406ace2="" src={getTimerImageSrc('5min')} className="timeIcon" alt="5min" /></div>
                <div data-v-8406ace2="" className="card-title">WinGo 5 Min</div>
              </div>
            </div>
          </div>
        </div>
        <div data-v-3cbad787="" data-v-b68febd5="" className="TimeLeft__C">
          <div data-v-3cbad787="" className="TimeLeft__C-rule"><svg data-v-3cbad787="" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path data-v-3cbad787="" d="M23.67 3H12.33C6.66 3 5.25 4.515 5.25 10.56V27.45C5.25 31.44 7.44 32.385 10.095 29.535L10.11 29.52C11.34 28.215 13.215 28.32 14.28 29.745L15.795 31.77C17.01 33.375 18.975 33.375 20.19 31.77L21.705 29.745C22.785 28.305 24.66 28.2 25.89 29.52C28.56 32.37 30.735 31.425 30.735 27.435V10.56C30.75 4.515 29.34 3 23.67 3ZM11.67 18C10.845 18 10.17 17.325 10.17 16.5C10.17 15.675 10.845 15 11.67 15C12.495 15 13.17 15.675 13.17 16.5C13.17 17.325 12.495 18 11.67 18ZM11.67 12C10.845 12 10.17 11.325 10.17 10.5C10.17 9.675 10.845 9 11.67 9C12.495 9 13.17 9.675 13.17 10.5C13.17 11.325 12.495 12 11.67 12ZM24.345 17.625H16.095C15.48 17.625 14.97 17.115 14.97 16.5C14.97 15.885 15.48 15.375 16.095 15.375H24.345C24.96 15.375 25.47 15.885 25.47 16.5C25.47 17.115 24.96 17.625 24.345 17.625ZM24.345 11.625H16.095C15.48 11.625 14.97 11.115 14.97 10.5C14.97 9.885 15.48 9.375 16.095 9.375H24.345C24.96 9.375 25.47 9.885 25.47 10.5C25.47 11.115 24.96 11.625 24.345 11.625Z" fill="currentColor" />
          </svg>How to play</div>
          <div data-v-3cbad787="" className="TimeLeft__C-name">{timerConfig[activeTimer].label}</div>
          <div data-v-3cbad787="" className="TimeLeft__C-num">
            <div data-v-3cbad787="" className="n4" />
            <div data-v-3cbad787="" className="n9" />
            <div data-v-3cbad787="" className="n8" />
            <div data-v-3cbad787="" className="n6" />
            <div data-v-3cbad787="" className="n3" />
          </div>
          <div data-v-3cbad787="" className="TimeLeft__C-id">
            {gameHistory.length > 0 ? gameHistory[0].periodno : "20260403100020025"}
          </div>
          <div data-v-3cbad787="" className="TimeLeft__C-text">Time remaining</div>
          <div data-v-3cbad787="" className="TimeLeft__C-time">
            <div data-v-3cbad787="">{timeDisplay.minutes.charAt(0)}</div>
            <div data-v-3cbad787="">{timeDisplay.minutes.charAt(1)}</div>
            <div data-v-3cbad787="">:</div>
            <div data-v-3cbad787="">{timeDisplay.seconds.charAt(0)}</div>
            <div data-v-3cbad787="">{timeDisplay.seconds.charAt(1)}</div>
          </div>
        </div>




        <div data-v-b68febd5="" className="Betting__C">
          <div data-v-b68febd5="" className="Betting__C-mark" style={{ display: remainingSeconds <= 10 ? "" : "none" }}>
            <div data-v-b68febd5="">{timeDisplay.seconds.charAt(0)}</div>
            <div data-v-b68febd5="">{timeDisplay.seconds.charAt(1)}</div>
          </div>
          <div data-v-b68febd5="" className="Betting__C-head">
            <div data-v-b68febd5="" className="Betting__C-head-green" onClick={() => handleNumberClick('Green')} style={{ cursor: 'pointer' }}>Green</div>
            <div data-v-b68febd5="" className="Betting__C-head-violet" onClick={() => handleNumberClick('Violet')} style={{ cursor: 'pointer' }}>Violet</div>
            <div data-v-b68febd5="" className="Betting__C-head-red" onClick={() => handleNumberClick('Red')} style={{ cursor: 'pointer' }}>Red</div>
          </div>
          <div data-v-b68febd5="" className="Betting__C-numC">
            <div data-v-b68febd5="" className="Betting__C-numC-item0" onClick={() => handleNumberClick(0)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item1" onClick={() => handleNumberClick(1)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item2" onClick={() => handleNumberClick(2)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item3" onClick={() => handleNumberClick(3)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item4" onClick={() => handleNumberClick(4)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item5" onClick={() => handleNumberClick(5)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item6" onClick={() => handleNumberClick(6)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item7" onClick={() => handleNumberClick(7)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item8" onClick={() => handleNumberClick(8)} style={{ cursor: 'pointer' }} />
            <div data-v-b68febd5="" className="Betting__C-numC-item9" onClick={() => handleNumberClick(9)} style={{ cursor: 'pointer' }} />
          </div>
          <div data-v-b68febd5="" className="Betting__C-multiple">
            <div data-v-b68febd5="" className="Betting__C-multiple-l">Random</div>
            <div data-v-b68febd5="" className="Betting__C-multiple-r active"> X1</div>
            <div data-v-b68febd5="" className="Betting__C-multiple-r"> X5</div>
            <div data-v-b68febd5="" className="Betting__C-multiple-r"> X10</div>
            <div data-v-b68febd5="" className="Betting__C-multiple-r"> X20</div>
            <div data-v-b68febd5="" className="Betting__C-multiple-r"> X50</div>
            <div data-v-b68febd5="" className="Betting__C-multiple-r"> X100</div>
          </div>
          <div data-v-b68febd5="" className="Betting__C-foot">
            <div data-v-b68febd5="" className="Betting__C-foot-b" onClick={() => handleBigSmallClick('big')} style={{ cursor: 'pointer' }}>Big</div>
            <div data-v-b68febd5="" className="Betting__C-foot-s" onClick={() => handleBigSmallClick('small')} style={{ cursor: 'pointer' }}>Small</div>
          </div>
        </div>


        <div data-v-b68febd5="" className="history">
          <div data-v-b68febd5="" className="nav" style={{ cursor: "grab" }}>
            <div data-v-b68febd5="" className="nav-container">
              <div 
                data-v-b68febd5="" 
                className={activeTab === 'gamehistory' ? 'active' : ''} 
                onClick={() => setActiveTab('gamehistory')}
                style={{ cursor: 'pointer' }}
              >
                Game history
              </div>
              <div 
                data-v-b68febd5="" 
                className={activeTab === 'chart' ? 'active' : ''} 
                onClick={() => setActiveTab('chart')}
                style={{ cursor: 'pointer' }}
              >
                Chart
              </div>
              <div 
                data-v-b68febd5="" 
                className={activeTab === 'followstrategy' ? 'active' : ''} 
                onClick={() => setActiveTab('followstrategy')}
                style={{ cursor: 'pointer' }}
              >
                Follow Strategy
              </div>
              <div 
                data-v-b68febd5="" 
                className={activeTab === 'myhistory' ? 'active' : ''} 
                onClick={() => setActiveTab('myhistory')}
                style={{ cursor: 'pointer' }}
              >
                My history
              </div>
            </div>
          </div>
          {activeTab === 'gamehistory' && (
          <div data-v-b68febd5="" className="nav-box">
            <div data-v-e06f81fe="" data-v-b68febd5="" className="record">
              <div data-v-e06f81fe="" className="record-head">
                <div data-v-e06f81fe="" className="van-row">
                  <div data-v-e06f81fe="" className="van-col van-col--10"><span data-v-e06f81fe="">Period</span></div>
                  <div data-v-e06f81fe="" className="van-col van-col--5"><span data-v-e06f81fe="">Number</span></div>
                  <div data-v-e06f81fe="" className="van-col van-col--5"><span data-v-e06f81fe="">Big
                    Small</span></div>
                  <div data-v-e06f81fe="" className="van-col van-col--4"><span data-v-e06f81fe="">Color</span>
                  </div>
                </div>
              </div>
              <div data-v-e06f81fe="" className="record-body">
                {paginatedHistory.length > 0 ? (
                  paginatedHistory.map((item, index) => (
                    <div data-v-e06f81fe="" className="van-row" key={item._id || index}>
                      <div data-v-e06f81fe="" className="van-col van-col--10">{item.periodno}</div>
                      <div data-v-e06f81fe="" className="van-col van-col--5 numcenter">
                        <div data-v-e06f81fe="" className={`record-body-num ${item.color}`}>{item.betnumbers}</div>
                      </div>
                      <div data-v-e06f81fe="" className="van-col van-col--5"><span data-v-e06f81fe="">{item.bigsmall}</span></div>
                      <div data-v-e06f81fe="" className="van-col van-col--4">
                        <div data-v-e06f81fe="" className="record-origin">
                          <div data-v-e06f81fe="" className={`record-origin-I ${item.color === 'greenColor' ? 'green' : item.color === 'defaultColor' ? 'red' : 'violet'}`} />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>No history available</div>
                )}
              </div>
              <div data-v-e06f81fe="" className="record-foot">
                <div 
                  data-v-e06f81fe="" 
                  className={`record-foot-previous ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={handlePreviousPage}
                  style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <i data-v-e06f81fe="" className="van-badge__wrapper van-icon van-icon-arrow-left record-icon" style={{ fontSize: 20 }}>{ /**/}{ /**/}{ /**/}</i>
                </div>
                <div data-v-e06f81fe="" className="record-foot-page">{currentPage}/{totalPages || 1}</div>
                <div 
                  data-v-e06f81fe="" 
                  className={`record-foot-next ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={handleNextPage}
                  style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  <i data-v-e06f81fe="" className="van-badge__wrapper van-icon van-icon-arrow record-icon" style={{ fontSize: 20 }}>{ /**/}{ /**/}{ /**/}</i>
                </div>
              </div>
            </div>
          </div>
          )}
          {activeTab === 'chart' && (
          <div data-v-b68febd5="" className="nav-box">
            
    <div data-v-57322248="" data-v-b68febd5="" className="t">
        <div data-v-57322248="" className="t_head">
            <div data-v-57322248="">Period</div>
            <div data-v-57322248="">Number</div>
        </div>
        <div data-v-57322248="" className="t-b1">
            <div data-v-57322248="" className="t-b1-l w">
                <div data-v-57322248="" className="w">Statistic</div>
                <div data-v-57322248="">(last 100 Periods)</div>
            </div>
            <div data-v-57322248="" className="t-b1-l lottery">
                <div data-v-57322248="">Winning Numbers</div>
                <div data-v-57322248="" className="t-b1-l-n">
                    <div data-v-57322248="">0</div>
                    <div data-v-57322248="">1</div>
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">3</div>
                    <div data-v-57322248="">4</div>
                    <div data-v-57322248="">5</div>
                    <div data-v-57322248="">6</div>
                    <div data-v-57322248="">7</div>
                    <div data-v-57322248="">8</div>
                    <div data-v-57322248="">9</div>
                </div>
            </div>
            <div data-v-57322248="" className="t-b1-l">
                <div data-v-57322248="">Missing</div>
                <div data-v-57322248="" className="t-b1-l-n">
                    <div data-v-57322248="">13</div>
                    <div data-v-57322248="">4</div>
                    <div data-v-57322248="">27</div>
                    <div data-v-57322248="">0</div>
                    <div data-v-57322248="">1</div>
                    <div data-v-57322248="">3</div>
                    <div data-v-57322248="">9</div>
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">6</div>
                    <div data-v-57322248="">7</div>
                </div>
            </div>
            <div data-v-57322248="" className="t-b1-l">
                <div data-v-57322248="">Avg missing</div>
                <div data-v-57322248="" className="t-b1-l-n">
                    <div data-v-57322248="">6</div>
                    <div data-v-57322248="">11</div>
                    <div data-v-57322248="">6</div>
                    <div data-v-57322248="">10</div>
                    <div data-v-57322248="">10</div>
                    <div data-v-57322248="">10</div>
                    <div data-v-57322248="">11</div>
                    <div data-v-57322248="">6</div>
                    <div data-v-57322248="">5</div>
                    <div data-v-57322248="">7</div>
                </div>
            </div>
            <div data-v-57322248="" className="t-b1-l">
                <div data-v-57322248="">Frequency</div>
                <div data-v-57322248="" className="t-b1-l-n">
                    <div data-v-57322248="">12</div>
                    <div data-v-57322248="">7</div>
                    <div data-v-57322248="">12</div>
                    <div data-v-57322248="">8</div>
                    <div data-v-57322248="">8</div>
                    <div data-v-57322248="">8</div>
                    <div data-v-57322248="">7</div>
                    <div data-v-57322248="">13</div>
                    <div data-v-57322248="">14</div>
                    <div data-v-57322248="">11</div>
                </div>
            </div>
            <div data-v-57322248="" className="t-b1-l">
                <div data-v-57322248="">Max consecutive</div>
                <div data-v-57322248="" className="t-b1-l-n">
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">1</div>
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">1</div>
                    <div data-v-57322248="">1</div>
                    <div data-v-57322248="">1</div>
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">2</div>
                    <div data-v-57322248="">2</div>
                </div>
            </div>
        </div>
        <div data-v-57322248="" className="t-b2">
            {paginatedHistory.map((item, index) => {
              // Extract winning number from betnumbers (e.g., "2-9" or "7")
              const winningNumber = item.betnumbers.includes('-') 
                ? item.betnumbers.split('-')[0] 
                : item.betnumbers;
              
              return (
                <div key={item._id || index} data-v-57322248="" issuenumber={item.periodno} number={winningNumber} rowid={index} className="t-b2-item">
                  <div data-v-57322248="" className="van-row">
                    <div data-v-57322248="" className="van-col van-col--9">
                      <div data-v-57322248="" className="t-b2-i">{item.periodno}</div>
                    </div>
                    <div data-v-57322248="" className="van-col van-col--15">
                      <div data-v-57322248="" className="t-b2-Num">
                        <canvas data-v-57322248="" id={`myCanvas${index}`} className="line-canvas" />
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <div 
                            key={num}
                            data-v-57322248="" 
                            className={`t-b2-Num-item ${num.toString() === winningNumber ? `action${num}` : ''}`}
                          >
                            {num}
                          </div>
                        ))}
                        <div data-v-57322248="" className={`t-b2-Num-BS ${item.bigsmall === 'Big' ? 'isB' : ''}`}>
                          {item.bigsmall === 'Big' ? 'B' : 'S'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>


        <div data-v-57322248="" className="t-foot">
            <div 
              data-v-57322248="" 
              className={`t-foot-previous ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={handlePreviousPage}
              style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
            >
              <i data-v-57322248="" className="van-badge__wrapper van-icon van-icon-arrow-left t-icon" style={{ fontSize: 20 }}>{ /**/}{ /**/}{ /**/}</i>
            </div>
            <div data-v-57322248="" className="t-foot-page">{currentPage}/{totalPages || 1}</div>
            <div 
              data-v-57322248="" 
              className={`t-foot-next ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={handleNextPage}
              style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
            >
              <i data-v-57322248="" className="van-badge__wrapper van-icon van-icon-arrow t-icon" style={{ fontSize: 20 }}>{ /**/ }{ /**/ }{ /**/ }</i>
            </div>
        </div>
    </div>
          </div>
          )}
          {activeTab === 'followstrategy' && (
          <div data-v-b68febd5="" className="nav-box">
    <div data-v-d3b4a951="" data-v-b68febd5="" className="content12">{ /* 头部及空状态组件 */ }<div data-v-29779131=""
            className="betting-strategy">
            <div data-v-29779131="" className="page-header">
                <div data-v-29779131="" className="title-container">
                    <h1 data-v-29779131="" className="title">Betting Strategy</h1><i data-v-29779131=""
                        className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                        }</i>
                </div>
                <div data-v-29779131="" className="history-btn"><i data-v-29779131=""
                        className="van-badge__wrapper van-icon van-icon-clock-o history-icon">{ /**/ }{ /**/ }{ /**/
                        }</i><span data-v-29779131="">History</span></div>
            </div>{ /* 加载中提示组件 */ }{ /* 空状态提示组件 */ }<div data-v-564de1be="" data-v-29779131="" className="empty-state">
                <img data-v-564de1be="" src="/assets/png/empty-state-465716d6.png" alt="Empty state"
                    className="empty-image" />
                <p data-v-564de1be="" className="empty-text">Please select a strategy</p>
            </div>
        </div>{ /*历史记录弹框 */ }{ /**/ }{ /**/ }{ /*跟单规则*/ }{ /**/ }{ /**/ }<div data-v-bcfdab7a=""
            className="strategy-card">
            <div data-v-bcfdab7a="" className="strategy-header">
                <div data-v-bcfdab7a="" className="box">
                    <div data-v-bcfdab7a="" className="avatar-container"><img data-v-bcfdab7a=""
                            src="https://img.ar-lottery.com/lotterysaas-imgs/2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div data-v-bcfdab7a="" className="strategy-nammax">Micheal</div>
                </div>
                <div data-v-bcfdab7a="" className="strategy-info">
                    <div data-v-bcfdab7a="" className="strategy-name">BigSmall</div>
                    <div data-v-bcfdab7a="" className="strategy-followers"><img data-v-bcfdab7a=""
                            src="/assets/png/uer-b012a664.png" alt="user" className="followers-icon" /><span
                            data-v-bcfdab7a="" className="followers-count">605</span><span data-v-bcfdab7a=""
                            className="followers-text">followed</span></div>
                    <div data-v-bcfdab7a="" className="strategy-tags">
                        <div data-v-bcfdab7a="" className="tag type-tag big">Big</div>
                        <div data-v-bcfdab7a="" className="tag method-tag">martingale</div>
                    </div>
                </div>
            </div>
            <div data-v-bcfdab7a="" className="strategy-stats">
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Return on Investment <div data-v-bcfdab7a=""
                            className="stat-value roi">+96%</div><i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total Profit <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹6,044,016.60</div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total bet amount <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹82,424,113.83</div>
                </div>
            </div>{ /*跟单按钮*/ }<button data-v-bcfdab7a="" type="button"
                className="van-button van-button--primary van-button--normal van-button--block follow-btn">
                <div className="van-button__content">{ /**/ }<span className="van-button__text">Follow Strategy</span>{
                    /**/ }</div>
            </button>
        </div>{ /* 新增跟投设置弹窗 */ }<div className="van-overlay" data-v-fc78d8ff="" style={{ zIndex: "2003" ,
            display: "none" }}>{ /**/ }</div>{ /**/ }<div data-v-bcfdab7a="" className="strategy-card">
            <div data-v-bcfdab7a="" className="strategy-header">
                <div data-v-bcfdab7a="" className="box">
                    <div data-v-bcfdab7a="" className="avatar-container"><img data-v-bcfdab7a=""
                            src="https://img.ar-lottery.com/lotterysaas-imgs/2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div data-v-bcfdab7a="" className="strategy-nammax">Micheal</div>
                </div>
                <div data-v-bcfdab7a="" className="strategy-info">
                    <div data-v-bcfdab7a="" className="strategy-name">Color</div>
                    <div data-v-bcfdab7a="" className="strategy-followers"><img data-v-bcfdab7a=""
                            src="/assets/png/uer-b012a664.png" alt="user" className="followers-icon" /><span
                            data-v-bcfdab7a="" className="followers-count">62</span><span data-v-bcfdab7a=""
                            className="followers-text">followed</span></div>
                    <div data-v-bcfdab7a="" className="strategy-tags">
                        <div data-v-bcfdab7a="" className="tag type-tag red">red</div>
                        <div data-v-bcfdab7a="" className="tag method-tag">martingale</div>
                    </div>
                </div>
            </div>
            <div data-v-bcfdab7a="" className="strategy-stats">
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Return on Investment <div data-v-bcfdab7a=""
                            className="stat-value roi">+154.8%</div><i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total Profit <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹260,683.06</div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total bet amount <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹2,118,287.76</div>
                </div>
            </div>{ /*跟单按钮*/ }<button data-v-bcfdab7a="" type="button"
                className="van-button van-button--primary van-button--normal van-button--block follow-btn">
                <div className="van-button__content">{ /**/ }<span className="van-button__text">Follow Strategy</span>{
                    /**/ }</div>
            </button>
        </div>{ /* 新增跟投设置弹窗 */ }{ /**/ }{ /**/ }<div data-v-bcfdab7a="" className="strategy-card">
            <div data-v-bcfdab7a="" className="strategy-header">
                <div data-v-bcfdab7a="" className="box">
                    <div data-v-bcfdab7a="" className="avatar-container"><img data-v-bcfdab7a=""
                            src="https://img.ar-lottery.com/lotterysaas-imgs/2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div data-v-bcfdab7a="" className="strategy-nammax">Micheal</div>
                </div>
                <div data-v-bcfdab7a="" className="strategy-info">
                    <div data-v-bcfdab7a="" className="strategy-name">Color</div>
                    <div data-v-bcfdab7a="" className="strategy-followers"><img data-v-bcfdab7a=""
                            src="/assets/png/uer-b012a664.png" alt="user" className="followers-icon" /><span
                            data-v-bcfdab7a="" className="followers-count">115</span><span data-v-bcfdab7a=""
                            className="followers-text">followed</span></div>
                    <div data-v-bcfdab7a="" className="strategy-tags">
                        <div data-v-bcfdab7a="" className="tag type-tag green">Green</div>
                        <div data-v-bcfdab7a="" className="tag method-tag">martingale</div>
                    </div>
                </div>
            </div>
            <div data-v-bcfdab7a="" className="strategy-stats">
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Return on Investment <div data-v-bcfdab7a=""
                            className="stat-value roi">+341%</div><i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total Profit <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹414,829.78</div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total bet amount <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹3,890,512.49</div>
                </div>
            </div>{ /*跟单按钮*/ }<button data-v-bcfdab7a="" type="button"
                className="van-button van-button--primary van-button--normal van-button--block follow-btn">
                <div className="van-button__content">{ /**/ }<span className="van-button__text">Follow Strategy</span>{
                    /**/ }</div>
            </button>
        </div>{ /* 新增跟投设置弹窗 */ }{ /**/ }{ /**/ }<div data-v-bcfdab7a="" className="strategy-card">
            <div data-v-bcfdab7a="" className="strategy-header">
                <div data-v-bcfdab7a="" className="box">
                    <div data-v-bcfdab7a="" className="avatar-container"><img data-v-bcfdab7a=""
                            src="https://img.ar-lottery.com/lotterysaas-imgs/2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div data-v-bcfdab7a="" className="strategy-nammax">Micheal</div>
                </div>
                <div data-v-bcfdab7a="" className="strategy-info">
                    <div data-v-bcfdab7a="" className="strategy-name">Color</div>
                    <div data-v-bcfdab7a="" className="strategy-followers"><img data-v-bcfdab7a=""
                            src="/assets/png/uer-b012a664.png" alt="user" className="followers-icon" /><span
                            data-v-bcfdab7a="" className="followers-count">36</span><span data-v-bcfdab7a=""
                            className="followers-text">followed</span></div>
                    <div data-v-bcfdab7a="" className="strategy-tags">
                        <div data-v-bcfdab7a="" className="tag type-tag violet">violet</div>
                        <div data-v-bcfdab7a="" className="tag method-tag">martingale</div>
                    </div>
                </div>
            </div>
            <div data-v-bcfdab7a="" className="strategy-stats">
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Return on Investment <div data-v-bcfdab7a=""
                            className="stat-value roi">+341%</div><i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total Profit <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹693,190.00</div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total bet amount <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹2,327,284.10</div>
                </div>
            </div>{ /*跟单按钮*/ }<button data-v-bcfdab7a="" type="button"
                className="van-button van-button--primary van-button--normal van-button--block follow-btn">
                <div className="van-button__content">{ /**/ }<span className="van-button__text">Follow Strategy</span>{
                    /**/ }</div>
            </button>
        </div>{ /* 新增跟投设置弹窗 */ }{ /**/ }{ /**/ }<div data-v-bcfdab7a="" className="strategy-card">
            <div data-v-bcfdab7a="" className="strategy-header">
                <div data-v-bcfdab7a="" className="box">
                    <div data-v-bcfdab7a="" className="avatar-container"><img data-v-bcfdab7a=""
                            src="https://img.ar-lottery.com/lotterysaas-imgs/2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div data-v-bcfdab7a="" className="strategy-nammax">Micheal</div>
                </div>
                <div data-v-bcfdab7a="" className="strategy-info">
                    <div data-v-bcfdab7a="" className="strategy-name">BigSmall</div>
                    <div data-v-bcfdab7a="" className="strategy-followers"><img data-v-bcfdab7a=""
                            src="/assets/png/uer-b012a664.png" alt="user" className="followers-icon" /><span
                            data-v-bcfdab7a="" className="followers-count">260</span><span data-v-bcfdab7a=""
                            className="followers-text">followed</span></div>
                    <div data-v-bcfdab7a="" className="strategy-tags">
                        <div data-v-bcfdab7a="" className="tag type-tag follow">follow</div>
                        <div data-v-bcfdab7a="" className="tag method-tag">martingale</div>
                    </div>
                </div>
            </div>
            <div data-v-bcfdab7a="" className="strategy-stats">
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Return on Investment <div data-v-bcfdab7a=""
                            className="stat-value roi">+98.09%</div><i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total Profit <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹4,037,757.48</div>
                </div>
                <div data-v-bcfdab7a="" className="stat-item">
                    <div data-v-bcfdab7a="" className="stat-label">Total bet amount <i data-v-bcfdab7a=""
                            className="van-badge__wrapper van-icon van-icon-question-o info-icon">{ /**/ }{ /**/ }{ /**/
                            }</i></div>
                    <div data-v-bcfdab7a="" className="stat-value">₹70,061,064.37</div>
                </div>
            </div>{ /*跟单按钮*/ }<button data-v-bcfdab7a="" type="button"
                className="van-button van-button--primary van-button--normal van-button--block follow-btn">
                <div className="van-button__content">{ /**/ }<span className="van-button__text">Follow Strategy</span>{
                    /**/ }</div>
            </button>
        </div>{ /* 新增跟投设置弹窗 */ }{ /**/ }{ /**/ }{ /*跟单更换确认弹框*/ }{ /**/ }{ /**/ }</div>
           </div>
           )}
           {activeTab === 'myhistory' && (
           <div data-v-b68febd5="" className="nav-box">
    <div data-v-d1b1347c="" data-v-b68febd5="" className="my_r">
       <div data-v-d1b1347c="" className="my_r-body">
    <div data-v-d1b1347c="" className="list">
        {userHistoryLoading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading your bets...</div>
        ) : paginatedUserHistory.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>No bets placed yet</div>
        ) : (
          paginatedUserHistory.map((bet, index) => (
            <div key={bet._id || index}>
              <div 
                data-v-d1b1347c="" 
                className="list-item"
                onClick={() => setExpandedBetId(expandedBetId === bet._id ? null : bet._id)}
                style={{ cursor: 'pointer' }}
              >
                <div data-v-d1b1347c="" className="list-item-l">
                  <div data-v-d1b1347c="" className={`list-item-l-${bet.select}`}>{bet.select}</div>
                </div>
                <div data-v-d1b1347c="" className="list-item-m">
                  <div data-v-d1b1347c="" className="list-item-m-top">
                    {bet.priodno} 
                    <svg data-v-d1b1347c="" xmlns="http://www.w3.org/2000/svg" className="r" width="9" height="8" viewBox="0 0 9 8" fill="none">
                      <path data-v-d1b1347c="" d="M5.21907 7.57895C4.89494 8.14035 4.08463 8.14035 3.7605 7.57895L0.114077 1.26316C-0.210049 0.701754 0.195109 -5.66721e-08 0.843362 0L8.13621 6.37561e-07C8.78446 6.94233e-07 9.18962 0.701755 8.86549 1.26316L5.21907 7.57895Z" fill="#323536" />
                    </svg>
                  </div>
                  <div data-v-d1b1347c="" className="list-item-m-bottom">
                    {new Date(bet.ordertime * 1000).toLocaleString()}
                  </div>
                </div>
                <div data-v-d1b1347c="" className={`list-item-r ${bet.status === 'win' ? 'success' : bet.status === 'loss' ? 'failed' : ''}`}>
                  {bet.status === 'win' && <div data-v-d1b1347c="" className="success">Succeed</div>}
                  {bet.status === 'loss' && <div data-v-d1b1347c="" className="failed">Failed</div>}
                  {bet.status === 'pending' && <div data-v-d1b1347c=""></div>}
                  <span data-v-d1b1347c=""></span>
                </div>
              </div>
              {expandedBetId === bet._id && (
              <div data-v-d1b1347c="" className="list-detail">
                <div data-v-d1b1347c="" className="list-detail-text">Details</div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Period</span>
                  <div data-v-d1b1347c="">{bet.priodno}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Purchase amount</span>
                  <div data-v-d1b1347c="">₹{bet.pamount?.toFixed(2) || '0.00'}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Quantity</span>
                  <div data-v-d1b1347c="">1</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Amount after tax</span>
                  <div data-v-d1b1347c="" className="red">₹{bet.amountaftertax?.toFixed(2) || '0.00'}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Tax</span>
                  <div data-v-d1b1347c="">₹{bet.tax?.toFixed(2) || '0.00'}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Result</span>
                  <div data-v-d1b1347c="">{bet.resultnumber !== undefined ? bet.resultnumber : '--'} {bet.resultbigsmall !== undefined ? bet.resultbigsmall : '--'}  {bet.resultcolor !== undefined ? bet.resultcolor : '--'}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Select</span>
                  <div data-v-d1b1347c="">{bet.select}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Status</span>
                  <div data-v-d1b1347c="">{bet.status}</div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Win/lose</span>
                  <div data-v-d1b1347c="" style={{ color: bet.winloss > 0 ? 'green' : 'red' }}>
                    {bet.winloss !== undefined ? (bet.winloss >= 0 ? '+' : '') + bet.winloss : '--'}
                  </div>
                </div>
                <div data-v-d1b1347c="" className="list-detail-line">
                  <span data-v-d1b1347c="">Order time</span>
                  <div data-v-d1b1347c="">{new Date(bet.ordertime * 1000).toLocaleString()}</div>
                </div>
              </div>
              )}
            </div>
          ))
        )}
    </div>
</div>


        <div data-v-d1b1347c="" className="my_r-foot">
            <div 
              data-v-d1b1347c="" 
              className={`my_r-foot-previous ${userCurrentPage === 1 ? 'disabled' : ''}`}
              onClick={handleUserPreviousPage}
            >
              <i data-v-d1b1347c="" className="van-badge__wrapper van-icon van-icon-arrow-left my_r-icon" style={{ fontSize: 20 }}></i>
            </div>
            <div data-v-d1b1347c="" className="my_r-foot-page">
              {userTotalPages === 0 ? '0/0' : `${userCurrentPage}/${userTotalPages}`}
            </div>
            <div 
              data-v-d1b1347c="" 
              className={`my_r-foot-next ${userCurrentPage === userTotalPages ? 'disabled' : ''}`}
              onClick={handleUserNextPage}
            >
              <i data-v-d1b1347c="" className="van-badge__wrapper van-icon van-icon-arrow my_r-icon" style={{ fontSize: 20 }}></i>
            </div>
        </div>
    </div>
           </div>





           )}

        </div>

        <div role="dialog" tabIndex={0} className="van-popup van-popup--round van-popup--bottom" data-v-d2f5ce8d="" style={{display: showPopup ? "block" : "none",
          zIndex: "2010"
        }}>

          <div data-v-d2f5ce8d="" className="lottery-container">{ /* Curved Header */}<div data-v-d2f5ce8d=""
            className={`header ${getHeaderBgClass()}`}>
            <h1 data-v-d2f5ce8d="">{timerConfig[activeTimer].label}</h1>
            <div data-v-d2f5ce8d="" className="selection-text"><span data-v-d2f5ce8d="">Selected: {selectedNumber}</span></div>
          </div>{ /* Main Content */}<div data-v-d2f5ce8d="" className="content">{ /* Amount Section */}<div
            data-v-d2f5ce8d="" className="amount-section">
            <div data-v-d2f5ce8d="" className="section-header"><span data-v-d2f5ce8d=""
              className="label">Balance</span>
              <div data-v-d2f5ce8d="" className="amount-buttons">
                <div data-v-d2f5ce8d="" className={`${selectedAmount === 1 ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleAmountClick(1)} style={selectedAmount === 1 ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}>1</div>
                <div data-v-d2f5ce8d="" className={`${selectedAmount === 10 ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleAmountClick(10)} style={selectedAmount === 10 ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}>10</div>
                <div data-v-d2f5ce8d="" className={`${selectedAmount === 100 ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleAmountClick(100)} style={selectedAmount === 100 ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}>100</div>
                <div data-v-d2f5ce8d="" className={`${selectedAmount === 1000 ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleAmountClick(1000)} style={selectedAmount === 1000 ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}>1000</div>
              </div>
            </div>
          </div>{ /* Multiplier Section */}<div data-v-d2f5ce8d="" className="multiplier-section">
              <div data-v-d2f5ce8d="" className="section-header"><span data-v-d2f5ce8d=""
                  className="label">Quantity</span>
                  <div data-v-d2f5ce8d="" className="m">
                    <div data-v-d2f5ce8d="" className="n_3" onClick={() => handleQuantityChange('decrease')} style={{ cursor: 'pointer', ...getButtonColorStyle() }}>-</div><input data-v-d2f5ce8d="" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
                    <div data-v-d2f5ce8d="" className="n_3" onClick={() => handleQuantityChange('increase')} style={{ cursor: 'pointer', ...getButtonColorStyle() }}>+</div>
                  </div>
                </div>
                <div data-v-d2f5ce8d="" className="multiplier-buttons">
                  <div data-v-d2f5ce8d="" className={`${selectedMultiplier === 'X1' ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleMultiplierClick('X1')} style={selectedMultiplier === 'X1' ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}> X1</div>
                  <div data-v-d2f5ce8d="" className={`${selectedMultiplier === 'X5' ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleMultiplierClick('X5')} style={selectedMultiplier === 'X5' ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}> X5</div>
                  <div data-v-d2f5ce8d="" className={`${selectedMultiplier === 'X10' ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleMultiplierClick('X10')} style={selectedMultiplier === 'X10' ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}> X10</div>
                  <div data-v-d2f5ce8d="" className={`${selectedMultiplier === 'X20' ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleMultiplierClick('X20')} style={selectedMultiplier === 'X20' ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}> X20</div>
                  <div data-v-d2f5ce8d="" className={`${selectedMultiplier === 'X50' ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleMultiplierClick('X50')} style={selectedMultiplier === 'X50' ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}> X50</div>
                  <div data-v-d2f5ce8d="" className={`${selectedMultiplier === 'X100' ? `primary n_3 ${getHeaderBgClass()}` : "default"}`} onClick={() => handleMultiplierClick('X100')} style={selectedMultiplier === 'X100' ? { cursor: 'pointer', ...getButtonColorStyle() } : { cursor: 'pointer' }}> X100</div>
                </div>
              </div>{ /* Agreement Section */}<div data-v-d2f5ce8d="" className="agreement">
                <div data-v-d2f5ce8d="" role="checkbox" className={`van-checkbox `} tabIndex={0} aria-checked="true">
                  <div className={`van-checkbox__icon van-checkbox__icon--round van-checkbox__icon--checked `}><i
                    className={`van-badge__wrapper van-icon van-icon-success `} style={{
                      borderColor: "var(--main-color)", backgroundColor: "var(--main-color)"
                    }}>{ /**/}{ /**/}{
                            /**/}</i></div><span className={`van-checkbox__label`}>I agree <span data-v-d2f5ce8d=""
                    className="rules">《Pre-sale rules》</span></span>
                </div>
              </div>
            </div>{ /* Footer */}<div data-v-d2f5ce8d="" className="footer"><button data-v-d2f5ce8d="" type="button"
              className="van-button van-button--default van-button--normal cancel" onClick={handleClosePopup}>
              <div className="van-button__content">{ /**/}<span className="van-button__text">Cancel</span>{ /**/}
              </div>
            </button><button data-v-d2f5ce8d="" type="button"
              className={`van-button van-button--default van-button--normal bet-amount n_3 ${getHeaderBgClass()}`}
              style={getButtonColorStyle()}
              onClick={handleConfirmBet}>
                <div className="van-button__content">{ /**/}<span className="van-button__text">Total amount ₹{totalBetAmount.toFixed(2)}</span>{ /**/}</div>
              </button></div>
          </div>


        </div>

        <audio id="voice1">
          <source src=" https://damanclub.in/assets/mp3/di1-0f3d86cb.mp3" type="audio/mpeg" />
        </audio>

        <audio id="voice2">
          <source src=" https://damanclub.in/assets/mp3/di2-ad9aa8fb.mp3" type="audio/mpeg" />
        </audio>


        <div data-v-baa1fbd1="" data-v-b68febd5="" className="winning" style={{ display: "none" }}>
          <div data-v-baa1fbd1="" className="winning-animation" />
          <div data-v-baa1fbd1="" className="winning-body noWin">
            <div data-v-baa1fbd1="" className="winning-main">
              <div data-v-baa1fbd1="" className="winning-wrap">
                <div data-v-baa1fbd1="" className="winning-wrap-l1">Sorry</div>
                <div data-v-baa1fbd1="" className="winning-wrap-l2">{ /*v-if*/}</div>
                <div data-v-baa1fbd1="" className="winning-wrap-l3">
                  <div data-v-baa1fbd1="" className="isLose">Lose</div>
                  <div data-v-baa1fbd1="" className="gameDetail">Period: WinGo 3 Min <p data-v-baa1fbd1="">
                  </p>
                  </div>
                </div>
              </div>
            </div>
            <div data-v-baa1fbd1="" className="winning-wrap-l4">
              <div data-v-baa1fbd1="" className="acitveBtn" /> 3 seconds auto close
            </div>
            <div data-v-baa1fbd1="" className="closeBtn" />
          </div>
        </div>


      </div>
    </>
  );
}

export default Wingo;
