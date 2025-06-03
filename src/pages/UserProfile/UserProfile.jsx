import styles from "./UserProfile.module.css";
import { FaEdit, FaCheck, FaPlus } from "../../utils/icons/icons";
import { useEffect, useState } from "react";
import Reputation from "../../components/Reputation/Reputation";
import classNames from "classnames";
import SearchInput from "../../components/SearchInput/SearchInput";
import ProfileCircle from "../../components/ProfileCircle/ProfileCircle";
import useAuth from "../../services/contexts/AuthProvider";

const UserProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name.split(" ")[0],
    lastName: user.name.split(" ")[1],
    email: user.email,
    phoneNumber: user.phoneNumber || "",
    province: user.province || "",
    city: user.city || "",
    photo: ""
  });

  const [areInputsEditable, setAreInputsEditable] = useState(true);
  const [originalData, setOriginalData] = useState({});
  const [phoneDisplay, setPhoneDisplay] = useState("");
  useEffect(() => {
    const initialData = {
      name: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      province: user.province || "",
      city: user.city || "",
      photo: ""
    };

    setFormData(initialData);
    setOriginalData(initialData);
  }, [user]);

  useEffect(() => {
    if (formData.phoneNumber.length < 5 && phoneDisplay.includes("(")) {
      setPhoneDisplay(formData.phoneNumber);
    } else if (formData.phoneNumber && formData.phoneNumber.length >= 4) {
      const areaCode = formData.phoneNumber.slice(0, 4);
      const rest = formData.phoneNumber.slice(4);
      setPhoneDisplay(`(${areaCode}) ${rest}`);
    } else {
      setPhoneDisplay(formData.phoneNumber);
    }
  }, [formData.phoneNumber]);

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

  const handleChange = (name, value) => {

    switch (name){
      case "phoneNumber":
        const rawValue = value.replace(/\D/g, "").slice(0, 11);
        setFormData(prevData => ({ ...prevData, phoneNumber: rawValue }));
        break;

      default:
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleEdit = () => {
    if (!areInputsEditable) {
      
      setOriginalData({ ...formData });
    }
    setAreInputsEditable(!areInputsEditable);
  };

  const handleConfirm = () => {
    console.log("Cambios realizados", formData);
    
    // Aquí harías la llamada a la API
    // await updateUserProfile(formData);
    
    setAreInputsEditable(true);
    setOriginalData({ ...formData });
  };

  const handleCancel = () => {
    // Restaurar todos los datos a los originales
    setFormData({ ...originalData });
    setAreInputsEditable(true);
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
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="lastName">Apellido</label>
              <input
                name="lastName"
                disabled={areInputsEditable}
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                name="email"
                disabled={areInputsEditable}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Numero de telefono</label>
              <input
                name="phoneNumber"
                disabled={areInputsEditable}
                type="tel"
                value={phoneDisplay}
                onChange={handleInputChange}
                maxLength={11}
              />
            </div>

            <SearchInput 
              onChange={handleCustomChange} 
              province={formData.province} 
              city={formData.city} 
              isDisabled={areInputsEditable}
            />

          </div>
          <div className={styles.buttons_container}>
            <div
              onClick={handleEdit}
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
              onClick={handleConfirm}
            >
              <FaCheck className={styles.check_icon} />
            </div>
            <div
              onClick={handleCancel}
              className={classNames(styles.button_container, styles.cancel, {
                [styles.pressed]: !areInputsEditable,
              })}
            >
              <FaPlus className={styles.cancel_icon} />
            </div>
          </div>
        </div>
        <div className={styles.imageAndReputation}>
          <ProfileCircle 
            value={formData.photo} 
            name="photo" 
            onChange={handleCustomChange} 
            isDisabled={areInputsEditable}
          />

          <div className={styles.reputationContainer}>
            <Reputation
              reputationData={reputationData1}
              role={"Empleador"}
            />
            <Reputation
              reputationData={reputationData2}
              role={"Empleado"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;