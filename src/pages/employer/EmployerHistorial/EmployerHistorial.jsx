import styles from './EmployerHistorial.module.css';

import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { FaTrashAlt } from "../../../utils/icons/icons";
import { useEffect, useState } from "react";

export default function EmployeeHistorial() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://magicloops.dev/api/loop/ae1b4e54-65cb-4250-89cd-7124ab305d57/run?input=Hello+World"
      );
      if (!response.ok) throw new Error("Sucedio un error inesperado");
      const data = await response.json();
      setJobs(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    console.log("elimine");
  };

  const jobsMapped = () => {
    if (jobs.length == 0) {
      <td colspan={6}>No tienes trabajos aún!</td>;
    } else {
      return jobs.map((job) => {
        const CategoryIcon = UseCategoryIcon(job.category);
        // Define un objeto para mapear los estados a clases de color
        const stateClass = {
          finalizado: styles.state_finalizado,
          asignado: styles.state_asignado,
          disponible: styles.state_disponible,
        };

        return (
          <tr key={job.id}>
            <td>
                <div className={styles.job_title}>
                    {job.title}
                </div>
            </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null} className={styles.td_empleado}>
              <h4>{job.employee}</h4>
            </td>
            <td>
              <CategoryIcon className={styles.category_icon} />
            </td>
            <td>
              <div
            className={`${styles.job_state} ${
              stateClass[job.state?.toLowerCase()] || ""
            }`}
            style={{ fontWeight: "normal" }}
              >
            {job.state}
              </div>
            </td>
            <td>
              <div className={styles.job_date}>
                {job.date}
              </div>
            </td>
            <td>
              <FaTrashAlt
            onClick={() => handleDeleteJob(job.id)}
            className={styles.delete_icon}
              />
            </td>
          </tr>
        );
      });
    }
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
