import { useEffect, useState } from "react";
import styles from "./SysAdminHome.module.css";
import { FaTrashAlt } from "../../../utils/icons/icons";
import classNames from "classnames";
import { sysadminService } from "../../../services/sysadminServices/sysadminServices";
import ModalConfirm from "../../../components/ModalConfirm/modalConfirm";
import { SlArrowDown } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

const SysAdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteUser, setDeleteUser] = useState({});
  const [sortBy, setSortBy] = useState(""); // Estado para el ordenamiento
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      await sysadminService.deleteUser(deleteUser.id);
      setUsers(users.filter((u) => u.id !== deleteUser.id));
    } catch (error) {
      alert(error?.message);
    }
    setShowModal(false);
  };

  const handleShowModal = (user) => {
    setDeleteUser(user);
    setShowModal(true);
  };

  const nameSpanish = (role) => {
    const roles = {
      Moderator: "Moderador",
      Support: "Soporte",
      Client: "Cliente",
      SysAdmin: "Administrador del Sistema",
    };

    return roles[role] || "Rol no encontrado";
  };

  // Función para ordenar usuarios
  const sortUsers = (usersArray, sortBy) => {
    if (!sortBy) return usersArray;

    return [...usersArray].sort((a, b) => {
      if (sortBy === "nombre") {
        return a.userName.toLowerCase().localeCompare(b.userName.toLowerCase());
      } else if (sortBy === "email") {
        return a.email.toLowerCase().localeCompare(b.email.toLowerCase());
      } else if (sortBy === "role") {
        return a.role.toLowerCase().localeCompare(b.role.toLowerCase());
      }
      return 0;
    });
  };

  // Manejar cambio en el select
  const handleSortChange = (e) => {
    const newSortBy = e.target.value;
    setSortBy(newSortBy);
  };

  const fetchData = async () => {
    try {
      const data = await sysadminService.getAllUsers();
      setUsers(data);
      console.log(data);
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
      return (
        <tr>
          <td colSpan={4}>No hay usuarios aún!</td>
        </tr>
      );
    } else {
      // Aplicar ordenamiento a los usuarios antes de mapearlos
      const sortedUsers = sortUsers(users, sortBy);

      return sortedUsers.map((user) => {
        return (
          <tr key={user.id}>
            <td className={styles.name}>
              <h4 className={styles.td_user}>{user.userName}</h4>{" "}
            </td>
            {/* Ese onClick debera enviarte al perfil de ese usuario */}
            <td onClick={null}>{user.email}</td>
            <td>
              <div
                className={classNames(styles.td_role, {
                  [styles.Client]: user.role == "Client",
                  [styles.Moderator]: user.role == "Moderator",
                  [styles.SysAdmin]: user.role == "SysAdmin",
                  [styles.Support]: user.role == "Support",
                })}
              >
                {nameSpanish(user.role)}
              </div>
            </td>
            <td>
              <FaTrashAlt
                onClick={() => handleShowModal(user)}
                className="delete_icon"
              />
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <>
      <div className={styles.sysadmin_container}>
        <h4>Inicio</h4>
        <div className={styles.tableButtons}>
          <div className={styles.table_wrapper}>
            <table className={styles.table_users}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className={styles.scrollable_tbody}>
                {loading ? (
                  <tr>
                    <td colSpan={4}>
                      Cargando usuarios<span className={styles.dots}></span>
                    </td>
                  </tr>
                ) : (
                  usersMapped()
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}></td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className={styles.containerButtons}>
            <div className={styles.selectWrapper}>
              <select
                className={styles.customSelect}
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="">Ordenar</option>
                <option value="nombre">Nombre</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
              </select>
              <SlArrowDown className={styles.selectIcon} />
            </div>
            <button onClick={() => navigate("/sysadmin/createUser")}>
              Crear un nuevo usuario
            </button>
          </div>
        </div>
      </div>
      <ModalConfirm
        message={`¿Seguro quiere eliminar este usuario "${deleteUser?.userName}?"`}
        isModalVisible={showModal}
        handleCancel={() => {
          setShowModal(false);
        }}
        handleConfirm={handleDeleteUser}
      />
    </>
  );
};

export default SysAdminHome;
