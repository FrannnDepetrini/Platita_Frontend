import { useState } from "react";
import { IoMdEyeOff } from "../../utils/icons/icons";
import { IoMdEye } from "../../utils/icons/icons";
import "./InputPassword.css";

function InputPassword({placeHolder= "●●●●●●●●●●", onChange, value, name, areErrors}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordChange = (e) => {
        onChange({
            target: {
                name: name,
                value: e.target.value
            }
        });
    };

    return(
        <div className="container-input">
            <input type={showPassword ? "text" : "password"} placeholder={placeHolder} onChange={handlePasswordChange} name={name} value={value} className={areErrors ? "error" : ""}/>
            <button type="button" className="btn-password" onClick={togglePasswordVisibility}>
                {showPassword ? <IoMdEyeOff color="red"/> : <IoMdEye color="red"/>}
            </button>
        </div>
    )
}

export default InputPassword;