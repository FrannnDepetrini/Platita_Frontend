import { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const showRecoverModal = (success) => {
    setIsSuccess(success);
    setShowModal(true);
  };

  const hideRecoverModal = () => {
    setShowModal(false);
    setIsSuccess(null);
  };

  return (
    <ModalContext.Provider value={{ showModal, isSuccess, showRecoverModal, hideRecoverModal }}>
      {children}
    </ModalContext.Provider>
  );
};