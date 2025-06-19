import { useState, useRef } from "react";
import "./ModalPostulation.css";
import { BsCashStack } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { postulationService } from "../../services/postulationServices/postulationService";

const ModalPostulation = ({ onClose, jobId }) => {
  const [showModal, setShowModal] = useState(true);
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [loadingSendButton, setLoadingSendButton] = useState(false);
  const [isSuccessSend, setIsSuccessSend] = useState(false);
  const fechaInputRef = useRef(null);

  const handleBudgetChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setBudget(value);
    }
  };

  const fetchApplicateJob = async (postulationInfo) => {
    setLoadingSendButton(true);
    try {
      const response = await postulationService.applicateJob(postulationInfo);
      console.log("Respuesta:", response.data); // o response.status si querés ver el 200
      setIsSuccessSend(true);
    } catch (error) {
      console.error("Error:", error.message);
      setIsSuccessSend(false);
    } finally {
      setLoadingSendButton(false);
    }
  };

  const handleApplicateJob = () => {
    const jobApplication = {
      jobId: jobId,
      budget: Number(budget),
      jobDay: new Date(date).toISOString(),
    };
    console.log(jobApplication);
    fetchApplicateJob(jobApplication);
  };

  var today = new Date().toISOString().split("T")[0];
  const handleIconClick = () => {
    fechaInputRef.current?.showPicker();
  };

  if (!showModal) return null;

  return (
    <div className="postulation-modal-overlay">
      <div className="postulation-modal-container">
        <button className="close-button" onClick={onClose}>
          x
        </button>
        <h1 className="postulation-title">Completa este formulario</h1>

        <div className="postulation-separator">
          <hr color="#fbbd08" />
        </div>

        <div className="align-items">
          <div className="input-container">
            <div className="input-group">
              <label className="presupuesto-label">Tu presupuesto</label>
              <div className="input-icon">
                <BsCashStack className="presupuesto-icon" />
                <input
                  className="presupuesto-input no-spinner"
                  type="text"
                  id="presupuesto"
                  value={budget}
                  onChange={handleBudgetChange}
                  min="0"
                  placeholder="$10000"
                ></input>
              </div>
            </div>

            <div className="input-group">
              <label for="fecha" className="fecha-label">
                Fecha de realizacion
              </label>
              <div className="input-icon">
                <IoCalendarOutline
                  className="fecha-icon"
                  onClick={handleIconClick}
                  style={{ pointerEvents: "auto", cursor: "pointer" }}
                />
                <input
                  className="date-input"
                  type="date"
                  id="fecha"
                  min={today}
                  value={date}
                  ref={fechaInputRef}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="dd/mm/aaaa"
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="send-postulation-button-container">
          <button
            onClick={handleApplicateJob}
            className="send-postulation-button"
          >
            {isSuccessSend ? (
              "Enviado con exito"
            ) : loadingSendButton ? (
              <div className="loader"></div>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPostulation;
