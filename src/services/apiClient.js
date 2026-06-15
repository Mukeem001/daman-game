import config from '../config/config';

class APIClient {
  constructor() {
    this.baseURL = config.API_BASE_URL;
    this.timeout = config.API_TIMEOUT;
  }

  // Get token from localStorage
  getToken() {
    return localStorage.getItem('autotoken') || localStorage.getItem('token');
  }

  // Set Authorization header
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  // Make request with timeout
  async request(method, endpoint, data = null, customTimeout = null) {
    const url = `${this.baseURL}${endpoint}`;
    const timeout = customTimeout || this.timeout;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const options = {
        method,
        headers: this.getHeaders(),
        signal: controller.signal,
      };

      if (data && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(data);
      }

      if (config.NODE_ENV === 'development') {
        console.log(`[API Request] ${method} ${endpoint}`, data);
      }

      const response = await fetch(url, options);
      const result = await response.json();

      if (config.NODE_ENV === 'development') {
        console.log(`[API Response] ${method} ${endpoint}`, result);
      }

      // Handle 401 - Unauthorized (token expired)
      if (response.status === 401) {
        localStorage.removeItem('autotoken');
        localStorage.removeItem('token');
        // Optionally redirect to login
        window.location.href = '/login';
      }

      if (!response.ok) {
        throw new Error(result.message || result.error?.message || `HTTP ${response.status}`);
      }

      return result;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }

      console.error(`[API Error] ${method} ${endpoint}:`, error.message);
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  // HTTP Methods
  async get(endpoint) {
    return this.request('GET', endpoint);
  }

  async post(endpoint, data) {
    return this.request('POST', endpoint, data);
  }

  async put(endpoint, data) {
    return this.request('PUT', endpoint, data);
  }

  async delete(endpoint) {
    return this.request('DELETE', endpoint);
  }

  // Auth API Methods
  auth = {
    signup: (userData) =>
      this.post(config.ENDPOINTS.SIGNUP, userData),
    login: (credentials) =>
      this.post(config.ENDPOINTS.LOGIN, credentials),
    logout: () => {
      localStorage.removeItem('autotoken');
      localStorage.removeItem('token');
    },
  };

  // Betting API Methods
  betting = {
    getBetHistory: () =>
      this.get(config.ENDPOINTS.BET_HISTORY),
    getBetHistory3Min: () =>
      this.get(config.ENDPOINTS.BET_HISTORY_3MIN),
    getBetControl: () =>
      this.get(config.ENDPOINTS.BET_CONTROL),
    getBetControl3Min: () =>
      this.get(config.ENDPOINTS.BET_CONTROL_3MIN),
    placeBet: (betData) =>
      this.post(config.ENDPOINTS.BET, betData),
  };

  // History API Methods
  history = {
    getHistory1Min: () =>
      this.get(config.ENDPOINTS.HISTORY_1MIN),
    getHistory3Min: () =>
      this.get(config.ENDPOINTS.HISTORY_3MIN),
  };

  // Payment API Methods
  payment = {
    getAddresses: () =>
      this.get(config.ENDPOINTS.ADDRESS),
    processPayment: (paymentData) =>
      this.post(config.ENDPOINTS.PAYMENT, paymentData),
  };
}

// Export as singleton
export default new APIClient();
