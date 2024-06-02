import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import QuestionDetail from "./components/QuestionDetail";
import CommonBar from "./components/CommonBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CommonBar />
    <div className="pl-80 pt-12">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </div>
  </BrowserRouter>
);

reportWebVitals();