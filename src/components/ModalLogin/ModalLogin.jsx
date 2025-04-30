import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ModalLogin.css";
import platitaLogo from "../../utils/images/PlatitaLogo.png";
import googleLogo from "../../utils/images/GoogleLogo.png";

const ModalLogin = ({ isOpen, onClose }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOverlayVisible(true);
      setTimeout(() => setModalVisible(true), 400);
    } else {
      setModalVisible(false);
      setTimeout(() => setOverlayVisible(false), 400);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // if (!isOpen) return null;

  return (
    <div
      className={`modal-overlay ${overlayVisible && "overlayVisible"}`}
      onClick={onClose}
    >
      <div
        className={`modal-login-box ${modalVisible && "modalVisible"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={platitaLogo} alt="logo" className="logo-image" />
        <h2 className="modal-title">Inicia Sesión</h2>

        <button className="google-button">
          <img src={googleLogo} alt="Logo Google" className="google-logo" />
          Continuar con Google
        </button>

        <div className="separador-login"></div>

        <form className="login-form">
          <div className="input-group">
            <label className="email">Email</label>
            <input type="email" placeholder="platita@gmail.com" />
          </div>

          <div className="input-group">
            <label className="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button type="submit" className="button-login">
            Iniciar Sesión
          </button>

          <p className="register-text">
            ¿No tienes una cuenta aún?{" "}
            <span className="highlight">Registrate</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ModalLogin;
