import { useParams } from "react-router-dom";
import styles from "./SupportDetail.module.css";
import { IoCalendarOutline, IoLogoWhatsapp } from "react-icons/io5";
import { useEffect, useState } from "react";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm";
import { complaintService } from "../../../services/complaintService/complaintService";
import { useNavigate } from "react-router-dom";

export default function SupportDetail() {
  const { id } = useParams();
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [complain, setComplain] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isResolved) {
      setTimeout(() => {
        navigate("/support/home");
      }, 2000);
    }
  }, [isResolved, navigate]);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await complaintService.getComplaintById(Number(id));
        setComplain(response);
      } catch (error) {
        console.error("Error al obtener la queja:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  const handleResolve = async () => {
    try {
      await complaintService.completeComplaint(Number(id));
      setIsResolved(true);
    } catch (error) {
      console.error("Error al resolver la queja:", error);
      alert("No se pudo resolver la queja. Por favor intenta nuevamente.");
    } finally {
      setShowResolveModal(false);
    }
  };

  if (loading) return <p>Cargando queja...</p>;
  if (!complain) return <p>No se encontró la queja.</p>;

  return (
    <div>
      <ModalConfirm
        isModalVisible={showResolveModal}
        handleCancel={() => setShowResolveModal(false)}
        handleConfirm={handleResolve}
        message="¿Estás seguro de que querés marcar esta queja como resuelta?"
        textButtonOne="Cancelar"
        textButtonTwo="Resolver"
      />

      <div className={styles.complain_title}>
        <h1>
          <span className={styles.grey_text}>Inicio </span>
          <strong>/ Detalle del trabajo</strong>
        </h1>
      </div>

      <div className={styles.complain_align_cards}>
        <div className={styles.complain_container_box}>
          <div className={styles.complain_header}>
            <h2>{complain.client.userName}</h2>
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
          <p>{complain.createdAt}</p>
        </div>

        <div className={styles.button_container}>
          {!isResolved ? (
            <>
              <button onClick={() => window.open(`https://wa.me/${complain.client.phoneNumber}`, "_blank")} className={styles.whatsapp_button}>
                <IoLogoWhatsapp /> Whatsapp
              </button>
              <button
                className={styles.resolve_button}
                onClick={() => setShowResolveModal(true)}
              >
                Resolver
              </button>
            </>
          ) : (
            <div className={styles.resolved_container}>
              <p className={styles.resolved_text}>Queja resuelta</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
