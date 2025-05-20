import { useState } from "react";
import "./EmployeeRating.css";

export default function EmployeeJobRating() {
    const [text, setText] = useState('');
  return(
    <div>
      <div className="rating-title-text">
        <h1>
          <span className="grey-text">Inicio </span>
          <strong>/ Detalle del trabajo</strong>
        </h1>
      </div>
      <div className="rating-container-box">
        <h1 className="description-title">Descripción</h1>
        <textarea
          className="input"
          placeholder="Descripcion"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="stars-container">
          <h1>Estrellas</h1>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
        <div className="send-button-container">
          <button className="send-button">Enviar</button>
        </div>
      </div>
      <div className="box-footer-text">
        <h1>
          Recuerda que las reseñas serán analizadas por el moderador antes de ser subidas
        </h1>
      </div>
    </div>
  );
}