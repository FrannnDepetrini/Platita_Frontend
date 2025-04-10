import { HardHat } from "lucide-react"
import "./JobCard.css"

export default function JobCard() {
    return (
        <div className="job-card-container">
            <div className="job-card">
                <div className="job-card-content">
                    <div className="job-info">
                        <div className="job-title-container">
                            <h2 className="job-title">Levantar un tapial</h2>
                            <HardHat className="job-icon" />
                        </div>

                        <p className="job-description">
                            Necesito a alguien con conocimientos de albañilería para levantar un tapial en mi local
                        </p>

                        <div className="job-details">
                            <div className="detail-item">
                                <span className="detail-label">Fecha:</span>
                                <span className="detail-value">Esta semana</span>
                            </div>

                            <div className="divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Ubicación:</span>
                                <span className="detail-value">Santa fe 50, Rosario</span>
                            </div>

                            <div className="divider"></div>

                            <div className="applications">
                                <span>+300 Postulaciones</span>
                            </div>
                        </div>
                    </div>

                    <div className="job-meta">
                        <span className="job-price">Promedio +10000$</span>
                        <div className="user-info">
                            <div className="user-name">
                                <p className="name">Fulano</p>
                                <p className="role">Detail</p>
                            </div>
                            <div className="user-avatar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
