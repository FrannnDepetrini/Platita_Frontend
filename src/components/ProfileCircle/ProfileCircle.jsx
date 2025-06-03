import styles from "./ProfileCircle.module.css";
import { useRef, useState, useEffect } from "react";
import { FaUser } from "../../utils/icons/icons";
import CropperModal from "../CropperModal/CropperModal";
import cn from "classnames";

export default function ProfileCircle({value, name, onChange, isDisabled = false}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [croppedImage, setCroppedImage] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const fileInputRef = useRef(null);

    const isPlus = imageSrc.length === 0;

    useEffect(() => {
        setCroppedImage(value)
    }, [value])

    useEffect(() => {
        return () => {
            if (imageSrc?.startsWith('blob:')) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [imageSrc]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0]);
            setImageSrc(url);
            setIsModalOpen(true);

            e.target.value = '';
        }
    };

    const handleKeepOriginal = () => {
        setCroppedImage(imageSrc);
        setIsModalOpen(false);
    };

    const handleButtonClick = () => {
        if (imageSrc) {
            setImageSrc("");
            setCroppedImage("");
            if (imageSrc.startsWith("blob:")) {
                URL.revokeObjectURL(imageSrc);
            }
        } else {
            fileInputRef.current.click();
        }
    };

    const handleCloseModal = () => {
        if (imageSrc.startsWith('blob:')) {
            URL.revokeObjectURL(imageSrc);
        }

        setImageSrc("");
        setIsModalOpen(false);
    }

    return (
        <div className={styles.profile_container}>

            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: 'none' }}
            />

            <div className={styles.container_icon}>
                <button
                    className={cn(styles.toggle_button, {
                        [styles.plus]: !isPlus,
                    })}
                    onClick={handleButtonClick}
                    aria-label={isPlus ? "Agregar foto de perfil" : "Cambiar foto de perfil"}
                    disabled={isDisabled}
                >
                    <span className={styles.horizontal}></span>
                    <span className={styles.vertical}></span>
                </button>

                {croppedImage ? (
                    <>
                        <img
                            src={croppedImage}
                            alt="Imagen de perfil"
                            className={styles.image}
                        />
                    </>
                ) : (
                    <div className={styles.container_icon}>
                        <FaUser className={styles.icon} />
                    </div>
                )}
            </div>

            {isModalOpen && imageSrc && (
                <CropperModal
                    imageSrc={imageSrc}
                    onCropComplete={(image) => {
                        onChange({ target: { name, value: image } });
                        setIsModalOpen(false);
                    }}
                    onClose={handleCloseModal}
                    onKeepOriginal={handleKeepOriginal}
                />
            )}
        </div>
    );
}
