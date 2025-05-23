import { useState } from "react";
import { FaChevronDown, CiLight, CiDark } from "../../utils/icons/icons";
import styles from "./Aside.module.css";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const Aside = ({ isAsideVisible, setIsAsideVisible }) => {
  //Dato que se reemplazara con el llamado a la api
  const [hasPostedJob, setHasPostedJob] = useState(true);
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

  const handleCloseAside = () => {
    setIsOverlayVisible(false);
    setIsAsideVisible(false);
  };

  const handleIsThemeDrDwVisible = () => {
    setIsThemeDrDwVisible(!isThemeDrDwVisible);
  };

  console.log(isAsideVisible);
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
            <h2 className={styles.fullName}>Fulano Detal</h2>
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
          {!hasPostedJob ? (
            <h3 onClick={() => navigate()} className={styles.menu_option}>
              Publica tu primer trabajo
            </h3>
          ) : (
            <>
              <h3 className={styles.menu_option}>Publica un trabajo</h3>
              <h3 className={styles.menu_option}>Solicitudes de trabajos</h3>
              <h3 className={styles.menu_option}>Historial de trabajos</h3>
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
              <div className={styles.toggle_container}>
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
            onClick={() => {}}
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
