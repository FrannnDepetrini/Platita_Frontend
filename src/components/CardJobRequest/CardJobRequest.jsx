// CardJobRequest.jsx
import { useNavigate } from "react-router-dom";
import UseCategoryIcon from "../../customHooks/UseCategoryIcon";
import "./CardJobRequest.css";

export default function CardJobRequest({ jobInfo }) {
  const CategoryIcon = UseCategoryIcon(jobInfo.category);
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/employer/jobDetails/${id}`);
  };

  return (
    <div onClick={() => handleNavigate(jobInfo.id)} className="cardjob-request">
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
