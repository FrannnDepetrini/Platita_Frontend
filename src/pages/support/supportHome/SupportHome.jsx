import { useNavigate, Link } from "react-router-dom";
import ComplaintList from "../../../components/ComplaintList/ComplaintList";

const SupportHome = () => {
  const navigate = useNavigate();
  return (
    <div className="employer-request">
      <div className="erbreadcrumb">
        <Link to="/" className="erbreadcrumb-link">
          Inicio
        </Link>
        <span className="erbreadcrumb-separator"> / </span>
        <span className="erbreadcrumb-link active">Quejas</span>
      </div>
      <div className="listAndButton_container">
        <ComplaintList />
      </div>
    </div>
  );
};

export default SupportHome;
