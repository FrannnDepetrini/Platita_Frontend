import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ModalLogin.css";
import platitaLogo from "../../utils/images/PlatitaLogo.png";
import googleLogo from "../../utils/images/GoogleLogo.png";

const ModalLogin = ({ isOpen, onClose }) => {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [restoreEmail, setRestoreEmail] = useState("");
  const [dataLogin, setDataLogin] = useState([{
    email: "",
    password: "",
  }]);

  useEffect(() => {
    setIsFlipped(false);
    if (isOpen) {
      setOverlayVisible(true);
      setTimeout(() => setModalVisible(true), 300);
    } else {
      setModalVisible(false);
      setTimeout(() => setOverlayVisible(false), 300);
    }

  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // if (!isOpen) return null;

  const handleEmailChange = (e) => {
    setRestoreEmail(e.target.value);
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleFlippped = () => setIsFlipped(!isFlipped);

  return (

    <div
      className={`modal-overlay ${overlayVisible && "overlayVisible"}`}
      onClick={onClose}
    >
      <div className={`card ${isFlipped ? "flipped" : ""}`} >

        <div
          className={`face modal-login-box ${modalVisible ? "modalVisible" : ""}`} onClick={(e) => e.stopPropagation()}
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
              <label className="email" name="email" onChange={handleLoginChange}>Email</label>
              <input type="email" placeholder="platita@gmail.com" value={dataLogin.email}/>
            </div>

            <div className="input-group">
              <label className="password" name="password" onChange={handleLoginChange}>Contraseña</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="**********"
                  value={dataLogin.password}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button className="button-login" onClick={() => console.log(dataLogin)}>
              Iniciar Sesión
            </button>

            <p className="register-text">
              ¿No tienes una cuenta aún?{" "}
              <span className="highlight">Registrate</span>
            </p>
            <p className="register-text">
              ¿Olvidaste tu contraseña?{" "}
              <span className="highlight" onClick={handleFlippped}>Recuperala</span>
            </p>
          </form>
        </div>
        <div className="face modal-login-box restoreFace" onClick={(e) => e.stopPropagation()}>
          <img src={platitaLogo} alt="logo" className="logo-image" />
          <h2 className="modal-title">Recuperar contraseña</h2>
          <p className="text-modal">Te enviaremos un link de recuperacion a tu email</p>

          <div className="separador-login"></div>

          <div className="login-form">
            <div className="input-group">
              <label className="email">Email</label>
              <input type="email" placeholder="platita@gmail.com" onChange={handleEmailChange} />
            </div>

            <div className="button-group">
              <button className="button-login" onClick={() => console.log(restoreEmail)}>Enviar link</button>
              <button className="button-cancel" onClick={handleFlippped}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
