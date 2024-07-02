import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAlert } from "../context/AlertContext";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;
  const showAlert = useAlert();
  const {t} = useTranslation();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/signup`,
        {
          username: name,
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Assuming 200 OK is the success status code
        localStorage.setItem("token", response.data.token);
        navigate("/", { replace: true });
        showAlert("Signed up successful !", "success");
      } else {
        setError("Signup failed. Please try again.");
        showAlert("Signed up failed. Please try again.", "error");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An error occurred. Please try again later.");
        showAlert("Signed up failed. Please try again.", "error");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <img
              src="/minimallogo.png"
              alt="StackOverflow Logo"
              width={40}
              height={40}
            />
            <h2 className="text-2xl">{t("CreateAccount")}</h2>
            <p>{t("EnterDetailsToSignUp")}</p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4 mt-4" onSubmit={handleSignup}>
            <div className="grid gap-2">
              <label htmlFor="name">{t("Name")}</label>
              <input
                id="name"
                placeholder="Enter your full name"
                className="border p-2 rounded w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                placeholder="Enter a password"
                className="border p-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="confirm-password">{t("ConfirmPassword")}</label>
              <input
                id="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="border p-2 rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 text-white p-2 rounded"
              >
                SignUp
              </button>
              <div className="text-sm text-gray-500">
                {t("AlreadyHaveAnAccount")}{" "}
                <Link
                  to="/login"
                  className="font-medium text-gray-900 hover:underline"
                >
                  {t("SignIn")}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
