import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const apiUrl = process.env.REACT_APP_API_URL;


  const showAlert = useAlert();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/auth/login`,
        { email, password }
      );

      if (response.status === 200) {
        login(response.data.token);
        navigate("/", { replace: true });
        showAlert("Logged in successful !", "success");
      } else {
        setError("Login failed. Please try again.");
        showAlert("Login failed. Please try again.", "error");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An error occurred. Please try again later.");
        showAlert("Login failed. Please try again.", "error");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <img
              src="/minimallogo.png"
              alt="StackOverflow Logo"
              width={40}
              height={40}
            />
            <h2 className="text-2xl">Sign in to your account</h2>
            <p>Enter your email and password below to access your account.</p>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form className="space-y-4 mt-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <label htmlFor="email">Email or Username</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email or username"
                className="border p-2 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password">Password</label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border p-2 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 text-white p-2 rounded"
              >
                Sign in
              </button>
              <div className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-gray-900 hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
