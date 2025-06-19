import { useNavigate } from "react-router-dom";
import UseCategoryIcon from "../../customHooks/UseCategoryIcon";

import "./CardJob.css";

export default function CardJob({ jobInfo, cardType = false }) {
  const maxLength = 140;
  const wordLimit = 20;
  const ellipsis = "...";

  const CategoryIcon = UseCategoryIcon(jobInfo.category);
  const navigate = useNavigate();

  const handleNavigateJobId = (id) => {
    navigate(`/employee/job/${id}`);
  };

  const getTruncatedContent = () => {
    if (!jobInfo.description || jobInfo.description.length <= maxLength) {
      return jobInfo.description;
    }

    let truncated = jobInfo.description.substring(0, maxLength);

    const lastSpaceIndex = truncated.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
      const lastWord = truncated.substring(lastSpaceIndex + 1);
      if (!lastWord.length > wordLimit) {
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
    <div
      onClick={() => handleNavigateJobId(jobInfo.id)}
      className={`parent ${cardType && "client"}`}
    >
      <div className="topCard">
        <div className="titleSection">
          <h2>{jobInfo.title}</h2>
          <CategoryIcon className="job-icon" />
        </div>
        <div className="priceSection">
          <p>Promedio +{jobInfo.averagePrice}$</p>
        </div>
      </div>
      <div className="middleCard">
        <p>{getTruncatedContent()}</p>
      </div>
      <div className="bottomCard">
        <div className="infoJobSection">
          <div className="detailJob-item">
            <span className="detail-label">Ubicación:</span>
            <span className="detail-value">{jobInfo.city}</span>
          </div>

          <div className="divider"></div>

          <div className="applications">
            <span>
              <strong>+{jobInfo.amountPostulations}</strong> Postulaciones
            </span>
          </div>
        </div>

        <div className="profileUser">
          <div className="user-name">
            <p className="name">{jobInfo.userName}</p>
          </div>
          <div className="user-avatar"></div>
        </div>
      </div>
    </div>
  );
}
