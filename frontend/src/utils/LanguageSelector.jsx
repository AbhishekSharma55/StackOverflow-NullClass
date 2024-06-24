import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import { useState } from "react";
import axios from "axios";
import { getCurrentUser } from "./CurrentUser";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const showAlert = useAlert();
  const [token, setToken] = useState("");
  const [frenchSelected, setFrenchSelected] = useState(false);
  const [generateOTPBUtton, setGenerateOTPButton] = useState(false);
  const [verifyOTPButton, setVerifyOTPButton] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { t } = useTranslation();
  const [otp, setOtp] = useState("");

  const Languages = [
    { code: "en", lang: "English" },
    { code: "fr", lang: "French" },
    { code: "hi", lang: "Hindi" },
    { code: "es", lang: "Spanish" },
    { code: "pt", lang: "Portuguese" },
    { code: "zh", lang: "Chinese" },
  ];

  const changeLanguage = (languageCode, languageName) => {
    if (languageCode === "fr") {
      setFrenchSelected(true);
      setGenerateOTPButton(true);
    } else {
      i18n.changeLanguage(languageCode);
      showAlert("Language changed to " + languageName, "success");
      localStorage.setItem("language", languageCode);
      navigate("/");
    }
  };

  const GenerateOTP = async (e) => {
    e.preventDefault();
    try {
      const user = await getCurrentUser();
      const response = await axios.post(`${apiUrl}/api/auth/generateotp`, {
        email: user.email,
      });
      if (!response.data.err) {
        setToken(response.data.token);
        setGenerateOTPButton(false);
        setVerifyOTPButton(true);
        showAlert("OTP sent to your email.", "success");
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (err) {
      showAlert("Login failed. Please try again.", "error");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/verify-otp-change-language`,
        {
          otp,
          token,
        }
      );
      if (!response.data.err) {
        i18n.changeLanguage("fr");
        showAlert("Language changed to French", "success");
        localStorage.setItem("language", "fr");
        navigate("/");
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (err) {
      showAlert("Login failed. Please try again.", "error");
    }
  };

  return (
    <div className="border border-gray-400 rounded-lg">
      <h4 className="text-center align-middle h-full text-4xl my-4 mx-4">
        Select your language
      </h4>
      <div className="flex m-5 p-4">
        <ul className="grid md:flex w-full text-center justify-center gap-4">
          {Languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code, language.lang)}
              className={i18n.language === language.code ? "selected" : ""}
            >
              <div className="px-4 mx-2 text-lg border border-gray-600 rounded-sm">
                {language.lang}
              </div>
            </button>
          ))}
        </ul>
      </div>
      {frenchSelected && (
        <div className="text-center mx-10 mb-10">
          <h1 className="text-xl">
            Changing Language to French needs OTP verfication.
          </h1>
          <form className="space-y-4 mt-4 md:mx-10" onSubmit={handleVerifyOtp}>
            {generateOTPBUtton ? (
              <button
                onClick={GenerateOTP}
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                Generate OTP
              </button>
            ) : (
              <div>
                <p className="text-xl font-bold ">
                  OTP Send to Your Email Address.
                </p>
              </div>
            )}
            {verifyOTPButton && (
              <div className="grid gap-2">
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="border p-2 rounded w-full"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-2 rounded"
                >
                  {t("VerifyOTP")}
                </button>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
