import "./Header.css";
import Logo from "../../utils/images/PlatitaLogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    handleNavigate();
  },[isAuthenticated, user])

  const onLogin = () => {
    // navigate("/login");
    handleLogin();
  };

  const handleNavigateHome = () => {
    if (user.role == "Guest") {

      navigate("/");
    } else if (user.role == "Client") {
      // navigate("/employee/home");
      // setActiveIndex("employee/home");

      handleNavigateTo("/employee/home");
    } else if (user.role == "SysAdmin"){
      
      handleNavigateTo("/sysadmin/home");
    } else if (user.role == "Support") {
      // navigate("/support/home");

      handleNavigateTo("/support/home");
    } else if (user.role == "Moderator"){
      handleNavigateTo("/moderator/home");
    }
  };

  const handleNavigate = () => {

    switch (user.role){
      case "Client":
      return(
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
                Historial Postulaciones
              </h1>
            </>
      )
      case "Support":
        return (
          <>
            <h1
              onClick={() => handleNavigateTo("support/home")}
              className={`nav_h1 ${
                  activeIndex == "support/home" && "activeIndex"
                } `}
            >
              Inicio
            </h1>

            <h1
              onClick={() => handleNavigateTo("support/historial_complains")}
              className={`nav_h1 ${
                  activeIndex == "support/historial_complains" && "activeIndex"
                } `}
            >
              Historial
            </h1>
          </>
        );

      case "SysAdmin":
        return (
          <>
          <h1
            onClick={() => handleNavigateTo("sysadmin/home")}
            className={`nav_h1 ${
                  activeIndex == "sysadmin/home" && "activeIndex"
                } `}
          >
            Inicio
          </h1>

          <h1
            onClick={() => handleNavigateTo("sysadmin/createUser")}
            className={`nav_h1 ${
                  activeIndex == "sysadmin/createUser" && "activeIndex"
                } `}
          >
            Crear
          </h1>
          </>
        )

      case "Moderator":
        return (
          <>
          <h1
            onClick={() => handleNavigateTo("moderator/home")}
            className={`nav_h1 ${
                  activeIndex == "moderator/home" && "activeIndex"
                } `}
          >
            Inicio
          </h1>
          </>
        )

      case "Guest":
        return (
          <>
            <h1
              onClick={() => {
                handleNavigateTo()

              }}
              className={`nav_h1 activeIndex`}
            >
              Inicio
            </h1>

            <h1 className="nav_h1" onClick={scrollToCategories}>
              Categorias
            </h1>
          </>
        );
    }
  }

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
          {handleNavigate()}
        </div>
      </div>
      <div className="session_container">
        {!isAuthenticated ? (
          <button onClick={onLogin}>Iniciar sesion</button>
        ) : (
          <div className="session_buttons">
            <NotificationsBell showModal={setIsNotificationModalVisible} />
            <button onClick={() => setIsAsideVisible(true)}>
              {user.name.split(" ")[0]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
