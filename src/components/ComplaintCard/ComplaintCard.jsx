// CardJobRequest.jsx

import { useNavigate } from "react-router-dom";
import UseCategoryIcon from "../../customHooks/UseCategoryIcon";
import styles from "./ComplaintCard.module.css";

const ComplaintCard = ({ complaintInfo }) => {
  console.log(complaintInfo);

  const navigate = useNavigate();

  //Aca debera de navegar al complaintDetail con el id en la url
  const handleNavigateComplaintDetail = (id) => {
    // navigate("")
  };
  return (
    <div
      onClick={() => handleNavigateComplaintDetail(complaintInfo.id)}
      className={styles.cardjob_request}
    >
      <div className={styles.request_title}>
        <h2>{complaintInfo.UserName}</h2>
        <div className={styles.image_container}></div>
      </div>
      <div>
        <p>{complaintInfo.Description}</p>
      </div>

      <div className={styles.request_price}>
        <p>Fecha de queja: {complaintInfo.CreatedAt}</p>
      </div>
    </div>
  );
};
export default ComplaintCard;
