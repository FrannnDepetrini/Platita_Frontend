import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../utils/images/PlatitaLogo.png";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(-1, { replace: true });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(interval);
          handleRedirect();
          return 0;
        }

        return prevCounter - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className={styles.not_found_container}>
      <h1>
        Pagina no encontrada <strong>"404"</strong>
      </h1>
      <img src={logo} />
      <div>
        <p>
          Redirigiendo en {counter} segundos
          <span className={styles.loading_dots}>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
