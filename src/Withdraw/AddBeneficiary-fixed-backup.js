import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../Context/MyContext';

const AddBeneficiary = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [token, setToken] = useState(null);
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
        const storedToken = localStorage.getItem('token');
        const storedMethod = localStorage.getItem('selectedWithdrawMethod');

        console.log('🔍 Token:', storedToken ? 'Found' : 'Missing');
        console.log('🔍 Method:', storedMethod);

        if (!storedToken) {
            setMessage('Authentication required. Please login.');
            setMessageType('error');
            setTimeout(() => navigate('/login'), 2000);
        } else {
            setToken(storedToken);
            setSelectedMethod(storedMethod || 'upi');
            fetchBeneficiary(storedToken, storedMethod || 'upi');
        }
    }, [navigate]);

    useEffect(() => {
        if (token && selectedMethod && !isEditMode) {
            fetchBeneficiary(token, selectedMethod);
        }
    }, [selectedMethod]);

    const fetchBeneficiary = async (token, method = selectedMethod) => {
        try {
            setFetchingBeneficiary(true);
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';
            console.log('🔍 Fetching beneficiary:', `${API_BASE_URL}api/withdraw/beneficiary?method=${method}`);
            
            const response = await fetch(`${API_BASE_URL}api/withdraw/beneficiary?method=${method}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('🔍 GET Response status:', response.status);
            const data = await response.json();
            console.log('🔍 GET Response data:', data);

            if (response.ok) {
                if (data.beneficiary) {
                    setBeneficiary(data.beneficiary);
                    setIsEditMode(false);
                } else {
                    setBeneficiary(null);
                }
            } else {
                console.error('GET Error:', data.error || data.message);
            }
        } catch (error) {
            console.error('GET Fetch error:', error);
        } finally {
            setFetchingBeneficiary(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value.trim();

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
            const phone = formData.phoneNumber.replace(/\\D/g, '');
            if (!/^\\d{10}$/.test(phone)) {
                setMessage('Phone must be 10 digits');
                setMessageType('error');
                return false;
            }
            if (!formData.upiId.trim()) {
                setMessage('UPI ID is required');
                setMessageType('error');
                return false;
            }
            if (!/^[a-zA-Z0-9.-]+@[a-zA-Z][a-zA-Z\\d.-]*\\.[a-zA-Z]{2,}$/.test(formData.upiId)) {
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

        if (!token) {
            setMessage('No auth token - please login');
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://daman-games-47sx.onrender.com/';
            const submitData = { 
                fullName: formData.fullName.trim(),
                method: selectedMethod 
            };

            if (selectedMethod === 'bank_card') {
                submitData.bankName = formData.bankName.trim();
                submitData.accountNumber = formData.accountNumber.trim();
                submitData.ifscCode = formData.ifscCode.trim().toUpperCase();
            } else if (selectedMethod === 'upi' || selectedMethod === 'arpay') {
                submitData.phoneNumber = formData.phoneNumber.replace(/\\D/g, '');
                submitData.upiId = formData.upiId.trim();
            } else if (selectedMethod === 'usdt') {
                submitData.usdtAddress = formData.usdtAddress.trim();
            }

            console.log('🔍 POST Data:', submitData);
            console.log('🔍 POST URL:', `${API_BASE_URL}api/withdraw/beneficiary`);

            const response = await fetch(`${API_BASE_URL}api/withdraw/beneficiary`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();
            console.log('🔍 POST Response:', response.status, data);

            if (response.ok) {
                setMessage(data.message || '✅ Beneficiary saved successfully!');
                setMessageType('success');
                fetchBeneficiary(token);
                
                const resetFields = { fullName: '' };
                if (selectedMethod === 'bank_card') Object.assign(resetFields, { bankName: '', accountNumber: '', ifscCode: '' });
                else if (selectedMethod === 'upi' || selectedMethod === 'arpay') Object.assign(resetFields, { phoneNumber: '', upiId: '' });
                else if (selectedMethod === 'usdt') resetFields.usdtAddress = '';
                
                setFormData(prev => ({ ...prev, ...resetFields }));
            } else {
                const errorMsg = data.error || data.message || `Server error (${response.status})`;
                console.error('POST Error:', errorMsg);
                setMessage(errorMsg);
                setMessageType('error');
            }
        } catch (error) {
            console.error('POST Fetch error:', error);
            setMessage(`Network error: ${error.message}`);
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
                {/* Full JSX from original - omitted for brevity in backup, but complete in actual */}  
            </div>
        </>
    );
};

export default AddBeneficiary;
