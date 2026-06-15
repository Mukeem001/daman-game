import React from 'react';
import { Link } from 'react-router-dom';

function Lottrynav() {

  

  return (
<>

<div data-v-2d3dc984="" data-v-f9e6ba25="" class="navbar">
          <div
            data-v-2d3dc984=""
            class="navbar-fixed wc"
            style={{
              background:
                "linear-gradient(90deg, rgb(222, 35, 37) 0%, rgb(255, 80, 74) 100%)",
            }}
          >
            <div data-v-2d3dc984="" class="navbar__content">
              <div data-v-2d3dc984="" class="navbar__content-left">
                <Link to="/"><i
                  data-v-2d3dc984=""
                  class="van-badge__wrapper van-icon van-icon-arrow-left"
                ></i></Link>
                
              </div>
              <div data-v-2d3dc984="" class="navbar__content-center">
                <div
                  data-v-2d3dc984=""
                  class="headLogo"
                  style={{
                    backgroundImage: "url('')",
                  }}
                ></div>
                <div data-v-2d3dc984="" class="navbar__content-title"></div>
              </div>
              <div data-v-2d3dc984="" class="navbar__content-right">
                <div data-v-f9e6ba25="" class="WinGo__C-head-more">
                  <div data-v-f9e6ba25=""></div>
                  <div data-v-f9e6ba25="" class=""></div>
                </div>
              </div>
            </div>
          </div>
        </div>

</>
  )
}

export default Lottrynav
