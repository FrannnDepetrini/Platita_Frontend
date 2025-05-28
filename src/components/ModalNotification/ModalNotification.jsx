import UseCategoryIcon from "../../customHooks/UseCategoryIcon";
import NotificationCard from "../NotificationCard/NotificationCard";
import "./ModalNotification.css";
import { useState, useEffect } from "react";

function ModalNotification({ isOpen, onClose }) {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            job: "Levantar un tapial",
        },
        {
            id: 2,
            job: "Pintar la cerca",
        },
        {
            id: 3,
            job: "Reparar la tubería",
        },
        {
            id: 4,
            job: "Cortar el césped",
        },
        {
            id: 5,
            job: "Instalar una lámpara",
        },
        {
            id: 6,
            job: "Limpiar las ventanas",
        },
        {
            id: 7,
            job: "Arreglar el techo",
        },
        {
            id: 8,
            job: "Cambiar el enchufe",
        },
        {
            id: 9,
            job: "Podar los árboles",
        },
        {
            id: 10,
            job: "Revisar el sistema eléctrico",
        },
    ]);

    const [deletingId, setDeletingId] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    // const deleteHandler = (index) => {
    //     const newNotifications = notifications.filter((_, i) => i !== index);
    //     setNotifications(newNotifications);
    // }

    const handleDelete = (id) => {
        setDeletingId(id);
        setTimeout(() => {
            setNotifications(
                notifications.filter((notification) => notification.id !== id)
            );
            setDeletingId(null);
        }, 500);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
            setIsClosing(false);
        },300);
    }

    const notificationMapped = () => {
        return notifications.map((notification, index) => (
            <NotificationCard
                notification={notification}
                key={notification.id}
                onDelete={() => handleDelete(notification.id)}
                isDeleting={deletingId === notification.id}
            />
        ));
    };

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                handleClose();
            };
        };
        
        window.addEventListener("keydown", handleEsc);
        

        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const IconoClose = UseCategoryIcon("Others");

    return (
        <div className={`overlayModal ${isClosing ? "closing": ""}`}>
            <div className={`containerModal ${isClosing ? "closing" : ""}`} onClick={(e) => e.stopPropagation()}>
                <div className="containerTop">
                    <section className="sectionTitle">
                        <h2 className="title">Tus notificaciones</h2>
                    </section>
                    <section className="sectionCloseBtn">
                        <button className="btnClose" onClick={handleClose}>
                            <IconoClose />
                        </button>
                    </section>
                </div>
                <div className="containerList">
                    {notifications.length > 0 ? (
                        notificationMapped()
                    ) : (
                        <div className="noNotifications">
                            <h3>No tienes notificaciones</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ModalNotification;
