import { useEffect, useState } from 'react';
import styles from './ModalResolve.module.css';

export default function ModalResolve({ onClose, onResolve }) {

  const [closing, setClosing] = useState(false);

  const startClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        onClose();
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [closing, onClose])

  return (
    <div className={styles.modalContainer} onClick={startClose}>
      <div className={`${styles.modalContent} ${closing ? styles.slideUp : ''}`}>
        <div className={styles.modalHeader}>
          <h2>Resolver queja</h2>
        </div>

        <div className={styles.modalDivider}>
            <hr color="#fbbd08" />
        </div>

        <div className={styles.modalBody}>
          <p>¿Estás seguro de que quieres resolver esta queja?</p>
        </div>

        <div className={styles.buttonContainer}>
            <button className={styles.cancel_button} onClick={startClose}>
                Cancelar
            </button>
            <button className={styles.resolve_button} onClick={onResolve}>
                Resolver
            </button>
        </div>
      </div>
    </div>
  );
}
