// CardJobRequest.jsx

import { useNavigate } from "react-router-dom";

import styles from "./ComplaintCard.module.css";

const ComplaintCard = ({ complaintInfo }) => {
  console.log(complaintInfo);

  const navigate = useNavigate();

  const formattedCreatedDate = new Date(
    complaintInfo.createdAt
  ).toLocaleDateString();

  const handleNavigateComplaintDetail = (id) => {
    navigate(`/support/detail/${id}`);
  };
  return (
    <div
      onClick={() => handleNavigateComplaintDetail(complaintInfo.id)}
      className={styles.cardjob_request}
    >
      <div className={styles.request_title}>
        <h2>{complaintInfo.client.userName}</h2>
        <div className={styles.image_container}></div>
      </div>
      <div>
        <p>{complaintInfo.description}</p>
      </div>

      <div className={styles.request_price}>
        <p>Fecha de queja: {formattedCreatedDate}</p>
      </div>
    </div>
  );
};
export default ComplaintCard;
