import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./EmployerJobDetails.module.css"
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { FaTrashAlt } from "react-icons/fa";
import ModalConfirm from "../../../components/modalConfirm/modalConfirm";
import { useNavigate } from "react-router-dom";

export default function EmployerJobDetails() {
  const { id } = useParams();
  const [info, setInfo] = useState({});
  const [postulations, setPostulations] = useState([])
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");
  const [selectedPostulationId, setSelectedPostulationId] = useState(null);

  const navigate = useNavigate();
  const CategoryIcon = info.category && UseCategoryIcon(info.category);

  const employees = [
    {
      id: 1,
      name: 'Joaquín tanlongo',
      budget: 10000,
      date: '07/04/25'
    },
    {
      id: 2,
      name: 'Joaquín tanlongo',
      budget: 10000,
      date: '07/04/25'
    },
    {
      id: 3,
      name: 'Joaquín tanlongo',
      budget: 10000,
      date: '07/04/25'
    },
    {
      id: 4,
      name: 'Joaquín tanlongo',
      budget: 10000,
      date: '07/04/25'
    },
    {
      id: 5,
      name: 'Francisco tanlongo',
      budget: 10000,
      date: '07/04/25'
    }
  ];

  const infoJob = {
    title: "Levantar un tapial",
    category: "Mechanics",
    description: "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
    postulations: 300
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setInfo(infoJob);
      setPostulations(employees);
    }, 2000);
  }, [])

  const handleAction = (actionType, postulationId = null) => {
    setAction(actionType);
    setSelectedPostulationId(postulationId);
    setIsModalVisible(true);

    if (actionType === "DeleteJob") {
      setMessage("¿Estás seguro de borrar el trabajo?");
    } else if (actionType === "Reject") {
      setMessage("¿Estás seguro de eliminar la postulación?");
    } else if (actionType === "Accept") {
      setMessage("¿Estás seguro de aceptar la postulación?");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPostulationId(null);
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    navigate("/", { replace: true });
  };

  const handleConfirmReject = () => {
    setIsModalVisible(false);
    if (selectedPostulationId) {
      setPostulations(prev => prev.filter(p => p.id !== selectedPostulationId));
      console.log(`Postulación ${selectedPostulationId} rechazada`);
    }
  };

  const handleConfirmAccept = () => {
    setIsModalVisible(false);
    if (selectedPostulationId) {
      setPostulations(prev => prev.filter(p => p.id == selectedPostulationId))
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
      default:
        return () => { };
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
                +{info.postulations} Postulaciones
              </div>
            </div>
            <div className={styles.container_button}>
              <button onClick={() => handleAction("DeleteJob")}>
                <FaTrashAlt size={30} className={styles.icon} />
              </button>
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
                  </tr>
                </thead>
                <tbody>
                  {postulations.map((postulation) => (
                    <tr key={postulation.id} className={styles.bodyRow}>
                      <td className={styles.bodyCell}>{postulation.name}</td>
                      <td className={`${styles.bodyCell} ${styles.budget}`}>
                        {postulation.budget.toLocaleString()}$
                      </td>
                      <td className={styles.bodyCell}>{postulation.date}</td>
                      <td className={styles.bodyCell}>
                        <div className={styles.actions}>
                          <button
                            className={`${styles.button} ${styles.rejectButton}`}
                            onClick={() => handleAction("Reject", postulation.id)}
                            disabled={selectedPostulationId}
                          >
                            Rechazar
                          </button>
                          <button
                            className={`${styles.button} ${styles.acceptButton}`}
                            onClick={() => handleAction("Accept", postulation.id)}
                            disabled={selectedPostulationId}
                          >
                            Aceptar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noPostulations}>
                <div className={styles.noPostulationsIcon}>📋</div>
                <h3 className={styles.noPostulationsTitle}>No hay postulaciones</h3>
                <p className={styles.noPostulationsMessage}>
                  Aún no se han recibido postulaciones para este trabajo.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <ModalConfirm
        message={message}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleConfirm={getConfirmHandler()}
      />
    </div>
  );
}