import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from '../Context/MyContext';
import Lottrynav from '../Components/Lottrynav';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import config from '../config/config';


import './signupstyle/page-activity-PointMall-e476b613.css';
import './signupstyle/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css';
import './signupstyle/page-register-index.vue_vue_type_script_setup_true_lang-52af8975.css';
import './signupstyle/page-register-index.vue_vue_type_style_index_0_scoped_4752d5f1_lang-12ca9d10.css';

function Signup() {
    const context = useContext(MyContext);
    const { setfootershow } = context;

    useEffect(() => {
        setfootershow('none');
    }, [setfootershow]);

    const togglePasswordVisibility = () => {
        const passwordInput = document.getElementById('passwordInput');
        const togglePassword = document.getElementById('togglePassword');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            // Change icon if necessary
            togglePassword.src = 'https://damanclub.in/assets/png/eyeVisible-09720f5f.png';
            
        } else {
            passwordInput.type = 'password';
            // Change icon if necessary
            togglePassword.src = 'https://damanclub.in/assets/png/eyeInvisible-821d9d16.png';
        }




        
    };



    const togglePasswordVisibilityc = () => {
        const passwordInputc = document.getElementById('passwordInputc');
        const togglePasswordc = document.getElementById('togglePasswordc');
    
        if (passwordInputc.type === 'password') {
            passwordInputc.type = 'text';
            // Change icon if necessary
            togglePasswordc.src = 'https://damanclub.in/assets/png/eyeVisible-09720f5f.png';
            
        } else {
            passwordInputc.type = 'password';
            // Change icon if necessary
            togglePasswordc.src = 'https://damanclub.in/assets/png/eyeInvisible-821d9d16.png';
        }


        
    };



    
   

    const navigate = useNavigate();
    const location = useLocation();
    
    // Read referral code from URL (?ref=XXXXXXXX)
    const referralCode = new URLSearchParams(location.search).get('ref') || '';
    
    // ✅ Use config from environment
    const apiUrl = `${config.API_BASE_URL}${config.ENDPOINTS.SIGNUP}`;

    const [credi, setcredi] = useState({ userNumber: "", password: "", inviteCode: referralCode });

    const loginu = async (e) => {
        e.preventDefault();

        // Validation before sending
        if (!credi.userNumber || !credi.password) {
            alert("❌ Please enter both phone number and password");
            return;
        }

        if (credi.password.length < 6) {
            alert("❌ Password must be at least 6 characters");
            return;
        }

        // Use form-typed code first, fallback to URL ?ref= param
        const finalReferralCode = credi.inviteCode?.trim() || referralCode?.trim() || '';

        const requestBody = {
            usernumber: credi.userNumber.trim(),
            password: credi.password,
            userbalance: 0,
            ...(finalReferralCode ? { referralCode: finalReferralCode } : {}),
        };

        console.log("Signup Request Body:", requestBody);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            const json = await response.json();
            console.log("Signup Response:", json);

            if (json.success) {
                localStorage.setItem('token', json.autotoken);
                alert("✅ Registration successful!");
                navigate('/');
            } else {
                alert(`❌ Registration failed: ${json.error}`);
                console.error("Registration failed:", json.error);
            }

        } catch (error) {
            console.error("Error during registration:", error);
            alert(`❌ Error: ${error.message}`);
        }
    };

    const onchange = (e) => {
        setcredi({ ...credi, [e.target.name]: e.target.value });
    };

    return (
        <>
        <>
    
   
  
  
   <link rel="stylesheet" href="./signupstyle/page-activity-PointMall-e476b613.css" />
    <link rel="stylesheet" href="./signupstyle/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" />
    <link rel="stylesheet" href="./signupstyle/page-register-index.vue_vue_type_script_setup_true_lang-52af8975.css" />
    <link rel="stylesheet" href="./signupstyle/page-register-index.vue_vue_type_style_index_0_scoped_4752d5f1_lang-12ca9d10.css" />
    
 

       
    {/* <link rel="stylesheet" href="https://damanclub.in/assets/css/page-activity-PointMall-e476b613.css" />

    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-login-index.vue_vue_type_script_setup_true_lang-a81fdee0.css" />

   
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-register-index.vue_vue_type_script_setup_true_lang-52af8975.css" />
    <link rel="stylesheet" href="https://damanclub.in/assets/css/page-register-index.vue_vue_type_style_index_0_scoped_4752d5f1_lang-12ca9d10.css" /> */}

    
    
    </>
           
            <div data-v-4752d5f1="" class="resgister__C"
                style={{ "--f13b4d11-currentFontFamily": "'Roboto', 'Inter', sans-serif" }}>



                <div data-v-4752d5f1="" class="resgister__C-heading">
                    <h1 data-v-4752d5f1="" class="resgister__C-heading__title">Register</h1>
                    <div data-v-4752d5f1="" class="resgister__C-heading__subTitle">
                        <span data-v-4752d5f1="">Please register by phone number or email</span>
                    </div>
                </div>
                <div data-v-4752d5f1="" class="login_container-tab">
                    <div data-v-4752d5f1="" class="tab active">
                        <svg data-v-4752d5f1="" class="svg-icon icon-phone">
                            <use xlinkHref="#icon-phone"></use>
                        </svg>
                        <div data-v-4752d5f1="">Register your phone</div>
                    </div>
                </div>
                <div data-v-4752d5f1="" class="resgister__C-form">
                    <div data-v-4752d5f1="" class="tab-content activecontent">

                        <form onSubmit={loginu}>

                            <div data-v-e26f70e7="" data-v-4752d5f1="" class="register__container">
                                <div data-v-50aa8bb0="" data-v-e26f70e7="" class="phoneInput__container">
                                    <div data-v-50aa8bb0="" class="phoneInput__container-label">
                                        <svg data-v-50aa8bb0="" class="svg-icon icon-phone">
                                            <use xlinkHref="#icon-phone"></use>
                                        </svg>
                                        <span data-v-50aa8bb0="">Phone number</span>
                                    </div>
                                    <div data-v-50aa8bb0="" class="phoneInput__container-input">
                                        <div data-v-5067ef5e="" data-v-50aa8bb0="" class="dropdown">
                                            <div data-v-5067ef5e="" class="dropdown__value">
                                                <span data-v-5067ef5e="">+91</span>
                                                <i data-v-5067ef5e="" class="van-badge__wrapper van-icon van-icon-arrow-down"></i>
                                            </div>
                                            <div data-v-5067ef5e="" class="dropdown__list">
                                                <div data-v-5067ef5e="" class="dropdown__list-item active">
                                                    <span data-v-5067ef5e="">+91</span> India (भारत)
                                                </div>
                                            </div>
                                        </div>
                                        <input data-v-50aa8bb0="" required type="text" name="userNumber"
                                            placeholder="Please enter the phone number"  onChange={onchange} />
                                    </div>
                                </div>
                                <div data-v-e26f70e7="" class="tip"></div>
                                <div data-v-ea5b66c8="" data-v-e26f70e7="" class="passwordInput__container">
                                    <div data-v-ea5b66c8="" class="passwordInput__container-label">
                                        <svg data-v-ea5b66c8="" class="svg-icon icon-editPswIcon passwordInput__container-label__icon passwordInput__container-label__icon">
                                            <use xlinkHref="#icon-editPswIcon"></use>
                                        </svg>
                                        <span data-v-ea5b66c8="">Set password</span>
                                    </div>
                                    <div data-v-ea5b66c8="" class="passwordInput__container-input">
                                        <input data-v-ea5b66c8="" type="password"required  placeholder="Set password" maxlength="15" name='password'
                                            id="passwordInput" onChange={onchange} />
                                        <img data-v-ea5b66c8=""
                                            src="https://damanclub.in/assets/png/eyeInvisible-821d9d16.png" class="eye"
                                            id="togglePassword"
                                            onClick={togglePasswordVisibility} />
                                    </div>
                                </div>
                                <div data-v-e26f70e7="" class="register__container-tip" style={{ display: "none" }}>
                                    <div data-v-e26f70e7="" class="tipbg"></div>
                                    <span data-v-e26f70e7="">The password must be at least 8 digits and must contain letters + numbers</span>
                                </div>
                                <div data-v-ea5b66c8="" data-v-e26f70e7="" class="passwordInput__container">
                                    <div data-v-ea5b66c8="" class="passwordInput__container-label">
                                        <svg data-v-ea5b66c8="" class="svg-icon icon-editPswIcon passwordInput__container-label__icon passwordInput__container-label__icon">
                                            <use xlinkHref="#icon-editPswIcon"></use>
                                        </svg>
                                        <span data-v-ea5b66c8="">Confirm password</span>
                                    </div>
                                    <div data-v-ea5b66c8="" class="passwordInput__container-input">
                                        <input data-v-ea5b66c8="" required type="password" placeholder="Confirm password" maxlength="15"
                                            autocomplete="new-password" id="passwordInputc" onChange={onchange} />
                                        <img data-v-ea5b66c8=""
                                            src="https://damanclub.in/assets/png/eyeInvisible-821d9d16.png" class="eye" id="togglePasswordc"  onClick={togglePasswordVisibilityc} />
                                    </div>
                                </div>
                                <div data-v-e26f70e7="" class="register__container-tips" style={{ display: "none" }}>
                                    <span data-v-e26f70e7="">Entered twice the password does not match!</span>
                                </div>
                                <div data-v-e26f70e7="" class="register__container-invitation">
                                    <div data-v-e26f70e7="" class="register__container-invitation__label">
                                        <svg data-v-e26f70e7="" class="svg-icon icon-invitation">
                                            <use xlinkHref="#icon-invitation"></use>
                                        </svg>
                                        <span data-v-e26f70e7="">Invite code</span>
                                    </div>
                                    <div data-v-e26f70e7="" class="register__container-invitation__input">
                                        <input data-v-e26f70e7="" type="text" autoComplete="off"
                                            name="inviteCode"
                                            value={credi.inviteCode}
                                            placeholder="Please enter the invitation code" maxLength="20"
                                            onChange={onchange} />
                                    </div>
                                </div>
                                <div data-v-e26f70e7="" class="register__container-remember">
                                    <div data-v-e26f70e7="" role="checkbox"  class="van-checkbox" tabIndex="0"
                                        aria-checked="false">
                                        <div class="van-checkbox__icon van-checkbox__icon--round ">
                                            {/* <i class="van-badge__wrapper van-icon van-icon-success"></i> */}
                                        </div>
                                        <input type="checkbox" required class="checkbox-round"  />
                                        <span class="van-checkbox__label">I have read and agree
                                            <span data-v-e26f70e7="">【Privacy Agreement】</span>
                                        </span>
                                    </div>
                                </div>
                                <div data-v-e26f70e7="" class="register__container-button">
                                    <button data-v-e26f70e7="" fdprocessedid="fmnjs">Register</button>
                                    <button data-v-e26f70e7="" class="login" fdprocessedid="s45kfv">
                                        <div data-v-e26f70e7="" class="account">I have an account</div>
                                        <div data-v-e26f70e7="" class="loginin">
                                            <Link to="/login">Login</Link>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
