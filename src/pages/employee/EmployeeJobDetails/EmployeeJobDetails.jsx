import { useParams } from "react-router-dom";
import "./EmployeeJobDetails.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";

// Lista de trabajos (puede moverse a un archivo externo si querés)
const jobs = [
  {
    id: "1",
    jobTitle: "Levantar un tapial",
    description: "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    city: "Rosario",
    location: "Santa fe 50",
    applications: 300,
    averagePrice: 10000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    id: "2",
    jobTitle: "Arreglar un caño",
    description: "Necesito a alguien con conocimientos de plomeria para arreglar un caño de mi casa",
    city: "Santa Fe",
    location: "San Martin 1150",
    applications: 150,
    averagePrice: 8000,
    userName: "Fulano Detal",
    category: "Construction",
  },
  {
    id: "3",
    jobTitle: "Arreglar cables",
    description: "Necesito a alguien con conocimientos de electricista para arreglar cables pelados en mi negocio",
    city: "Esperanza",
    location: "Jujuy 274",
    applications: 450,
    averagePrice: 12000,
    userName: "Fulano Detal",
    category: "Construction",
  },
];

export default function EmployerJobDetails() {
  const { id } = useParams();

  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return <div>Trabajo no encontrado</div>;
  }

  const CategoryIcon = UseCategoryIcon(job.category);

  return (
    <div>
      <div className="title-text">
        <h1>
          <span className="grey-text">Inicio </span>
          <strong>/ Detalle del trabajo</strong>
        </h1>
      </div>

      <div className="job-container-box">
        <div className="job-header">
          <h2>{job.jobTitle}</h2>
          <CategoryIcon className="job-icon" />
        </div>

        <div className="box-separator">
          <hr color="#fbbd08" />
        </div>

        <div className="job-description">
          <h3>Descripción</h3>
          <p>{job.description}</p>
        </div>

        <div className="job-details">
          <p><strong>Ciudad:</strong> {job.city}</p>
          <p><strong>Dirección:</strong> {job.location}</p>
          <p><strong>Postulaciones: +{job.applications}</strong></p>
          <p><strong>Precio promedio:</strong> ${job.averagePrice}</p>
          <p><strong>Publicado por:</strong> {job.userName}</p>
        </div>
      </div>
    </div>
  );
}
