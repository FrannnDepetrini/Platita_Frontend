import styles from "./SysAdminCreateUser.module.css"
import SearchInput from "../../../components/SearchInput/SearchInput";
import { useState, useEffect } from "react";
import useVerificate from "../../../customHooks/UseVerificate";
import InputPassword from "../../../components/InputPassword/InputPassword";
import { authService } from "../../../services/authservices/authServices";
import { sysadminService } from "../../../services/sysadminServices/sysadminServices";
import { useNavigate } from "react-router-dom";
import { SlArrowDown } from "react-icons/sl";

const SysAdminCreateUser = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        province: "",
        city: "",
        userName: "",
        phoneNumber: "",
    });

    const {register} = authService;
    const {createUser} = sysadminService;

    const [role, setRole] = useState("Client")
    const [displayTelephone, setDisplayTelephone] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const { errors, validateField } = useVerificate();
    const [isDisabled, setIsDisabled] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (data.phoneNumber.length < 5 && displayTelephone.includes("(")) {
            setDisplayTelephone(data.phoneNumber);
        } else if (data.phoneNumber && data.phoneNumber.length >= 4) {
            const areaCode = data.phoneNumber.slice(0, 4);
            const rest = data.phoneNumber.slice(4);
            setDisplayTelephone(`(${areaCode}) ${rest}`);
        } else {
            setDisplayTelephone(data.phoneNumber);
        }
    }, [data.phoneNumber]);

    useEffect(() => {
        const isFormValid =
            data.email &&
            !errors.email &&
            data.password &&
            !errors.password &&
            data.userName &&
            !errors.userName &&
            data.phoneNumber &&
            !errors.phoneNumber &&
            (!confirmPass || data.password === confirmPass) &&
            (role !== "Client" || (data.province && data.city));

        setIsDisabled(!isFormValid);
    }, [data, errors, confirmPass]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phoneNumber") {
            const rawValue = value.replace(/\D/g, "").slice(0, 11);
            setData((prev) => ({ ...prev, phoneNumber: rawValue }));
            validateField(name, rawValue);
        } else if (name === "confirmPass") {
            setConfirmPass(value);
        } else {
            setData((prev) => ({ ...prev, [name]: value }));
            if (["password", "email", "userName", "phoneNumber"].includes(name)) {
                validateField(name, value);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isPhoneNumberValid = validateField("phoneNumber", data.phoneNumber);
        const isEmailValid = validateField("email", data.email);
        const isPasswordValid = validateField("password", data.password);
        const isNameValid = validateField("userName", data.userName);
        const isProvinciaValid = role !== "Client" || !!data.province;
        const isCiudadValid = role !== "Client" || !!data.city;
        const isConfirmPassValid =
            !confirmPass || (confirmPass && data.password === confirmPass);

        if (
            !isEmailValid ||
            !isPasswordValid ||
            !isNameValid ||
            !isProvinciaValid ||
            !isCiudadValid ||
            !isConfirmPassValid ||
            !isPhoneNumberValid
        ) {
            return;
        }

        if( role == "Client") {
            console.log(data);
            const response = await register(data)

            if (response) {
                navigate(-1, {replace: true});
            }
        } else {
            const response = await createUser({
                    email: data.email,
                    password: data.password,
                    userName: data.userName,
                    phoneNumber: data.phoneNumber,
                    role: role,
                });

            if (response) {
                navigate(-1, {replace: true});
            }
        }
        
    };

    return (
        <div className={styles.register_container}>
            <div className={styles.breadcrumbs}>Inicio / SysAdmin/<span> Registrar</span></div>
            <div className={styles.group_formRol}>
                <form
                    className={styles.register_form}
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div className={styles.form_container}>
                        <div className={styles.first_column}>
                            <section className={styles.form_group}>
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="paltita@gmail.com"
                                    onChange={handleChange}
                                    value={data.email}
                                    className={errors.email && data.email.length > 0 ? styles.error : ""}
                                />
                                {errors.email && data.email.length > 0 ? (
                                    <span className={styles.error_message}>{errors.email}</span>
                                ) : (
                                    ""
                                )}
                            </section>
                            <section className={styles.form_group}>
                                <label>Contraseña</label>
                                <InputPassword
                                    onChange={handleChange}
                                    name="password"
                                    value={data.password}
                                    areErrors={errors.password && data.password.length > 0}
                                />
                                {errors.password && data.password.length > 0 ? (
                                    <span className={styles.error_message}>{errors.password}</span>
                                ) : (
                                    ""
                                )}
                            </section>
                            <section className={styles.form_group}>
                                <label>Confirmar contraseña</label>
                                <InputPassword
                                    onChange={handleChange}
                                    name="confirmPass"
                                    value={confirmPass}
                                    block={data.password.length <= 0 && true}
                                />
                                {confirmPass && data.password !== confirmPass && (
                                    <span className={styles.error_message}>
                                        Las contraseñas no coinciden
                                    </span>
                                )}
                            </section>
                        </div>
                        <div className={styles.second_column}>
                            <section className={styles.form_group}>
                                <label>Nombre completo</label>
                                <input
                                    type="text"
                                    name="userName"
                                    placeholder="Fulano Detal"
                                    onChange={handleChange}
                                    value={data.userName}
                                    className={
                                        errors.userName && data.userName.length > 0 ? styles.error : ""
                                    }
                                />
                                {errors.userName && data.userName.length > 0 ? (
                                    <span className={styles.error_message}>{errors.userName}</span>
                                ) : (
                                    ""
                                )}
                            </section>
                            <section className={styles.form_group}>
                                <label>Número de teléfono</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder="(1234) 567890"
                                    onChange={handleChange}
                                    value={displayTelephone}
                                    maxLength={14}
                                />
                                {errors.phoneNumber && data.phoneNumber.length > 0 ? (
                                    <span className={styles.error_message}>{errors.phoneNumber}</span>
                                ) : (
                                    ""
                                )}
                            </section>

                            {role == "Client" && (
                                <section className={styles.form_group}>
                                    <label>Localidad</label>
                                    <SearchInput onChange={handleChange} />
                                </section>)}
                        </div>
                    </div>
                    <div className={styles.button_container}>
                        <button className={styles.buttonSubmit} type="submit" disabled={isDisabled}>
                            Registrar
                        </button>
                    </div>
                </form>
                <div className={styles.form_group}>
                    <label>Rol</label>
                    <select name="role" id="value" value={role} className={styles.selectInput} onChange={(e) => {
                        setRole(e.target.value)
                    }}>
                        <option value="Client">Cliente</option>
                        <option value="SysAdmin">SysAdmin</option>
                        <option value="Moderator">Moderador</option>
                        <option value="Support">Soporte</option>
                    </select>
                    <SlArrowDown className={styles.selectIcon} />
                </div>
            </div>
        </div>
    );
}

export default SysAdminCreateUser;