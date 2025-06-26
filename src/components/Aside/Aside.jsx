import { useState } from "react";
import { FaChevronDown, CiLight, CiDark } from "../../utils/icons/icons";
import styles from "./Aside.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";

const Aside = ({ isAsideVisible, setIsAsideVisible }) => {
  const { logout, user } = useAuth();

  //Dato que se reemplazara con el themeContext
  const [theme, setTheme] = useState("Claro");
  const handleToggleTheme = (e) => {
    e.stopPropagation();
    if (theme == "Claro") {
      setTheme("Oscuro");
    } else {
      setTheme("Claro");
    }
  };

  const handleNavigateTo = (url) => {
    setIsOverlayVisible(false);
    setIsAsideVisible(false);
    navigate(url);
  };

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isThemeDrDwVisible, setIsThemeDrDwVisible] = useState(false);

  const navigate = useNavigate();

  const handleIsThemeDrDwVisible = () => {
    setIsThemeDrDwVisible(!isThemeDrDwVisible);
  };

  const handleCloseAside = () => {
    setIsOverlayVisible(false);
    setIsAsideVisible(false);
    setIsThemeDrDwVisible(false);
  };

  const handleLogout = () => {
    logout();
    handleCloseAside();
    navigate("/");
  };

  const handleNavigate = (url) => {
    navigate(url);
    handleCloseAside();
  };

  return (
    <>
      <div
        onClick={handleCloseAside}
        className={classNames(styles.overlay, {
          [styles.overlay_visible]: isAsideVisible,
        })}
      ></div>
      <div
        className={classNames(styles.aside_container, {
          [styles.aside_visible]: isAsideVisible,
        })}
      >
        <div className={styles.user_container}>
          <div className={styles.image_container}></div>
          <div className={styles.name_container}>
            <h2 className={styles.fullName}>{user?.name}</h2>
            <div
              onClick={() => handleNavigateTo("/myProfile")}
              className={styles.profile_button}
            >
              <h3 className={styles.profile_text}>Mi perfil </h3>
              <FaChevronDown className={styles.arrow_icon}></FaChevronDown>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.jobs_container}>
          {!user.hasJobs ? (
            <h3 onClick={() => navigate()} className={styles.menu_option}>
              Publica tu primer trabajo
            </h3>
          ) : (
            <>
              <h3
                onClick={() => handleNavigate("/employer/createJob")}
                className={styles.menu_option}
              >
                Publica un trabajo
              </h3>
              <h3
                onClick={() => handleNavigate("/employer/request")}
                className={styles.menu_option}
              >
                Solicitudes de trabajos
              </h3>
              <h3
                onClick={() => handleNavigate("/employer/historial")}
                className={styles.menu_option}
              >
                Historial de trabajos
              </h3>
            </>
          )}{" "}
        </div>
        <div className={styles.divider}></div>
        <div className={styles.config_container}>
          <div
            onClick={handleIsThemeDrDwVisible}
            className={styles.theme_dropdown}
          >
            <div className={styles.theme_option}>
              <h3>Tema</h3>
              <FaChevronDown
                className={classNames(styles.dropdown_icon, {
                  [styles.drdwIcon_open]: isThemeDrDwVisible,
                })}
              ></FaChevronDown>
            </div>
            <div
              onClick={(e) => handleToggleTheme(e)}
              className={classNames(styles.dpdw_container, {
                [styles.dpdwC_visible]: isThemeDrDwVisible,
              })}
            >
              <h3>Cambiar a: </h3>
              <div
                className={classNames(styles.toggle_container, {
                  [styles.dark]: theme == "Oscuro",
                })}
              >
                <div
                  className={classNames(styles.toggle_circle, {
                    [styles.tgCircle_moved]: theme == "Oscuro",
                  })}
                ></div>
                <CiDark className={styles.toggle_icon} />
                <CiLight className={styles.toggle_icon} />
              </div>
            </div>
          </div>
          <h3
            onClick={handleLogout}
            className={classNames(styles.menu_option, styles.logout)}
          >
            Cerrar sesion
          </h3>
        </div>
      </div>
    </>
  );
};

export default Aside;
