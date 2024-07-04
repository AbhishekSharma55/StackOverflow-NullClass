import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "../context/AlertContext";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [Users, setUsers] = useState([]);
  const showAlert = useAlert();
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/users`);
        setUsers(response.data);
      } catch (error) {
        showAlert(error, "error");
        console.log(error);
      }
    };
    fetchUsers();
  }, [showAlert, apiUrl]);

  const editUser = (_id) => {
    navigate(`/user/${_id}`);
  };

  return (
    <div className="m-10">
      <h1 className="text-4xl">{t("Users")}</h1>
      <div className="flex flex-wrap py-10 gap-5">
        {Users.map((user) => {
          return (
            <div key={user._id}>
              <button
                className="border border-gray-400 h-50 flex-wrap rounded-xl"
                onClick={() => {
                  editUser(user._id);
                }}
              >
                <p className="text-center text-xl pb-2 bg-orange-200 rounded-t-xl">
                  {user.username}
                </p>
                <div className="p-4">
                  <p className="text-center pb-3">{user.email}</p>
                  <p className="text-center pb-3">
                    {t("UserCreated")} : {moment(user.date).fromNow()}
                  </p>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
