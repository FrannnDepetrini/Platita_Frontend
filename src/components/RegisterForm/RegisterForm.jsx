import InputPassword from "../InputPassword/InputPassword";
import "./RegisterForm.css";
import { useState, useEffect } from "react";

function RegisterForm() {
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        telephone: "",
    });
    
    const [displayTelephone, setDisplayTelephone] = useState("");

    useEffect(() => {
        if (data.telephone && data.telephone.length >= 4) {
            const areaCode = data.telephone.slice(0, 4);
            const rest = data.telephone.slice(4);
            setDisplayTelephone(`(${areaCode}) ${rest}`);
        } else {
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
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del formulario:", data);
        setData({
            email: "",
            password: "",
            name: "",
            telephone: "",
        });
        setDisplayTelephone("");
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-container">
                <div className="first-column">
                    <section className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="paltita@gmail.com"
                            onChange={handleChange}
                            value={data.email}
                        />
                    </section>
                    <section className="form-group">
                        <label>Contraseña</label>
                        <InputPassword
                            onChange={handleChange}
                            name="password"
                            value={data.password}
                        />
                    </section>
                </div>
                <div className="second-column">
                    <section className="form-group">
                        <label>Nombre completo</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Fulano Detal"
                            required
                            onChange={handleChange}
                            value={data.name}
                        />
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

                    <div className="button-container">
                        <button type="submit">Regístrate</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default RegisterForm;