// Environment Configuration
// Remove trailing slash from API URL if present
const RAW_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const API_BASE_URL = RAW_API_URL.endsWith('/') ? RAW_API_URL.slice(0, -1) : RAW_API_URL;
const NODE_ENV = process.env.NODE_ENV || "development";
const API_TIMEOUT = 10000; // 10 seconds

const config = {
  API_BASE_URL,
  NODE_ENV,
  API_TIMEOUT,
  
  // API Endpoints
  ENDPOINTS: {
    // User Authentication
    SIGNUP: "/api/user/newuser",
    LOGIN: "/api/user/userlogin",
    
    // Betting
    BET: "/api/Bet",
    BET_HISTORY: "/api/userbethistory",
    BET_HISTORY_3MIN: "/api/userbethis3min",
    
    // Game History
    HISTORY_1MIN: "/api/history",
    HISTORY_30SEC: "/api/history30sec",
    HISTORY_3MIN: "/api/history3min",
    HISTORY_5MIN: "/api/history5min",
    HISTORY_GET_ITEMS: "/api/history/getwingoitems",
    HISTORY_GET_ITEMS_30SEC: "/api/history30sec/getwingoitems",
    HISTORY_GET_ITEMS_3MIN: "/api/history3min/getwingoitems",
    HISTORY_GET_ITEMS_5MIN: "/api/history5min/getwingoitems",
    HISTORY_GET_LAST_ITEM: "/api/history/getlastwingoitem",
    BET_CONTROL: "/api/betcontrol",
    BET_CONTROL_30SEC: "/api/wingo30secbetcontrol",
    BET_CONTROL_3MIN: "/api/wingo3minbetcontrol",
    BET_CONTROL_5MIN: "/api/wingo5minbetcontrol",
    
    // Betting
    BET_HISTORY_ADD: "/api/userbethistory/adduserbethis",
    BET_HISTORY_GET: "/api/userbethistory/getuserbethis",
    
    // Promotion & Referral
    PROMO_STATS: "/api/promotion/mypromo",
    PROMO_SUBORDINATES: "/api/promotion/subordinates",
    PROMO_COMMISSION_HISTORY: "/api/promotion/commission-history",
    
    // Health Check
    HEALTH: "/health",
  },
  
  // API Response Status Codes
  STATUS: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
  
  // Local Storage Keys
  STORAGE_KEYS: {
    TOKEN: "token",
    USER_INFO: "userInfo",
    BALANCE: "userBalance",
  },
};

export default config;
