import InputPassword from "../InputPassword/InputPassword";
import "./RegisterForm.css";
import { useState, useEffect } from "react";
import useVerificate from "../../customHooks/UseVerificate";
import ProfileCircle from "../ProfileCircle/ProfileCircle";

function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        telephone: "",
        avatar: ""
    });

    const [displayTelephone, setDisplayTelephone] = useState("");
    const { errors, validateField } = useVerificate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "telephone") {
            const rawValue = value.replace(/\D/g, "").slice(0, 11);
            setData(prevData => ({
                ...prevData,
                [name]: rawValue
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [name]: value
            }));

            if (name === "email") {
                validateField(name, value);
            }

            if (name === "password") {
                validateField(name, value);
            }

            if (name === "name") {
                validateField(name, value);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isEmailValid = validateField("email", data.email);
        const isPasswordValid = validateField("password", data.password);
        const isNameValid = validateField("name", data.name);

        if (!isEmailValid || !isPasswordValid || !isNameValid) {
            return;
        }

        console.log("Datos válidos:", data);

        setData({
            email: "",
            password: "",
            name: "",
            telephone: "",
            avatar: ""
        });
        setDisplayTelephone("");
    };

    return (
        <>
            <form className="register-form" onSubmit={handleSubmit}>
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
                            <label>Confirmar contraseña</label>
                            <input
                                type="text"
                                name="Texto"
                            />
                        </section>
                    </div>
                    <ProfileCircle value={data.avatar} name={"avatar"} onChange={handleChange}/>
                </div>
                <div className="button-container">
                    <button type="submit">Regístrate</button>
                </div>
            </form>
        </>
    );
}

export default RegisterForm;