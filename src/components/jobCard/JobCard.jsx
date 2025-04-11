import { HardHat } from "lucide-react"
import "./JobCard.css"

export default function JobCard({
    jobTitle,
    description,
    date,
    location,
    applications,
    price,
    userName,
    userRole,
}) {

    const maxLength= 100;
    const wordLimit= 15;
    const ellipsis = "...";

    const getTruncatedContent = () => {
        if (!description || description.length <= maxLength) {
            return description;
        }

        let truncated = description.substring(0, maxLength);
        
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        
        if (lastSpaceIndex > 0) {
            const lastWord = truncated.substring(lastSpaceIndex + 1);
            if (lastWord.length > wordLimit) {
                
            } else {
                truncated = truncated.substring(0, lastSpaceIndex);
            }
        }

        return (
            <>
                {truncated}
                <span>{ellipsis}</span>
            </>
        );
    };

    return (
        <div className="job-card-container">
            <div className="job-card">
                <div className="job-card-content">
                    <div className="job-info">
                        <div className="job-title-container">
                            <h2 className="job-title">{jobTitle}</h2>
                            <HardHat className="job-icon" />
                        </div>

                        <p className="job-description">
                            {getTruncatedContent()}
                        </p>

                        <div className="job-details">
                            <div className="detail-item">
                                <span className="detail-label">Fecha:</span>
                                <span className="detail-value">{date}</span>
                            </div>

                            <div className="divider"></div>

                            <div className="detail-item">
                                <span className="detail-label">Ubicación:</span>
                                <span className="detail-value">{location}</span>
                            </div>

                            <div className="divider"></div>

                            <div className="applications">
                                <span>{applications} Postulaciones</span>
                            </div>
                        </div>
                    </div>

                    <div className="job-meta">
                        <span className="job-price">{price}</span>
                        <div className="user-info">
                            <div className="user-name">
                                <p className="name">{userName}</p>
                                <p className="role">{userRole}</p>
                            </div>
                            <div className="user-avatar"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}