import React from "react";
import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

//Cuando se integre react-router, se usará outlet

const Layout = ({ children }) => {
  return (
    <div className="layout_container">
      <header className="header_container">
        <Header />
      </header>
      <main className="main_container">
        <Outlet />{children} 
      </main>
      <footer className="footer_container">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
