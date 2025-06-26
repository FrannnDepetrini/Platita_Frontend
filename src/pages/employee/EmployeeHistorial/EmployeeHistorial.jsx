import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import {
  IoIosStar,
  IoIosStarHalf,
  IoIosStarOutline,
} from "../../../utils/icons/icons";
import "./EmployeeHistorial.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import { useEffect, useState } from "react";
import { postulationService } from "../../../services/postulationServices/postulationService";
import { useNavigate } from "react-router-dom";

export default function EmployeeHistorial() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await postulationService.getMyPostulationsDone();
      console.log(response);
      setJobs(response);
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
          stars.push(<IoIosStar className="star" key={i} />);
        } else if (average >= i - 0.5) {
          stars.push(<IoIosStarHalf className="star" key={i} />);
        } else {
          stars.push(<IoIosStarOutline className="star" key={i} />);
        }
      }

      return stars;
    }
  };

  const handleRateEmployer = (id) => {
    navigate(`/employee/rating/${id}`);
  };

  const psMapped = () => {
    return jobs.map((ps) => {
      console.log(ps);
      const CategoryIcon = UseCategoryIcon(ps.category);
      return (
        <tr key={ps.postulationId}>
          <td>{ps.jobTitle} </td>
          <td onClick={() => {}} className="td_empleador_historial">
            <h4>{ps.employerName}</h4>
          </td>
          <td>
            <CategoryIcon className="category_icon" />
          </td>
          <td>
            <div>{ps.dateJobFinished}</div>
          </td>
          <td>
            {ps.canRate == false && !ps.score ? (
              "El tiempo expiro"
            ) : ps.canRate == true && !ps.score ? (
              <a className="a_rating" onClick={() => handleRateEmployer(ps.id)}>
                Dejar una reseña
              </a>
            ) : (
              starsCalculated(ps.score)
            )}{" "}
          </td>
        </tr>
      );
    });
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
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  Cargando trabajos<span className="dots"></span>
                </td>
              </tr>
            ) : jobs.length == 0 ? (
              <tr>
                <td>No tienes trabajos completados aun</td>
              </tr>
            ) : (
              psMapped()
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
