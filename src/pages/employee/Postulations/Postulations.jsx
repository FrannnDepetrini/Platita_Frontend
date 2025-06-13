import "./Postulations.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { useEffect, useState } from "react";

import useAuth from "../../../services/contexts/AuthProvider";
import PostulationNumber from "./PostulationNumber";

export default function Postulations() {
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://magicloops.dev/api/loop/6ee7a60e-6f33-4349-b209-c5786a6f99a9/run?input=Hello+World"
      );
      if (!response.ok) throw new Error("Sucedio un error inesperado");
      const data = await response.json();

      setPostulations(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDeletePs = (id) => {
    setPostulations(postulations.filter((ps) => ps.id !== id));
  };

  const postMapped = () => {
    if (postulations.length == 0) {
      <td colspan={6}>No tienes postulaciones aún!</td>;
    } else {
      return postulations.map((ps) => {
        const CategoryIcon = UseCategoryIcon(ps.Category);
        return (
          <tr key={ps.id}>
            <td>{ps.Title} </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null} className="td_empleador">
              <h4>{ps.UserName}</h4>
            </td>
            <td>
              <CategoryIcon className="category_icon" />
            </td>
            <td>
              <div
                className={`td_state ${
                  ps.Status == "Pendiente"
                    ? "Pending"
                    : ps.Status == "Aceptado"
                    ? "Accepted"
                    : "Finished"
                }`}
              >
                {ps.Status}
              </div>
            </td>
            <td>{ps.JobDay} </td>
            <td>
              <FaTrashAlt
                onClick={() => handleDeletePs(ps.Id)}
                className="delete_icon"
              />
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
