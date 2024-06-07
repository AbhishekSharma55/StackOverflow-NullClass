import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../context/AlertContext";

const EditUser = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const showAlert = useAlert();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/user/${id}`
        );
        setUserName(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [id , apiUrl]);

  const submitChanges = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      showAlert("You need to login to update your account", "error")
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
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="w-full max-w-md border p-4 rounded shadow">
          <div className="space-y-1">
            <h2 className="text-2xl">Update your Account</h2>
            <p>
              Overwrite the updated details and hit update to update your
              personal details.
            </p>
          </div>
          <form className="space-y-4 mt-4" onSubmit={submitChanges}>
            <div className="h-20 w-20 bg-orange-300 rounded border flex items-center justify-center text-7xl border-black text-center">
              {userName.slice(0, 1).toUpperCase()}
            </div>
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                placeholder="Enter your full name"
                className="border p-2 rounded w-full"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
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
                Update Details
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default EditUser;
