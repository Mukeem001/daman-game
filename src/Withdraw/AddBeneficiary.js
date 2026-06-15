import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';
import apiClient from '../services/apiClient';

const AddBeneficiary = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('');
    const [beneficiary, setBeneficiary] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [fetchingBeneficiary, setFetchingBeneficiary] = useState(true);

    const [formData, setFormData] = useState({
        fullName: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        upiId: '',
        phoneNumber: '',
        usdtAddress: ''
    });

    const context = useContext(MyContext);
    const { setfootershow } = context;

    useEffect(() => {
        setfootershow("none");
    }, []);

    useEffect(() => {
        const storedToken = apiClient.getToken();
        const storedMethod = localStorage.getItem('selectedWithdrawMethod');

        console.log('🔍 Token check:', storedToken ? 'Found' : 'Missing');
        console.log('🔍 Method:', storedMethod);

        if (!storedToken) {
            setMessage('Authentication required. Please login.');
            setMessageType('error');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setSelectedMethod(storedMethod || 'upi');
            fetchBeneficiary(storedMethod || 'upi');
        }
    }, [navigate]);

    // Refetch when selectedMethod changes
    useEffect(() => {
        if (selectedMethod && !isEditMode) {
            fetchBeneficiary(selectedMethod);
        }
    }, [selectedMethod]);

    const fetchBeneficiary = async (method = selectedMethod) => {
        try {
            setFetchingBeneficiary(true);
            console.log('🔍 Fetching beneficiary for method:', method);
            
            const data = await apiClient.get(`/api/withdraw/beneficiary?method=${method || 'upi'}`);
            console.log('🔍 GET Response:', data);

            if (data.beneficiary) {
                setBeneficiary(data.beneficiary);
                setIsEditMode(false);
            } else {
                setBeneficiary(null);
            }
        } catch (error) {
            console.error('❌ Error fetching beneficiary:', error.message);
            // Don't show error - user might just not have a beneficiary yet
        } finally {
            setFetchingBeneficiary(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value.trim();

        // Auto-uppercase IFSC code
        if (name === 'ifscCode') {
            finalValue = finalValue.toUpperCase();
        }

        setFormData(prev => ({
            ...prev,
            [name]: finalValue
        }));
        if (message) {
            setMessage('');
        }
    };

    const validateForm = () => {
        if (!formData.fullName.trim()) {
            setMessage('Full name is required');
            setMessageType('error');
            return false;
        }

        if (selectedMethod === 'bank_card') {
            if (!formData.bankName.trim()) {
                setMessage('Bank name is required');
                setMessageType('error');
                return false;
            }
            if (!formData.accountNumber.trim()) {
                setMessage('Account number is required');
                setMessageType('error');
                return false;
            }
            if (!formData.ifscCode.trim()) {
                setMessage('IFSC code is required');
                setMessageType('error');
                return false;
            }
            const ifsc = formData.ifscCode.trim().toUpperCase();
            if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc)) {
                setMessage('Invalid IFSC format (e.g., SBIN0001234)');
                setMessageType('error');
                return false;
            }
        }

        if (selectedMethod === 'upi' || selectedMethod === 'arpay') {
            if (!formData.phoneNumber.trim()) {
                setMessage('Phone number is required');
                setMessageType('error');
                return false;
            }
            const phone = formData.phoneNumber.replace(/\D/g, '');
            if (!/^\d{10}$/.test(phone)) {
                setMessage('Phone must be 10 digits');
                setMessageType('error');
                return false;
            }
            if (!formData.upiId.trim()) {
                setMessage('UPI ID is required');
                setMessageType('error');
                return false;
            }
            if (!/^[a-zA-Z0-9.-]+@[a-zA-Z][a-zA-Z\d.-]*\.[a-zA-Z]{2,}$/.test(formData.upiId)) {
                setMessage('Invalid UPI ID (e.g., yourname@paytm)');
                setMessageType('error');
                return false;
            }
        }

        if (selectedMethod === 'usdt') {
            if (!formData.usdtAddress.trim()) {
                setMessage('USDT address is required');
                setMessageType('error');
                return false;
            }
            if (formData.usdtAddress.length < 26) {
                setMessage('USDT address too short (min 26 chars)');
                setMessageType('error');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const token = apiClient.getToken();
        if (!token) {
            setMessage('No auth token - please login');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const submitData = { 
                fullName: formData.fullName.trim(),
                method: selectedMethod 
            };

            // Add method-specific fields
            if (selectedMethod === 'bank_card') {
                submitData.bankName = formData.bankName.trim();
                submitData.accountNumber = formData.accountNumber.trim();
                submitData.ifscCode = formData.ifscCode.trim().toUpperCase();
            } else if (selectedMethod === 'upi' || selectedMethod === 'arpay') {
                submitData.phoneNumber = formData.phoneNumber.replace(/\D/g, '');
                submitData.upiId = formData.upiId.trim();
            } else if (selectedMethod === 'usdt') {
                submitData.usdtAddress = formData.usdtAddress.trim();
            }

            console.log('🔍 POST Data:', submitData);

            const data = await apiClient.post('/api/withdraw/beneficiary', submitData);
            console.log('🔍 POST Response:', data);

            setMessage(data.message || '✅ Beneficiary saved successfully!');
            setMessageType('success');
            fetchBeneficiary();
            
            // Reset fields
            const resetFields = { fullName: '' };
            if (selectedMethod === 'bank_card') Object.assign(resetFields, { bankName: '', accountNumber: '', ifscCode: '' });
            else if (selectedMethod === 'upi' || selectedMethod === 'arpay') Object.assign(resetFields, { phoneNumber: '', upiId: '' });
            else if (selectedMethod === 'usdt') resetFields.usdtAddress = '';
            
            setFormData(prev => ({ ...prev, ...resetFields }));
            
            setTimeout(() => {
                setMessage('');
            }, 2000);
        } catch (error) {
            console.error('❌ Error adding beneficiary:', error.message);
            setMessage(error.message || 'An error occurred. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleEditClick = () => {
        setIsEditMode(true);
        if (beneficiary) {
            setFormData({
                fullName: beneficiary.fullName || '',
                bankName: beneficiary.bankName || '',
                accountNumber: beneficiary.accountNumber || '',
                ifscCode: beneficiary.ifscCode || '',
                upiId: beneficiary.upiId || '',
                phoneNumber: beneficiary.phoneNumber || '',
                usdtAddress: beneficiary.usdtAddress || ''
            });
        }
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setFormData({
            fullName: '',
            bankName: '',
            accountNumber: '',
            ifscCode: '',
            upiId: '',
            phoneNumber: '',
            usdtAddress: ''
        });
        setMessage('');
    };

    const handleBack = () => {
        navigate('/withdraw');
    };

    return (
        <>
            <div data-v-1726638e="" className="addBankCard__container" style={{ fontFamily: "'Roboto', 'Inter', sans-serif" }}>
                <div data-v-12a80a3e="" data-v-1726638e="" className="navbar">
                    <div data-v-12a80a3e="" className="navbar-fixed">
                        <div data-v-12a80a3e="" className="navbar__content">
                            <div data-v-12a80a3e="" className="navbar__content-left" onClick={handleBack} style={{ cursor: 'pointer' }}><i data-v-12a80a3e="" className="van-badge__wrapper van-icon van-icon-arrow-left" /></div>
                            <div data-v-12a80a3e="" className="navbar__content-center">
                                <div data-v-12a80a3e="" className="navbar__content-title">
                                    {beneficiary && !isEditMode ? 'Beneficiary Details' : `Add ${selectedMethod === 'bank_card' ? 'Bank' : selectedMethod === 'upi' ? 'UPI' : selectedMethod === 'arpay' ? 'ARPay' : 'USDT'}`}
                                </div>
                            </div>
                            <div data-v-12a80a3e="" className="navbar__content-right" />
                        </div>
                    </div>
                </div>

                {/* SHOW FORM IF: No beneficiary OR Edit mode is ON */}
                {(!beneficiary || isEditMode) && (
                    <div data-v-1726638e="" className="addBankCard__container-content">
                        <div data-v-1726638e="" className="addBankCard__container-content-top"><img data-v-1726638e="" src="https://damanclub.in/assets/png/hint-c6828dc5.webp" /><span data-v-1726638e="">To ensure the safety of your funds, please bind your bank account</span></div>

                        {/* user name  */}
                        <div data-v-1726638e="" className="addBankCard__container-content-item">
                            <div data-v-1726638e="" className="label"><svg data-v-1726638e="" className="svg-icon icon-name">
                                <use href="#icon-name" />
                            </svg> Full recipient's name</div><input 
                                data-v-1726638e="" 
                                type="text"
                                name="fullName"
                                placeholder="Please enter the recipient's name" 
                                maxLength={50} 
                                value={formData.fullName}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* BANK CARD SECTION - Show only if bank_card selected */}
                        {selectedMethod === 'bank_card' && (
                            <>
                                {/* Bank Details Section */}
                                <div data-v-1726638e="" className="addBankCard__container-content-item">
                                    <div data-v-1726638e="" className="label"><svg data-v-1726638e="" className="svg-icon icon-bank"><use href="#icon-bank" /></svg> Bank Name</div>
                                    <input
                                        data-v-1726638e=""
                                        type="text"
                                        name="bankName"
                                        placeholder="e.g., State Bank of India"
                                        maxLength={50}
                                        value={formData.bankName}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                <div data-v-1726638e="" className="addBankCard__container-content-item">
                                    <div data-v-1726638e="" className="label"><svg data-v-1726638e="" className="svg-icon icon-bankCard"><use href="#icon-bankCard" /></svg> Bank Account Number</div>
                                    <input
                                        data-v-1726638e=""
                                        type="text"
                                        name="accountNumber"
                                        placeholder="Please enter your bank account number"
                                        maxLength={25}
                                        value={formData.accountNumber}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                </div>

                                <div data-v-1726638e="" className="addBankCard__container-content-item">
                                    <div data-v-1726638e="" className="label"><svg data-v-1726638e="" className="svg-icon icon-ifscCode"><use href="#icon-ifscCode" /></svg> IFSC Code</div>
                                    <input
                                        data-v-1726638e=""
                                        type="text"
                                        name="ifscCode"
                                        placeholder="11 characters (e.g., SBIN0001234)"
                                        maxLength={11}
                                        value={formData.ifscCode}
                                        onChange={handleChange}
                                        disabled={loading}
                                    />
                                    <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>Format: 11 alphanumeric characters (auto-uppercase)</small>
                                </div>
                            </>
                        )}

                        {/* UPI SECTION - Show only if upi or arpay selected */}
                        {(selectedMethod === 'upi' || selectedMethod === 'arpay') && (
                            <div data-v-8ced09ab="" className="addupi_C" style={{
                                fontFamily: "'Roboto', 'Inter', sans-serif"
                            }}>

                                <div data-v-8ced09ab="" className="addupi_C-header wallet_18"><svg data-v-8ced09ab=""
                                    className="svg-icon icon-upi">
                                    <use href="#icon-upi" />
                                </svg>Information UPI</div>
                                <div data-v-8ced09ab="" className="addupi_C-title">phone number</div>
                                <div data-v-8ced09ab="" className="addupi_C_number">
                                    <div data-v-8ced09ab="" className="van-cell van-field upi-input number"
                                        modelmodifiers="[object Object]"><div className="van-cell__value van-field__value">
                                            <div className="van-field__body"><input type="text" id="van-field-12-input"
                                                className="van-field__control"
                                                placeholder="Please enter the phone number"
                                                name="phoneNumber"
                                                value={formData.phoneNumber}
                                                onChange={handleChange}
                                                disabled={loading}
                                                maxLength={10}
                                                data-allow-mismatch="attribute" /></div>
                                        </div></div>
                                </div>
                                <div data-v-8ced09ab="" className="tip"><i data-v-8ced09ab=""
                                    className="van-badge__wrapper van-icon van-icon-warning-o" style={{ fontSize: 14 }}></i>For the security of your account, please fill in your real mobile phone number</div>
                                <div data-v-8ced09ab="" className="addupi_C-title">UPI ID</div>
                                <div data-v-8ced09ab="" className="van-cell van-field upi-input" modelmodifiers="[object Object]">{
                                    /**/}<div className="van-cell__value van-field__value">
                                        <div className="van-field__body"><input type="text" id="van-field-13-input"
                                            className="van-field__control"
                                            placeholder="Please enter your UPI ID"
                                            name="upiId"
                                            value={formData.upiId}
                                            onChange={handleChange}
                                            disabled={loading}
                                            maxLength={50}
                                            data-allow-mismatch="attribute" /></div>
                                    </div></div>
                            </div>
                        )}

                        {/* USDT SECTION - Show only if usdt selected */}
                        {selectedMethod === 'usdt' && (
                            <div data-v-1726638e="" className="addBankCard__container-content-item">
                                <div data-v-1726638e="" className="label"><svg data-v-1726638e="" className="svg-icon icon-usdt"><use href="#icon-usdt" /></svg> USDT Wallet Address</div>
                                <input
                                    data-v-1726638e=""
                                    type="text"
                                    name="usdtAddress"
                                    placeholder="e.g., 1A2B3C4D5E6F7G8H9I0J1K2L3M4N"
                                    maxLength={100}
                                    value={formData.usdtAddress}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <small style={{ color: '#666', marginTop: '4px', display: 'block' }}>Format: At least 26 characters</small>
                            </div>
                        )}

                        {message && <div style={{ padding: '14px 12px', textAlign: 'center', marginTop: '15px', fontSize: '15px', fontWeight: '500', color: messageType === 'success' ? '#28a745' : '#f44336', backgroundColor: messageType === 'success' ? '#d4edda' : '#f8d7da', border: `2px solid ${messageType === 'success' ? '#28a745' : '#f44336'}`, borderRadius: '6px' }}>{message}</div>}

                        <div data-v-1726638e="" className="addBankCard__container-content-btn" style={{ marginTop: '20px' }}>
                            <button
                                data-v-1726638e=""
                                onClick={handleSubmit}
                                disabled={loading}
                                style={{ cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
                            >
                                {loading ? '⏳ Saving...' : isEditMode ? '✏️ Update Beneficiary' : `➕ Add ${selectedMethod === 'bank_card' ? 'Bank' : selectedMethod === 'upi' ? 'UPI' : selectedMethod === 'arpay' ? 'ARPay' : 'USDT'}`}
                            </button>
                        </div>

                        {isEditMode && (
                            <div style={{ padding: '10px', textAlign: 'center', marginTop: '10px' }}>
                                <button
                                    onClick={handleCancelEdit}
                                    style={{ padding: '10px 20px', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* SHOW CARD IF: Beneficiary exists AND not in edit mode */}
                {beneficiary && !isEditMode && (
                    <div data-v-9ed9b8ef="" className="bankCard__container-content__item">
                        <div data-v-9ed9b8ef="" className="van-radio-group" role="radiogroup">
                            <div data-v-9ed9b8ef="" className="bankCard__container-content__card">
                                <div data-v-9ed9b8ef="" className="bankCard__container-content__card-top" />
                                <div data-v-9ed9b8ef="" className="bankCard__container-content__card-mid">
                                    {beneficiary.fullName && (
                                        <div data-v-9ed9b8ef="" className="line">
                                            <div data-v-9ed9b8ef="" className="left">Full name</div>
                                            <div data-v-9ed9b8ef="" className="right">{beneficiary.fullName}</div>
                                        </div>
                                    )}
                                    {selectedMethod === 'bank_card' && beneficiary.bankName && (
                                        <>
                                            <div data-v-9ed9b8ef="" className="line">
                                                <div data-v-9ed9b8ef="" className="left">Bank name</div>
                                                <div data-v-9ed9b8ef="" className="right">{beneficiary.bankName}</div>
                                            </div>
                                            <div data-v-9ed9b8ef="" className="line">
                                                <div data-v-9ed9b8ef="" className="left">Bank account number</div>
                                                <div data-v-9ed9b8ef="" className="right">
                                                    {beneficiary.accountNumber && beneficiary.accountNumber.length > 4
                                                        ? beneficiary.accountNumber.slice(0, -4).replace(/./g, '*') + beneficiary.accountNumber.slice(-4)
                                                        : beneficiary.accountNumber
                                                    }
                                                </div>
                                            </div>
                                            <div data-v-9ed9b8ef="" className="line">
                                                <div data-v-9ed9b8ef="" className="left">IFSC Code</div>
                                                <div data-v-9ed9b8ef="" className="right">{beneficiary.ifscCode}</div>
                                            </div>
                                        </>
                                    )}
                                    {(selectedMethod === 'upi' || selectedMethod === 'arpay') && beneficiary.phoneNumber && (
                                        <>
                                            <div data-v-9ed9b8ef="" className="line">
                                                <div data-v-9ed9b8ef="" className="left">Phone Number</div>
                                                <div data-v-9ed9b8ef="" className="right">{beneficiary.phoneNumber}</div>
                                            </div>
                                            <div data-v-9ed9b8ef="" className="line">
                                                <div data-v-9ed9b8ef="" className="left">UPI ID</div>
                                                <div data-v-9ed9b8ef="" className="right">{beneficiary.upiId}</div>
                                            </div>
                                        </>
                                    )}
                                    {selectedMethod === 'usdt' && beneficiary.usdtAddress && (
                                        <div data-v-9ed9b8ef="" className="line">
                                            <div data-v-9ed9b8ef="" className="left">USDT Wallet</div>
                                            <div data-v-9ed9b8ef="" className="right">
                                                {beneficiary.usdtAddress.length > 8
                                                    ? beneficiary.usdtAddress.slice(0, 4) + '****' + beneficiary.usdtAddress.slice(-4)
                                                    : beneficiary.usdtAddress
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div data-v-9ed9b8ef="">
                                    <button
                                        onClick={handleEditClick}
                                        style={{ padding: '10px 20px', backgroundColor: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%', marginTop: '10px' }}
                                    >
                                        ✏️ Edit Beneficiary
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </>
    );
};

export default AddBeneficiary;

