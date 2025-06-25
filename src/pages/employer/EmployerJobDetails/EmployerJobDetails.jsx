import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EmployerJobDetails.module.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { FaTrashAlt } from "react-icons/fa";
import ModalConfirm from "../../../components/ModalConfirm/modalConfirm";
import { useNavigate } from "react-router-dom";
import PostulationNumber from "../../employee/Postulations/PostulationNumber";
import useAuth from "../../../services/contexts/AuthProvider";

export default function EmployerJobDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState({
    pricipalMessage: "",
    subMessage: "",
  });

  const { user } = useAuth();
  const [action, setAction] = useState("");
  const [selectedPostulationId, setSelectedPostulationId] = useState("");

  // Estado para saber si ya se aceptó a alguien
  const [jobAccepted, setJobAccepted] = useState(false); // Aca se tomaria el status del trabajo si esta taken pasando el bool a true
  const [acceptedEmployee, setAcceptedEmployee] = useState(null); // Aca asignamos el empleado o tomamos el unico que se trae cuando ya habia sido aceptado

  const navigate = useNavigate();
  const CategoryIcon = info.category && UseCategoryIcon(info.category);

  const employees = [
    {
      id: 1,
      name: "Joaquín tanlongo",
      budget: 10000,
      date: "07/04/25",
      Status: "Aceptado",
    },
    {
      id: 2,
      name: "Joaquín tanlongo",
      budget: 10000,
      date: "07/04/25",
      Status: "Aceptado",
    },
    {
      id: 3,
      name: "Joaquín tanlongo",
      budget: 10000,
      date: "07/04/25",
      Status: "Aceptado",
    },
    {
      id: 4,
      name: "Joaquín tanlongo",
      budget: 10000,
      date: "07/04/25",
      Status: "Aceptado",
    },
    {
      id: 5,
      name: "Francisco tanlongo",
      budget: 10000,
      date: "07/04/25",
      Status: "Aceptado",
    },
  ];

  const infoJob = {
    title: "Levantar un tapial",
    category: "Mechanics",
    description:
      "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    postulations: 300,
    status: "god",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setInfo(infoJob);
      setPostulations(employees);
    }, 2000);
  }, []);

  const handleCancelPostulant = () => {
    handleAction("cancelPostulant");
  };

  const handleConfirmCancel = () => {
    setIsModalVisible(false);
    setInfo({ ...info, status: "Deleted" });
  };

  const handleAction = (actionType, postulationId = null) => {
    setAction(actionType);
    setSelectedPostulationId(postulationId);
    setIsModalVisible(true);

    if (actionType === "DeleteJob") {
      if (jobAccepted || postulations.length > 0) {
        setMessage({
          pricipalMessage: "¿Estás seguro de borrar el trabajo?",
          subMessage: "",
        });
      } else {
        setMessage({
          pricipalMessage: "¿Estás seguro de borrar el trabajo?",
          subMessage: "",
        });
      }
    } else if (actionType === "Reject") {
      setMessage({
        pricipalMessage: "¿Estás seguro de eliminar la postulación?",
        subMessage: "",
      });
    } else if (actionType === "Accept") {
      setMessage({
        pricipalMessage: "¿Estás seguro de aceptar la postulación?",
        subMessage: "Esta acción eliminará todas las demás postulaciones",
      });
    } else if (actionType === "cancelPostulant") {
      setMessage({
        pricipalMessage: "¿Estás seguro de cancelar al postulante?",
        subMessage:
          "Esta acción tendrá una sancion que se vera reflejada en tu rating",
      });
    } else if (actionType === "restoreJob") {
      console.log("ando re facil");
      setMessage({
        pricipalMessage: "¿Estás seguro de reestablecer el trabajo?",
        subMessage: "",
      });
    }
  };

  const handleConfirmRestore = () => {
    setInfo({ ...infoJob, status: "Available" });
    setPostulations(employees);
    setIsModalVisible(false);
    setJobAccepted(false);
    setSelectedPostulationId("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPostulationId("");
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    navigate(-1, { replace: true });
  };

  const handleConfirmReject = () => {
    setSelectedPostulationId("");
    setIsModalVisible(false);
    if (selectedPostulationId) {
      setPostulations((prev) =>
        prev.filter((p) => p.id !== selectedPostulationId)
      );
      console.log(`Postulación ${selectedPostulationId} rechazada`);
    }
  };

  const handleConfirmAccept = () => {
    setIsModalVisible(false);
    if (selectedPostulationId) {
      const acceptedEmployeeData = postulations.find(
        (p) => p.id === selectedPostulationId
      );

      setPostulations([acceptedEmployeeData]);

      setJobAccepted(true);
      setAcceptedEmployee(acceptedEmployeeData);

      console.log(`Postulación ${selectedPostulationId} aceptada`);
    }
  };

  // Función para determinar qué función de confirmación usar
  const getConfirmHandler = () => {
    switch (action) {
      case "DeleteJob":
        return handleConfirmDelete;
      case "Reject":
        return handleConfirmReject;
      case "Accept":
        return handleConfirmAccept;
      case "cancelPostulant":
        return handleConfirmCancel;
      case "restoreJob":
        return handleConfirmRestore;
      default:
        return () => {};
    }
  };

  return (
    <div className={styles.jobDetailPage_container}>
      <div className={styles.breadCrumbs}>
        Inicio / Solicitudes/
        <span className={styles.spanBreadCrumbs}> Detalle del trabajo</span>
      </div>

      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <>
          <div className={styles.jobDetails_container}>
            <div className={styles.jobDetails}>
              <div className={styles.titleAndUser_container}>
                <div className={styles.jobTitle_container}>
                  <div className={styles.titleAndCategory}>
                    <h1 className={styles.jobTitle}>{info.title}</h1>
                    <CategoryIcon className={styles.categoryIcon} />
                  </div>
                  <div className={styles.line}></div>
                </div>
              </div>
              <div className={styles.description_container}>
                <h1 className={styles.h1Description}>Descripción</h1>
                <p>{info.description}</p>
              </div>
              <div className={styles.number_postulations}>
                {jobAccepted ? (
                  <span style={{ color: "green" }}>
                    ✅ Trabajo aceptado - {acceptedEmployee?.name}
                  </span>
                ) : (
                  <span>+{info.postulations} Postulaciones</span>
                )}
              </div>
            </div>
            <div className={styles.container_button}>
              {info.status == "Available" ? (
                <button
                  disabled={jobAccepted}
                  onClick={() => handleAction("DeleteJob")}
                >
                  <FaTrashAlt size={30} className={styles.icon} />
                </button>
              ) : (
                <button
                  className={styles.buttonRestore}
                  onClick={() => handleAction("restoreJob")}
                >
                  Reestablecer
                </button>
              )}
            </div>
          </div>

          {/* Tabla con scroll y header fijo */}
          <div className={styles.tableContainer}>
            {postulations.length > 0 ? (
              <table className={styles.table}>
                <thead>
                  <tr className={styles.headerRow}>
                    <th className={styles.headerCell}>Empleado</th>
                    <th className={styles.headerCell}>Presupuesto</th>
                    <th className={styles.headerCell}>Fecha de realización</th>
                    <th className={styles.headerCell}>Acciones</th>
                    {jobAccepted && (
                      <>
                        <th className={styles.headerCell}>Contacto</th>
                        <th className={styles.headerCell}>Acciones</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {postulations.map((postulation) => (
                    <tr key={postulation.id} className={styles.bodyRow}>
                      <td className={styles.bodyCell}>
                        {jobAccepted &&
                        postulation.id === acceptedEmployee?.id ? (
                          <span style={{ fontWeight: "bold", color: "green" }}>
                            ✅ {postulation.name}
                          </span>
                        ) : (
                          postulation.name
                        )}
                      </td>
                      <td className={`${styles.bodyCell} ${styles.budget}`}>
                        {postulation.budget.toLocaleString()}$
                      </td>
                      <td className={styles.bodyCell}>{postulation.date}</td>
                      <td className={styles.bodyCell}>
                        <div className={styles.actions}>
                          {!jobAccepted ? (
                            <>
                              <button
                                className={`${styles.button} ${styles.rejectButton}`}
                                onClick={() =>
                                  handleAction("Reject", postulation.id)
                                }
                                disabled={selectedPostulationId}
                              >
                                Rechazar
                              </button>
                              <button
                                className={`${styles.button} ${styles.acceptButton}`}
                                onClick={() =>
                                  handleAction("Accept", postulation.id)
                                }
                                disabled={selectedPostulationId}
                              >
                                Aceptar
                              </button>
                            </>
                          ) : (
                            <span
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              Contratado
                            </span>
                          )}
                        </div>
                      </td>
                      {jobAccepted && (
                        <>
                          <PostulationNumber
                            ps={postulation}
                            userName={user.name}
                          />
                          <td>
                            <FaTrashAlt
                              onClick={() => handleCancelPostulant()}
                              className={styles.delete_icon}
                            />
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noPostulations}>
                <div className={styles.noPostulationsIcon}>📋</div>
                <h3 className={styles.noPostulationsTitle}>
                  No hay postulaciones
                </h3>
                <p className={styles.noPostulationsMessage}>
                  Aún no se han recibido postulaciones para este trabajo.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <ModalConfirm
        message={message.pricipalMessage}
        subMessage={message.subMessage}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleConfirm={getConfirmHandler()}
      />
    </div>
  );
}
