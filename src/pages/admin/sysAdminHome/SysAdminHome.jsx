import { useEffect, useState } from "react";
import styles from "./SysAdminHome.module.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import classNames from "classnames";

const SysAdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://magicloops.dev/api/loop/11f437ae-27d7-4abf-824a-dd10423fc8dc/run?input=Hello+World"
      );
      if (!response.ok) throw new Error("Sucedio un error inesperado");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const usersMapped = () => {
    if (users.length == 0) {
      <td colspan={6}>No tienes postulaciones aún!</td>;
    } else {
      return users.map((user) => {
        return (
          <tr key={user.id}>
            <td>
              <h4 className={styles.td_user}>{user.UserName}</h4>{" "}
            </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null}>{user.Email}</td>
            <td>
              <div
                className={classNames(styles.td_role, {
                  [styles.Client]: user.Role == "Client",
                  [styles.Moderator]: user.Role == "Moderator",
                  [styles.SysAdmin]: user.Role == "SysAdmin",
                  [styles.Support]: user.Role == "Support",
                })}
              >
                {user.Role}
              </div>
            </td>
            <td>
              <FaTrashAlt
                onClick={() => handleDeleteUser(user.id)}
                className="delete_icon"
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className={styles.sysadmin_container}>
      <h4>Inicio</h4>
      <table className={styles.table_users}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6}>
                Cargando usuarios<span className={styles.dots}></span>
              </td>
            </tr>
          ) : (
            usersMapped()
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SysAdminHome;
