import { useEffect, useRef, useState } from "react";
import styles from "./NotificationsBell.module.css";
import imagen from "../../utils/images/bellIcon.svg";


const NotificationsBell = ({ numNotifications=6, showModal }) => {
    const pointerRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const processNotifications = () => {
        if (numNotifications <= 0) return null;
        return numNotifications > 9 ? "+9" : numNotifications;
    };

    useEffect(() => {
        const pointerElement = pointerRef.current;
        if (!pointerElement || numNotifications <= 0) return;

        setIsAnimating(true);

        const timer = setTimeout(() => {
            setIsAnimating(false);
        }, 3000);

        return () => {
            clearTimeout(timer);
            setIsAnimating(false);
        };
    }, [numNotifications]);

    const handleClick = () => {
        showModal();
    };

    return (
        <div
            className={styles.bellContainer }
            onClick={handleClick}
        >
            <img
                src={imagen}
                className={styles.bellIcon}
                alt="Icono de notificaciones"
            />

            {numNotifications > 0 && (
                <div className={styles.point} ref={pointerRef}>
                    {processNotifications()}
                    {isAnimating && <div className={styles.pointAnimation}></div>}
                </div>
            )}
        </div>
    );
};

export default NotificationsBell;