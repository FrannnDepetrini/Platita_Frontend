import { useEffect, useState } from "react";
import styles from "./HistoryComplains.module.css";
import { complaintService } from "../../../services/complaintService/complaintService";
import { useNavigate } from "react-router-dom";

export default function HistoryComplains() {
    const navigate = useNavigate();
    const [complains, setComplains] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await complaintService.getAllComplaint();
            setComplains(response);
        } catch (error) {
            console.error("Error cargando las quejas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


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
                    pending: styles.state_pending,
                    resolved: styles.state_resolved,
                };

                return (
                    <tr key={cs.id}
                        onClick={() => navigate(`/support/detail/${cs.id}`)} className={styles.row_table}>
                        <td className={styles.client_cell}>
                            <h4 className={styles.userName}>{cs.client?.userName}</h4>
                        </td>
                        <td className={styles.state}>
                            <span className={statesClass[cs.status.toLowerCase()] || ""}>
                                {cs.status}
                            </span>
                        </td>
                        <td className={styles.date_cell}>
                            <span className={styles.createat}>
                                {cs.createdAt}
                            </span>
                        </td>
                    </tr>
                )
            })
        }
    }

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