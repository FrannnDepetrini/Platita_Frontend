import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EmployerJobDetails.module.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { FaTrashAlt } from "react-icons/fa";

import ModalConfirm from "../../../components/ModalConfirm/modalConfirm";

import { useNavigate } from "react-router-dom";
import PostulationNumber from "../../employee/Postulations/PostulationNumber";
import useAuth from "../../../services/contexts/AuthProvider";
import { jobService } from "../../../services/jobService/jobService";
import { postulationService } from "../../../services/postulationServices/postulationService";

export default function EmployerJobDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState({
    pricipalMessage: "",
    subMessage: "",
  });

  const { user } = useAuth();
  const [action, setAction] = useState("");
  const [selectedPostulationId, setSelectedPostulationId] = useState("");


  const [jobAccepted, setJobAccepted] = useState(false);
  const [jobDeleted, setJobDeleted] = useState(false);
  const [acceptedEmployee, setAcceptedEmployee] = useState(null);

  const fetchJobAndPostulations = async () => {
    try {

      const jobData = await jobService.getJobById(id);
      setInfo(jobData);
      setJobDeleted(jobData.status === "Deleted");

      if (jobData.status === "Taken" || jobData.status === "Completed") {
        setJobAccepted(true);
      }

      const postulationData = await postulationService.getPostulationsByJobId(id);
      console.log("Postulaciones recibidas:", postulationData);
      
      const postulationsArray = Array.isArray(postulationData) ? postulationData : [];
      setPostulations(postulationsArray);

      if (jobData.status === "Taken") {
        const accepted = postulationsArray.find(p => p.status === "Success");
        setAcceptedEmployee(accepted);
      }


    } catch (error) {
      setPostulations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobAndPostulations();
    } else {
      setLoading(false);
    }
  }, [id]);

  const navigate = useNavigate();
  const CategoryIcon = info.category && UseCategoryIcon(info.category);

  const handleConfirmCancel = async () => {
    if (!selectedPostulationId) {
      alert("No se selecciono ninguna postulacion.");
      return;
    }

    setProcessing(true);

    try {
      await postulationService.cancelSuccessPostulation(id, selectedPostulationId);

      setAcceptedEmployee(null);
      setJobAccepted(false);

      await fetchJobAndPostulations();

      console.log(`Postulacion ${selectedPostulationId} cancelada exitosamente`);
    } catch (error) {
      console.error("Error al cancelar la postulacion aceptada", error);
      alert (
        error.message || "Error al cancelar la postulacion.Intentalo mas tarde."
      );
    } finally {
      setIsModalVisible(false);
      setSelectedPostulationId("");
      setProcessing(false);
    }
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

  const handleConfirmRestore = async () => {
    try {
      await jobService.restoreJob(id);

      await fetchJobAndPostulations();

      setJobAccepted(false);
      setAcceptedEmployee(null);
      setIsModalVisible(false);
      setSelectedPostulationId("");
    } catch (error) {
      console.error("Error al reestablecer el trabajo", error);
      alert("Error al reestablecer el trabajo. Inténtalo nuevamente más tarde.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPostulationId("");
  };

  const handleConfirmDelete = async () => {
    try {
      await jobService.deleteLogicJob(id);
      setInfo(prev => ({ ...prev, status: "Deleted"}));
      await fetchJobAndPostulations();
      alert("Trabajo eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar el trabajo", error);
      alert(error.message || "Error al eliminar el trabajo. Inténtalo nuevamente más tarde.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!selectedPostulationId) {
      alert("No se seleccionó ninguna postulación.");
      return;
    }

    try {
      await postulationService.deletePostulationLogic(id, selectedPostulationId);

      setPostulations((prev) =>
        prev.filter((p) => p.id !== selectedPostulationId)
      );
      console.log(`Postulacion ${selectedPostulationId} rechazada`);

      await fetchJobAndPostulations();
    } catch (error) {
      console.error("Error al rechazar la postulacion", error);
      alert("Error al rechazar la postulación. Inténtalo nuevamente más tarde.");
    } finally {
      setIsModalVisible(false);
      setSelectedPostulationId("");
    }
  };

  const handleConfirmAccept = async () => {
    setProcessing(true);

    setIsModalVisible(false);

    if (!selectedPostulationId) {
      alert("No se seleccionó ninguna postulación.");
      return;
    }

    try {
      setProcessing(true);

      const selectedPost = postulations.find(p => p.id === selectedPostulationId);
      
      if (!selectedPost) {
        alert("No se encontró la postulación seleccionada.");
        return;
      }

      const clientId = selectedPost.client.id;
      console.log("Client ID que enviaré:", clientId);

      await postulationService.approvePostulation(id, selectedPostulationId);

      await new Promise(resolve => setTimeout(resolve, 500));

      await fetchJobAndPostulations();

      console.log(`Postulación ${selectedPostulationId} aprobada exitosamente`);
      
    } catch (error) {
      console.error("Error al aprobar la postulación:", error);
    } finally {
      setSelectedPostulationId("");
      setProcessing(false);
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
                { jobDeleted ? (
                  <span style={{ color: "red" }}>
                    ❌ Trabajo cancelado
                  </span>
                ) :
                jobAccepted ? (
                  <span style={{ color: "green" }}>
                    ✅ Trabajo aceptado - {acceptedEmployee?.client?.userName || acceptedEmployee?.name}
                  </span>
                ) : (
                  <span>+{info.amountPostulations} Postulaciones</span>
                )}
              </div>
            </div>
            <div className={styles.container_button}>
              { jobDeleted ? (
                <button
                  className={styles.buttonRestore}
                  onClick={() => handleAction("restoreJob")}
                >
                  Reestablecer
                </button>
              ) : (
                <button
                  disabled={jobAccepted}
                  onClick={() => handleAction("DeleteJob")}
                >
                  <FaTrashAlt size={30} className={styles.icon} />
                </button>
              )}
            </div>
          </div>

          {/* Tabla con scroll y header fijo */}
          <div className={styles.tableContainer}>
            {postulations && postulations.length > 0 ? (
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
                  {postulations.filter(p => p.status !== "Rejected").map((postulation) => (
                    <tr key={postulation.id} className={styles.bodyRow}>
                      <td className={styles.bodyCell}>
                        {jobAccepted &&
                        postulation.id === acceptedEmployee?.id ? (
                          <span style={{ fontWeight: "bold", color: "green" }}>
                            ✅ {postulation.client?.userName}
                          </span>
                        ) : ( 
                          postulation.client?.userName
                        )}
                      </td>
                      <td className={`${styles.bodyCell} ${styles.budget}`}>
                        {postulation.budget?.toLocaleString()}$
                      </td>
                      <td className={styles.bodyCell}>
                        {postulation.jobDay}
                      </td>
                      <td className={styles.bodyCell}>
                        <div className={styles.actions}>
                          {jobDeleted ? (
                            <span style={{ color: "red" }}>Postulacion Cancelada</span>
                          ) : postulation.status === "Rejected" ? (
                            <span style={{ color: "red" }}>Postulación Rechazada</span>
                          ) :
                          !jobAccepted ? (
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
                                disabled={selectedPostulationId || processing}
                              >
                                
                                {processing && selectedPostulationId === postulation.id ? "Aceptando..." : "Aceptar"}
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
                            jobId={id}
                          />
                          <td>
                            <FaTrashAlt
                              onClick={() => handleAction("cancelPostulant", postulation.id)}
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
        loading={processing}
      />
    </div>
  );
}