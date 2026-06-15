import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './page-activity-index.vue_vue_type_script_setup_true_lang-f4947d3c.css';

function Activity() {

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
    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-Championship-0dbc2b73.css" /> */}


     <link rel="stylesheet" href="./page-activity-index.vue_vue_type_script_setup_true_lang-f4947d3c.css" />
   

    
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-index.vue_vue_type_script_setup_true_lang-f4947d3c.css" /> */}
   
   
    {/* <link rel="stylesheet" href="https://damanclub.in//assets/css/page-activity-index.vue_vue_type_style_index_0_scoped_214b87c9_lang-f98129fc.css" /> */}
    
    
    
    
    
    </>
   
        <><div data-v-12a80a3e="" data-v-214b87c9="" className="navbar main" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
            <div data-v-12a80a3e="" className="navbar-fixed">
                <div data-v-12a80a3e="" className="navbar__content">
                    <div data-v-12a80a3e="" className="navbar__content-left">{ /*v-if*/ }</div>
                    <div data-v-12a80a3e="" className="navbar__content-center">
                        <div data-v-12a80a3e="" className="headLogo" style={{ backgroundImage: "url(\"https://ossimg.envyenvelope.com/daman/other/h5setting_202404231948388e2u.png\")" }}>
                        </div>
                        <div data-v-12a80a3e="" className="navbar__content-title" />
                    </div>
                    <div data-v-12a80a3e="" className="navbar__content-right" />
                </div>
            </div>
        </div>
        <div data-v-4a7709f3="" data-v-214b87c9="" className="activity-wrapper" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
            <div data-v-4a7709f3="" className="activity-banner">
                <ul data-v-4a7709f3="" className="activity-bonus">
                    <li data-v-4a7709f3="">
                        <p data-v-4a7709f3="">Today's bonus</p>
                        <h3 data-v-4a7709f3="">₹0.91</h3>
                    </li>
                    <li data-v-4a7709f3="">
                        <p data-v-4a7709f3="">Total bonus</p>
                        <h3 data-v-4a7709f3="">₹5,118.03</h3>
                    </li>
                </ul>
                <div data-v-4a7709f3="" className="bonus-button">Bonus details</div>
            </div>
            <div data-v-4a7709f3="" className="activity-panel">{ /*v-if*/ }
                <div data-v-4a7709f3="" className="activity-panel-header lg6">
                    <div data-v-4a7709f3="" className="header-item">
                        <div data-v-4a7709f3="" className="van-badge__wrapper">
                            <div data-v-4a7709f3="" className="a1 bgcontainer" />{ /**/ }
                        </div><span data-v-4a7709f3="">Activity Award</span>
                    </div>
                    <div data-v-4a7709f3="" className="header-item">
                        <div data-v-4a7709f3="" className="van-badge__wrapper">
                            <div data-v-4a7709f3="" className="a2 bgcontainer" />{ /**/ }
                        </div><span data-v-4a7709f3="">Invitation bonus</span>
                    </div>
                    <div data-v-4a7709f3="" className="header-item">
                        <div data-v-4a7709f3="" className="van-badge__wrapper">
                            <div data-v-4a7709f3="" className="a3 bgcontainer" />{ /**/ }
                        </div><span data-v-4a7709f3="">Betting rebate</span>
                    </div>
                    <div data-v-4a7709f3="" className="header-item">
                        <div data-v-4a7709f3="" className="van-badge__wrapper">
                            <div data-v-4a7709f3="" className="a4 bgcontainer" />{ /**/ }
                        </div><span data-v-4a7709f3="">Super Jackpot</span>
                    </div>
                    <div data-v-4a7709f3="" className="header-item">
                        <div data-v-4a7709f3="" className="van-badge__wrapper">
                            <div data-v-4a7709f3="" className="a5 bgcontainer" />{ /**/ }
                        </div><span data-v-4a7709f3="">First gift</span>
                    </div>
                    <div data-v-4a7709f3="" className="header-item">
                        <div data-v-4a7709f3="" className="van-badge__wrapper">
                            <div data-v-4a7709f3="" className="a6 bgcontainer" />{ /**/ }
                        </div><span data-v-4a7709f3="">Invite Wheel</span>
                    </div>
                </div>
                <div data-v-4a7709f3="" className="activity-panel-content">
                    <div data-v-4a7709f3="" className="content-title"><img data-v-4a7709f3="" className="" data-origin="https://damanclub.in/assets/png/signInBanner-ff4a210f.webp" src="https://damanclub.in/assets/png/signInBanner-ff4a210f.webp" />
                        <div data-v-4a7709f3="" className="content-para">Gifts</div>
                        <p data-v-4a7709f3="">Enter the redemption code to receive gift rewards</p>
                    </div>
                    <div data-v-4a7709f3="" className="content-title"><img data-v-4a7709f3="" className="" data-origin="https://damanclub.in/assets/png/giftRedeem-bb2f7a92.webp" src="https://damanclub.in/assets/png/giftRedeem-bb2f7a92.webp" />
                        <div data-v-4a7709f3="" className="content-para">Attendance bonus</div>
                        <p data-v-4a7709f3="">The more consecutive days you sign in, the higher the reward will be.</p>
                    </div>
                </div>
            </div>{ /*v-if*/ }
            <div data-v-4a7709f3="" role="feed" className="van-list" aria-busy="false">
                <div data-v-4a7709f3="" className="activitySection__container">
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230930162805eioo.png" className="act_0" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title">Become Agent Enjoy Luxury Rewards</div>
                        </div>
                    </div>
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230323134126wxpv.png" className="act_1" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title">⭐️Member Activities Winning Streak⭐️</div>
                        </div>
                    </div>
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230323134046hviy.png" className="act_2" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title">⭐️Aviator High Betting Award⭐️</div>
                        </div>
                    </div>
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_202303231342324ivw.png" className="act_3" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title">Lucky "10" Days Of Interest</div>
                        </div>
                    </div>
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230323134154oeeu.png" className="act_4" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title">🔴 Youtube Creative Video 🔴</div>
                        </div>
                    </div>
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230324165404a7bt.png" className="act_5" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title">❗️ Mysterious Gift ❗️</div>
                        </div>
                    </div>
                    <div data-v-4a7709f3="" className="box"><img data-v-4a7709f3="" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20231021124857fd2v.png" className="act_6" />
                        <div data-v-4a7709f3="" className="box-content">
                            <div data-v-4a7709f3="" className="box-title" />
                        </div>
                    </div>
                </div>{ /**/ }
                <div className="van-list__finished-text">No more</div>{ /**/ }
                <div className="van-list__placeholder" />
            </div>{ /*v-if*/ }{ /*v-if*/ }
        </div></>
      
    
    </>
  )
}

export default Activity
