import InputPassword from "../InputPassword/InputPassword";
import "./RegisterForm.css";
import { useState, useEffect } from "react";
import useVerificate from "../../customHooks/UseVerificate";
import ProfileCircle from "../ProfileCircle/ProfileCircle";
import SearchInput from "../SearchInput/SearchInput";
import useAuth from "../../services/contexts/AuthProvider";

function RegisterForm() {
  const [data, setData] = useState({
    email: "",
    password: "",
    province: "",
    city: "",
    userName: "",
    phoneNumber: "",
  });

  const [displayTelephone, setDisplayTelephone] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { errors, validateField } = useVerificate();
  const [isDisabled, setIsDisabled] = useState(true);

  const { register } = useAuth();

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
      data.province &&
      data.city &&
      data.phoneNumber &&
      !errors.phoneNumber &&
      (!confirmPass || (confirmPass && data.password === confirmPass));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isPhoneNumberValid = validateField("phoneNumber", data.phoneNumber);
    const isEmailValid = validateField("email", data.email);
    const isPasswordValid = validateField("password", data.password);
    const isNameValid = validateField("userName", data.userName);
    const isProvinciaValid = !!data.province;
    const isCiudadValid = !!data.city;
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

    console.log(data);
    register(data);
    alert("Usuario creado con exito");

    // setData({
    //   email: "",
    //   password: "",
    //   userName: "",
    //   phoneNumber: "",
    //   province: "",
    //   city: "",
    // });
    // setConfirmPass("");
    // setDisplayTelephone("");
  };

  return (
    <>
      <form
        className="register-form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
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
              {errors.email && data.email.length > 0 ? (
                <span className="error-message">{errors.email}</span>
              ) : (
                ""
              )}
            </section>
            <section className="form-group">
              <label>Contraseña</label>
              <InputPassword
                onChange={handleChange}
                name="password"
                value={data.password}
                areErrors={errors.password && data.password.length > 0}
              />
              {errors.password && data.password.length > 0 ? (
                <span className="error-message">{errors.password}</span>
              ) : (
                ""
              )}
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
                <span className="error-message">
                  Las contraseñas no coinciden
                </span>
              )}
            </section>
          </div>
          <div className="second-column">
            <section className="form-group">
              <label>Nombre completo</label>
              <input
                type="text"
                name="userName"
                placeholder="Fulano Detal"
                onChange={handleChange}
                value={data.userName}
                className={
                  errors.userName && data.userName.length > 0 ? "error" : ""
                }
              />
              {errors.userName && data.userName.length > 0 ? (
                <span className="error-message">{errors.userName}</span>
              ) : (
                ""
              )}
            </section>
            <section className="form-group">
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
                <span className="error-message">{errors.phoneNumber}</span>
              ) : (
                ""
              )}
            </section>

            <section className="form-group">
              <label>Localidad</label>
              <SearchInput onChange={handleChange} />
            </section>
          </div>
          <ProfileCircle
            value={data.avatar}
            name={"avatar"}
            onChange={() => {}}
          />
        </div>
        <div className="button-container">
          <button className="buttonSubmit" type="submit" disabled={isDisabled}>
            Regístrate
          </button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
