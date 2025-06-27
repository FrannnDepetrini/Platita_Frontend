import React, { useState, useRef, useContext } from "react";
import styles from "./EmployerCreateJob.module.css";
import {
  IoCalendarOutline,
  IoIosArrowDown,
  BsFillBriefcaseFill,
  MdLocationOn,
  IoIosInformationCircleOutline,
} from "../../../utils/icons/icons";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import classNames from "classnames";
import useVerificate from "../../../customHooks/UseVerificate";
import SearchInput from "../../../components/SearchInput/SearchInput";
import { jobService } from "../../../services/jobService/jobService";
import { ModalContext } from "../../../services/contexts/ModalContext";
import { useNavigate } from "react-router-dom";

var today = new Date();
var todayFormatted = today.toISOString().split("T")[0];
var defaultDate = new Date();
defaultDate.setDate(today.getDate() + 7);
var defaultFormatted = defaultDate.toISOString().split("T")[0];
var expirationLimit = new Date();
expirationLimit.setDate(today.getDate() + 14);
var expirationFormatted = expirationLimit.toISOString().split("T")[0];

const EmployerCreateJob = () => {
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("initial");
  const [expirationDate, setExpirationDate] = useState(defaultFormatted);
  const [wantExpirationDate, setWantExpirationDate] = useState(false);
  const [expandInfo, setExpandInfo] = useState(false);

  const navigate = useNavigate();
  const {
    showRecoverModal,
    hideRecoverModal,
    setSuccessMessage,
    setErrorMessage,
  } = useContext(ModalContext);

  const { errors, validateField } = useVerificate();
  const [data, setData] = useState({
    title: "",
    description: "",
    province: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    switch (name) {
      case "title":
        validateField(name, value);
        break;

      case "description":
        validateField(name, value);
        break;
    }
  };

  const customHandle = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "province":
        setProvince(value);
        break;

      case "city":
        setCity(value);
        break;
    }
  };

  const inputDateRef = useRef();

  const handleCategory = (category) => setCategory(category);
  const handleOpenCalendar = () => inputDateRef.current.showPicker();

  const handleWantExpirationDate = () => {
    setWantExpirationDate(!wantExpirationDate);
    setExpandInfo(false);
  };

  const validateAllInputs = () => {
    if (
      errors.title != "" ||
      errors.description != "" ||
      category == "initial"
    ) {
      return true;
    }
    return false;
  };

  const handleCreateJob = async () => {
    const job = {
      title: data["title"],
      province,
      city,
      description: data["description"],
      category,
      dayPublicationEnd: expirationDate,
    };
    try {
      await jobService.create(job);

      setSuccessMessage("¡Trabajo creado con exito!");
      showRecoverModal("success");
      setTimeout(() => {
        hideRecoverModal();
        navigate("/employer/request");
      }, 6000);
    } catch (error) {
      setErrorMessage("¡Sucedio un error inesperado, pruebe nuevamente!");
      showRecoverModal();
      console.log(error);
      setTimeout(() => {
        hideRecoverModal();
      }, 6000);
    }
  };

  const CategoryIcon = UseCategoryIcon(category);

  return (
    <div className={styles.createJob_container}>
      <div
        onClick={() => setExpandInfo(!expandInfo)}
        className={classNames(styles.expandInfo_container, {
          [styles.expContainer_expanded]: expandInfo,
        })}
      >
        <h3>
          En Platita, por predeterminado los trabajos expiran a los 7 dias, esto
          se puede extender hasta 15, luego podrás republicarlo!
        </h3>
      </div>
      <div className={styles.form_container}>
        <form className={styles.form}>
          <div className={styles.form_grid}>
            <div className={styles.input_container}>
              <label htmlFor="Title">Titulo</label>
              <div className={styles.iconAndInput_container}>
                <BsFillBriefcaseFill className={styles.icon_generic} />
                <input
                  className={styles.input_generic}
                  id="Title"
                  name="title"
                  type="text"
                  placeholder="Pintar una habitacion"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {errors.title && data.title.length > 0 ? (
                <span className={styles.errorSpan}>{errors.title} </span>
              ) : (
                ""
              )}
            </div>

            <div className={styles.input_container}>
              <label>Localidad</label>
              <div className={styles.iconAndInput_container}>
                <MdLocationOn className={styles.icon_generic} />
                <SearchInput
                  onChange={customHandle}
                  province={province}
                  city={city}
                />
              </div>
            </div>

            <div className={styles.select_container}>
              <label htmlFor="Category">Categoria</label>
              <div className={styles.selectAndIcon_container}>
                {!(category == "initial") && (
                  <CategoryIcon className={styles.categoryIcon} />
                )}
                <select
                  className={styles.select}
                  onChange={(e) => handleCategory(e.target.value)}
                  id="Category"
                  value={category}
                >
                  <option
                    className={styles.optDefault}
                    disabled
                    value="initial"
                  >
                    Elige categoria
                  </option>
                  <option value="Construction">Construcción</option>
                  <option value="Gardening">Jardinería</option>
                  <option value="Electricity">Electricidad</option>
                  <option value="Moving">Mudanza</option>
                  <option value="Cleaning">Limpieza</option>
                  <option value="Mechanics">Mecánica</option>
                  <option value="Babysitter">Niñera/o</option>
                  <option value="Plumbing">Plomería</option>
                  <option value="Painter">Pintor</option>
                  <option value="PetCare">Cuidado de perros</option>
                  <option value="Handyman">Multioficio</option>
                  <option value="Technology">Tecnología</option>
                  <option value="Others">Otros</option>
                </select>
                <span className={styles.span_icon}>
                  <IoIosArrowDown className={styles.arrowIcon} />
                </span>
              </div>
            </div>

            <div className={styles.input_container}>
              <label htmlFor="Description">Descripción</label>
              <div className={styles.iconAndInput_container}>
                <textarea
                  maxLength={150}
                  className={classNames(
                    styles.input_generic,
                    styles.textarea_desc
                  )}
                  name="description"
                  onChange={(e) => handleChange(e)}
                  id="Description"
                  type="text"
                  placeholder="Escribe una breve descripcion del trabajo"
                />
              </div>
              {errors.description && data.description.length > 0 ? (
                <span className={styles.errorSpan}>{errors.description} </span>
              ) : (
                ""
              )}
            </div>

            <div className={styles.expirationDate_container}>
              <div
                onClick={handleWantExpirationDate}
                className={styles.h2_container}
              >
                <div className={styles.expandable_container}>
                  <h2 className={styles.h2_wantExpirationDate}>
                    ¿Quieres asignar una fecha límite?
                  </h2>

                  <IoIosArrowDown
                    className={classNames(styles.arrowExpirationDate, {
                      [styles.rotate]: wantExpirationDate,
                    })}
                  />
                </div>
              </div>

              <div
                className={classNames(styles.labelAndInput, {
                  [styles.labelAndInput_visible]: wantExpirationDate,
                })}
              >
                <div className={styles.dateContent_wrapper}>
                  <div
                    className={classNames(
                      styles.input_container,
                      styles.inputDate_container
                    )}
                  >
                    <label htmlFor="DateLimit">Fecha de expiración</label>
                    <div className={styles.iconAndDate_container}>
                      <IoCalendarOutline
                        onClick={handleOpenCalendar}
                        className={styles.calendarIcon}
                      />
                      <input
                        placeholder={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        value={expirationDate}
                        min={todayFormatted}
                        max={expirationFormatted}
                        ref={inputDateRef}
                        className={styles.input_date}
                        id="DateLimit"
                        type="date"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <button
          disabled={validateAllInputs()}
          onClick={handleCreateJob}
          type="button"
          className={styles.buttonPublish}
        >
          Publicar
        </button>
      </div>
      <div>
        <h3 className={styles.advertisement}>
          Recuerda que los trabajos serán analizados por el moderador antes de
          ser subidos.
        </h3>
      </div>
    </div>
  );
};

export default EmployerCreateJob;
