import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { login , completeLogin} = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const showAlert = useAlert();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email,
        password,
      });
      if (!response.data.err) {
        setToken(response.data.token);
        setShowOtpInput(true);
        showAlert("OTP sent to your email.", "success");
      } else {
        showAlert("Login failed. Please try again.", response.data.err);
      }
    } catch (err) {
      showAlert("Login failed. Please try again.", "error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/verify-otp`, {
        token,
        otp,
      });

      if (!response.err) {
        login(response.data.authToken);
        completeLogin();
        navigate("/", { replace: true });
        showAlert("Logged in successfully!", "success");
      } else {
        showAlert("Invalid OTP. Please try again.", "error");
      }
    } catch (err) {
      showAlert("Verification failed. Please try again.", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <h2 className="text-2xl">Sign in to your account</h2>
          {showOtpInput ? (
            <form className="space-y-4 mt-4" onSubmit={handleVerifyOtp}>
              <div className="grid gap-2">
                <label htmlFor="otp">OTP</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="border p-2 rounded w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                Verify OTP
              </button>
            </form>
          ) : (
            <form className="space-y-4 mt-4" onSubmit={handleLogin}>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border p-2 rounded w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="border p-2 rounded w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                Sign in
              </button>
            </form>
          )}
          <div>
            <p className="mt-4">
              Forgot your password?{" "}
              <Link to="/forgot-password" className="text-orange-500">
                Reset here
              </Link>
            </p>
            <p className="mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange-500">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
