import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const showRecoverModal = (success) => {
    setIsSuccess(success);
    setShowModal(true);
  };

  const hideRecoverModal = () => {
    setShowModal(false);
    setIsSuccess(null);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        isSuccess,
        showRecoverModal,
        hideRecoverModal,
        successMessage,
        errorMessage,
        setSuccessMessage,
        setErrorMessage,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
