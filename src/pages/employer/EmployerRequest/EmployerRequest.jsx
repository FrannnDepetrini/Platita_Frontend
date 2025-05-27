import EmployerRequestList from "../../../components/EmployerRequestList/EmployerRequestList";
import "./EmployerRequest.css";
import { Link, useNavigate } from "react-router-dom";

export default function EmployerRequest() {
  const navigate = useNavigate();
  return (
    <div className="employer-request">
      <div className="erbreadcrumb">
        <Link to="/" className="erbreadcrumb-link">
          Inicio
        </Link>
        <span className="erbreadcrumb-separator"> / </span>
        <span className="erbreadcrumb-link active">Solicitudes</span>
      </div>
      <div className="listAndButton_container">
        <EmployerRequestList />
        <div className="erjob-button-wrapper">
          <button
            onClick={() => navigate("/employer/createJob")}
            className="ercustom-button"
          >
            Crear un nuevo trabajo
          </button>
        </div>
      </div>
    </div>
  );
}
