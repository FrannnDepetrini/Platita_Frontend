// CardJobRequest.jsx
import UseCategoryIcon from "../../customHooks/UseCategoryIcon";
import "./CardJobRequest.css";

export default function CardJobRequest({ jobInfo }) {
  const CategoryIcon = UseCategoryIcon(jobInfo.category);

  return (
    <div className="cardjob-request">
      <div className="request-title">
        <h2>{jobInfo.title}</h2>
        <CategoryIcon className="rjob-icon" />
      </div>

      <div className="request-applications">
        <span>
          Solicitudes: <strong>{jobInfo.amountPostulations}</strong>
        </span>
      </div>

      <div className="request-price">
        <p>Promedio +{jobInfo.averagePrice}$</p>
      </div>
    </div>
  );
}
