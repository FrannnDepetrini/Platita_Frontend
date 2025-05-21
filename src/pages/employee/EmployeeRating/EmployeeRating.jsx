import { useState } from "react";
import "./EmployeeRating.css";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

export default function EmployeeJobRating() {
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file))
      }
    };

  return(
    <div>
      <div className="rating-title-text">
        <h1>
          <span className="grey-text">Inicio </span>
          <strong>/ Dejar una reseña</strong>
        </h1>
      </div>
      <div className="rating-container-box">
        <div className="container-align-items">
          <div className="input-group">
            <h1 className="description-title">Descripción</h1>
            <textarea
              className="input"
              placeholder="Descripcion"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="input-group">
            <h1 className="picture-text">Adjunta una foto</h1>
            <label htmlFor="file-upload" className="custom-file-upload">
              <FiDownload size={40}/>
            </label>
            <input
              id="file-upload"
              className="picture-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="stars-container">
          <h1>Estrellas</h1>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= (hover || rating);
              const StarIcon = isFilled ? IoIosStar : IoIosStarOutline;

              return (
                <span
                  key={star}
                  className="star"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <StarIcon 
                    className={`star-icon ${isFilled ? "filled" : ""}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}/>
                </span>
              );
            })}
          </div>
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