import { jwtDecode } from "jwt-decode";
import RecoverPassForm from "../../../components/RecoverPassForm/RecoverPassForm";
import "../RecoverPassword/RecoverPassword.css"
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RecoverPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    useEffect(() => {
      const params = new URLSearchParams(location.search);
      const tokenFromUrl = params.get("token");

      if (tokenFromUrl) {
        try {
            const currentTime = Math.floor(Date.now() / 1000);

            const decodeToken = jwtDecode(tokenFromUrl);

            
            if(decodeToken.name !== "resetPassword" || decodeToken.exp < currentTime){
                navigate("/");
            } else {
                sessionStorage.setItem("resetToken", tokenFromUrl);
                navigate("/recover-password", { replace: true });
            }
        } catch (error) {
            navigate("/")
        }
        
      } else {
        navigate("/");
      }
    }, []);
  
    const token = sessionStorage.getItem("resetToken");
    
    



    return (
        <div className="register-container">
            <div className="breadcrumbs">Inicio / <span>Recuperar Contraseña</span></div>
            <RecoverPassForm token ={token}/>
        </div>
    );
}

export default RecoverPassword;




