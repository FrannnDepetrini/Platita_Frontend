import React, { useContext, useRef } from "react";
import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";

const Layout = () => {
  const { handleLogin, userRole } = useContext(AuthContext);

  const categoriesRef = useRef(null);
  return (
    <div className="layout_container">
      <header className="header_container">
        <Header
          categorySection={categoriesRef}
          handleLogin={handleLogin}
          userRole={userRole}
        />
      </header>
      <main className="main_container">
        <Outlet context={{ categoriesRef }} />
      </main>
      <footer className="footer_container_layout">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
