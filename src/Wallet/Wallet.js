import React, { useContext, useEffect } from 'react'
import { MyContext } from '../Context/MyContext';
import { useNavigate } from 'react-router-dom';

function Wallet() {
    const context = useContext(MyContext)

    const {usebalance} = context;



    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
      }
    }, [navigate]);

  return (
    <>
      <div data-v-a74bd992="" class="wallet-container" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}
      >
            <div data-v-a74bd992="" class="wallet-container-header">
                <div data-v-2d3dc984="" data-v-a74bd992="" class="navbar">
                    <div data-v-2d3dc984="" class="navbar-fixed wc"
                        style={{ background: "linear-gradient(90deg, rgb(249, 89, 89) 0%, rgb(255, 154, 142) 100%)" }}>
                        <div data-v-2d3dc984="" class="navbar__content">
                            <div data-v-2d3dc984="" class="navbar__content-left"><i data-v-2d3dc984=""
                                    class="van-badge__wrapper van-icon van-icon-arrow-left"></i>
                            </div>
                            <div data-v-2d3dc984="" class="navbar__content-center">
                                <div data-v-2d3dc984="" class="navbar__content-title">Wallet</div>
                            </div>
                            <div data-v-2d3dc984="" class="navbar__content-right"></div>
                        </div>
                    </div>
                </div>
                <div data-v-a74bd992="" class="wallet-container-header-belly"><img data-v-a74bd992=""
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAaVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8G612AAAAInRSTlMAZkAmxmDucBAMv7J5Lh8Z1p9ZUUs5jn+qM8UG45b137yA+ifzJQAAAt1JREFUeNrt2oluozAQgOEZJ9iY+wgJ5Gzn/R9yl2alqNqEs/FMJX9P8MuDLYMAz/M8z/M818K0rlUKQoUm0tS7lRnIo/aaHqQlhgdN3+kaxAiDiJ4wIEM/2ucU8AsPBb2kQ+AVqogGfQKjx2hFLmF4+G/xJO0TFdE0MTB4jHbcDVwLTURzgFsq0kRiA9NDXyc18D5asYGq1ERiA7Ov0UoNvI9WbODXkSc28H4HFRtY96OVG2g0keDALCKSHBhoEh14IBIdeCDZgTXJDsxuwgNLkh2YkfDAUnhgRsIDA+mBkfRALTwwJeGBSnpgTc/oc7FdbPNEntsf28RFuzf4DrsmXx+oY4NvVCm7KlCX+HbKLg68xuhEtzBQJ+hIZZcEHg06E6TzA2N0qpsbGKNj3bzAIzq3mROoDToXhDMCE2RQnSYHxsiimxqokYmdGFgik920QI1s7KTAEtk0kwITZBNMCSyQUT4hsEVGzYTAPTLaTQhETgGM2iErC2MaZJWvCTSxppnOLc6TwZjN674zzbTg5rZZEXikRbauAhNayDgKvNBCFx94Z2ihxG+Sf4ymBc5ujpm79kwz6digm8Dlfnfgvt1+1+6DUExg8nGlJ25GSGB8pRcOEgKTgl6r+QMTTQMK/sAzDUq5A2MaFjAHJiQ88Cg8MCHhgRfpgR/SAwsf6AP9JhlWSg80V+GB+CE9MLkKD8SWhtXcgXgUfmEdKbzxX/mHL9WBhEDca3rhU8JrZ68s6Akt5cW9l1zi7TdtKejTx2/4eOQDfaAP9IGuZTAmR1Y5jLHIKoQxJ2QF4ypkVMM4hYwUgOxtvAGQ/RBaANG/9uzgL8knYQYgegkrANlLuAEQvYQ7mMoGyCCwMFmKDFJ4kPiTXgNfxD6GO5jnVKNT9Ql6YqesTjBfh86ksIit0Ikqh6U6B4lBByvYzZsTg+4EK+XqbY1Vk8OPsFnaqB/WpJkFz/M8z/O8tf4AbNgTpaPK6qwAAAAASUVORK5CYII="
                        alt=""/>
                    <div data-v-a74bd992="">₹{usebalance}</div><span data-v-a74bd992="">Total balance</span>
                </div>
            </div>
            <div data-v-a74bd992="" class="wallet-container-content">
                <div data-v-a74bd992="" class="container">
                    <div data-v-a74bd992="" class="progressBars">
                        <div data-v-a74bd992="" class="progressBarsL">
                            <div data-v-a74bd992="" class="van-circle"><svg viewBox="0 0 1100 1100">
                                    <defs>
                                        <linearGradient id="van-circle-0" x1="100%" y1="0%" x2="0%" y2="0%">
                                            <stop offset="0%" stop-color="#FA5A5A"></stop>
                                            <stop offset="100%" stop-color="#FF998D"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path class="van-circle__layer"
                                        d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                        style={{ fill: "none", stroke: "rgb(216, 216, 216)", strokeWidth: "100px" }}></path>
                                    <path d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                        class="van-circle__hover" stroke="url(#van-circle-0)"
                                        style={{ stroke: "url('#van-circle-0')", strokeWidth: "101px", strokeLinecap: "butt", strokeDasharray: "3140px, 3140px" }}
>
                                    </path>
                                </svg>
                                <div class="van-circle__text">100%</div>
                            </div>
                            <h3 data-v-a74bd992="">₹{usebalance}</h3><span data-v-a74bd992="">Main wallet</span>
                        </div>
                        <div data-v-a74bd992="" class="progressBarsR">
                            <div data-v-a74bd992="" class="van-circle"><svg viewBox="0 0 1100 1100">
                                    <defs>
                                        <linearGradient id="van-circle-1" x1="100%" y1="0%" x2="0%" y2="0%">
                                            <stop offset="0%" stop-color="#FA5A5A"></stop>
                                            <stop offset="100%" stop-color="#FF998D"></stop>
                                        </linearGradient>
                                    </defs>
                                    <path class="van-circle__layer"
                                        d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                        style={{ fill: "none", stroke: "rgb(216, 216, 216)", strokeWidth: "100px" }}
></path>
                                    <path d="M 550 550 m 0, -500 a 500, 500 0 1, 1 0, 1000 a 500, 500 0 1, 1 0, -1000"
                                        class="van-circle__hover" stroke="url(#van-circle-1)"
                                        style={{ stroke: "url(#van-circle-1)", strokeWidth: "101px", strokeLinecap: "butt", strokeDasharray: "0px, 3140px" }}
>
                                    </path>
                                </svg>
                                <div class="van-circle__text">0%</div>
                            </div>
                            <h3 data-v-a74bd992="">₹0.00</h3><span data-v-a74bd992="">3rd party wallet</span>
                        </div>
                    </div>
                    <div data-v-a74bd992="" class="recycleBtnD"><button data-v-a74bd992="" class="recycleBtn">Main
                            wallet transfer</button></div>
                    <div data-v-a74bd992="" class="userDetail">
                        <div data-v-a74bd992="">
                            <div data-v-a74bd992="" class="imgD"><img data-v-a74bd992=""
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAjVBMVEUAAAD3eAD3dwD4dgD5dwD2dgD4dgD0bwD4eQD4dwD4dwD4dwD7dwD5dwD2dgD5dgD4dwDtcQD5dgD2eAD5dwD4dwD4dwD4dwD4dwD4eAD3eAD4dgD/dAD3dQDqbgD5dwD3dgD4dwD5eQD5dwD5dwD4dwD5dwD6dgD4dwD4dgD6eQD7dgD4eAD2dAD4dwAMGSgcAAAALnRSTlMAZsyZxU2mEkxrQN9yn3OMcg19OfPqv6+UWTImHxoI0YZULfiE2HlfuI9fQnM4FNyjywAAAtFJREFUaN7s1u9ymkAUBfDdPYBDKAERkdZ/WFF0THn/x2sTSy5JENiF64eMvxc4c+7smVnx8PDw8O1N7chJlEqcQP6airuZykTV4Oda3IVdxRLsJoKdVA32sf9b8HpWDbzyn20hGEnVJC7feP5KMLFVk235zn8SHNaJajIva7yCoXbQUpjE/or30PS0vhj5jS9Uo33ZwF/dvTBFMxeOyxu8grXwobztPGEsPC9beCuGwrQl3mRH52mR7cBrb/4ojS3VnYW5pR3ipFmYPAlDsxCArzS3RBLD2AyvFi1b4qi8DnFlaW+JqEj7gV1Q0d8SmQO23ksOUUn0C5M9AFej9CRDxTfZEnEA5BODXNMtUTAla+XCMtsSBVOyRu6wLVEw8o3oFoIYPi2C/0LRyUaNY7glmlPl0nlo1J0GFvZQ6fwYRCCmWyIW0PPYM9QtzLZEFiBL0SZDnTWwcIyacHDhQ9nXAehZ+QfG2xJdurvyBF+elnXynU+sHraHuLo02fS89Mlyghdp7JimKT649Lt0cHTlUMeg361BqOswL7XWZ3HDEpU0kmS81uuu787ZlSNy30vPRLMdrnJXjivC1U40c/GGzjx2ctH6qHPJIMer57bgQLIIuoJTV7Io0o7gSDIJ24MzySZqDXYlGzdtCc4ko+PfdukYx2EQCsLwmwI50ESsKyAgmWJX8v0PuE2aFOPYjqeJ+C7wa6TZCHsIeR6+Q+pOw7+Q+qFhDynPwh5inoT/ILaS8AKxhYQdXn1P+DbCI/w0wiM8wiO8OxxAqMMzxAIJd4jNJFwg1kl4gtiDhBvEJiMStIwJkLoZ0yE1GxMhVY1yEErGZQgF4xqEJiPIr8Wf1t+r2qYMkWDbWoJEivbGBIlib3UIZNshi7tcFne5mnChtdtuMeAyLtoR0eESqdhRMayfr612yiMsOG11vdl5rZYc3HJkfEouzCXaMAzDt/kHbN7wdhAVLO0AAAAASUVORK5CYII="/>
                            </div><span data-v-a74bd992="">Deposit</span>
                        </div>
                        <div data-v-a74bd992="">
                            <div data-v-a74bd992="" class="imgD"><img data-v-a74bd992=""
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAXVBMVEUAAABcpf9cpv9bpv9cpv9cpv9dpv9cpv9bpf9dpv9ZpP9cpv9cp/9cpf9bpP9Yp/9cp/9ZoP9cpv9cpv9cp/9Ypf9Ynf9Onf9cpv9cpf9bpf9dpv9fpP9ao/9cpv/+vZV2AAAAHnRSTlMAZoxfTb9Z3yY/H/DFeXAazxGWj4I5DQbZvJ9wRkB5MVsiAAABcklEQVRo3u3T3XKCMBCG4Q0/ASMoiIBa3fu/zHac2nQwESzZHHS+5zAHvGwWCAAAAOBJm3Z5wasUeZe19J5NzoHk6TvZhgMqlqZNzoFdzKJxtxxcsaFZKYtIV3RFyxsW8/K2TcFitob8Liwoj77g+csuWFQReeD5kXN2kd+yYXEtuWQsLiWXjsV1cVds5TF/pvkfiiNAGOEHhP9ZWEWAMMIPCCOMMMIII4zwD4QRRhhhhBH2ho+JZU93iUsdLnzY8i/bw3e2YbdqFyhc88TxflyxT7M+7C6c7eu47cKETzxxUl8S9kvChM9PS7yvmP3qv4X19JN2P7dhn0rN0eSSLfyqK3ZrPtScjFx69SSxjva0Tlxs1q8nl1KJM+QyKnEjeZYsLCO3vRJWkodWojRR/JHtwPG3fCO/IVVi9EBWzMtu6aVSWYILli/b7qxWq+D0nhYYbiqwbKBlSh00u6flzDVy1hpNn+mVm7325UgAAAAAU5/94mxKVD2pxAAAAABJRU5ErkJggg=="/>
                            </div><span data-v-a74bd992="">Withdraw</span>
                        </div>
                        <div data-v-a74bd992="">
                            <div data-v-a74bd992="" class="imgD"><img data-v-a74bd992=""
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAMAAAC8EZcfAAAAbFBMVEX6WloAAAD5WFj7WFj6WVn/W1v7Wlr6Wlr7W1v6Wlr6XFz6Wlr5WFj8W1v6WVn6WVn5WVn/VVX7W1v+XV36WVn4WFj6W1v5WVn5WVn7Wlr6W1v8XFz7WVn9XV3/SUn6WVn6Wlr/XFz4WVn5WVlMptElAAAAI3RSTlNmAJ9AxQxNWXkzJRn1X9eOsgZGE+u8cOzigl9ZOSwHqZ8ycDPAW1MAAAL6SURBVHja7dzbbuMgFIXh5WBjAz47SZNOjvX7v+NI7QVSpwkQbGBm9n8bX3zCiVEks5ElHgEJ6BgBk4uABHSMgMnlBiwmeRbsM2ycAvtMCKmGTLcgcFAn/g7dZnZqA907P6mFgYPUOC+gbpTLAYe71nkDdSUrfIGatyhQxwp/4FnzlgeilJ7AYQTWBAJs8AEWJdYGoiwMQINvXaBZCINvZaBZCINvbaAWugM5QgHBXwEKhAPi7A4sEBLYFM5AFhQI7gpUCAuEcgSOoYHcDVggNBCTE5CFB96dgGV4YOMCVAgPhHIAihjAuwOQxwByByBiAJvBGjhFAWKyBso4QGkNFHGAJ2vgGAfIrIE8DpCnDiytgWXqQMQBgoAEJCABCbg2sO73+1udLnB7BIDqLVXgtgK+hGkCv3xfwhSBh0p/WB3SA7Z7QPdxSA2Y41t5WsAd/qhPCdjjh/p0gD1+rE8FeMWDrkkA6xsedksAWB/xpGMdDdjp7fdxelPpggNx0NubWbhFeGDVznNb2V4XAQjs97YXAhGALhHw5whIQAIaIiABCWiIgAQkoKG/Gdjt8mfturjAqp1NHaqYwMNsro0I7GabunjAnRVwFw+YWwFzWkHP72AVD4jewtcjIhDXNwOvvsbe6rrNs7o9QHsxQEACEtAQAQlIQEMEJCABn9a19fxqdV55AUvv/x1m4nHlN9E3s2f1x7rv8rezb1cPIIOx2bsc3xutgScYq1cACmugDHGLbx5HhiYY63x928rj0NXQRHnMLHvwD7d2XvZBzR2AAhESDkCFCCkzUNcgeGX2AJjKPWZOwAnBK2yAOo7AjdlDYBo/E/UQmMYSMvdRGg1CVtgCdWcE7J49ASZwk/lrA3F+IUDmgTjxhYaRQtGFpqFMsYTa5zUYjGHlxovnaDW56iI2Z//hdAXDWjXikvkANVGvYkieBpqT49I6Li8Lz8BUJ94shTsprTMCXbooKQTzSJzlVGSf/Z9jTs0RMLkISEDHCJhcBPzngb8BncLoIXGJNNsAAAAASUVORK5CYII="/>
                            </div><span data-v-a74bd992="">Deposit history</span>
                        </div>
                        <div data-v-a74bd992="">
                            <div data-v-a74bd992="" class="imgD"><img data-v-a74bd992=""
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAD6Wlr5WFj7Wlr5WVn6WVn7W1v4WFj/VFT5WVn5WVn5WVn6WVn6WVn7W1v7WVn7W1v7WVn6Wlr/XFz5WFj7W1v/XV39XFz6WVn/Zmb5WFj5WVn5WVn6Wlr5WVn5WVnIvMgnAAAAH3RSTlMAZp9M2u0/vg2zcBnFjHlfWTkzMpZGLCYfCvVTz6h5gltZtQAAAP1JREFUSMft1d2OgjAQhuFOa1so8iciuO4u93+XcqBIMmP9Ih6o4T1/MikzCWrtFTlvh1nW97gtB1aJ2t5ybBN8MC8AMGvayks4PZldEqeGxrYS3tKYifAdURSPNQ8seQl7YlqypCW8p0sHyR7pWpBWRVPSux1NFZbZgqaMPPim9Wbebxpo1pHhjuD4q1scO4YNjtsl2Kz4K3CuWf8o9gPvJ4DYDkIaxKk0uQAx7TUrfMCqPhTPLywXMH5hfxzjF7bhGL+wlFn8wvI3X5Vb8rs54LhjOMFxolgGfzIvwwcL1ZhtlJiDP/WTs2t1t66K0ypTsXp3IrmyqjO1tqgzPZ0xAYt3JnkAAAAASUVORK5CYII="/>
                            </div><span data-v-a74bd992="">Withdrawal history</span>
                        </div>
                    </div>
                </div>
                <div data-v-a74bd992="" class="gameList">
                    <div data-v-a74bd992="" class="box select" style={{}}>
                        <h3 data-v-a74bd992="" class="money">{usebalance}</h3><span data-v-a74bd992="">Lottery</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">TB_Chess</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">Wickets9</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">EVO_Video</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">JILI</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">PG</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">DG</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">CMD</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">SaBa</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">MG</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">CQ9</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">JDB</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">TB</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">IM</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">AG_Video</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">WM_Video</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">V8Card</span>
                    </div>
                    <div data-v-a74bd992="" class="box"
                        style={{ backgroundImage: "url('https://damangames.in/assets/png/Wickets9-3ce2811c.png')" }}
>
                        <h3 data-v-a74bd992="" class="money"> 0.00</h3><span data-v-a74bd992="">Card365</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Wallet
