import { useParams } from "react-router-dom";
import "./EmployeeJobDetails.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { MdLocationOn } from "react-icons/md";
import { IoCalendarOutline, IoLink } from "react-icons/io5";
import { BsCashStack } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";
import ModalPostulation from "../../../components/ModalPostulation/ModalPostulation";
import { useEffect, useState } from "react";
import { jobService } from "../../../services/jobService/jobService";

export default function EmployeeJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getJobById = async () => {
      const data = await jobService.getJobById(id);
      console.log(data);
      setJob(data);
      setLoading(false);
    };
    getJobById();
  }, []);

  const CategoryIcon = UseCategoryIcon(job.category);
  const jobDateFormatted = new Date(
    job.dayPublicationStart
  ).toLocaleDateString();

  return (
    <>
      {showModal && (
        <ModalPostulation onClose={() => setShowModal(false)} jobId={job.id} />
      )}
      <div className="title-text">
        <h1>
          <span className="grey-text">Inicio </span>
          <strong>/ Detalle del trabajo</strong>
        </h1>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          <div className="align-cards">
            <div className="job-container-box">
              <div className="job-header">
                <h2 className="job-title">{job.title}</h2>
                <CategoryIcon className="job-icon" />
              </div>

              <div className="box-separator">
                <hr color="#fbbd08" />
              </div>

              <div className="job-description">
                <h3 className="description-title">Descripción</h3>
                <p>{job.description}</p>
              </div>

              <div className="job-details">
                <p>
                  <strong>+{job.amountPostulations} Postulaciones</strong>
                </p>
              </div>
            </div>

            <div className="sidebar-container">
              <div className="user-container">
                <div className="user-info">
                  <h2>{job.userName}</h2>
                </div>
                <div className="user-picture"></div>
              </div>
              <button
                className="postulate-button"
                onClick={() => setShowModal(true)}
              >
                Postulate ya
              </button>
              <div className="icon-button-container">
                <button className="save-button">
                  <FaRegBookmark className="icon-save" />
                </button>
                <button className="link-button">
                  <IoLink className="icon-link" />
                </button>
              </div>
            </div>
          </div>

          <div className="job-information">
            <div className="fecha-container">
              <IoCalendarOutline className="icon-fecha" />
              <h4>Fecha</h4>
              <p>{jobDateFormatted}</p>
            </div>
            <div className="ubicacion-container">
              <MdLocationOn className="icon-ubicacion" />
              <h4>Ubicacion</h4>
              <p>
                {job.province}, {job.city}
              </p>
            </div>
            <div className="salario-container">
              <BsCashStack className="icon-dinero" />
              <h4>Salario Promedio</h4>
              <p>+${job.averagePrice}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
