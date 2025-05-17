import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
} from "../../../utils/icons/icons";
import "./EmployeeHistorial.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import { useEffect, useState } from "react";

export default function EmployeeHistorial() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://magicloops.dev/api/loop/37a05862-b884-4529-9746-e40fc2109420/run?count=4"
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

  const starsCalculated = (average, expirationDate) => {
    const today = new Date();
    const dateMapped = new Date(expirationDate);
    const isExpired = dateMapped < today;
    var stars = [];

    if (average == 0 && isExpired) {
      return <span className="expired">El tiempo expiró</span>;
    } else if (average == 0 && !isExpired) {
      return <span className="comment-link">Dejar una reseña</span>;
    } else {
      for (var i = 1; i < 6; i++) {
        if (average >= i) {
          stars.push(<IoIosStar className="star" />);
        } else if (average >= i - 0.5) {
          stars.push(<IoIosStarHalf className="star" />);
        } else {
          stars.push(<IoIosStarOutline className="star" />);
        }
      }

      return stars;
    }
  };

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
              <div>{job.date}</div>
            </td>
            <td>{starsCalculated(job.review, job.expirationDate)} </td>
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
    <div className="job_container">
      <div className="table_container">
        <table className="table_job">
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
