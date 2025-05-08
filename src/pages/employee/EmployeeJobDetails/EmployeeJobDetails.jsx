import { useParams } from "react-router-dom";
import "./EmployeeJobDetails.css"

export default function EmployerJobDetails() {

  const { id } = useParams();

  return (
    <div>
      <div className="title-text">
      <h1><span className="grey-text">Inicio </span><bold>/ Detalle del trabajo</bold></h1>
      </div>
      <div className="job-container-box">
        <p>job</p>
        <div className="box-separator"><hr color="#fbbd08"></hr></div>
      </div>
    </div>
  );
}
