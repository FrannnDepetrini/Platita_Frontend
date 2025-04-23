import UseCategoryIcon from "../../customHooks/UseCategoryIcon";
import NotificationCard from "../NotificationCard/NotificationCard";
import "./ModalNotification.css";

function ModalNotification() {

    const notifications = [
        {
            "job": "Levantar un tapial"
        },
        {
            "job": "Pintar la cerca"
        },
        {
            "job": "Reparar la tubería"
        },
        {
            "job": "Cortar el césped"
        },
        {
            "job": "Instalar una lámpara"
        },
        {
            "job": "Limpiar las ventanas"
        },
        {
            "job": "Arreglar el techo"
        },
        {
            "job": "Cambiar el enchufe"
        },
        {
            "job": "Podar los árboles"
        },
        {
            "job": "Revisar el sistema eléctrico"
        }
    ]

    const notificationMapped = () =>{
        return notifications.map((notification, index) => <NotificationCard notification={notification} key={index}/>)
    }

    const IconoClose = UseCategoryIcon("Others")

    return(
        <div className="containerModal">
            <div className="containerTop">
                <section className="sectionTitle">
                    <h2 className="title">Tus notificaciones</h2>
                </section>
                <section className="sectionCloseBtn">
                    <button className="btnClose">
                        <IconoClose />
                    </button>
                </section>
            </div>
            <div className="containerList">
                {notificationMapped()}
            </div>
        </div>
    )
}

export default ModalNotification;