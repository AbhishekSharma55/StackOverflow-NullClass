import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import QuestionDetail from "./components/QuestionDetail";
import CommonBar from "./components/CommonBar";
import AskQuestion from "./pages/AskQuestion";
import AuthProvider from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Tags from "./pages/Tags";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import VerifyOtp from "./pages/ConfirmOTP";
import ResetPassword from "./pages/ResetPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <AlertProvider>
        <CommonBar />
        <div className="pt-10 md:pl-80 md:pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/users" element={<Users />} />
            <Route path="/user/:id" element={<EditUser />} />
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
