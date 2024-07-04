import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import QuestionDetail from "./components/QuestionDetail";
import CommonBar from "./components/common/CommonBar";
import AskQuestion from "./pages/AskQuestion";
import AuthProvider from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import VerifyOtp from "./pages/ConfirmOTP";
import ResetPassword from "./pages/ResetPassword";
import "./i18next";
import TEST from "./pages/TEST";
import i18next from "i18next";

const root = ReactDOM.createRoot(document.getElementById("root"));
if (localStorage.getItem("language"))
  i18next.changeLanguage(localStorage.getItem("language"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <AlertProvider>
        <CommonBar />
        <div className="pt-10 md:pl-80 md:pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TEST />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/users" element={<Users />} />
            <Route path="/MyProfile" element={<EditUser />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ResetPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/askquestion" element={<AskQuestion />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
          </Routes>
        </div>
      </AlertProvider>
    </AuthProvider>
  </BrowserRouter>
);

reportWebVitals();
