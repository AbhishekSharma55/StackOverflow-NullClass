import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";
import LanguageSelector from "../utils/LanguageSelector";
import { useTranslation } from "react-i18next";

const EditUser = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userName, setUserName] = useState("");
  const [userLog, setUserLog] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const showAlert = useAlert();
  const {t} = useTranslation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        };
        const response = await axios.get(`${apiUrl}/api/auth/MyProfile`, config);
        if (response.data.err) {
          showAlert(response.data.err, "error");
          if(response.data.err === "Session Expired , Please Login Again.")
          {
            navigate('/login');
          }
          return;
        }

        setUserName(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    // eslint-disable-next-line
  }, [ apiUrl , navigate ]);

  useEffect(() => {
    const fetchUserLog = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        showAlert("You need to login to view your account", "error");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(`${apiUrl}/api/user/loginactivity`, config);
        if (response.data.err) {
          showAlert(response.data.err, "error");
          return;
        }
        setUserLog(response.data.logs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserLog();
    // eslint-disable-next-line
  }, [ apiUrl, navigate]);

  const submitChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      showAlert("You need to login to update your account", "error");
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.put(
        `${apiUrl}/api/user/update`,
        {
          userName: userName,
          email: email,
        },
        config
      );
      showAlert("User updated successfully", "success");
      navigate("/");
    } catch (error) {
      showAlert("Error updating user", "error");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col p-10 w-full gap-20">
      <h2 className="text-4xl text-center">{t("UpdateYourAccount")}</h2>
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <p>
              {t("OverwriteAndUpdateDetails")}
            </p>
          </div>
          <form className="space-y-4 mt-4" onSubmit={submitChanges}>
            <div className="h-20 w-20 bg-orange-300 rounded border flex items-center justify-center text-7xl border-black text-center">
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <div className="grid gap-2">
              <label htmlFor="name">{t("Name")}</label>
              <input
                id="name"
                placeholder="Enter your full name"
                className="border p-2 rounded w-full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
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
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mt-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-orange-500 text-white p-2 rounded"
              >
                {t("UpdateDetails")}
              </button>
            </div>
          </form>
        </div>
      </main>

      <div>
      <LanguageSelector />

      </div>
      <div className="text-center border border-gray-400 rounded-md px-4">
        <h1 className="text-4xl my-10">{t("RecentLogins")}</h1>
        <table className="table-auto w-full my-10">
          <thead>
            <tr className="text-lg">
              <th>{t("IPAddress")}</th>
              <th>{t("Browser")}</th>
              <th>{t("OperatingSystem")}</th>
              <th>{t("Device")}</th>
            </tr>
          </thead>
          <tbody>
            {userLog.map((log, index) => (
              <tr key={index} className="border border-gray-400 rounded-sm">
                <td>{log.ip}</td>
                <td>{log.browser}</td>
                <td>{log.os}</td>
                <td>{log.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditUser;
