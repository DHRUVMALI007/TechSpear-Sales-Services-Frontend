import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../../Components/UserSidebar";
import { ThemeContext } from "../../Helpers/ThemeContext"; // Adjust path as needed
import "../../App.css";

const UserPanel = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen flex transition-all ${
        isDarkMode ? "bg-[#1B1F3B] text-white" : "bg-slate-200 text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`h-full transition-all ${
          isDarkMode ? "bg-[#181B29]" : "bg-gray-100"
        }`}
      >
        <UserSidebar />
      </div>

      {/* Main Content */}
      <main className="h-full flex-grow overflow-y-auto scrollbar-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default UserPanel;
