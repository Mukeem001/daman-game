import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../Context/MyContext';
import Lottrynav from '../Components/Lottrynav';
import { Link, useNavigate } from 'react-router-dom';
import config from '../config/config';

import '../Signuplogin/signupstyle/page-activity-PointMall-e476b613.css';
import '../Signuplogin/signupstyle/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css';
import '../Signuplogin/signupstyle/page-login-index.vue_vue_type_style_index_0_scoped_47f4cc84_lang-152ba1fa.css';

function Login() {

    const context = useContext(MyContext);

    const {setfootershow} = context;
  
    useEffect(()=>{
      setfootershow('none')
    
    },[])

    

    const togglePasswordVisibilityl = () => {
        const passwordInputl = document.getElementById('passwordInputl');
        const togglePasswordl = document.getElementById('togglePasswordl');
    
        if (passwordInputl.type === 'password') {
            passwordInputl.type = 'text';
            // Change icon if necessary
            togglePasswordl.src = 'https://damanclub.in/assets/png/eyeVisible-09720f5f.png';
            
        } else {
            passwordInputl.type = 'password';
            // Change icon if necessary
            togglePasswordl.src = 'https://damanclub.in/assets/png/eyeInvisible-821d9d16.png';
        }


        
    };


    const navigate=useNavigate();

    // ✅ Use config from environment
    const apiUrl = `${config.API_BASE_URL}${config.ENDPOINTS.LOGIN}`;

    const [user, setuser] = useState({ userNumber: "", password: "" });

    const logins = async (e) => {
        e.preventDefault();

        // Validation before sending
        if (!user.userNumber || !user.password) {
            alert("❌ Please enter both phone number and password");
            return;
        }

        const requestBody = {
            usernumber: user.userNumber.trim(),
            password: user.password,
        };

        console.log("Login Request Body:", requestBody);
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            const json = await response.json();
            console.log("Login Response:", json);

            if(json.success){
                localStorage.setItem('token', json.autotoken);
                localStorage.setItem('loginTime', new Date().toISOString());
                alert("✅ Login successful!");
                navigate('/');
            }
            else{
                alert(`❌ Login failed: ${json.error}`);
                console.error("Login failed:", json.error);
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert(`❌ Error: ${error.message}`);
        }
    };
    

    const onchange = (e) => {
        setuser({ ...user, [e.target.name]: e.target.value });
    };


  return (
    <>

    <>

<link rel="stylesheet" href="./signupstyle/page-activity-PointMall-e476b613.css" />
    <link rel="stylesheet" href="./signupstyle/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" />
   <link rel="stylesheet" href="./signupstyle/page-login-index.vue_vue_type_style_index_0_scoped_47f4cc84_lang-152ba1fa.css" />

   
       
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-PointMall-e476b613.css" />
    
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" />
    
   
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-login-index.vue_vue_type_style_index_0_scoped_47f4cc84_lang-152ba1fa.css" /> */}

   

   
    
    </>
      
      
      
      
      <div data-v-47f4cc84="" class="login__container"
            style={{ "--f13b4d11-currentFontFamily": "'Roboto', 'Inter', sans-serif" }}
>
           
            <div data-v-47f4cc84="" class="login__container-heading">
                <h1 data-v-47f4cc84="" class="login__container-heading__title">Log in</h1>
                <div data-v-47f4cc84="" class="login__container-heading__subTitle">
                    <div data-v-47f4cc84="">Please log in with your phone number or email</div>
                    <div data-v-47f4cc84="">If you forget your password, please contact customer service</div>
                </div>
            </div>
            <div data-v-47f4cc84="" class="login_container-tab">
                <div data-v-47f4cc84="" class="tab active"><svg data-v-47f4cc84="" class="svg-icon icon-phone">
                        <use xlinkHref="#icon-phone"></use>
                    </svg>
                    <div data-v-47f4cc84="">Log in with phone</div>
                </div>
                <div data-v-47f4cc84="" class="tab">
                    <div data-v-47f4cc84=""><svg data-v-47f4cc84="" class="svg-icon icon-email">
                            <use xlinkHref="#icon-email"></use>
                        </svg><svg data-v-47f4cc84="" class="svg-icon icon-user" style={{display: "none"}}>
                            <use xlinkHref="#icon-user"></use>
                        </svg></div>
                    <div data-v-47f4cc84="">Email Login</div>
                </div>
            </div>
            <div data-v-47f4cc84="" class="login__container-form">
            <form onSubmit={logins}>
                <div data-v-47f4cc84="" class="tab-content activecontent">
                    <div data-v-33f88764="" data-v-47f4cc84="" class="signIn__container">
                        <div data-v-50aa8bb0="" data-v-33f88764="" class="phoneInput__container">
                            <div data-v-50aa8bb0="" class="phoneInput__container-label"><svg data-v-50aa8bb0=""
                                    class="svg-icon icon-phone">
                                    <use xlinkHref="#icon-phone"></use>
                                </svg><span data-v-50aa8bb0="">Phone number</span></div>
                            <div data-v-50aa8bb0="" class="phoneInput__container-input">
                                <div data-v-5067ef5e="" data-v-50aa8bb0="" class="dropdown">
                                    <div data-v-5067ef5e="" class="dropdown__value"><span
                                            data-v-5067ef5e="">+91</span><i data-v-5067ef5e=""
                                            class="van-badge__wrapper van-icon van-icon-arrow-down"></i>
                                    </div>
                                    <div data-v-5067ef5e="" class="dropdown__list">
                                        <div data-v-5067ef5e="" class="dropdown__list-item active"><span
                                                data-v-5067ef5e="">+91</span> India (भारत)</div>
                                    </div>
                                </div><input data-v-50aa8bb0="" required type="text" name="userNumber"
                                    placeholder="Please enter the phone number"  onChange={onchange} />
                            </div>
                        </div>
                        <div data-v-ea5b66c8="" data-v-33f88764="" class="passwordInput__container">
                            <div data-v-ea5b66c8="" class="passwordInput__container-label"><svg data-v-ea5b66c8=""
                                    class="svg-icon icon-editPswIcon passwordInput__container-label__icon passwordInput__container-label__icon">
                                    <use xlinkHref="#icon-editPswIcon"></use>
                                </svg><span data-v-ea5b66c8="">Password</span></div>
                            <div data-v-ea5b66c8="" class="passwordInput__container-input"><input data-v-ea5b66c8="" required
                                    type="password" id="passwordInputl"  name='password' placeholder="Password" maxlength="32"
                                     onChange={onchange} /><img data-v-ea5b66c8=""
                                    src="https://damanclub.in/assets/png/eyeInvisible-821d9d16.png" class="eye" id="togglePasswordl"
                                    onClick={togglePasswordVisibilityl}/></div>
                        </div>
                        <div data-v-33f88764="">
                            <div data-v-33f88764="" role="checkbox" class="van-checkbox" tabindex="0"
                                aria-checked="false">
                                <div class="van-checkbox__icon van-checkbox__icon--round"><i
                                        class="van-badge__wrapper van-icon van-icon-success"></i>
                                </div><span class="van-checkbox__label">Remember password</span>
                            </div>
                        </div>
                        <div data-v-33f88764="" class="signIn__container-button">  <button data-v-33f88764=""
                                class="active" fdprocessedid="ks3586">Log in</button> <Link to="/signup"> <button data-v-33f88764=""
                                class="register" fdprocessedid="4ddq6p">Register</button></Link></div>
                        <div data-v-33f88764="" class="signIn_footer">
                            <div data-v-33f88764="" class="forgetcon"><svg data-v-33f88764=""
                                    class="svg-icon icon-clock_b forgetbg forgetbg">
                                    <use xlinkHref="#icon-clock_b"></use>
                                </svg>
                                <div data-v-33f88764="" class="font24">Forgot password</div>
                            </div>
                            <div data-v-33f88764="" class="customcon"><svg data-v-33f88764=""
                                    class="svg-icon icon-customer_b forgetbg forgetbg">
                                    <use xlinkHref="#icon-customer_b"></use>
                                </svg>
                                <div data-v-33f88764="" class="font24">Customer Service</div>
                            </div>
                        </div>
                        <div data-v-3e71d3da="" data-v-33f88764="" class="dialog inactive">
                            <div data-v-3e71d3da="" class="dialog__container" role="dialog" tabindex="0">
                                <div data-v-3e71d3da="" class="dialog__container-img"><img data-v-3e71d3da="" class=""
                                        alt="" data-origin="/assets/png/tip-0498e3f9.png"
                                        src="/assets/png/tip-0498e3f9.png"/></div>
                                <div data-v-3e71d3da="" class="dialog__container-title">
                                    <h1 data-v-3e71d3da="">Account has been locked</h1>
                                </div>
                                <div data-v-3e71d3da="" class="dialog__container-content">
                                    <div data-v-33f88764="" class="idlockTip">You Have Entered Wrong Password More Then
                                        10 Times <br data-v-33f88764=""/>Please Use Forgot Password To Change New
                                        Password For Unlock And Log In</div>
                                </div>
                                <div data-v-3e71d3da="" class="dialog__container-footer"><button data-v-33f88764=""
                                        class="dialogBtn">Cancel</button><button data-v-33f88764=""
                                        class="dialogBtn"><img data-v-33f88764=""
                                            src="/assets/png/iconservr-dafbd4f0.png"/> Contact customer service</button>
                                </div>
                            </div>
                            <div data-v-3e71d3da="" class="dialog__outside"></div>
                        </div>
                        <div data-v-96e240c3="" data-v-33f88764="" class="popups"></div>
                    </div>
                </div>

           
                <div data-v-47f4cc84="" class="tab-content">
                    <div data-v-436a69c4="" data-v-47f4cc84="" class="signIn__container">
                        <div data-v-4499df08="" data-v-436a69c4="" class="emailcontainer">
                            <div data-v-4499df08="" class="emailinput__container">
                                <div data-v-4499df08="" class="emailinput__container-label"><svg data-v-4499df08=""
                                        class="svg-icon icon-email emailinput__container-label__icon emailinput__container-label__icon">
                                        <use xlinkHref="#icon-email"></use>
                                    </svg><span data-v-4499df08="">Mail</span></div>
                                <div data-v-4499df08="" class="emailinput__container-input"><input data-v-4499df08=""
                                        type="text" name="userEmail" maxlength="250"
                                        placeholder="please input your email"/></div>
                            </div>
                        </div>
                        <div data-v-ea5b66c8="" data-v-436a69c4="" class="passwordInput__container">
                            <div data-v-ea5b66c8="" class="passwordInput__container-label"><svg data-v-ea5b66c8=""
                                    class="svg-icon icon-editPswIcon passwordInput__container-label__icon passwordInput__container-label__icon">
                                    <use xlinkHref="#icon-editPswIcon"></use>
                                </svg><span data-v-ea5b66c8="">Password</span></div>
                            <div data-v-ea5b66c8="" class="passwordInput__container-input"><input data-v-ea5b66c8=""
                                    type="password" placeholder="Password" maxlength="32"
                                    autocomplete="new-password"/><img data-v-ea5b66c8=""
                                    src="/assets/png/eyeInvisible-821d9d16.png" class="eye"/></div>
                        </div>
                        <div data-v-436a69c4="">
                            <div data-v-436a69c4="" role="checkbox" class="van-checkbox" tabindex="0"
                                aria-checked="false">
                                <div class="van-checkbox__icon van-checkbox__icon--round"><i
                                        class="van-badge__wrapper van-icon van-icon-success"></i>
                                </div><span class="van-checkbox__label">Remember password</span>
                            </div>
                        </div>
                        <div data-v-436a69c4="" class="signIn__container-button"><button data-v-436a69c4="" class="">Log
                                in</button><button data-v-436a69c4="" class="register">Register</button></div>
                        <div data-v-436a69c4="" class="signIn_footer">
                            <div data-v-436a69c4="" class="forgetcon"><svg data-v-436a69c4=""
                                    class="svg-icon icon-clock_b forgetbg forgetbg">
                                    <use xlinkHref="#icon-clock_b"></use>
                                </svg>
                                <div data-v-436a69c4="" class="font24">Forgot password</div>
                            </div>
                            <div data-v-436a69c4="" class="customcon"><svg data-v-436a69c4=""
                                    class="svg-icon icon-customer_b forgetbg forgetbg">
                                    <use xlinkHref="#icon-customer_b"></use>
                                </svg>
                                <div data-v-436a69c4="" class="font24">Customer Service</div>
                            </div>
                        </div>
                        <div data-v-3e71d3da="" data-v-436a69c4="" class="dialog inactive">
                            <div data-v-3e71d3da="" class="dialog__container" role="dialog" tabindex="0">
                                <div data-v-3e71d3da="" class="dialog__container-img"><img data-v-3e71d3da=""
                                        class="ar-lazyload" alt="" data-origin="/assets/png/tip-0498e3f9.png"/></div>
                                <div data-v-3e71d3da="" class="dialog__container-title">
                                    <h1 data-v-3e71d3da="">Account has been locked</h1>
                                </div>
                                <div data-v-3e71d3da="" class="dialog__container-content">
                                    <div data-v-436a69c4="" class="idlockTip">You Have Entered Wrong Password More Then
                                        10 Times <br data-v-436a69c4=""/>Please Use Forgot Password To Change New
                                        Password For Unlock And Log In</div>
                                </div>
                                <div data-v-3e71d3da="" class="dialog__container-footer"><button data-v-436a69c4=""
                                        class="dialogBtn">Cancel</button><button data-v-436a69c4=""
                                        class="dialogBtn"><img data-v-436a69c4=""
                                            src="/assets/png/iconservr-dafbd4f0.png"/> Contact customer service</button>
                                </div>
                            </div>
                            <div data-v-3e71d3da="" class="dialog__outside"></div>
                        </div>
                        <div data-v-96e240c3="" data-v-436a69c4="" class="popups"></div>
                    </div>
                </div>

                </form>
            </div>
        </div>
    </>
  )
}

export default Login
