import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempToken, setTempToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setTempToken(token);
  };

  const verifyOtp = (otpToken) => {
    localStorage.setItem('token', otpToken);
    localStorage.removeItem('tempToken');
    setTempToken(null);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const completeLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, verifyOtp, logout, tempToken ,completeLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
