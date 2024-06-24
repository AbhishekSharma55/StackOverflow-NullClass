import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { t } from "i18next";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const showAlert = useAlert();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("tempToken");
    try {
      const response = await axios.post(`${apiUrl}/api/auth/verify-otp`, { token, otp });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.authToken);
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
          <h2 className="text-2xl">{t("VerifyOTP")}</h2>
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
            <button type="submit" className="w-full bg-orange-500 text-white p-2 rounded">
              {t("VerifyOTP")}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VerifyOtp;