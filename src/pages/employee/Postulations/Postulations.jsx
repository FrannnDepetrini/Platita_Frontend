import "./Postulations.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import UseCategoryIcon from "../../../customhooks/useCategoryIcon";
import { useEffect, useState } from "react";

export default function Postulations() {
  const [postulations, setPostulations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://magicloops.dev/api/loop/6ee7a60e-6f33-4349-b209-c5786a6f99a9/run"
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
        const CategoryIcon = UseCategoryIcon(ps.categoria);
        return (
          <tr key={ps.id}>
            <td>{ps.trabajo} </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null} className="td_empleador">
              <h4>{ps.empleador}</h4>
            </td>
            <td>
              <CategoryIcon className="category_icon" />
            </td>
            <td>
              <div
                className={`td_state ${
                  ps.estado == "Pendiente"
                    ? "Pending"
                    : ps.estado == "Aceptado"
                    ? "Accepted"
                    : "Finished"
                }`}
              >
                {ps.estado}
              </div>
            </td>
            <td>{ps.fechaPostulacion} </td>
            <td>
              <FaTrashAlt
                onClick={() => handleDeletePs(ps.id)}
                className="delete_icon"
              />
            </td>
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
              <th>
                Fecha de <br />
                postulacion
              </th>
              <th>Acciones</th>
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
