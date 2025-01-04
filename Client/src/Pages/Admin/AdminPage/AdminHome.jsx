import React, { useEffect, useState } from "react";

import AdminSideBar from "../AdminComponent/AdminSideBar";
import axios from "axios";
import UserChart from "../AdminComponent/UserChart";
import { BASE_URL } from "../../../App";

const AdminHome = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [data, setData] = useState([]); // State to store data
  const welcomeAdmin = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/admin/welcome`, {
        withCredentials: true,
      });
      //   const response = await fetch("api/admin/welcome", {
      //     method: "GET",
      //     headers: { "Content-Type": "application/json" },
      //     credentials: "include",
      //   });
      const data = res.data;
      setData(res.data.user);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    welcomeAdmin();
  }, []);
  return (
    <div className="flex h-[100vh] bg-gray-50">
      <AdminSideBar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-grow p-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          Welcome {data && data.username}
        </h1>
        <p className="text-gray-600">
          <UserChart />
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
