import { useParams } from "react-router-dom";
import "./EmployeeJobDetails.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { MdLocationOn } from "react-icons/md";
import { IoCalendarOutline, IoLink } from "react-icons/io5";
import { BsCashStack } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";

const jobs = [
  {
    id: "1",
    jobTitle: "Levantar un tapial",
    description: "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    city: "Rosario",
    date: "21/05/25",
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
    date:"23/05/2025",
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
    date: "01/06/2025",
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

    <div className="align-cards">
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
          <p><strong>+{job.applications} Postulaciones</strong></p>
        </div>
      </div>

      <div className="sidebar-container">
        <div className="user-container">
          <div className="user-info">
            <h2>{job.userName}</h2>
          </div>
          <div className="user-picture">

          </div>
        </div>
        <button className="postulate-button">Postulate ya</button>
        <div className="icon-button-container">
          <button className="save-button"><FaRegBookmark className="icon-save"/></button>
          <button className="link-button"><IoLink className="icon-link"/></button>
        </div>
      </div>
    </div>

      <div className="job-information">
        <div className="fecha-container">
          <IoCalendarOutline className="icon-fecha"/>
          <h4>Fecha</h4>
          <p>{job.date}</p>
        </div>
        <div className="ubicacion-container">
          <MdLocationOn className="icon-ubicacion"/>
          <h4>Ubicacion</h4>
          <p>{job.location}, {job.city}</p>
        </div>
        <div className="salario-container">
          <BsCashStack className="icon-dinero"/>
          <h4>Salario Promedio</h4>
          <p>+${job.averagePrice}</p>
        </div>
      </div>
    </div>
  );
}
