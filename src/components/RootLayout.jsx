import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../style/main.css";
function RootLayout() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="root-layout">
      <Header />
      <div className="main_container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default RootLayout;
