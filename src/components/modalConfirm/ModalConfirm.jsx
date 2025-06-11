import React, { useEffect, useState } from "react";
import styles from "./ModalConfirm.module.css";
import classNames from "classnames";

const ModalConfirm = ({
  message,
  isModalVisible,
  handleCancel,
  handleConfirm,
  textButtonOne = "Cancelar",
  textButtonTwo = "Continuar"
}) => {
  const [closing, setClosing] = useState(false);

  const startClose = () => {
    setClosing(true);
  };

  useEffect(() => {
    if (isModalVisible) setClosing(false);
  }, [isModalVisible]);

  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        handleCancel();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [closing, handleCancel]);

  if (!isModalVisible && !closing) return null;

  return (
    <div
      onClick={startClose}
      className={classNames(styles.overlay, {
        [styles.overlay_visible]: isModalVisible && !closing,
        [styles.fadeOutOverlay]: closing,
      })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(
          styles.modalConfirm_container,
          closing ? styles.slideUp : styles.slideDown
        )}
      >
        <h1>{message}</h1>
        <div className={styles.buttons}>
          <button
            className={classNames(styles.modalButton, styles.buttonCancel)}
            onClick={startClose}
          >
            {textButtonOne}
          </button>
          <button
            className={classNames(styles.modalButton, styles.buttonContinue)}
            onClick={handleConfirm}
          >
            {textButtonTwo}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
