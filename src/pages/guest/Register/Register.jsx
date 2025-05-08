import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import "./Register.css"

const register = () => {
    return (
        <div className="register-container">
            <div className="breadcrumbs">Inicio / <span>Registrar</span></div>
            <RegisterForm />
        </div>
    );
}

export default register;