import "./NotificationCard.css"
import { FaTrashAlt } from "../../utils/icons/icons.js"


function NotificationCard({notification, onDelete, isDeleting}) {

    const maxNum = 23; 

    const textRecortado = (text) => {
        if (!text) return ""; 
        return text.length > maxNum 
            ? `${text.substring(0, maxNum - 3)}...` 
            : text;
    };

    return (
        <div className={`containerCard ${isDeleting ? "fade-out" : ""}`}>
            <div className="containerSections">
                <section className="sectionPostulation">
                    <div className="notificationContent">
                        <h3 className="notificationTitle">
                            Haz recibido postulaciones en el trabajo: "{textRecortado(notification.job)}"
                        </h3>
                        <a href="*" className="notificationLink">
                            ¿Quieres ir a ver las postulaciones?
                        </a>
                    </div>
                </section>
                <section className="sectionCleanBtn">
                    <button
                        className="botonClean"
                        onClick={onDelete}
                    >
                        <FaTrashAlt className="iconoTrash" />
                    </button>
                </section>
            </div>
        </div>
    );
}


export default NotificationCard;