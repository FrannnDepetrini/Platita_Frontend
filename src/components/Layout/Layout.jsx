import React, { useContext, useEffect, useRef, useState } from "react";
import "./Layout.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ModalLogin from "../ModalLogin/ModalLogin";
import { Outlet, useLocation } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";
import { ModalContext } from "../../services/contexts/ModalContext";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import Aside from "../Aside/Aside";
import ModalNotification from "../ModalNotification/ModalNotification";

const Layout = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAsideVisible, setIsAsideVisible] = useState(false);
  const [isNotificationModalVisible, setIsNotificationModalVisible] =
    useState(false);
  const { user, isAuthenticated } = useAuth();

  const handleOpenLogin = () => setIsLoginModalOpen(true);
  const handleCloseLogin = () => setIsLoginModalOpen(false);
  const handleOpenNotification = () => setIsNotificationModalVisible(true);
  const handleCloseNotification = () => setIsNotificationModalVisible(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.notAllowed) {
      setTimeout(() => {
        handleOpenLogin();
      }, 300);
      window.history.replaceState({}, "");
    }
  }, [location]);

  const categoriesRef = useRef(null);
  const {
    showModal,
    isSuccess,
    hideRecoverModal,
    successMessage,
    errorMessage,
  } = useContext(ModalContext);
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
          userRole={user?.role}
          setIsAsideVisible={setIsAsideVisible}
          setIsNotificationModalVisible={handleOpenNotification}
          isUserLogged={isAuthenticated}
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
        <FeedbackModal
          bool={isSuccess}
          hide={hideRecoverModal}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      )}

      {isNotificationModalVisible && (
        <ModalNotification
          isOpen={isNotificationModalVisible}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default Layout;
