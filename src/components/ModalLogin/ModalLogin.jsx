import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ModalLogin.css";
import platitaLogo from "../../utils/images/PlatitaLogo.png";
import googleLogo from "../../utils/images/GoogleLogo.png";
import Loader from "../Loader/Loader";
import useVerificate from "../../customHooks/UseVerificate";
import { data } from "react-router-dom";

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
  const [loaderStatus, setLoaderStatus] = useState('idle');
  const { errors, validateField } = useVerificate();

  const mockApi = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 2500);
    });
  }

  const handleSendLink = async () => {
    setLoaderStatus('loading');

    try {
      // Simulando una llamada a la API
      const response = await mockApi(restoreEmail);

      if (response) {
        setLoaderStatus('success');
        setTimeout(() => {
          setIsFlipped(false);
          setLoaderStatus('idle');
          setRestoreEmail("");
        }, 3000);
      }

    } catch (error) {
      setLoaderStatus('error');
      setTimeout(() => {
        setLoaderStatus('idle');
      }, 2000);
    }
  };

  const handleLogin = async () => {
    setLoaderStatus('loading');

    try {
      const response = await mockApi(dataLogin.email);

      if (response) {
        setLoaderStatus('success');
        onClose();
        setTimeout(() => {
          setLoaderStatus('idle');
          setDataLogin({
            email: "",
            password: "",
          });
        }, 3000);
      }

    } catch (error) {
      setTimeout(() => {
        setLoaderStatus('idle');
      }, 2000);
    }
  }

  const handleClose = () => {
    setIsFlipped(false);
        setRestoreEmail("");
        setDataLogin({
          email: "",
          password: "",
        }); 
        setTimeout(() => {
          onClose()
        }, 400);
  }


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
      if (e.key === "Escape") {
        handleClose();
      };
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // if (!isOpen) return null;

  const handleEmailChange = (e) => {
    setRestoreEmail(e.target.value);
    const { name, value } = e.target;
    validateField(name, value);
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    validateField(name, value);
  }

  const handleFlippped = () => {
    setIsFlipped(!isFlipped);
    setTimeout(() => {
      if (isFlipped) {
        setRestoreEmail("");
      } else {
        setDataLogin({
          email: "",
          password: "",
        });
      }
    }, 300);
  };

  return (

    <div
      className={`modal-overlay ${overlayVisible && "overlayVisible"}`}
      onClick={() => handleClose()}
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
              <label className="email">Email</label>
              <input type="email" placeholder="platita@gmail.com" value={dataLogin.email} name="email" onChange={handleLoginChange} />
              {errors.email && dataLogin.email.length > 0 ? <span className="error-message">{errors.email}</span> : ""}
            </div>

            <div className="input-group">
              <label className="password">Contraseña</label>
              <div className="password-wrapper">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="●●●●●●●●●"
                  value={dataLogin.password}
                  onChange={handleLoginChange}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggle-password"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button className="button-login" onClick={() => handleLogin()} disabled={!dataLogin.email || !dataLogin.password || loaderStatus !== 'idle'}>
              {loaderStatus === "idle" ? "Iniciar Sesión" : <div className="container_spinner"><span className="simple_loader"></span></div>} 
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
            {loaderStatus !== 'idle' ? (
              <div className="container_loader">
                <Loader status={loaderStatus} />
              </div>
            ) : (
              <div className="input-group">
                <label className="email">Email</label>
                <input type="email" placeholder="platita@gmail.com" onChange={handleEmailChange} value={restoreEmail} name="email" />
                {errors.email && restoreEmail.length > 0 ? <span className="error-message">{errors.email}</span> : ""}
              </div>
            )
            }

            <div className="button-group">
              <button className="button-login" onClick={() => {
                handleSendLink();

              }} disabled={!restoreEmail || loaderStatus !== 'idle'}>Enviar link</button>
              <button className="button-cancel" onClick={handleFlippped} disabled={loaderStatus === 'loading'}>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
