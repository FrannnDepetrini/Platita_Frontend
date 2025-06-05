import React, { useEffect, useState } from "react";
import styles from "./ModeratorJobDetail.module.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { useParams } from "react-router-dom";
import { GoAlertFill } from "../../../utils/icons/icons";
import classNames from "classnames";
import ModalConfirm from "../../../components/modalConfirm/modalConfirm";

const ModeratorJobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");

  const CategoryIcon = job.Category && UseCategoryIcon(job.Category);
  const inputEncoded = encodeURIComponent(JSON.stringify({ id: parseInt(id) }));

  useEffect(() => {
    const fethFunction = async () => {
      const response = await fetch(
        `https://magicloops.dev/api/loop/f32570e2-deec-446e-bb83-bb223f3a053c/run?input=${inputEncoded}`
      );
      if (!response.ok) {
        throw new Error(response);
      }

      const data = await response.json();
      console.log(data);
      const [name, lastName] = data.UserName.split(" ");
      setJob({ ...data, name, lastName });
      setLoading(false);
    };
    try {
      fethFunction();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleAction = (action) => {
    setAction(action);
    setIsModalVisible(true);
    if (action == "Delete") {
      setMessage("¿Estas seguro de borrar el trabajo?");
    } else setMessage("¿Estas seguro de dejar el trabajo?");
  };

  const handleConfirmDelete = () => {
    setIsModalVisible(false);
    alert("Se borro");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleConfirmVerificate = () => {
    setIsModalVisible(false);
    alert("Nada malo en el trabajo");
  };

  return (
    <div className={styles.jobDetailPage_container}>
      <div className={styles.breadCrumbs}>
        Inicio /
        <span className={styles.spanBreadCrumbs}>Detalle del trabajo</span>
      </div>

      {loading ? (
        <div className={styles.loader}></div>
      ) : (
        <div className={styles.jobDetails_container}>
          <div className={styles.jobDetails}>
            <div className={styles.titleAndUser_container}>
              <div className={styles.jobTitle_container}>
                <div className={styles.titleAndCategory}>
                  <h1 className={styles.jobTitle}>{job.Title}</h1>
                  <CategoryIcon className={styles.categoryIcon} />
                </div>
                <div className={styles.line}></div>
              </div>
              <div className={styles.userNameAndImage_container}>
                <div className={styles.userName_container}>
                  <h2 className={styles.name}>{job.name}</h2>
                  <h2 className={styles.name}>{job.lastName}</h2>
                </div>
                <div className={styles.imageContainer}></div>
              </div>
            </div>
            <div className={styles.description_container}>
              <h1 className={styles.h1Description}>Descripción</h1>
              <p>{job.Description}</p>
            </div>
          </div>
          <div className={styles.reportsAndButtons_container}>
            <div className={styles.reports_container}>
              <GoAlertFill className={styles.iconAlert} />
              <h2>Reportes</h2>
              <h1>{job.Reports}</h1>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() => handleAction("Delete")}
                className={classNames(styles.buttonReport, styles.deleteButton)}
              >
                Eliminar
              </button>
              <button
                onClick={() => handleAction("Verificate")}
                className={classNames(
                  styles.buttonReport,
                  styles.verificateButton
                )}
              >
                Verificar
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalConfirm
        message={message}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleConfirm={
          action == "Delete" ? handleConfirmDelete : handleConfirmVerificate
        }
      />
    </div>
  );
};

export default ModeratorJobDetail;
