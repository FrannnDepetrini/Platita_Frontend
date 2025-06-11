import "./Header.css";
import Logo from "../../utils/images/PlatitaLogo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NotificationsBell from "../NotificationsBell/NotificationsBell";
import useAuth from "../../services/contexts/AuthProvider";

const Header = ({
  categorySection,
  handleLogin,
  setIsAsideVisible,
  setIsNotificationModalVisible,
}) => {
  const [activeIndex, setActiveIndex] = useState("employee/home");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  //Dato que se reemplazara con el authContext
  // const userLogged = true;

  const onLogin = () => {
    // navigate("/login");
    handleLogin();
  };

  const handleNavigateHome = () => {
    if (user.role == "Guest") {
      navigate("/");
    } else if (user.role == "Client") {
      navigate("/employee/home");
      setActiveIndex("employee/home");
    }
  };

  const handleNavigateTo = (url = "") => {
    setActiveIndex(url);
    navigate(`/${url}`);
  };

  const scrollToCategories = () => {
    categorySection.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="header_container">
      <div className="logo-nav_container">
        <div className="logo_container">
          <img onClick={handleNavigateHome} className="logo" src={Logo}></img>
        </div>
        <div className="nav_container">
          {user.role == "Client" ? (
            <>
              <h1
                onClick={() => handleNavigateTo("employee/home")}
                className={`nav_h1 ${
                  activeIndex == "employee/home" && "activeIndex"
                } `}
              >
                Inicio
              </h1>

              <h1
                onClick={() => handleNavigateTo("employee/postulations")}
                className={`nav_h1 ${
                  activeIndex == "employee/postulations" && "activeIndex"
                } `}
              >
                Postulaciones
              </h1>

              <h1
                onClick={() => handleNavigateTo("employee/historial")}
                className={`nav_h1 ${
                  activeIndex == "employee/historial" && "activeIndex"
                } `}
              >
                Historial
              </h1>
            </>
          ) : (
            <>
              <h1
                onClick={() => handleNavigateTo()}
                className={`nav_h1 activeIndex`}
              >
                Inicio
              </h1>

              <h1 className="nav_h1" onClick={scrollToCategories}>
                Categorias
              </h1>
            </>
          )}
        </div>
      </div>
      <div className="session_container">
        {!isAuthenticated ? (
          <button onClick={onLogin}>Iniciar sesion</button>
        ) : (
          <div className="session_buttons">
            <NotificationsBell showModal={setIsNotificationModalVisible} />
            <button onClick={() => setIsAsideVisible(true)}>{user.name}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
