import styles from './ModalResolve.module.css';

export default function ModalResolve({ onClose, onResolve }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Resolver queja</h2>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>

        <div className={styles.modalDivider}>
            <hr color="#fbbd08" />
        </div>

        <div className={styles.modalBody}>
          <p>¿Estás seguro de que quieres resolver esta queja?</p>
        </div>

        <div className={styles.buttonContainer}>
            <button className={styles.cancel_button} onClick={onClose}>
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
