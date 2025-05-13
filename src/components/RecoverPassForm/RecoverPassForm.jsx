import "../RecoverPassForm/RecoverPassForm.css"
import InputPassword from "../InputPassword/InputPassword";
import { useContext, useState } from "react";
import useVerificate from "../../customHooks/UseVerificate";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../services/ModalContext";


const RecoverPassForm = ({token}) => {
    const navigate = useNavigate();

    const [data, setData] = useState({
            password: "",
            passwordValidation: ""
        });
    
        const { errors, validateField } = useVerificate();
    
        
        const handleChange = (e) => {
            const { name, value } = e.target;
        
            const updatedData = {
                ...data,
                [name]: value
            };
        
            setData(updatedData);
        
            validateField(name, value, updatedData);
        
            if (name === "password" && data.passwordValidation.length > 0) {
                validateField("passwordValidation", updatedData.passwordValidation, updatedData);
            }
        };
        
    
        const handleSubmit = async(e) => {
            e.preventDefault();
            
            const isPasswordValid = validateField("password", data.password, data);
            const isPasswordValidation = validateField("passwordValidation", data.passwordValidation, data);

            if (!isPasswordValid || !isPasswordValidation) {
                return;
            }
                
            try {
                const response = await fetch("https://localhost:7224/api/User/reset-password", {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        token: token,
                        newPassword: data.passwordValidation
                    })
                })
                
                if(!response.ok){
                    throw new Error(response.json())
                }
                
               
                
                setData({
                    password: "",
                    passwordValidation: ""
                });
                showRecoverModal(true)
                navigate("/");
                
                setTimeout(() => {
                    hideRecoverModal();
                }, 6000)

            } catch (error) {
                showRecoverModal(false)
                navigate("/");

                setTimeout(() => {
                    hideRecoverModal();
                }, 6000)
                console.log(error)
            }

        };
    const {showRecoverModal, hideRecoverModal} = useContext(ModalContext);
        return (
            <form className="register-form-recover" onSubmit={handleSubmit}>
                <div className="form-container-recover">
                    
                        <section className="form-recover-pass">
                            <label>Contraseña</label>
                            <InputPassword
                                onChange={handleChange}
                                name="password"
                                value={data.password}
                                areErrors={errors.password && data.password.length > 0}
                            />
                            {errors.password && data.password.length > 0 ? <span className="error-message">{errors.password}</span> : ""} 
                        </section>

                        <section className="form-recover-pass">
                            <label>Confirmar contraseña</label>
                            <InputPassword
                                onChange={handleChange}
                                name="passwordValidation"
                                value={data.passwordValidation}
                                areErrors={errors.passwordValidation && data.passwordValidation.length > 0}
                            />
                            {errors.passwordValidation && data.passwordValidation.length > 0 ? <span className="error-message">{errors.passwordValidation}</span> : ""} 
                        </section>

                </div>
                <div className="button-container">
                    <button type="submit">Regístrate</button>
                </div>

                 
            </form>
        )}


export default RecoverPassForm;