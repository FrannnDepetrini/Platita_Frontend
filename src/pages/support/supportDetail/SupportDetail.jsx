import { useParams } from "react-router-dom";
import styles from "./SupportDetail.module.css";
import { MdLocationOn } from "react-icons/md";
import { IoCalendarOutline, IoLink } from "react-icons/io5";
import { BsCashStack } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import ModalPostulation from "../../../components/ModalPostulation/ModalPostulation";
import { useState } from "react";

// Eliminar cuando este la api
const supportDetailComplains = [
    {
        id: "1",
        jobTitle: "Levantar un tapial",
        description: "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
        userName: "Fulano Detal",
        profilePicture: "1",
        reports: 0,
        category: "Construction",
    },
    {
        id: "2",
        jobTitle: "Arreglar un caño",
        description: "Necesito a alguien con conocimientos de plomeria para arreglar un caño de mi casa",
        userName: "Joaquin Tanlongo",
        profilePicture: "2",
        reports: 5,
        category: "Plumbing",
    },
    {
        id: "3",
        jobTitle: "Arreglar cables",
        description: "Necesito a alguien con conocimientos de electricista para arreglar cables pelados en mi negocio",
        userName: "Francisco Depetrini",
        profilePicture: "3",
        reports: 10,
        category: "Electricity",
    },
    {
        id: "4",
        jobTitle: "Revocar una pared",
        description: "Necesito a alguien con conocimientos de albañileria para revocar una pared en mi casa",
        userName: "Antonio Diaz",
        profilePicture: "4",
        reports: 7,
        category: "Construction",
    },
    {
        id: "5",
        jobTitle: "Cuidar a un niño",
        description: "Busco a alguien con experiencia en cuidado de niños para cuidar a mi hijo de 5 años",
        userName: "Brenda Gonzalez",
        profilePicture: "5",
        reports: 2,
        category: "Babysitter",
    },
];

export default function SupportDetail() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);

  const complain = supportDetailComplains.find((j) => j.id === id);

  if (!complain) {
    return <div>Trabajo no encontrado</div>;
  }

  return (
    <div>
      {showModal && <ModalPostulation onClose={() => setShowModal(false)}/>}
      <div className="title-text">
        <h1>
          <span className="grey-text">Inicio </span>
          <strong>/ Detalle del trabajo</strong>
        </h1>
      </div>

    <div className="align-cards">
      <div className="job-container-box">
        <div className="job-header">
        </div>

        <div className="box-separator">
          <hr color="#fbbd08" />
        </div>

        <div className="job-description">
          <h3 className="description-title">Descripción</h3>
          <p>{complain.description}</p>
        </div>

        <div className="job-details">
        </div>
      </div>

      <div className="sidebar-container">
        <div className="user-container">
          <div className="user-info">
            <h2>{complain.userName}</h2>
          </div>
          <div className="user-picture">

          </div>
        </div>
      </div>
    </div>

      <div className="job-information">
        <div className="fecha-container">
          <IoCalendarOutline className="icon-fecha"/>
          <h4>Fecha</h4>
          <p>{complain.date}</p>
        </div>
        <div className="ubicacion-container">
          <MdLocationOn className="icon-ubicacion"/>
          <h4>Ubicacion</h4>
        </div>
        <div className="salario-container">
          <BsCashStack className="icon-dinero"/>
          <h4>Salario Promedio</h4>
        </div>
      </div>
    </div>
  );
}
