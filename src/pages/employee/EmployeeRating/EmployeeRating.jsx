import { useState, useRef } from "react";
import "./EmployeeRating.css";
import { FaChevronDown, FaStar } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

export default function EmployeeJobRating() {
    const [text, setText] = useState('');
    const [images, setImages] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const fileInputRef = useRef();

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);

      const remainingSlots = 4 - images.length;
      if (remainingSlots <= 0) {
        alert("Solo puedes subir un maximo de 4 imagenes.");
        fileInputRef.current.value = "";
        return;
      }

      const limitedFiles = files.slice(0, remainingSlots);
      const newImages = files.map(file => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file)
      }));
      setImages(prev => [...prev, ...newImages]);
      fileInputRef.current.value = "";
    };

    const handleRemoveImage = (id) => {
      setImages(prev => prev.filter(img => img.id !== id));
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
            <label htmlFor="file-upload" className={`custom-file-upload ${images.length > 0 ? "shrink" : ""}`}>
              <FiDownload size={images.length > 0 ? 25 : 40}/>
            </label>
            <input
              id="file-upload"
              ref={fileInputRef}
              className="picture-input"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            {images.length > 0 && (
              <div className="image-preview">
                {images.map((img) => (
                  <div key={img.id}>
                    <img src={img.url} alt="preview" onClick={() => setSelectedImage(img)}/>
                  </div>
                ))}
              </div>
            )}
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

      {selectedImage && (
        <div className="modal-image-overlay" onClick={() => setSelectedImage(null)}>
          <div className="modal-image-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-image-close" onClick={() => setSelectedImage(null)}>
              &times;
            </button>
            <img src={selectedImage.url} alt="selected"/>
            <button className="remove-image-button" onClick={() => {
              handleRemoveImage(selectedImage.id);
              setSelectedImage(null);
            }}>
              Eliminar imagen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}