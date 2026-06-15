import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Transactionhistory() {
    const navigate = useNavigate();
   

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
      }
    }, [navigate]);

  return (
    <>


<>


	
	
	<link rel="stylesheet" href="https://damanclub.in/assets/css/index-622796d7.css" />
	
	
	</>




   <div data-v-2565e76d="" className="transRecord__container" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
			<div data-v-12a80a3e="" data-v-2565e76d="" className="navbar">
				<div data-v-12a80a3e="" className="navbar-fixed">
					<div data-v-12a80a3e="" className="navbar__content">
						<div data-v-12a80a3e="" className="navbar__content-left"><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left" /></div>
						<div data-v-12a80a3e="" className="navbar__content-center">
							<div data-v-12a80a3e="" className="navbar__content-title">Transaction history</div>
						</div>
						<div data-v-12a80a3e="" className="navbar__content-right" />
					</div>
				</div>
			</div>
			<div data-v-2565e76d="" style={{ height: 65 }}>
				<div data-v-2565e76d="" className="ar">
					<div data-v-2565e76d="" className="ar-searchbar">
						<div data-v-fa757a88="" data-v-2565e76d="" className="ar-searchbar__selector">
							<div data-v-fa757a88=""><span data-v-fa757a88="" className="ar-searchbar__selector-default">All</span><i data-v-fa757a88="" className="van-badge__wrapper van-icon van-icon-arrow-down" />
							</div>
						</div>
						<div data-v-fa757a88="" data-v-2565e76d="" className="ar-searchbar__selector">
							<div data-v-fa757a88=""><span data-v-fa757a88="" className="ar-searchbar__selector-default">Choose a date</span><i data-v-fa757a88="" className="van-badge__wrapper van-icon van-icon-arrow-down" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div data-v-61888f52="" data-v-2565e76d="" className="infiniteScroll" id="refreshbb933dc0a73d48a38ad8c688bcc85d1b">
				<div data-v-2565e76d="" className="transRecord__container-content">
					<div data-v-2565e76d="" className="transRecord__container-content__item">
						<div data-v-2565e76d="" className="transRecord__container-content__card">
							<div data-v-2565e76d="" className="transRecord__container-content__card-top">
								<h3 data-v-2565e76d="">Game moved in</h3>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-mid">
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Detail</div>
									<div data-v-2565e76d="" className="right">Game moved in</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Time</div>
									<div data-v-2565e76d="" className="right">2026-04-23 03:06:25</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Balance</div>
									<div data-v-2565e76d="" className="right red" style={{}}>₹130.14</div>
								</div>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-bot"><textarea data-v-2565e76d="" className="textarea" name="remark" cols={30} rows={10} readOnly /></div>
						</div>
					</div>
					<div data-v-2565e76d="" className="transRecord__container-content__item">
						<div data-v-2565e76d="" className="transRecord__container-content__card">
							<div data-v-2565e76d="" className="transRecord__container-content__card-top">
								<h3 data-v-2565e76d="">Agent commission</h3>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-mid">
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Detail</div>
									<div data-v-2565e76d="" className="right">Agent commission</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Time</div>
									<div data-v-2565e76d="" className="right">2026-04-23 02:30:20</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Balance</div>
									<div data-v-2565e76d="" className="right green" style={{}}>₹129.91</div>
								</div>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-bot"><textarea data-v-2565e76d="" className="textarea" name="remark" cols={30} rows={10} readOnly /></div>
						</div>
					</div>
					<div data-v-2565e76d="" className="transRecord__container-content__item">
						<div data-v-2565e76d="" className="transRecord__container-content__card">
							<div data-v-2565e76d="" className="transRecord__container-content__card-top">
								<h3 data-v-2565e76d="">One-Click rebate</h3>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-mid">
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Detail</div>
									<div data-v-2565e76d="" className="right">One-Click rebate</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Time</div>
									<div data-v-2565e76d="" className="right">2026-04-23 01:00:47</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Balance</div>
									<div data-v-2565e76d="" className="right green" style={{}}>₹0.23</div>
								</div>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-bot"><textarea data-v-2565e76d="" className="textarea" name="remark" cols={30} rows={10} readOnly /></div>
						</div>
					</div>
					<div data-v-2565e76d="" className="transRecord__container-content__item">
						<div data-v-2565e76d="" className="transRecord__container-content__card">
							<div data-v-2565e76d="" className="transRecord__container-content__card-top">
								<h3 data-v-2565e76d="">Game moved in</h3>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-mid">
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Detail</div>
									<div data-v-2565e76d="" className="right">Game moved in</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Time</div>
									<div data-v-2565e76d="" className="right">2026-04-22 03:01:11</div>
								</div>
								<div data-v-2565e76d="" className="line">
									<div data-v-2565e76d="" className="left">Balance</div>
									<div data-v-2565e76d="" className="right red" style={{}}>₹67.26</div>
								</div>
							</div>
							<div data-v-2565e76d="" className="transRecord__container-content__card-bot"><textarea data-v-2565e76d="" className="textarea" name="remark" cols={30} rows={10} readOnly /></div>
						</div>
					</div>
				
					
				</div>
				
			</div>
		</div>
    
    
    </>
  )
}

export default Transactionhistory
