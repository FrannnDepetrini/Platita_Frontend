import { useState } from "react";

const useVerificate = () => {
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{3,}$/;
        const isValid = emailRegex.test(email);
        return {
            isValid,
            message: isValid ? "" : "Por favor ingresa un email válido"
        };
    };

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (!hasMinLength) return { isValid: false, message: "Mínimo 8 caracteres" };
        if (!hasNumber) return { isValid: false, message: "Debe contener un número" };
        if (!hasSpecialChar) return { isValid: false, message: "Debe contener un carácter especial" };
        
        return { isValid: true, message: "" };
    };

    const validateName = (name) => {
        const trimmedName = name.trim();
        const hasUnderscore = /-/.test(trimmedName);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(trimmedName);
        
        const hasNumbers = (trimmedName.match(/\d/g) || []).length;

        if (hasNumbers > 2) return { isValid: false, message: "El nombre no puede contener más de 2 números" };
        if (trimmedName.length <  3) return { isValid: false, message: "El nombre debe tener al menos 3 caracteres" };
        if (hasUnderscore) return { isValid: false, message: "No se permiten guiones bajos (_) en el nombre" };
        if (hasSpecialChars) return { isValid: false, message: "No se permiten símbolos especiales en el nombre" };

        // const nameRegex = /^(?=(.*\d){2})([a-zA-ZÀ-ÿ\s'\d]+)$/;
        
        return {
            isValid: true,
            message: ""
        };
    };

    const validateField = (name, value) => {
        let validationResult = { isValid: true, message: "" };

        switch (name) {
            case "email":
                validationResult = validateEmail(value);
                break;
            case "password":
                validationResult = validatePassword(value);
                break;
            case "name":
                validationResult = validateName(value);
                break;
            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [name]: validationResult.message
        }));

        return validationResult.isValid;
    };

    return {
        errors,
        validateField,
    };
};

export default useVerificate;