import styles from './CropperModal.module.css'
import { useRef,useEffect,useCallback } from 'react';
import { Cropper, CircleStencil } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

const CropperModal = ({ imageSrc, onCropComplete, onClose, onKeepOriginal }) => {
    const cropperRef = useRef(null);
    const circleCanvasRef = useRef(null);
    const ctxRef = useRef(null);
    const desiredSize = 120;

    useEffect(() => {
        circleCanvasRef.current = document.createElement('canvas');
        ctxRef.current = circleCanvasRef.current.getContext('2d');
    }, []);

    const handleDone = useCallback(async () => {
        if (!cropperRef.current) return;

        const canvas = cropperRef.current.getCanvas();
        if (!canvas) return;

        const circleCanvas = circleCanvasRef.current;
        const ctx = ctxRef.current;

        circleCanvas.width = desiredSize;
        circleCanvas.height = desiredSize;

        const scale = Math.min(
            desiredSize / canvas.width,
            desiredSize / canvas.height
        );
        const width = canvas.width * scale;
        const height = canvas.height * scale;
        const x = (desiredSize - width) / 2;
        const y = (desiredSize - height) / 2;

        ctx.drawImage(canvas, x, y, width, height);

        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(desiredSize / 2, desiredSize / 2, desiredSize / 2, 0, Math.PI * 2);
        ctx.fill();

        const blob = await new Promise(resolve =>
            circleCanvas.toBlob(resolve, 'image/webp', 0.75)
        );
        const imageUrl = URL.createObjectURL(blob);

        onCropComplete(imageUrl);

        return () => URL.revokeObjectURL(imageUrl);
    }, [onCropComplete]);

    return (
        <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
                <h2>Ajusta tu foto de perfil</h2>

                <div className={styles.cropper_container}>
                    <Cropper
                        ref={cropperRef}
                        src={imageSrc}
                        className={styles.cropper}
                        stencilComponent={CircleStencil}
                        stencilProps={{
                            aspectRatio: 1,
                            movable: true,
                            resizable: true,
                            previewClassName: styles.circle_preview,
                        }}
                    />
                </div>

                <div className={styles.modal_actions}>
                    <button onClick={onKeepOriginal}>Mantener original</button>
                    <button onClick={onClose}>Cancelar</button>
                    <button onClick={handleDone}>Aplicar cambios</button>
                </div>
            </div>
        </div>
    );
}

export default CropperModal;