import React, { useContext, useRef, useState } from "react";
import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModalLogin from "../ModalLogin/ModalLogin";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";
import { ModalContext } from "../../services/ModalContext";
import ModalRecoverPass from "../ModalRecoverPass/ModalRecoverPass";
import Aside from "../Aside/Aside";

const Layout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const { userRole } = useContext(AuthContext);

  const handleOpenLogin = () => setIsLoginModalOpen(true);
  const handleCloseLogin = () => setIsLoginModalOpen(false);
  console.log(isLoginModalOpen);

  const categoriesRef = useRef(null);
  const { showModal, isSuccess, hideRecoverModal } = useContext(ModalContext);
  return (
    <div className="layout_container">
      <aside className="aside_container">
        <Aside
          isAsideVisible={isAsideVisible}
          setIsAsideVisible={setIsAsideVisible}
        ></Aside>
      </aside>
      <header className="header_container">
        <Header
          categorySection={categoriesRef}
          handleLogin={handleOpenLogin}
          userRole={userRole}
          setIsAsideVisible={setIsAsideVisible}
        />
      </header>
      <main className="main_container">
        <Outlet context={{ categoriesRef, handleOpenLogin }} />
      </main>
      <footer className="footer_container_layout">
        <Footer />
      </footer>
      <ModalLogin isOpen={isLoginModalOpen} onClose={handleCloseLogin} />
      {showModal && (
        <ModalRecoverPass bool={isSuccess} hide={hideRecoverModal} />
      )}
    </div>
  );
};

export default Layout;
