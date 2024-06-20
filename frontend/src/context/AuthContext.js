import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tempToken, setTempToken] = useState(null);
  const [currentToken , setCurrentToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCurrentToken(token);
      setIsLoggedIn(true);
    }
  }, []);
  
  const login = (token) => {
    localStorage.setItem('token', token);
    setTempToken(token);
    setCurrentToken(token);
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
    <AuthContext.Provider value={{ isLoggedIn, login, verifyOtp, logout, tempToken ,completeLogin , currentToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
