import { useState, useRef, useEffect } from "react";
import "./EmployeeRating.css";
import { FaTrashAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa6";
import { postRating } from "../../../services/employeeRatingService/employeeRatingService";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeJobRating() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const fileInputRef = useRef();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Validaciones básicas
      if (!text.trim()) {
        alert("Por favor, ingresa una descripción.");
        return;
      }
      
      if (rating === 0) {
        alert("Por favor, selecciona una calificación con estrellas.");
        return;
      }

      const imageFiles = Array.from(fileInputRef.current.files || []);
      
      const data = {
        jobId: parseInt(id), 
        score: Number(rating),
        description: text.trim(),
      };
      
      console.log("Data to be sent:", data);
      await postRating(data);
      
      // Limpiar formulario después del éxito
      setText('');
      setRating(0);
      setImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      alert("Reseña publicada con éxito");
      navigate("/employee/historial");
    } catch (error) {
      console.error("Error al enviar la reseña:", error);
      alert("Error al enviar la reseña. Por favor, intenta nuevamente.");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const remainingSlots = 4 - images.length;
    if (remainingSlots <= 0) {
      alert("Solo puedes subir un máximo de 4 imágenes.");
      fileInputRef.current.value = "";
      return;
    }

    const limitedFiles = files.slice(0, remainingSlots);
    const newImages = limitedFiles.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
    fileInputRef.current.value = "";
  };

  const handleRemoveImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const prevImage = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const nextImage = () => {
    if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex !== null) {
        if (e.key === "ArrowLeft") {
          prevImage();
        } else if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "Escape") {
          setSelectedIndex(null);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, images]);

  return (
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
              placeholder="Descripción"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <h1 className="picture-text">Adjunta una foto</h1>
            <label
              htmlFor="file-upload"
              className={`custom-file-upload ${
                images.length > 0 ? "shrink" : ""
              }`}
            >
              <FiDownload size={images.length > 0 ? 25 : 40} />
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
                {images.map((img, index) => (
                  <div key={img.id}>
                    <img
                      src={img.url}
                      alt="preview"
                      onClick={() => setSelectedIndex(index)}
                    />
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
                  />
                </span>
              );
            })}
          </div>
        </div>

        {/* Botón de envío que faltaba en la rama Develop */}
        <div className="send-button-container">
          <button 
            className="send-button" 
            onClick={handleSubmit}
            disabled={!text.trim() || rating === 0}
          >
            Enviar
          </button>
        </div>
      </div>
      
      <div className="box-footer-text">
        <h1>
          Recuerda que las reseñas serán analizadas por el moderador antes de
          ser subidas
        </h1>
      </div>

      {/* Modal para ver imágenes */}
      {selectedIndex !== null && images[selectedIndex] && (
        <div
          className="modal-image-overlay"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="modal-image-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={images[selectedIndex].url} alt="selected" />
            <div className="modal-image-buttons">
              <button
                className="remove-image-button"
                onClick={() => {
                  const newImages = images.filter(
                    (_, idx) => idx !== selectedIndex
                  );
                  let newIndex = selectedIndex;

                  if (selectedIndex >= newImages.length) {
                    newIndex = newImages.length - 1;
                  }

                  setImages(newImages);
                  setSelectedIndex(newIndex >= 0 ? newIndex : null);
                }}
              >
                <FaTrash className="trash-icon" />
              </button>
              <button
                className="modal-image-close"
                onClick={() => setSelectedIndex(null)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}