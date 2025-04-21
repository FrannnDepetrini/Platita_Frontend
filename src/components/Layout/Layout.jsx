import React, { useRef } from "react";
import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import FooterPrueba from "../FooterPrueba/FooterPrueba";

const Layout = () => {
  const categoriesRef = useRef(null);
  return (
    <div className="layout_container">
      <header className="header_container">
        <Header categorySection={categoriesRef} />
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
