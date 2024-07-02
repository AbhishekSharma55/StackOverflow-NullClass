import { useAlert } from "../context/AlertContext";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [email, setEmail] = useState("");
  const [showResetPasswordForm, setShowResetPasswordForm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const showAlert = useAlert();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${apiUrl}/api/auth/reset-password`, {
      email,
    });
    if (!response.data.err) {
      setShowOtpInput(true);
      setToken(response.data.token);
      showAlert(response.data.msg, "success");
    } else {
      showAlert(response.data.err, "error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/verify-otp-forgot-password`, {
        token,
        otp,
      });

      if (!response.data.err) {
        setShowResetPasswordForm(true);
        showAlert("You can Reset you Password !", "success");
      } else {
        showAlert(response.data.err , "error");
      }
    } catch (err) {
      showAlert("Verification failed. Please try again.", "error");
    }
  };


  const handleUpdatePassword = async (e) =>{
    e.preventDefault();
    if(password !== confirmPassword){
      showAlert("Passwords do not match", "error");
      return;
    }
    const response = await axios.post(`${apiUrl}/api/auth/update-password`, {
      token,
      password,
    });
    if (!response.data.err) {
      showAlert(response.data.msg, "success");
      navigate("/login", { replace: true });
    } else {
      showAlert(response.data.err, "error");
    }
  }

  return (
    <div className="p-20">
      <center>
        <h1 className="text-2xl mb-5">{t("ResetPassword")}</h1>
        {!showResetPasswordForm ? (
          !showOtpInput ? (
            <form onSubmit={handleResetPassword} className="grid gap-10">
              <div>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border p-2 rounded w-full"
                  required={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                {t("ResetPassword")}
              </button>
            </form>
          ) : (
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
              <button
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                {t("VerifyOTP")}
              </button>
            </form>
          )
        ) : (
          <form className="space-y-4 mt-4" onSubmit={handleUpdatePassword}>
            <div className="grid gap-2">
              <label htmlFor="password">{t("Password")}</label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                className="border p-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="confirmPassword">{t("ConfirmPassword")}</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="border p-2 rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded"
            >
              {t("ResetPassword")}
            </button>
          </form>
        )}
      </center>
    </div>
  );
};

export default ResetPassword;
