import "./Header.css";
import Logo from "../../utils/images/PlatitaLogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({
  categorySection,
  handleLogin,
  userRole,
  setIsAsideVisible,
}) => {
  const [activeIndex, setActiveIndex] = useState("employee/home");
  const navigate = useNavigate();

  //Dato que se reemplazara con el authContext
  const userLogged = true;

  const onLogin = () => {
    // navigate("/login");
    handleLogin();
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
          <img className="logo" src={Logo}></img>
        </div>
        <div className="nav_container">
          {userRole == "guest" ? (
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
          ) : (
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
          )}
        </div>
      </div>
      <div className="session_container">
        {!userLogged ? (
          <button onClick={onLogin}>Iniciar sesion</button>
        ) : (
          <>
            <button onClick={() => setIsAsideVisible(true)}>
              Fulano Detal
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
