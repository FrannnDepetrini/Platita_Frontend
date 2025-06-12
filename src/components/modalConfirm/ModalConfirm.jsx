import React from "react";
import styles from "./ModalConfirm.module.css";
import classNames from "classnames";

const ModalConfirm = ({
  message,
  subMessage = "",
  isModalVisible,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <div
      onClick={handleCancel}
      className={classNames(styles.overlay, {
        [styles.overlay_visible]: isModalVisible,
      })}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={classNames(styles.modalConfirm_container)}
      >
        <h1>{message}</h1>
        {subMessage && <h2>{subMessage}</h2>}
        <div className={styles.buttons}>
          <button
            className={classNames(styles.modalButton, styles.buttonCancel)}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            className={classNames(styles.modalButton, styles.buttonContinue)}
            onClick={handleConfirm}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
