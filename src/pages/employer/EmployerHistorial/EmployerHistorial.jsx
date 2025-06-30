import styles from "./EmployerHistorial.module.css";

import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { FaTrashAlt } from "../../../utils/icons/icons";
import { useEffect, useState } from "react";
import { jobService } from "../../../services/jobService/jobService";
import { useNavigate } from "react-router-dom";

export default function EmployeeHistorial() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleGoToJobDetail = (id) => {
    navigate(`/employer/jobDetails/${id}`);
  };

  const handleJobDetail = async (id) => {
    try {
      const response = await jobService.getJobById(id);
      console.log("Detalle del trabajo:", response);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getMyJobs();
        console.log("RESPONSE:", response);

        if (Array.isArray(response)) {
          setJobs(response);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.log(error.message);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este trabajo?"))
      return;

    try {
      await jobService.deleteJobById(id);
      setJobs(jobs.filter((job) => job.id !== id));
      console.log("Trabajo eliminado con exito");
    } catch (error) {
      console.log(error.message);
    }
  };

  const jobsMapped = () => {
    if (jobs.length === 0) {
      return (
        <tr>
          <td colSpan={6}>No tienes trabajos aún!</td>
        </tr>
      );
    }

    return jobs.map((job) => {
      const CategoryIcon = UseCategoryIcon(job.category);
      const stateClass = {
        deleted: styles.state_finalizado,
        taken: styles.state_asignado,
        available: styles.state_disponible,
        done: styles.state_done,
      };

      return (
        <tr key={job.id}>
          <td
            onClick={() => handleGoToJobDetail(job.id)}
            className={styles.job_title}
            style={{ cursor: "pointer" }}
          >
            {job.title}
          </td>
          <td
            onClick={() => handleJobDetail(job.id)}
            className={styles.td_empleado}
          >
            <h4>{job.userName}</h4>
          </td>
          <td>
            <CategoryIcon className={styles.category_icon} />
          </td>
          <td>
            <div
              className={`${styles.job_state} ${
                stateClass[job.status?.toLowerCase()] || ""
              }`}
              style={{ fontWeight: "normal" }}
            >
              {job.status}
            </div>
          </td>
          <td>
            <div className={styles.job_date}>
              {new Date(job.dayPublicationEnd).toLocaleDateString()}
            </div>
          </td>
          <td>
            {job.status === "Done" || job.status === "Taken" ? (
              "-"
            ) : (
              <FaTrashAlt
                onClick={() => handleDeleteJob(job.id)}
                className={styles.delete_icon}
              />
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          <span className={styles.grey_title}>Inicio</span>
          /Historial de Trabajos
        </h1>
      </div>
      <div className={styles.job_container}>
        <div className={styles.table_container}>
          <table className={styles.table_job}>
            <thead>
              <tr>
                <th>Trabajo</th>
                <th>Empleado</th>
                <th>Categoría</th>
                <th>Estado</th>
                <th>Fecha de finalizacion</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6}>
                    Cargando trabajos<span className={styles.dots}></span>
                  </td>
                </tr>
              ) : (
                jobsMapped()
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
