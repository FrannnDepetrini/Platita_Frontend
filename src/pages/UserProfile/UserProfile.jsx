import styles from "./UserProfile.module.css";
import { FaEdit, FaUser, FaCheck, FaPlus } from "../../utils/icons/icons";
import { useEffect, useState } from "react";
import Reputation from "../../components/Reputation/Reputation";
import classNames from "classnames";

const UserProfile = () => {
  const [name, setName] = useState("Fulano");
  const [lastName, setLastName] = useState("Detal");
  const [email, setEmail] = useState("fulano@gmail.com");
  const [phoneNumber, setPhoneNumber] = useState("(0000) 999999");
  const [province, setProvince] = useState("Santa Fe");
  const [city, setCity] = useState("Rosario");
  const [provinces, setProvinces] = useState([]);

  const [areInputsEditable, setAreInputsEditable] = useState(true);

  const reputationData1 = {
    5: 200,
    4: 40,
    3: 15,
    2: 5,
    1: 0,
  };

  const reputationData2 = {
    5: 5,
    4: 10,
    3: 90,
    2: 25,
    1: 8,
  };

  useEffect(() => {
    const getProvinces = async () => {
      try {
        const response = await fetch(
          "https://apis.datos.gob.ar/georef/api/provincias"
        );

        if (!response.ok) {
          throw new Error("Error", response);
        }
        const data = await response.json();

        const provincesData = data.provincias;
        const listProvinces = provincesData.map((pr) => pr.nombre);
        setProvinces(listProvinces);
      } catch (err) {
        console.error(err);
      }
    };
    getProvinces();
  }, []);

  const provincesMapped = () => {
    return provinces.map((pr) => {
      return <option value={pr}></option>;
    });
  };

  return (
    <div className={styles.profile_container}>
      <div className={styles.breadCrumbs}>
        <h3>
          Inicio / <span>Mi perfil</span>
        </h3>
      </div>
      <div className={styles.main_container}>
        <div className={styles.userInfoAndEdir_container}>
          <div className={styles.userInfo_container}>
            <div>
              <label htmlFor="name">Nombre </label>
              <input
                name="name"
                disabled={areInputsEditable}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName">Apellido</label>
              <input
                name="lastName"
                disabled={areInputsEditable}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="name">Email</label>
              <input
                disabled={areInputsEditable}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">Numero de telefono</label>
              <input
                disabled={areInputsEditable}
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <datalist id="provinces">{provincesMapped()}</datalist>
              <label htmlFor="name">Provincia</label>
              <input
                list="provinces"
                disabled={areInputsEditable}
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="name">Ciudad</label>
              <input
                disabled={areInputsEditable}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.buttons_container}>
            <div
              onClick={() => setAreInputsEditable(!areInputsEditable)}
              className={classNames(styles.button_container, styles.edit, {
                [styles.pressed]: !areInputsEditable,
              })}
            >
              <FaEdit className={styles.edit_icon} />
            </div>
            <div
              className={classNames(styles.button_container, styles.check, {
                [styles.pressed]: !areInputsEditable,
              })}
            >
              <FaCheck className={styles.check_icon} />
            </div>
            <div
              onClick={() => setAreInputsEditable(!areInputsEditable)}
              className={classNames(styles.button_container, styles.cancel, {
                [styles.pressed]: !areInputsEditable,
              })}
            >
              <FaPlus className={styles.cancel_icon} />
            </div>
          </div>
        </div>
        <div className={styles.imageAndReputation}>
          <div className={styles.imageContainer}>
            <FaUser className={styles.user_image}></FaUser>
          </div>
          <div className={styles.reputationContainer}>
            <Reputation
              reputationData={reputationData1}
              role={"Empleador"}
            ></Reputation>
            <Reputation
              reputationData={reputationData2}
              role={"Empleado"}
            ></Reputation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
