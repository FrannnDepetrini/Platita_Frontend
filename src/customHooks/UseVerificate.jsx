import { useState } from "react";

const useVerificate = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
    const isValid = emailRegex.test(email);
    return {
      isValid,
      message: isValid ? "" : "Por favor ingresa un email válido",
    };
  };

  const validateJobTitle = (text) => {
    const hasMinLength = text.length >= 10;
    const haxMaxLength = text.length <= 30;

    if (text == "") {
      return { isValid: false, message: "No puede ser vacio" };
    }

    if (!hasMinLength) {
      return { isValid: false, message: "Minimo 10 caracteres" };
    }

    if (!haxMaxLength) {
      return { isValid: false, message: "Maximo 30 caracteres" };
    }

    return {
      isValid: true,
      message: "",
    };
  };

  const validateDescription = (desc) => {
    const hasMinLength = desc.length >= 20;
    const haxMaxLength = desc.length <= 60;

    if (desc == "") {
      return { isValid: false, message: "No puede ser vacio" };
    }

    if (!hasMinLength) {
      return { isValid: false, message: "Minimo 20 caracteres" };
    }

    if (!haxMaxLength) {
      return { isValid: false, message: "Maximo 60 caracteres" };
    }

    return {
      isValid: true,
      message: "",
    };
  };

  const validatePhoneNumber = (phoneNumber) => {
    const hasMinLength = phoneNumber.length >= 9;

    if (!hasMinLength) {
      return { isValid: false, message: "Minimo 9 digitos" };
    }

    return {
      isValid: true,
      message: "",
    };
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?_":{}|<>-]/.test(password);

    if (!hasMinLength)
      return { isValid: false, message: "Mínimo 8 caracteres" };
    if (!hasNumber)
      return { isValid: false, message: "Debe contener un número" };
    if (!hasSpecialChar)
      return { isValid: false, message: "Debe contener un carácter especial" };

    return { isValid: true, message: "" };
  };

  const validateName = (name) => {
    const trimmedName = name.trim();
    const hasUnderscore = /-/.test(trimmedName);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(trimmedName);

    const hasNumbers = (trimmedName.match(/\d/g) || []).length;

    if (hasNumbers > 2)
      return {
        isValid: false,
        message: "El nombre no puede contener más de 2 números",
      };
    if (trimmedName.length < 3)
      return {
        isValid: false,
        message: "El nombre debe tener al menos 3 caracteres",
      };
    if (hasUnderscore)
      return {
        isValid: false,
        message: "No se permiten guiones bajos (_) en el nombre",
      };
    if (hasSpecialChars)
      return {
        isValid: false,
        message: "No se permiten símbolos especiales en el nombre",
      };

    // const nameRegex = /^(?=(.*\d){2})([a-zA-ZÀ-ÿ\s'\d]+)$/;

    return {
      isValid: true,
      message: "",
    };
  };

  const validateField = (name, value, allValues = {}) => {
    let validationResult = { isValid: true, message: "" };

    switch (name) {
      case "email":
        validationResult = validateEmail(value);
        break;
      case "password":
        validationResult = validatePassword(value);

        break;
      case "passwordValidation":
        validationResult = validatePassword(value);

        if (value !== allValues.password) {
          validationResult = {
            isValid: false,
            message: "Las contraseñas no coinciden",
          };
        }
        break;
      case "name":
        validationResult = validateName(value);
        break;
      case "description":
        validationResult = validateDescription(value);
        break;
      case "phoneNumber":
        validationResult = validatePhoneNumber(value);
        break;
      default:
        validationResult = validateJobTitle(value);
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: validationResult.message,
    }));

    return validationResult.isValid;
  };

  return {
    errors,
    validateField,
  };
};

export default useVerificate;
