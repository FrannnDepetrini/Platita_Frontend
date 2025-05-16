import React, { useEffect, useState } from "react";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { IoIosStar } from "../../../utils/icons/icons";
import "./EmployeeHistorial.css";

export default function EmployeeHistorial() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs([
      {
        id: 1,
        titulo: "Levantar un tapial",
        empleador: "Fulano Detal",
        categoria: "Construction",
        fecha: "07/04/25",
        reseña: 5,
        tiempoExpirado: false,
      },
      {
        id: 2,
        titulo: "Levantar un tapial",
        empleador: "Fulano Detal",
        categoria: "Construction",
        fecha: "07/04/25",
        reseña: 3,
        tiempoExpirado: false,
      },
      {
        id: 3,
        titulo: "Levantar un tapial",
        empleador: "Fulano Detal",
        categoria: "Construction",
        fecha: "07/04/25",
        reseña: null,
        tiempoExpirado: false,
      },
      {
        id: 4,
        titulo: "Levantar un tapial",
        empleador: "Fulano Detal",
        categoria: "Construction",
        fecha: "07/04/25",
        reseña: null,
        tiempoExpirado: true,
      },
    ]);
  }, []);

  const handleReview = (job) => {
    if (job.reseña !== null) {
      return (
        <div className="stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <IoIosStar key={n} className={n <= job.reseña ? "" : "inactive"} />
          ))}
        </div>
      );
    } else if (!job.tiempoExpirado) {
      return <span className="comment-link">Dejar una reseña</span>;
    } else if (job.tiempoExpirado) {
      return <span className="expired">El tiempo expiró</span>;
    }
  };

  return (
    <div className="employee-historial">
      <div className="breadcrumb">
        Inicio / <span className="current-page">Historial</span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Trabajo</th>
              <th>Empleador</th>
              <th>Categoría</th>
              <th>Fecha de finalización</th>
              <th>Reseña</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => {
              const Icon = UseCategoryIcon(job.categoria);
              return (
                <tr key={job.id}>
                  <td className="job-title">{job.titulo}</td>
                  <td>{job.empleador}</td>
                  <td className="icon">{Icon && <Icon />}</td>
                  <td>{job.fecha}</td>
                  <td>{handleReview(job)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
