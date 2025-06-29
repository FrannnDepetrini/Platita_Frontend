import "../FeedbackModal/FeedbackModal.css";
import {
  IoAlertCircle,
  RxCross2,
  FaCircleCheck,
} from "../../utils/icons/icons";

const FeedbackModal = ({ bool, hide, successMessage, errorMessage }) => {
  return (
    <>
      <div className={`container_modal ${bool ? "approved" : ""}`}>
        {bool ? (
          <FaCircleCheck className="faCircle" />
        ) : (
          <IoAlertCircle className="circle" />
        )}
        {bool ? <h4>{successMessage}</h4> : <h4>{errorMessage}</h4>}
        <div className="cross" onClick={() => hide()}>
          <RxCross2 className="cross2" />
        </div>
      </div>
    </>
  );
};

export default FeedbackModal;
