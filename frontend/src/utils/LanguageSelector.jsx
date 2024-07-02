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
  const [tokenForEmailOTP, setTokenForEmailOTP] = useState("");
  const [tokenForPhoneOTP, setTokenForPhoneOTP] = useState("");
  const [selectedLanguageName, setSelectedLanguageName] = useState("English");
  const [selectedLanguageCode, setSelectedLanguageCode] = useState("English");
  const [frenchSelected, setFrenchSelected] = useState(false);
  const [generateOTPBUttonForFrench, setGenerateOTPButtonForFrench] = useState(false);
  const [languageChanged, setLanguageChanged] = useState(false);
  const [generatePhoneOTPButton, setGeneratePhoneOTPButton] = useState(false);
  const [verifyOTPButtonForFrench, setVerifyOTPButtonForFrench] = useState(false);
  const [verifyOTPButton, setVerifyOTPButton] = useState(false);
  const [OTPForEmail, setOTPForEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [OTPForPhone, setOTPForPhone] = useState("");
  const { t } = useTranslation();
  const apiUrl = process.env.REACT_APP_API_URL;

  const Languages = [
    { code: "en", lang: "English" },
    { code: "fr", lang: "French" },
    { code: "hi", lang: "Hindi" },
    { code: "es", lang: "Spanish" },
    { code: "pt", lang: "Portuguese" },
    { code: "zh", lang: "Chinese" },
  ];

  const changeLanguage = (languageCode, languageName) => {
    setSelectedLanguageName(languageName);
    setSelectedLanguageCode(languageCode);
    if (languageCode === localStorage.getItem("i18nextLng")) {
      showAlert("Language already selected", "success");
      console.log("Language already selected");
      setLanguageChanged(false);
      setGeneratePhoneOTPButton(false);
      setFrenchSelected(false);
      setGenerateOTPButtonForFrench(false);
      // i18n.changeLanguage(languageCode);
      // showAlert("Language changed to " + languageName, "success");
      // localStorage.setItem("language", languageCode);
      // navigate("/");
    }
    else if (languageCode === "fr") {
      setFrenchSelected(true);
      setGenerateOTPButtonForFrench(true);
      setLanguageChanged(false);
      setGeneratePhoneOTPButton(false);
    }
     else {
      setLanguageChanged(true);
      setGeneratePhoneOTPButton(true);
      setFrenchSelected(false);
      setGenerateOTPButtonForFrench(false);
    }
  };

  const GenerateOTPForFrench = async (e) => {
    e.preventDefault();
    try {
      const user = await getCurrentUser();
      const response = await axios.post(`${apiUrl}/api/auth/emailotp`, {
        email: user.email,
      });
      if (!response.data.err) {
        console.log(response.data.token)
        setTokenForEmailOTP(response.data.token);
        setGenerateOTPButtonForFrench(false);
        setVerifyOTPButtonForFrench(true);
        showAlert("OTP sent to your email.", "success");
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (err) {
      showAlert("Login failed. Please try again.", "error");
    }
  };

  const handleVerifyOtpForFrench = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/verify-otp-email`,
        {
          OTPForEmail,
          tokenForEmailOTP,
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

  const GenerateOTPForPhone = async (e) => {
    e.preventDefault();
    try {
      const user = await getCurrentUser();
      const response = await axios.post(`${apiUrl}/api/auth/phoneotp`, {
        phoneNumber: phoneNumber,
        email: user.email,
      });
      if (!response.data.err) {
        setTokenForPhoneOTP(response.data.token);
        setGeneratePhoneOTPButton(false);
        setVerifyOTPButton(true);
        showAlert("OTP sent to your Phone Number.", "success");
      } else {
        showAlert(response.data.err, "error");
      }
    } catch (err) {
      showAlert("Login failed. Please try again.", "error");
    }
  };

  const handleVerifyOTPForPhone = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/verify-otp-phone-number`,
        {
          OTPForPhone,
          tokenForPhoneOTP,
        }
      );
      if (!response.data.err) {
        i18n.changeLanguage("fr");
        showAlert(`Language changed to ${selectedLanguageName}`, "success");
        localStorage.setItem("language", selectedLanguageCode);
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
        {t("SelectLanguage")}
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
           {t("ChangeLanguageEmailOTP")}
          </h1>
          <form
            className="space-y-4 mt-4 md:mx-10"
            onSubmit={handleVerifyOtpForFrench}
          >
            {generateOTPBUttonForFrench ? (
              <button
                onClick={GenerateOTPForFrench}
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                {t("GenerateOTP")}
              </button>
            ) : (
              <div>
                <p className="text-xl font-bold ">
                  {t("OTPSendEmail")}
                </p>
              </div>
            )}
            {verifyOTPButtonForFrench && (
              <div className="grid gap-2">
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="border p-2 rounded w-full"
                  value={OTPForEmail}
                  onChange={(e) => setOTPForEmail(e.target.value)}
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
      {languageChanged && (
        <div className="text-center mx-10 mb-10">
          {generatePhoneOTPButton ? (
            <form onSubmit={GenerateOTPForPhone}>
          <h1 className="text-xl">
            {t("ChangeLanguagePhoneOTP")}
          </h1>
              <input
                className="border border-black w-full py-2 my-5"
                placeholder="Phone Number (+91)"
                required
                type="number"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
              ></input>
              <button
                // onClick={GenerateOTP}
                type="submit"
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                {t("GenerateOTP")}
              </button>
            </form>
          ) : (
            <div>
              <p className="text-xl font-bold ">
                {t("OTPSendPhone")}
              </p>
            </div>
          )}
          {verifyOTPButton && (
            <form
              className="space-y-4 mt-4 md:mx-10"
              onSubmit={handleVerifyOTPForPhone}
            >
              <div className="grid gap-2">
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="border p-2 rounded w-full"
                  value={OTPForPhone}
                  onChange={(e) => setOTPForPhone(e.target.value)}
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-2 rounded"
                >
                  {t("VerifyOTP")}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
