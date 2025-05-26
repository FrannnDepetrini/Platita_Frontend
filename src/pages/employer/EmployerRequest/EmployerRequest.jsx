import EmployerRequestList from "../../../components/EmployerRequestList/EmployerRequestList";
import "./EmployerRequest.css"
import { Link } from "react-router-dom";

export default function EmployerRequest() {
  return (
    <div className="employer-request">
       <div className="erbreadcrumb">
    <Link to="/" className="erbreadcrumb-link">Inicio</Link>
    <span className="erbreadcrumb-separator"> / </span>
    <span className="erbreadcrumb-link active">Solicitudes</span>
  </div>
      <EmployerRequestList />
    </div>
  );
}
