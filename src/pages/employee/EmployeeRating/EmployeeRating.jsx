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
        <h1 className="description'title">Descripción</h1>
        <textarea
          type="text"
          placeholder={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}