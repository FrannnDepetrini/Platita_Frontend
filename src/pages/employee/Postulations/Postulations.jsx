import "./Postulations.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { useEffect, useState } from "react";

import useAuth from "../../../services/contexts/AuthProvider";
import PostulationNumber from "./PostulationNumber";
import { postulationService } from "../../../services/postulationServices/postulationService";

export default function Postulations() {
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await postulationService.getMyPostulations();
      setPostulations(response);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePs = async (jobId, psId) => {
    try {
      console.log(jobId, psId);
      await postulationService.deletePostulationLogic(jobId, psId);
      fetchData();
    } catch (error) {
      console.log(error);
      alert("Hubo un error al borrar la postulacion", error);
    }
  };

  const postMapped = () => {
    if (postulations.length == 0) {
      <td colspan={6}>No tienes postulaciones aún!</td>;
    } else {
      return postulations.map((ps) => {
        const CategoryIcon = UseCategoryIcon(ps.job.category);
        const jobDayFormatted = new Date(ps.jobDay).toLocaleDateString();
        return (
          <tr key={ps.id}>
            <td>{ps.job.title} </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null} className="td_empleador">
              <h4>{ps.job.userName}</h4>
            </td>
            <td>
              <CategoryIcon className="category_icon" />
            </td>
            <td>
              <div
                className={`td_state ${
                  ps.status == "Pending"
                    ? "Pending"
                    : ps.status == "Success"
                    ? "Accepted"
                    : ps.status == "Done"
                    ? "Finished"
                    : ps.status == "Rejected"
                    ? "Rejected"
                    : "Cancelled"
                }`}
              >
                {ps.status}
              </div>
            </td>
            <td>{jobDayFormatted} </td>
            <td>
              {ps.status == "Pending" || ps.status == "Done" ? (
                <FaTrashAlt
                  onClick={() => handleDeletePs(ps.job.id, ps.id)}
                  className="delete_icon"
                />
              ) : (
                "-"
              )}
            </td>

            <PostulationNumber ps={ps} userName={user.name} />
          </tr>
        );
      });
    }
  };

  return (
    <div className="postulations_container">
      <div className="table_container">
        <table className="table_postulations">
          <thead>
            <tr>
              <th>Trabajo</th>
              <th>Empleador</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th>Fecha prevista</th>
              <th>Acciones</th>
              <th>Contacto</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>
                  Cargando postulaciones<span className="dots"></span>
                </td>
              </tr>
            ) : (
              postMapped()
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
