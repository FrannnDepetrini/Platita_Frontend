import { useParams } from "react-router-dom";
import styles from "./SupportDetail.module.css";
import { MdLocationOn } from "react-icons/md";
import { IoCalendarOutline, IoLink } from "react-icons/io5";
import ModalResolve from "./ModalResolve";
import { useState } from "react";

// Eliminar cuando este la api
const supportDetailComplains = [
    {
        id: "1",
        userName: "Fulano Detal",
        description: "Entre a la aplicacion y tuve un problema con mi lista de trabajos publicados.",
        date: "04/05/2025",
    },
    {
        id: "2",
        userName: "Juan Gomez",
        description: "Intenté actualizar mi perfil y los cambios no se guardaron.",
        date: "23/05/2025",
    },
    {
        id: "3",
        userName: "Pedro Sanchez",
        description: "No puedo subir un nuevo trabajo, el botón no hace nada.",
        date: "15/04/2025",
    },
    {
        id: "4",
        userName: "Mario Lopez",
        description: "La aplicación no carga mis notificaciones, se queda en blanco.",
        date: "19/03/2025",
    },
    {
        id: "5",
        userName: "David Martinez",
        description: "Quise filtrar los trabajos por categoría, pero siempre me muestra los mismos resultados.",
        date: "20/01/2025",
    },
];

export default function SupportDetail() {
  const { id } = useParams();
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [isResolved, setIsResolved] = useState(false); // ✅ nuevo estado

  const complain = supportDetailComplains.find((j) => j.id === id);

  if (!complain) {
    return <div>Trabajo no encontrado</div>;
  }

  const handleResolve = () => {
    setIsResolved(true);
    setShowResolveModal(false);
  };

  return (
    <div>
      {showResolveModal && <ModalResolve onClose={() => setShowResolveModal(false)} onResolve={handleResolve} />}
      
      <div className={styles.complain_title}>
        <h1>
          <span className={styles.grey_text}>Inicio </span>
          <strong>/ Detalle del trabajo</strong>
        </h1>
      </div>

      <div className={styles.complain_align_cards}>
        <div className={styles.complain_container_box}>
          <div className={styles.complain_header}>
              <h2>{complain.userName}</h2>
              <div className={styles.user_picture}></div>
          </div>

          <div className={styles.box_separator}>
            <hr color="#fbbd08" />
          </div>

          <div className={styles.complain_description}>
            <h3 className={styles.description_title}>Descripción</h3>
            <p>{complain.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.complain_information}>
        <div className={styles.fecha_container}>
          <IoCalendarOutline className={styles.icon_fecha} />
          <h4>Fecha</h4>
          <p>{complain.date}</p>
        </div>

        {/* ✅ Mostrar botones si no está resuelta, o cartel si ya está resuelta */}
        <div className={styles.button_container}>
          {!isResolved ? (
            <>
              <button className={styles.whatsapp_button}>
                  whatsapp
              </button>
              <button className={styles.resolve_button} onClick={() => setShowResolveModal(true)}>
                  Resolver
              </button>
            </>
          ) : (
            <div className={styles.resolved_container}>
                <p className={styles.resolved_text}>Queja resuelta ✅</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
