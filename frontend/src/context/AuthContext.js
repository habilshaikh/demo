import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('wynora_token'));

  // Setup axios interceptor
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('wynora_token');
      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }
      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  // Check token on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('wynora_token');
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setUser(response.data);
          setToken(storedToken);
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('wynora_token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('wynora_token', access_token);
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const signup = async (email, password, full_name) => {
    const response = await axios.post(`${API_URL}/api/auth/signup`, { email, password, full_name });
    const { access_token, user: userData } = response.data;
    localStorage.setItem('wynora_token', access_token);
    setToken(access_token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('wynora_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const forgotPassword = async (email) => {
    const response = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
    return response.data;
  };

  const resetPassword = async (email, reset_code, new_password) => {
    const response = await axios.post(`${API_URL}/api/auth/reset-password`, { 
      email, 
      reset_code, 
      new_password 
    });
    return response.data;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      login, 
      signup, 
      logout, 
      updateUser,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
