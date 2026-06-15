import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';

function Mainpage() {

    const context = useContext(MyContext);

    const {setfootershow} = context;
  
    useEffect(()=>{
      setfootershow('')
    }, [setfootershow])

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
      }
    }, [navigate]);

    // Handle click on data-v-fde5c416 game items to navigate to /wingo
    useEffect(() => {
      const handleGameClick = (e) => {
        e.stopPropagation();
        navigate("/wingo");
      };

      const gameItems = document.querySelectorAll('[data-v-fde5c416].item');
      gameItems.forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', handleGameClick);
      });

      return () => {
        gameItems.forEach(el => {
          el.removeEventListener('click', handleGameClick);
        });
      };
    }, [navigate]);

  return (
    <>
    
<div className="content-daman content" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
            <div data-v-12a80a3e="" className="navbar">
                <div data-v-12a80a3e="" className="navbar-fixed">
                    <div data-v-12a80a3e="" className="navbar__content">
                        <div data-v-12a80a3e="" className="navbar__content-left"><img src="https://ossimg.envyenvelope.com/daman/other/h5setting_20240423194834yt8f.png" alt="" /></div>
                        <div data-v-12a80a3e="" className="navbar__content-center">{ /*v-if*/ }
                            <div data-v-12a80a3e="" className="navbar__content-title" />
                        </div>
                        <div data-v-12a80a3e="" className="navbar__content-right">
                            <div className="content-daman__right">
                                <div className="message"><svg className="svg-icon icon-notification">
                                        <use href="#icon-notification" />
                                    </svg>
                                    <div data-v-c10b67fb="" className="point point-flicker point" style={{}} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{ /* 头部轮播图 */ }
            <div data-v-3ad7aed7="" className="swiper_box">
                <div data-v-3ad7aed7="" className="swiper swiper-initialized swiper-horizontal swiper-pointer-events my-swipe">
                    <div className="swiper-wrapper" style={{ transform: "translate3d(-3940px, 0px, 0px)", transitionDuration: "0ms" }}>
                        <div className="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next swiper-slide-duplicate" data-swiper-slide-index="10" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20250821161507tin6.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20250821161507tin6.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="0" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20231021124415wjus.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20231021124415wjus.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="1" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20231103194438bsfx.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20231103194438bsfx.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="2" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_202305270515371rsv.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_202305270515371rsv.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="3" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20230306180818gxxn.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230306180818gxxn.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="4" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20230325203153yb5d.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230325203153yb5d.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="5" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20230306180901ggp9.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230306180901ggp9.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="6" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_202303252030007bhh.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_202303252030007bhh.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide" data-swiper-slide-index="7" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20250319185100txj3.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20250319185100txj3.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide swiper-slide-prev" data-swiper-slide-index="8" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20230325203044r16y.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20230325203044r16y.png" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide swiper-slide-active" data-swiper-slide-index="9" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20231202231145ivgs.jpg" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20231202231145ivgs.jpg" /></div>
                        <div data-v-3ad7aed7="" className="swiper-slide swiper-slide-next" data-swiper-slide-index="10" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20250821161507tin6.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20250821161507tin6.png" /></div>
                        <div className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="0" style={{ width: 374, marginRight: 20 }}><img data-v-3ad7aed7="" className="" data-origin="https://ossimg.envyenvelope.com/daman/banner/Banner_20231021124415wjus.png" src="https://ossimg.envyenvelope.com/daman/banner/Banner_20231021124415wjus.png" /></div>
                    </div>{ /**/ }{ /**/ }{ /**/ }
                </div>{ /*v-if*/ }
            </div>{ /* 滚动通知栏 */ }
            <div className="noticeBar__container"><svg className="svg-icon icon-noticeBarSpeaker">
                    <use href="#icon-noticeBarSpeaker" />
                </svg>
                <div className="noticeBar__container-body">
                    <div className="noticeBar__container-body-text">The website upgrade is complete. Before logging in,
                        clear the browser cache. Add member betting rewards and VIP level rewards</div>
                </div><button className="hotIcon">Detail</button>
            </div>{ /* 热门、彩票、游戏选项卡 */ }
            <div data-v-5cc5cfb9="" className="gameScenes-daman">
                <div data-v-5cc5cfb9="" className="game-menu">
                    <div data-v-5cc5cfb9="" className="row space">
                        <div data-v-5cc5cfb9="" className="row-item"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114829pq18.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114829pq18.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/popular-044514e1.png" src="https://damanclub.in/assets/png/popular-044514e1.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Popular</div>
                        </div>
                        <div data-v-5cc5cfb9="" className="row-item"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114947sy3o.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114947sy3o.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/lottery-c0a9176b.png" src="https://damanclub.in/assets/png/lottery-c0a9176b.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Lottery</div>
                        </div>
                    </div>
                    <div data-v-5cc5cfb9="" className="row wrap">
                        <div data-v-5cc5cfb9="" className="row-item row-small game_video"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114911i998.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114911i998.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/video-c9dce622.png" src="https://damanclub.in/assets/png/video-c9dce622.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Casino</div>
                        </div>
                        <div data-v-5cc5cfb9="" className="row-item row-small game_slot"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114929rkd9.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114929rkd9.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/slot-bf07af03.png" src="https://damanclub.in/assets/png/slot-bf07af03.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Slots</div>
                        </div>
                        <div data-v-5cc5cfb9="" className="row-item row-small game_sport"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114921c1tg.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114921c1tg.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/sport-ac79bf87.png" src="https://damanclub.in/assets/png/sport-ac79bf87.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Sports</div>
                        </div>
                        <div data-v-5cc5cfb9="" className="row-item row-small game_chess"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_2024041211490142rl.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_2024041211490142rl.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/chess-9c4d1dff.png" src="https://damanclub.in/assets/png/chess-9c4d1dff.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Rummy</div>
                        </div>
                        <div data-v-5cc5cfb9="" className="row-item row-small game_fish"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114848em94.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114848em94.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/fish-a70df76d.png" src="https://damanclub.in/assets/png/fish-a70df76d.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Fishing</div>
                        </div>
                        <div data-v-5cc5cfb9="" className="row-item row-small game_flash"><img data-v-5cc5cfb9="" className="game_image" alt="" data-origin="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114937mcis.png" src="https://ossimg.envyenvelope.com/daman/gamecategory/gamecategory_20240412114937mcis.png" /><img data-v-5cc5cfb9="" className="game_bg" alt="" data-origin="https://damanclub.in/assets/png/flash-eac62fa4.png" src="https://damanclub.in/assets/png/flash-eac62fa4.png" />
                            <div data-v-5cc5cfb9="" className="game_text">Original</div>
                        </div>
                    </div>
                </div>{ /*v-if*/ }
                <div data-v-5cc5cfb9="" className="game-content">
                    <div data-v-5cc5cfb9="" className="game-list">
                        <div data-v-5cc5cfb9="" className="">
                            <div data-v-c50131ba="" data-v-5cc5cfb9="" className="daman-title">
                                <div data-v-c50131ba="" className="daman-title-left"><svg data-v-c50131ba="" className="svg-icon icon-hot">
                                        <use href="#icon-hot" />
                                    </svg><span data-v-c50131ba="">Platform recommendation</span></div>
                                <div data-v-c50131ba="" className="btn-all"><span data-v-c50131ba="">All</span><span data-v-c50131ba="">6</span><svg data-v-c50131ba="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path data-v-c50131ba="" fillRule="evenodd" clipRule="evenodd" d="M8.5064 19.541C7.99993 19.9904 7.2002 19.6308 7.2002 18.9537C7.2002 18.7288 7.29666 18.5147 7.46512 18.3657L14.6731 11.9896C14.7178 11.95 14.7181 11.8804 14.6738 11.8404L7.45763 5.33217C7.29374 5.18437 7.2002 4.97403 7.2002 4.75334C7.2002 4.078 8.00051 3.72221 8.50188 4.17465L15.8798 10.8325L16.2562 11.1964C16.6628 11.5895 16.6628 12.2412 16.2562 12.6343L15.8798 12.9982L8.5064 19.541Z" fill="#666666" />
                                    </svg></div>
                            </div>{ /*热门*/ }
                            <div data-v-fde5c416="" data-v-5cc5cfb9="" className="daman__container allGame">
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/800_20250816142016461.jpeg" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/800_20250816142016461.jpeg" />{ /*v-if*/ }
                                    <div data-v-fde5c416="" className="game-odd"><span data-v-fde5c416="">RTP</span><span data-v-fde5c416="">97.26%</span>
                                        <div data-v-fde5c416="" className="win-p" style={{ width: "97.26%" }} />
                                    </div>{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/SPRIBE/22001.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/SPRIBE/22001.png" />{ /*v-if*/ }
                                    <div data-v-fde5c416="" className="game-odd"><span data-v-fde5c416="">RTP</span><span data-v-fde5c416="">97.86%</span>
                                        <div data-v-fde5c416="" className="win-p" style={{ width: "97.86%" }} />
                                    </div>{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/ARLottery/WinGo_30S_20250816142946827.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/ARLottery/WinGo_30S_20250816142946827.png" />{ /*v-if*/ }
                                    <div data-v-fde5c416="" className="game-odd"><span data-v-fde5c416="">RTP</span><span data-v-fde5c416="">96.66%</span>
                                        <div data-v-fde5c416="" className="win-p" style={{ width: "96.66%" }} />
                                    </div>{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/124.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/124.png" />{ /*v-if*/ }
                                    <div data-v-fde5c416="" className="game-odd"><span data-v-fde5c416="">RTP</span><span data-v-fde5c416="">96.92%</span>
                                        <div data-v-fde5c416="" className="win-p" style={{ width: "96.92%" }} />
                                    </div>{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/121.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/121.png" />{ /*v-if*/ }
                                    <div data-v-fde5c416="" className="game-odd"><span data-v-fde5c416="">RTP</span><span data-v-fde5c416="">96.49%</span>
                                        <div data-v-fde5c416="" className="win-p" style={{ width: "96.49%" }} />
                                    </div>{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/JILI/51.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/JILI/51.png" />{ /*v-if*/ }
                                    <div data-v-fde5c416="" className="game-odd"><span data-v-fde5c416="">RTP</span><span data-v-fde5c416="">97.19%</span>
                                        <div data-v-fde5c416="" className="win-p" style={{ width: "97.19%" }} />
                                    </div>{ /*v-if*/ }
                                </div>
                            </div>{ /*彩票*/ }{ /*v-if*/ }{ /*其他*/ }{ /*v-if*/ }{ /*v-if*/ }
                        </div>
                        <div data-v-5cc5cfb9="" className="">
                            <div data-v-c50131ba="" data-v-5cc5cfb9="" className="daman-title daman-line">
                                <div data-v-c50131ba="" className="daman-title-left">{ /*v-if*/ }<span data-v-c50131ba="">Lottery</span></div>
                                <div data-v-c50131ba="" className="btn-all"><span data-v-c50131ba="">All</span><span data-v-c50131ba="">5</span><svg data-v-c50131ba="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path data-v-c50131ba="" fillRule="evenodd" clipRule="evenodd" d="M8.5064 19.541C7.99993 19.9904 7.2002 19.6308 7.2002 18.9537C7.2002 18.7288 7.29666 18.5147 7.46512 18.3657L14.6731 11.9896C14.7178 11.95 14.7181 11.8804 14.6738 11.8404L7.45763 5.33217C7.29374 5.18437 7.2002 4.97403 7.2002 4.75334C7.2002 4.078 8.00051 3.72221 8.50188 4.17465L15.8798 10.8325L16.2562 11.1964C16.6628 11.5895 16.6628 12.2412 16.2562 12.6343L15.8798 12.9982L8.5064 19.541Z" fill="#666666" />
                                    </svg></div>
                            </div>{ /*热门*/ }{ /*v-if*/ }{ /*彩票*/ }
                            <div data-v-36646609="" className="daman-lottery">
                                <div data-v-36646609="" className="daman_img">
                                    <h3 data-v-36646609="">Win Go</h3><img data-v-36646609="" alt="" className="" data-origin="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20240123160120h4kw.png" src="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20240123160120h4kw.png" />{ /*<div class="daman-btn">GO <van-icon name="arrow" /></div>*/ }
                                </div>
                                <div data-v-36646609="" className="daman_img">
                                    <h3 data-v-36646609="">MotoRace</h3><img data-v-36646609="" alt="" className="" data-origin="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20250516043207vae6.png" src="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20250516043207vae6.png" />{ /*<div class="daman-btn">GO <van-icon name="arrow" /></div>*/ }
                                </div>
                                <div data-v-36646609="" className="daman_img">
                                    <h3 data-v-36646609="">K3</h3><img data-v-36646609="" alt="" className="" data-origin="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20240123160129bev8.png" src="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20240123160129bev8.png" />{ /*<div class="daman-btn">GO <van-icon name="arrow" /></div>*/ }
                                </div>
                                <div data-v-36646609="" className="daman_img">
                                    <h3 data-v-36646609="">5D</h3><img data-v-36646609="" alt="" className="" data-origin="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20240123160137lok5.png" src="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_20240123160137lok5.png" />{ /*<div class="daman-btn">GO <van-icon name="arrow" /></div>*/ }
                                </div>
                                <div data-v-36646609="" className="daman_img">
                                    <h3 data-v-36646609="">Trx Win Go</h3><img data-v-36646609="" alt="" className="" data-origin="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_202401231601472sqb.png" src="https://ossimg.envyenvelope.com/daman/lotterycategory/lotterycategory_202401231601472sqb.png" />{ /*<div class="daman-btn">GO <van-icon name="arrow" /></div>*/ }
                                </div>
                            </div>
                            <div data-v-550411cf="" data-v-36646609="" className="daman-dragon"><img data-v-550411cf="" className="daman-dragon-image" src="https://damanclub.in/assets/png/dragon-9eecda27.png" alt="" />
                                <div data-v-550411cf="" className="daman-dragon-right">
                                    <h3 data-v-550411cf="">Win Go Dragon assistant</h3>
                                    <p data-v-550411cf="">Five draws in a row with the same result</p>
                                    <div data-v-550411cf="" className="daman-dragon-btn">Enter</div>
                                </div>
                            </div>{ /*其他*/ }{ /*v-if*/ }{ /*v-if*/ }
                        </div>
                        <div data-v-5cc5cfb9="" className="">
                            <div data-v-c50131ba="" data-v-5cc5cfb9="" className="daman-title daman-line">
                                <div data-v-c50131ba="" className="daman-title-left">{ /*v-if*/ }<span data-v-c50131ba="">Original</span></div>
                                <div data-v-c50131ba="" className="btn-all"><span data-v-c50131ba="">All</span><span data-v-c50131ba="">67</span><svg data-v-c50131ba="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path data-v-c50131ba="" fillRule="evenodd" clipRule="evenodd" d="M8.5064 19.541C7.99993 19.9904 7.2002 19.6308 7.2002 18.9537C7.2002 18.7288 7.29666 18.5147 7.46512 18.3657L14.6731 11.9896C14.7178 11.95 14.7181 11.8804 14.6738 11.8404L7.45763 5.33217C7.29374 5.18437 7.2002 4.97403 7.2002 4.75334C7.2002 4.078 8.00051 3.72221 8.50188 4.17465L15.8798 10.8325L16.2562 11.1964C16.6628 11.5895 16.6628 12.2412 16.2562 12.6343L15.8798 12.9982L8.5064 19.541Z" fill="#666666" />
                                    </svg></div>
                            </div>{ /*热门*/ }{ /*v-if*/ }{ /*彩票*/ }{ /*v-if*/ }{ /*其他*/ }
                            <div data-v-fde5c416="" data-v-5cc5cfb9="" className="daman__container allGame">
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/800_20250816142016461.jpeg" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/800_20250816142016461.jpeg" />{ /*v-if*/ }{ /*v-if*/ }{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/SPRIBE/22001.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/SPRIBE/22001.png" />{ /*v-if*/ }{ /*v-if*/ }{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/124.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/124.png" />{ /*v-if*/ }{ /*v-if*/ }{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/910.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/910.png" />{ /*v-if*/ }{ /*v-if*/ }{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/121.png" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/121.png" />{ /*v-if*/ }{ /*v-if*/ }{ /*v-if*/ }
                                </div>
                                <div data-v-fde5c416="" className="item"><img data-v-fde5c416="" className="gameImg" data-origin="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/810_20250817144438346.jpg" src="https://ossimg.envyenvelope.com/daman/gamelogo/TB_Chess/810_20250817144438346.jpg" />{ /*v-if*/ }{ /*v-if*/ }{ /*v-if*/ }
                                </div>
                            </div>{ /*v-if*/ }
                        </div>
                      
                       
                    </div>
                </div>
            </div>{ /* 中奖信息 */ }
            <div data-v-ffb14677="" className="luckyWinners__container">
                <h1 data-v-ffb14677="">Winning information</h1>
                <div data-v-ffb14677="" className="luckyWinners__container-wrapper">
                    <div data-v-ffb14677="" style={{ position: "relative" }}>
                        <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item">
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-img"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/16-cf8e1441.webp" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-info">
                                <h1 data-v-ffb14677="">Mem***AHS</h1>
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winType"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20250819141232etgc.png" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winAmount">
                                <h1 data-v-ffb14677="">Receive ₹15,500.00</h1><span data-v-ffb14677="">Winning
                                    amount</span>
                            </div>
                        </div>
                        <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item">
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-img"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/1-a6662edb.webp" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-info">
                                <h1 data-v-ffb14677="">Mem***NJV</h1>
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winType"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_202508301656005eyp.png" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winAmount">
                                <h1 data-v-ffb14677="">Receive ₹600.00</h1><span data-v-ffb14677="">Winning
                                    amount</span>
                            </div>
                        </div>
                        <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item">
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-img"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/3-abfcc056.webp" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-info">
                                <h1 data-v-ffb14677="">Mem***LYT</h1>
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winType"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20250819141232etgc.png" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winAmount">
                                <h1 data-v-ffb14677="">Receive ₹680.00</h1><span data-v-ffb14677="">Winning
                                    amount</span>
                            </div>
                        </div>
                        <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item">
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-img"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/4-12a0d0c5.webp" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-info">
                                <h1 data-v-ffb14677="">Mem***ZUR</h1>
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winType"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20250819141232etgc.png" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winAmount">
                                <h1 data-v-ffb14677="">Receive ₹3,560.00</h1><span data-v-ffb14677="">Winning
                                    amount</span>
                            </div>
                        </div>
                        <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item">
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-img"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/6-7c7f5203.webp" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-info">
                                <h1 data-v-ffb14677="">Mem***NJZ</h1>
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winType"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20250819141232etgc.png" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winAmount">
                                <h1 data-v-ffb14677="">Receive ₹200.00</h1><span data-v-ffb14677="">Winning
                                    amount</span>
                            </div>
                        </div>
                        <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item">
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-img"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/9-6d772f2c.webp" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-info">
                                <h1 data-v-ffb14677="">Mem***CBF</h1>
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winType"><img data-v-ffb14677="" className="ar-lazyload" data-origin="https://ossimg.envyenvelope.com/daman/vendorlogo/vendorlogo_20250819141232etgc.png" />
                            </div>
                            <div data-v-ffb14677="" className="luckyWinners__container-wrapper__item-winAmount">
                                <h1 data-v-ffb14677="">Receive ₹200.00</h1><span data-v-ffb14677="">Winning
                                    amount</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{ /* 今日盈利排行榜 */ }
            <div data-v-84514e8e="" className="dailyProfitRank">
                <div data-v-84514e8e="" className="title"><b data-v-84514e8e="" />Today's earnings chart</div>
                <div data-v-84514e8e="" className="dailyProfitRank__content">
                    <div data-v-84514e8e="" className="dailyProfitRank__content-topThree">
                        <div data-v-84514e8e="" className="dailyProfitRank__content-topThree__item" style={{ order: "2", top: "-45px" }}>
                            <div data-v-84514e8e="" style={{ background: "url(\"https://damanclub.in/assets/png/border1-3b6518ec.webp\") center center / 100% 100% no-repeat" }}>
                                <img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/1-a6662edb.webp" /></div>
                            <div data-v-84514e8e=""><img data-v-84514e8e="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/crown1-3912fd85.webp" /><img data-v-84514e8e="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/place1-fe39c3f3.webp" /></div><span data-v-84514e8e="">Mem***2TU</span><span data-v-84514e8e="">₹58,190,440.00</span>
                        </div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-topThree__item" style={{ order: "1", top: "-30px" }}>
                            <div data-v-84514e8e="" style={{ background: "url(\"https://damanclub.in/assets/png/border2-7a806be7.webp\") center center / 100% 100% no-repeat" }}>
                                <img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/1-a6662edb.webp" /></div>
                            <div data-v-84514e8e=""><img data-v-84514e8e="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/crown2-c8aced52.webp" /><img data-v-84514e8e="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/place2-8189be28.webp" /></div><span data-v-84514e8e="">Mem***THZ</span><span data-v-84514e8e="">₹2,778,797.59</span>
                        </div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-topThree__item" style={{ order: "3", top: "-30px" }}>
                            <div data-v-84514e8e="" style={{ background: "url(\"https://damanclub.in/assets/png/border3-cfec4a7d.webp\") center center / 100% 100% no-repeat" }}>
                                <img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/5-ab77b716.webp" /></div>
                            <div data-v-84514e8e=""><img data-v-84514e8e="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/crown3-2ca02146.webp" /><img data-v-84514e8e="" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/place3-d9b0be38.webp" /></div><span data-v-84514e8e="">Vi***y.</span><span data-v-84514e8e="">₹2,586,248.00</span>
                        </div>
                    </div>
                    <div data-v-84514e8e="" className="dailyProfitRank__content-list">
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">4</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/2-58c8a9bc.webp" /><span data-v-84514e8e="" className="middle-name">Ki***ng</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹2,276,920.00</span></div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">5</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/6-7c7f5203.webp" /><span data-v-84514e8e="" className="middle-name">Ty***ty</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹1,703,520.00</span></div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">6</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/4-12a0d0c5.webp" /><span data-v-84514e8e="" className="middle-name">Li***ns</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹1,531,079.48</span></div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">7</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/1-a6662edb.webp" /><span data-v-84514e8e="" className="middle-name">Mem***7XE</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹1,520,668.82</span></div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">8</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/5-ab77b716.webp" /><span data-v-84514e8e="" className="middle-name">Mem***IXB</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹1,516,826.00</span></div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">9</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/5-ab77b716.webp" /><span data-v-84514e8e="" className="middle-name">Mem***JWZ</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹1,385,600.00</span></div>
                        <div data-v-84514e8e="" className="dailyProfitRank__content-list__item"><span data-v-84514e8e="" className="left-rank">10</span><img data-v-84514e8e="" data-img="https://damanclub.in/assets/png/avatar-fb4c2506.webp" className="ar-lazyload" data-origin="https://damanclub.in/assets/png/1-a6662edb.webp" /><span data-v-84514e8e="" className="middle-name">Mem***6TC</span>{ /* <span class="middle-name">{{ formatString(item.nickName, 10) }}</span> */ }<span data-v-84514e8e="" className="right-box">₹1,350,320.00</span></div>
                    </div>
                </div>
            </div>
          
         
          
           
         
            <div className="van-overlay" style={{ zIndex: "2001", display: "none" }}>{ /**/ }</div>
            <div role="dialog" tabIndex={0} className="van-popup van-popup--center van-dialog prompt-dialog" style={{ zIndex: "2001", display: "none" }}>{ /**/ }
                <div className="van-dialog__content">
                    <div className="promptHeader" />
                    <div className="promptContent" />
                </div>
                <div className="van-hairline--top van-dialog__footer">{ /**/ }<button type="button" className="van-button van-button--default van-button--large van-dialog__confirm">
                        <div className="van-button__content">{ /**/ }<span className="van-button__text">Confirm</span>{ /**/ }
                        </div>
                    </button></div>{ /**/ }
            </div>
            <div data-v-c0caae78="" className="dialog inactive">
                <div data-v-c0caae78="" className="dialog__container" role="dialog" tabIndex={0}>
                    <div data-v-c0caae78="" className="dialog__container-img"><img data-v-c0caae78="" alt="" className="" data-origin="https://damanclub.in/assets/png/superjackpotHome-72bbeb43.webp" src="https://damanclub.in/assets/png/superjackpotHome-72bbeb43.webp" /></div>
                    <div data-v-c0caae78="" className="dialog__container-title">
                        <h1 data-v-c0caae78="">Congratulation</h1>
                    </div>
                    <div data-v-c0caae78="" className="dialog__container-content">
                        <div className="Laundry-Con">
                            <div className="Laundry-Con_tip">Get 【Super Jackpot】!</div>
                            <div className="Landty-Con-tips">Visit the [Super Jackpot] page to claim your reward</div>
                        </div>
                    </div>
                    <div data-v-c0caae78="" className="dialog__container-footer">{ /*v-if*/ }<button data-v-c0caae78="">OK</button></div>
                </div>
                <div data-v-c0caae78="" className="dialog__outside" />
            </div>
        </div>
    

    
    </>
  )
}

export default Mainpage
