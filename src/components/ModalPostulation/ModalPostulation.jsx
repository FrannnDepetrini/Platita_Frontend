import { useState, useRef } from "react";
import "./ModalPostulation.css";
import { BsCashStack } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";

const ModalPostulation = ({onClose}) => {

  const [showModal, setShowModal] = useState(true);
  const [fecha, setFecha] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const fechaInputRef = useRef(null);

  const handlePresupuestoChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setPresupuesto(value);
    }
  };

  var today = new Date().toISOString().split("T")[0];
  const handleIconClick = () => {
    fechaInputRef.current?.showPicker();
  };

  if (!showModal) return null;

  return (
    <div className="postulation-modal-overlay">
        <div className="postulation-modal-container">
          <button className="close-button" onClick={onClose}>x</button>
          <h1 className="postulation-title">Completa este formulario</h1>

          <div className="postulation-separator">
            <hr color="#fbbd08"/>
          </div>

          <div className="align-items">
            <div className="input-container">
              <div className="input-group">
                <label className="presupuesto-label">
                  Tu presupuesto
                </label>
                <div className="input-icon">
                  <BsCashStack className="presupuesto-icon"/>
                  <input
                    className="presupuesto-input no-spinner"
                    type="text"
                    id="presupuesto"
                    value={presupuesto}
                    onChange={handlePresupuestoChange}
                    min="0"
                    placeholder="$10000"
                  >

                  </input>
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
                  style={{pointerEvents:"auto", cursor: "pointer"}}
                  />
                  <input 
                    className="date-input"
                    type="date"
                    id="fecha"
                    min={today}
                    value={fecha}
                    ref={fechaInputRef}
                    onChange={(e) => setFecha(e.target.value)}
                    placeholder="dd/mm/aaaa"
                  >
                    
                  </input>
                </div>
              </div>
            </div>
          </div>

          <div className="send-postulation-button-container">
            <button className="send-postulation-button">
              Enviar
            </button>
          </div>
        </div>
    </div>
)}


export default ModalPostulation;