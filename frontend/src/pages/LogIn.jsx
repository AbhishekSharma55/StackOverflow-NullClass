import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { useTranslation } from "react-i18next";
import BrowserDetector from "./TypeOfBrowser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { login, completeLogin } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;
  const showAlert = useAlert();
  const { t } = useTranslation();
  const browser = BrowserDetector();
  const currentHour = new Date().getHours();

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (browser === "Microsoft Edge") {
      try {
        const response = await axios.post(
          `${apiUrl}/api/auth/no-otp-required`,
          {
            email,
            password,
            browser,
          }
        );

        if (!response.data.err) {
          login(response.data.authToken);
          completeLogin();
          navigate("/", { replace: true });
          showAlert("Logged in successfully!", "success");
        } else {
          showAlert("Some Unexpected Error Occured !", "error");
        }
      } catch (err) {
        showAlert("Verification failed. Please try again.", "error");
      }
      finally{
        setLoading(false);
      }
    } else {
      try {
        const response = await axios.post(`${apiUrl}/api/auth/login`, {
          email,
          password,
          currentHour,
        });
        if (!response.data.err) {
          setToken(response.data.token);
          setShowOtpInput(true);
          showAlert("OTP sent to your email.", "success");
        } else {
          showAlert(response.data.err, "error");
        }
      } catch (err) {
        showAlert("Login failed. Please try again.", "error");
      }
      finally{
        setLoading(false);
      }
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/verify-otp`, {
        token,
        otp,
        browser,
      });

      if (!response.data.err) {
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
          <h2 className="text-2xl">{t("SignInToYourAccount")}</h2>
          {showOtpInput ? (
            <form className="space-y-4 mt-4" onSubmit={handleVerifyOtp}>
              <div className="grid gap-2">
                <label htmlFor="otp">{t("OTP")}</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="border p-2 rounded w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="w-full bg-orange-400 text-white p-2 rounded"
                  disabled={true}
                >
                  {t("VerifyOTP")}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-2 rounded"
                >
                  {t("VerifyOTP")}
                </button>
              )}
            </form>
          ) : (
            <form className="space-y-4 mt-4" onSubmit={handleLogin}>
              <div className="grid gap-2">
                <label htmlFor="email">{t("Email")}</label>
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
                <label htmlFor="password">{t("Password")}</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="border p-2 rounded w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loading ? (
                <button
                  type="submit"
                  className="w-full bg-orange-400 text-white p-2 rounded"
                  disabled={true}
                >
                  {t("SignIn")}
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-2 rounded"
                >
                  {t("SignIn")}
                </button>
              )}
            </form>
          )}
          <div>
            <p className="mt-4">
              {t("ForgotYourPassword")}{" "}
              <Link to="/forgot-password" className="text-orange-500">
                {t("ResetPassword")}
              </Link>
            </p>
            <p className="mt-4">
              {t("DontHaveAnAccount")}{" "}
              <Link to="/signup" className="text-orange-500">
                {t("RegisterHere")}
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
