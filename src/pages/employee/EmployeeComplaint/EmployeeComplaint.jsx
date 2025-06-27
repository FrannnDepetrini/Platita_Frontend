import styles from './EmployeeComplaint.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { complaintService } from '../../../services/complaintServices/complaintServices';
import Loader from '../../../components/Loader/Loader';

export default function EmployeeComplaint() {

    const [complain, setComplain] = useState("");
    const [showOk, setShowOk] = useState(false);
    const [status, setStatus] = useState("loading");
    const navigate = useNavigate();

    const getCounterClass = () => {
        if (complain.length > 200 * 0.95) return `${styles.char_counter} ${styles.danger}`;
        if (complain.length > 200 * 0.8) return `${styles.char_counter} ${styles.warning}`;
        return styles.char_counter;
    };

    const handleSubmit = async () => {
        const response = await complaintService.createComplaint(complain);
        setShowOk(true);
        console.log(response.statusText);
        if (response) {
            setStatus("success");
            setTimeout(() => {
                setStatus("loading");
                setShowOk(false);
                navigate(-1, { replace: true });
            }, 2500)
        }
    }

    return (
        <div className={styles.employee_complaint}>
            <div className={styles.breadcrumb}>Inicio/ <strong>Reportar Queja</strong></div>
            <div className={styles.content}>
                <div className={styles.containerComplain}>
                    {!showOk ? (
                        <>
                            <div className={styles.titles}>
                                <h1>Crear Queja</h1>
                                <p>Si tienes alguna queja o problema, por favor complete la caja de texto.</p>
                            </div>

                            <div className={styles.animated_border}>
                                <textarea placeholder="Añade más información relevante..." maxLength={200} onChange={(e) => setComplain(e.target.value)}></textarea>
                                <div className={getCounterClass()} >{complain.length} /<strong>200</strong></div>
                            </div>

                            <button onClick={handleSubmit} disabled={complain.trim() === ''}>
                                Enviar Queja
                            </button>
                        </>

                    ) : (
                        <>
                            <div className={styles.loader}>
                                <Loader status={status} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}