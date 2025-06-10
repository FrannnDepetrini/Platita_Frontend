import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../services/contexts/AuthProvider";
import styles from "./NotAllowed.module.css";
import logo from "../../utils/images/PlatitaLogo.png"

const NotAllowed = () => {
    const [counter, setCounter] = useState(5)
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const handleRedirect = () => {

        if(!isAuthenticated || !user.token){
            navigate("/", {state:{notAllowed: true}, replace:true});
            return;
        }

        navigate(-1, { replace: true });
        return;
    }

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
        <div className={styles.not_allowed_container}>
            <h1>Acceso denegado <strong>"401"</strong></h1>
            <img src={logo} />
            <div>
                <p>Redirigiendo en {counter} segundos
                    <span className={styles.loading_dots}>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </p>
            </div>
        </div>
    )

}


export default NotAllowed;