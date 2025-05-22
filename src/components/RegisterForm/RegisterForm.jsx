import InputPassword from "../InputPassword/InputPassword";
import "./RegisterForm.css";
import { useState, useEffect } from "react";
import useVerificate from "../../customHooks/UseVerificate";
import ProfileCircle from "../ProfileCircle/ProfileCircle";
import SearchInput from "../SearchInput/SearchInput";

function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        telephone: "",
        avatar: "",
        provincia: "",
        ciudad: "",
    });

    const [displayTelephone, setDisplayTelephone] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const { errors, validateField } = useVerificate();
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        if (data.telephone.length < 5 && displayTelephone.includes("(")) {
            setDisplayTelephone(data.telephone);
        }
        else if (data.telephone && data.telephone.length >= 4) {
            const areaCode = data.telephone.slice(0, 4);
            const rest = data.telephone.slice(4);
            setDisplayTelephone(`(${areaCode}) ${rest}`);
        }
        else {
            setDisplayTelephone(data.telephone);
        }
    }, [data.telephone]);

    useEffect(() => {
        const isFormValid = 
            data.email && !errors.email &&
            data.password && !errors.password &&
            data.name && !errors.name &&
            data.provincia && 
            data.ciudad &&
            (!confirmPass || (confirmPass && data.password === confirmPass));
            
        setIsDisabled(!isFormValid);
    }, [data, errors, confirmPass]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "telephone") {
            const rawValue = value.replace(/\D/g, "").slice(0, 11);
            setData(prev => ({ ...prev, telephone: rawValue }));
        }
        else if (name === "confirmPass") {
            setConfirmPass(value);
        }
        else {
            setData(prev => ({ ...prev, [name]: value }));

            if (["password", "email", "name"].includes(name)) {
                validateField(name, value);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = validateField("email", data.email);
        const isPasswordValid = validateField("password", data.password);
        const isNameValid = validateField("name", data.name);
        const isProvinciaValid = !!data.provincia;
        const isCiudadValid = !!data.ciudad;
        const isConfirmPassValid = !confirmPass || (confirmPass && data.password === confirmPass);

        if (!isEmailValid || !isPasswordValid || !isNameValid || 
            !isProvinciaValid || !isCiudadValid || !isConfirmPassValid) {
            return;
        }

        console.log("Datos válidos:", data);

        setData({
            email: "",
            password: "",
            name: "",
            telephone: "",
            avatar: "",
            provincia: "",
            ciudad: "",
        });
        setConfirmPass("");
        setDisplayTelephone("");
    };

    return (
        <>
            <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                <div className="form-container">
                    <div className="first-column">
                        <section className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="paltita@gmail.com"
                                onChange={handleChange}
                                value={data.email}
                                className={errors.email && data.email.length > 0 ? "error" : ""}
                            />
                            {errors.email && data.email.length > 0 ? <span className="error-message">{errors.email}</span> : ""}
                        </section>
                        <section className="form-group">
                            <label>Contraseña</label>
                            <InputPassword
                                onChange={handleChange}
                                name="password"
                                value={data.password}
                                areErrors={errors.password && data.password.length > 0}
                            />
                            {errors.password && data.password.length > 0 ? <span className="error-message">{errors.password}</span> : ""}
                        </section>
                        <section className="form-group">
                            <label>Confirmar contraseña</label>
                            <InputPassword
                                onChange={handleChange}
                                name="confirmPass"
                                value={confirmPass}
                                block={data.password.length <= 0 && true}
                            />
                            {confirmPass && data.password !== confirmPass && (
                                <span className="error-message">Las contraseñas no coinciden</span>
                            )}
                        </section>
                    </div>
                    <div className="second-column">
                        <section className="form-group">
                            <label>Nombre completo</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Fulano Detal"
                                onChange={handleChange}
                                value={data.name}
                                className={errors.name && data.name.length > 0 ? "error" : ""}
                            />
                            {errors.name && data.name.length > 0 ? <span className="error-message">{errors.name}</span> : ""}
                        </section>
                        <section className="form-group">
                            <label>Número de teléfono</label>
                            <input
                                type="tel"
                                name="telephone"
                                placeholder="(1234) 567890"
                                onChange={handleChange}
                                value={displayTelephone}
                                maxLength={14}
                            />
                        </section>

                        <section className="form-group">
                            <label>Localidad</label>
                            <SearchInput onChange={handleChange} />
                        </section>
                    </div>
                    <ProfileCircle value={data.avatar} name={"avatar"} onChange={handleChange} />
                </div>
                <div className="button-container">
                    <button type="submit" disabled={isDisabled}>Regístrate</button>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;