import { useEffect, useState } from "react";
import styles from "./HistoryComplains.module.css";
import { FaTrashAlt } from "../../../utils/icons/icons";

export default function HistoryComplains() {
    const [complains, setComplains] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = [{
                id: 1,
                client: {username: "Fulano detal"},
                status: "Pendiente",
                createat: "17/4/2025",
            },
            {
                id: 2,
                client: {username: "Maria Lopez"},
                status: "Resuelto",
                createat: "18/4/2025",
            },
            {
                id: 3,
                client: {username: "Maria Lopez"},
                status: "Resuelto",
                createat: "18/4/2025",
            },
            {
                id: 4,
                client: {username: "Maria Lopez"},
                status: "Resuelto",
                createat: "18/4/2025",
            },
            {
                id: 5,
                client: {username: "Maria Lopez"},
                status: "Resuelto",
                createat: "18/4/2025",
            },
            {
                id: 6,
                client: {username: "Carlos Sanchez"},
                status: "Pendiente",
                createat: "19/4/2025",
            }];

            setTimeout(() => {
                setComplains(data);
                setLoading(false);
            }, 2000)
        } catch(error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    }

    const complainsMapped = () => {
        if (complains.length === 0) {
            return (
                <tr>
                    <td colSpan={4} className={styles.no_data}>No hay quejas aún!</td>
                </tr>
            );
        } else {
            return complains.map((cs) => {
                const statesClass = {
                    pendiente: styles.state_pending,
                    resuelto: styles.state_resolved,
                };

                return (
                    <tr key={cs.id} 
                        onClick={() => console.log("ver queja", cs.id)} className={styles.row_table}>
                        <td className={styles.client_cell}>
                            <h4 className={styles.userName}>{cs.client?.username}</h4>
                        </td>
                        <td className={styles.state}>
                            <span className={statesClass[cs.status.toLowerCase()] || ""}>
                                {cs.status}
                            </span>
                        </td>
                        <td className={styles.date_cell}>
                            <span className={styles.createat}>
                                {cs.createat}
                            </span>
                        </td>
                        <td className={styles.actions_cell}>
                            <button
                                className={styles.delete_button}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    console.log("Se elimino la queja", cs.id);
                                }}
                            >
                                <FaTrashAlt className={styles.icon}/>
                            </button>
                        </td>
                    </tr>
                )
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className={styles.title_container}>
                <h1 className={styles.title}>
                    <span className={styles.grey_title}>Inicio</span>
                    /Historial de Quejas
                </h1>
            </div>
            <div className={styles.historial_container}>
                <div className={styles.table_container}>
                    <table className={styles.table_complaints}>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Estado</th>
                                <th>Fecha de queja</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>
                                        Cargando quejas<span className={styles.dots}></span>
                                    </td>
                                </tr>
                            ) : (
                                complainsMapped()
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}