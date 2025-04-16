import React from "react";
import "./Layout.css";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

//Cuando se integre react-router, se usará outlet

const Layout = ({ children }) => {
  return (
    <div className="layout_container">
      <header className="header_container">
        <Header></Header>
      </header>
      <main className="main_container">{children} </main>
      <footer className="footer_container">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default Layout;
