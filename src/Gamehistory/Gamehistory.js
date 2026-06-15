import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './gamehisstyle/page-main-BetRecords-6004cda5.css';

function Gamehistory() {

	const navigate = useNavigate();
	const [selectedTab, setSelectedTab] = useState('lottery');
	const [betHistory, setBetHistory] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/signup");
		}
	}, [navigate]);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchBetHistory(token, selectedTab);
		}
	}, [selectedTab]);

	const fetchBetHistory = async (token, gameType) => {
		try {
			setLoading(true);
			const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/';
			const response = await fetch(`${API_BASE_URL}api/bet/history`, {
				headers: { 'auto-token': token }
			});
			if (response.ok) {
				const data = await response.json();
				console.log('🎯 API Response:', data);
				console.log('📊 Bets Data:', data.bets);
				data.bets && data.bets.forEach((bet, idx) => {
					console.log(`Bet ${idx}:`, bet);
				});
				setBetHistory(data.bets || []);
			}
		} catch (error) {
			console.error('Error fetching bet history:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleTabClick = (tabName) => {
		setSelectedTab(tabName);
	};

	const getStatusClass = (status) => {
		if (status === 'Win' || status === 'won') return 'color40C592';
		if (status === 'Lose' || status === 'lost') return 'colorE98613';
		return '';
	};

	const formatDate = (dateString) => {
		if (!dateString) return '';
		const date = new Date(dateString);
		return date.toLocaleString('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
	};

	const getColorClass = (colorCode) => {
		if (!colorCode) return 'green';
		const colorMap = {
			'Red': 'red',
			'Green': 'green',
			'Violet': 'violet',
			'defaultColor': 'red',
			'greenColor': 'green',
			'mixedColor0': 'violet',
			'mixedColor5': 'violet'
		};
		return colorMap[colorCode] || 'green';
	};

	const getColorName = (colorCode) => {
		if (!colorCode) return 'Green';
		const nameMap = {
			'Red': 'Red',
			'Green': 'Green',
			'Violet': 'Violet',
			'defaultColor': 'Red',
			'greenColor': 'Green',
			'mixedColor0': 'Violet',
			'mixedColor5': 'Violet'
		};
		return nameMap[colorCode] || 'Green';
	};

	const parseResultString = (resultStr) => {
		if (!resultStr) return { number: '0', color: 'greenColor', bigSmall: 'Unknown' };
		
		const parts = resultStr.trim().split(' ').filter(p => p);
		console.log('📍 Parsing result string:', resultStr, '→ Parts:', parts);
		
		return {
			number: parts[0] || '0',
			color: parts[1] || 'greenColor',
			bigSmall: parts[2] || 'Unknown'
		};
	};

	return (
		<>

			{/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-main-BetRecords-6004cda5.css" /> */}

			<div data-v-1d8fbc24="" className="bet-container" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
				<div data-v-12a80a3e="" data-v-1d8fbc24="" className="navbar">
					<div data-v-12a80a3e="" className="navbar-fixed">
						<div data-v-12a80a3e="" className="navbar__content">
							<div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left" /></div>
							<div data-v-12a80a3e="" className="navbar__content-center">
								<div data-v-12a80a3e="" className="navbar__content-title">Bet history</div>
							</div>
							<div data-v-12a80a3e="" className="navbar__content-right" />
						</div>
					</div>
				</div>
				<div data-v-1d8fbc24="" className="bet-container-sticky" style={{}}>
					<div className="van-sticky" style={{}}>
						<div data-v-1d8fbc24="" style={{ background: "var(--bg_color_L1)" }}>
							<div data-v-1d8fbc24="" className="fun-tabs tabs" is-auto-load="true" activeclassname="tab_active">
								<div className="fun-tabs__tab-list" style={{ transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", transitionDuration: "360ms", transform: "translate3d(0px, 0px, 0px)" }}>
									<div className="fun-tab-item funtab_item" onClick={() => handleTabClick('lottery')} style={{ cursor: 'pointer' }}>
										<div className="fun-tab-item__wrap">
											<div className="fun-tab-item__label">
												<div data-v-1d8fbc24="" className={`tab_item ${selectedTab === 'lottery' ? 'tab_active' : ''}`} style={{ color: selectedTab === 'lottery' ? 'rgb(22, 119, 255)' : 'inherit' }}><svg data-v-1d8fbc24="" className="svg-icon icon-lottery">
													<use href="#icon-lottery" />
												</svg><span data-v-1d8fbc24="">Lottery</span></div>
											</div>
										</div>
									</div>
									<div className="fun-tab-item funtab_item" onClick={() => handleTabClick('casino')} style={{ cursor: 'pointer' }}>
										<div className="fun-tab-item__wrap">
											<div className="fun-tab-item__label">
												<div data-v-1d8fbc24="" className={`tab_item ${selectedTab === 'casino' ? 'tab_active' : ''}`} style={{ color: selectedTab === 'casino' ? 'rgb(22, 119, 255)' : 'inherit' }}><svg data-v-1d8fbc24="" className="svg-icon icon-video">
													<use href="#icon-video" />
												</svg><span data-v-1d8fbc24="">Casino</span></div>
											</div>
										</div>
									</div>
									<div className="fun-tab-item funtab_item" onClick={() => handleTabClick('fishing')} style={{ cursor: 'pointer' }}>
										<div className="fun-tab-item__wrap">
											<div className="fun-tab-item__label">
												<div data-v-1d8fbc24="" className={`tab_item ${selectedTab === 'fishing' ? 'tab_active' : ''}`} style={{ color: selectedTab === 'fishing' ? 'rgb(22, 119, 255)' : 'inherit' }}><svg data-v-1d8fbc24="" className="svg-icon icon-fish">
													<use href="#icon-fish" />
												</svg><span data-v-1d8fbc24="">Fishing</span></div>
											</div>
										</div>
									</div>
									<div className="fun-tab-item funtab_item" onClick={() => handleTabClick('rummy')} style={{ cursor: 'pointer' }}>
										<div className="fun-tab-item__wrap">
											<div className="fun-tab-item__label">
												<div data-v-1d8fbc24="" className={`tab_item ${selectedTab === 'rummy' ? 'tab_active' : ''}`} style={{ color: selectedTab === 'rummy' ? 'rgb(22, 119, 255)' : 'inherit' }}><svg data-v-1d8fbc24="" className="svg-icon icon-chess">
													<use href="#icon-chess" />
												</svg><span data-v-1d8fbc24="">Rummy</span></div>
											</div>
										</div>
									</div>
									<div className="fun-tab-item funtab_item" onClick={() => handleTabClick('original')} style={{ cursor: 'pointer' }}>
										<div className="fun-tab-item__wrap">
											<div className="fun-tab-item__label">
												<div data-v-1d8fbc24="" className={`tab_item ${selectedTab === 'original' ? 'tab_active' : ''}`} style={{ color: selectedTab === 'original' ? 'rgb(22, 119, 255)' : 'inherit' }}><svg data-v-1d8fbc24="" className="svg-icon icon-flash">
													<use href="#icon-flash" />
												</svg><span data-v-1d8fbc24="">Original</span></div>
											</div>
										</div>
									</div>
									<div className="fun-tab-item funtab_item" onClick={() => handleTabClick('slots')} style={{ cursor: 'pointer' }}>
										<div className="fun-tab-item__wrap">
											<div className="fun-tab-item__label">
												<div data-v-1d8fbc24="" className={`tab_item ${selectedTab === 'slots' ? 'tab_active' : ''}`} style={{ color: selectedTab === 'slots' ? 'rgb(22, 119, 255)' : 'inherit' }}><svg data-v-1d8fbc24="" className="svg-icon icon-slot">
													<use href="#icon-slot" />
												</svg><span data-v-1d8fbc24="">Slots</span></div>
											</div>
										</div>
									</div>
									<div className="fun-tabs__active-line" style={{ transition: "300ms", width: 0, height: 3, transform: "translate3d(53.5px, 0px, 0px)", backgroundColor: "rgb(22, 119, 255)" }}>
									</div>
								</div>
							</div>
							<div data-v-1d8fbc24="" className="bet-container-searchBar">
								<div data-v-1d8fbc24="" className="ar-searchbar">
									<div data-v-fa757a88="" data-v-1d8fbc24="" className="ar-searchbar__selector">
										<div data-v-fa757a88=""><span data-v-fa757a88="" className="ar-searchbar__selector-default">Win Go</span><i data-v-fa757a88="" className="van-badge__wrapper van-icon van-icon-arrow-down" />
										</div>
									</div>
									<div data-v-fa757a88="" data-v-1d8fbc24="" className="ar-searchbar__selector">
										<div data-v-fa757a88=""><span data-v-fa757a88="" className="ar-searchbar__selector-default">Choose a date</span><i data-v-fa757a88="" className="van-badge__wrapper van-icon van-icon-arrow-down" />
										</div>
									</div>
								</div>
							</div>
							<div data-v-1d8fbc24="">{ /* 日期选择 */}</div>
						</div>
					</div>
				</div>
				<div data-v-1d8fbc24="" className="bet-content__box">
					<div data-v-61888f52="" data-v-1d8fbc24="" className="infiniteScroll" id="refresh916fa8b1a601440b8644432124150729">
						<div data-v-1d8fbc24="" className="bet-container-items">
							<div data-v-1d8fbc24="" className="bet-container-lottery">
								<div data-v-1d8fbc24="" className="bet-container-lottery-items">
									{loading ? (
										<div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>Loading...</div>
									) : betHistory.length === 0 ? (
										<div style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No bet history found</div>
									) : (
										betHistory.map((bet, index) => (
											<div key={index}>
												<div data-v-1d8fbc24="" className="bet-container-lottery-card">
													<div data-v-1d8fbc24="" className="bet-container-lottery-card-header ar-1px-b">
														<h1 data-v-1d8fbc24=""></h1>
														<h2 data-v-1d8fbc24="">{bet.gameName || bet.gameType || 'Game'}</h2>
														<span data-v-1d8fbc24="" className={getStatusClass(bet.status)}>{bet.status || 'Pending'}</span>
														<p data-v-1d8fbc24="">{formatDate(bet.createdAt)}</p>
													</div>
													<div data-v-1d8fbc24="" className="bet-container-lottery-card-info">
														<ul data-v-1d8fbc24="">
															<li data-v-1d8fbc24=""><span data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>
																<h2 data-v-1d8fbc24="">Type</h2>
															</span><span data-v-1d8fbc24="">{bet.gameType || '-'}</span></li>
															<li data-v-1d8fbc24=""><span data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>
																<h2 data-v-1d8fbc24="">Period</h2>
															</span><span data-v-1d8fbc24="">{bet.period || bet.periodNo || '-'}</span></li>
															<li data-v-1d8fbc24=""><span data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>
																<h2 data-v-1d8fbc24="">Order number</h2>
															</span><span data-v-1d8fbc24="">{bet.orderId || bet._id || '-'}</span>
															</li>
															<li data-v-1d8fbc24=""><span data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>
																<h2 data-v-1d8fbc24="">Select</h2>
															</span>
																<p data-v-1d8fbc24="">{bet.selection || bet.betType || '-'}</p>
															</li>
															<li data-v-1d8fbc24=""><span data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>
																<h2 data-v-1d8fbc24="">Total bet</h2>
															</span><span data-v-1d8fbc24="">₹{parseFloat(bet.betAmount || 0).toFixed(2)}</span></li>
														</ul>
													</div>
												</div>
												<img data-v-1d8fbc24="" src="https://damanclub.in/assets/png/moonBar-f80ac733.webp" />
												<div data-v-1d8fbc24="" className="bet-container-lottery-note">
													<div data-v-1d8fbc24="" className="bet-container-lottery-note-result">
														<div data-v-1d8fbc24="">
															<h1 data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>Lottery results</h1>
															<h2 data-v-1d8fbc24=""><svg data-v-1d8fbc24="" className="svg-icon icon-round">
																<use href="#icon-round" />
															</svg>
																<p data-v-1d8fbc24="" className={`w${parseResultString(bet.result).number}`} /><span data-v-1d8fbc24="" className={parseResultString(bet.result).bigSmall === 'Big' ? 'bigClass' : 'small'}>{parseResultString(bet.result).bigSmall}</span><span data-v-1d8fbc24="" className={getColorClass(parseResultString(bet.result).color)}>{getColorName(parseResultString(bet.result).color)}</span>
															</h2>

														</div>








													</div>
													<div data-v-1d8fbc24="" className="bet-container-lottery-note-box">
														<div data-v-1d8fbc24="">
															<div data-v-1d8fbc24="" className="bet-container-lottery-note-box-para">
																<h3 data-v-1d8fbc24="">₹{parseFloat(bet.actualAmount || 0).toFixed(2)}</h3><span data-v-1d8fbc24="">Actual amount</span>
															</div>
														</div>
														<div data-v-1d8fbc24="">
															<div data-v-1d8fbc24="" className="bet-container-lottery-note-box-para">
																<h3 data-v-1d8fbc24="">₹{parseFloat(bet.winnings || 0).toFixed(2)}</h3><span data-v-1d8fbc24="">Winnings</span>
															</div>
														</div>
														<div data-v-1d8fbc24="">
															<div data-v-1d8fbc24="" className="bet-container-lottery-note-box-para">
																<h3 data-v-1d8fbc24="">₹{parseFloat(bet.handlingFee || 0).toFixed(2)}</h3><span data-v-1d8fbc24="">Handling fee</span>
															</div>
														</div>
														<div data-v-1d8fbc24="">
															<div data-v-1d8fbc24="" className="bet-container-lottery-note-box-para">
																<h4 data-v-1d8fbc24="" className={parseFloat(bet.profitLoss || 0) >= 0 ? 'h4_green' : 'h4_red'}>
																	{parseFloat(bet.profitLoss || 0) >= 0 ? '+' : ''}₹{parseFloat(bet.profitLoss || 0).toFixed(2)}
																</h4><span data-v-1d8fbc24="">Profit/loss</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>

						<div data-v-61888f52="" className="infiniteScroll__loading">
							<div data-v-61888f52="">{betHistory.length === 0 && !loading ? 'No more' : ''}</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}

export default Gamehistory
