import styles from "./UserProfile.module.css";
import { FaEdit, FaCheck, FaPlus } from "../../utils/icons/icons";
import { useEffect, useState } from "react";
import Reputation from "../../components/Reputation/Reputation";
import classNames from "classnames";
import SearchInput from "../../components/SearchInput/SearchInput";
import ProfileCircle from "../../components/ProfileCircle/ProfileCircle";
// import useAuth from "../../services/contexts/AuthProvider";
import { authService } from "../../services/authservices/authServices";
import { clientService } from "../../services/authservices/clientServices";

const UserProfile = () => {
  // const { user } = useAuth();
  const { getCurrentUser } = authService;
  const { getReputation, updateUser } = clientService;

  const [userData, setUserData] = useState({});
  const [reputation, setReputation] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    province: "",
    city: "",
    photo: ""
  });

  const [areInputsEditable, setAreInputsEditable] = useState(true);
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUserData(userData);
        const reputation = await getReputation();
        setReputation(reputation);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUser();
  }, [getCurrentUser, getReputation, updateUser]);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "";

    if (phoneNumber.length >= 10) {
      const areaCode = phoneNumber.slice(0, 4);
      const rest = phoneNumber.slice(4);
      return `(${areaCode}) ${rest}`;
    }
    else if (phoneNumber.length >= 5) {
      const areaCode = phoneNumber.slice(0, 4);
      const rest = phoneNumber.slice(4);
      return `(${areaCode}) ${rest}`;
    }

    return phoneNumber;
  };

  useEffect(() => {
    if (userData && userData.userName) {
      const nameParts = userData.userName.split(" ");
      const initialData = {
        name: nameParts[0] || "",
        lastName: nameParts[1] || "",
        email: userData.email || "",
        phoneNumber: userData.phoneNumber || "",
        province: userData.province || "",
        city: userData.city || "",
        photo: userData.photo || ""
      };

      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [userData]);

  // Reputacion para el Empleador

  const reputationEmployer = reputation[0]
  const reputationData1 = {
    5: reputationEmployer?.ratings["5"] || 0,
    4: reputationEmployer?.ratings["4"] || 0,
    3: reputationEmployer?.ratings["3"] || 0,
    2: reputationEmployer?.ratings["2"] || 0,
    1: reputationEmployer?.ratings["1"] || 0,
  };


  // Reputacion para el Empleado
  const reputationEmployee = reputation[1]
  const reputationData2 = {
    5: reputationEmployee?.ratings["5"] || 0,
    4: reputationEmployee?.ratings["4"] || 0,
    3: reputationEmployee?.ratings["3"] || 0,
    2: reputationEmployee?.ratings["2"] || 0,
    1: reputationEmployee?.ratings["1"] || 0,
  };

  const handleChange = (name, value) => {
    switch (name) {
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

  const handleConfirm = async () => {
    try {
      const data = {
        userName: `${formData.name} ${formData.lastName}`,
        phoneNumber: formData.phoneNumber,
        province: formData.province,
        city: formData.city
      };

      await updateUser(data);
      window.location.reload();

      setAreInputsEditable(true);
      setOriginalData({ ...formData });
    } catch (error) {
      console.error("Error updating profile:", error);
      setFormData({ ...originalData });

      // Handle error appropriately
    }
  };

  const handleCancel = () => {
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
                id="name"
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
                id="lastName"
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
                id="email"
                name="email"
                disabled={true}
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Numero de telefono</label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                disabled={areInputsEditable}
                type="tel"
                value={formatPhoneNumber(formData.phoneNumber)}
                onChange={handleInputChange}
                maxLength={14}
                placeholder="(0123) 4567890"
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
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleEdit();
                }
              }}
            >
              <FaEdit className={styles.edit_icon} />
            </div>
            <div
              className={classNames(styles.button_container, styles.check, {
                [styles.pressed]: !areInputsEditable,
              }, {
                [styles.disabled]: originalData == formData ||
                  formData.name === "" ||
                  formData.lastName === "" || 
                  formData.phoneNumber === "" || 
                  formData.province === "" || 
                  formData.city === "" || 
                  formData.phoneNumber.length < 10
              })}
              onClick={handleConfirm}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleConfirm();
                }
              }}
            >
              <FaCheck className={styles.check_icon} />
            </div>
            <div
              onClick={handleCancel}
              className={classNames(styles.button_container, styles.cancel, {
                [styles.pressed]: !areInputsEditable,
              })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCancel();
                }
              }}
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