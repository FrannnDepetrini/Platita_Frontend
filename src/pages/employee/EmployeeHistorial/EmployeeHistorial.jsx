// import React, { useEffect, useState } from "react";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { IoIosStar } from "../../../utils/icons/icons";
import "./EmployeeHistorial.css";

<<<<<<< HEAD
// export function EmployeeHistorial() {
//   const [jobs, setJobs] = useState([]);

//   useEffect(() => {
//     setJobs([
//       {
//         id: 1,
//         titulo: "Levantar un tapial",
//         empleador: "Fulano Detal",
//         categoria: "Construction",
//         fecha: "07/04/25",
//         reseña: 5,
//         tiempoExpirado: false,
//       },
//       {
//         id: 2,
//         titulo: "Levantar un tapial",
//         empleador: "Fulano Detal",
//         categoria: "Construction",
//         fecha: "07/04/25",
//         reseña: 3,
//         tiempoExpirado: false,
//       },
//       {
//         id: 3,
//         titulo: "Levantar un tapial",
//         empleador: "Fulano Detal",
//         categoria: "Construction",
//         fecha: "07/04/25",
//         reseña: null,
//         tiempoExpirado: false,
//       },
//       {
//         id: 4,
//         titulo: "Levantar un tapial",
//         empleador: "Fulano Detal",
//         categoria: "Construction",
//         fecha: "07/04/25",
//         reseña: null,
//         tiempoExpirado: true,
//       },
//     ]);
//   }, []);

//   const handleReview = (job) => {
//     if (job.reseña !== null) {
//       return (
//         <div className="stars">
//           {[1, 2, 3, 4, 5].map((n) => (
//             <FaStar key={n} className={n <= job.reseña ? "" : "inactive"} />
//           ))}
//         </div>
//       );
//     } else if (!job.tiempoExpirado) {
//       return <span className="comment-link">Dejar una reseña</span>;
//     } else if (job.tiempoExpirado) {
//       return <span className="expired">El tiempo expiró</span>;
//     }
//   };

//   return (
//     <div className="employee-historial">
//       <div className="breadcrumb">
//         Inicio / <span className="current-page">Historial</span>
//       </div>

//       <div className="table-container">
//         <table>
//           <thead>
//             <tr>
//               <th>Trabajo</th>
//               <th>Empleador</th>
//               <th>Categoría</th>
//               <th>Fecha de finalización</th>
//               <th>Reseña</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => {
//               const Icon = UseCategoryIcon(job.categoria);
//               return (
//                 <tr key={job.id}>
//                   <td className="job-title">{job.titulo}</td>
//                   <td>{job.empleador}</td>
//                   <td className="icon">{Icon && <Icon />}</td>
//                   <td>{job.fecha}</td>
//                   <td>{handleReview(job)}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import "./Postulations.css";
import { FaTrashAlt } from "../../../utils/icons/icons";

import { useEffect, useState } from "react";

=======
>>>>>>> efe1c729ab946e36ec0d6cd82f967f27b9cd697b
export default function EmployeeHistorial() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // const jobsMapped = () => {
  //   return jobs.map((job) => {
  //             const Icon = UseCategoryIcon(job.categoria);
  //             return (
  //               <tr key={job.id}>
  //                 <td className="job-title">{job.titulo}</td>
  //                 <td>{job.empleador}</td>
  //                 <td className="icon">{Icon && <Icon />}</td>
  //                 <td>{job.fecha}</td>
  //                 <td>{handleReview(job)}</td>
  //               </tr>
  //             );
  //           })}
  // }

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://magicloops.dev/api/loop/37a05862-b884-4529-9746-e40fc2109420/run?count=3"
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
<<<<<<< HEAD
    fetchData();
=======
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
>>>>>>> efe1c729ab946e36ec0d6cd82f967f27b9cd697b
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

  const handleDeleteJob = (id) => {
    setJobs(jobs.filter((job) => job !== id));
  };

  const jobsMapped = () => {
    console.log(jobs);
    if (jobs.length == 0) {
      <td colspan={6}>No tienes trabajos aún!</td>;
    } else {
      return jobs.map((job) => {
        const CategoryIcon = UseCategoryIcon(job.category);
        return (
          <tr key={job.id}>
            <td>{job.title} </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null} className="td_empleador">
              <h4>{job.employer}</h4>
            </td>
            <td>
              <CategoryIcon className="category_icon" />
            </td>
            <td>
              <div className="td_date">{job.date}</div>
            </td>
            <td>{handleReview(job)} </td>
            <td>
              <FaTrashAlt
                onClick={() => handleDeleteJob(job.id)}
                className="delete_icon"
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
<<<<<<< HEAD
    <div className="postulations_container">
      <div className="table_container">
        <table className="table_postulations">
=======
    <div className="employee-historial">
      <div className="breadcrumb">
        Inicio / <span className="current-page">Historial</span>
      </div>

      <div className="table-container">
        <table>
>>>>>>> efe1c729ab946e36ec0d6cd82f967f27b9cd697b
          <thead>
            <tr>
              <th>Trabajo</th>
              <th>Empleador</th>
              <th>Categoría</th>
              <th>Fecha de finalización</th>
              <th>Reseña</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  Cargando trabajos<span className="dots"></span>
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
  );
}
