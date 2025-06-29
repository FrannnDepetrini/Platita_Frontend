import React, { useEffect, useState } from "react";
import styles from "./ModeratorJobDetail.module.css";
import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { useNavigate, useParams } from "react-router-dom";
import { GoAlertFill } from "../../../utils/icons/icons";
import classNames from "classnames";

import ModalConfirm from "../../../components/ModalConfirm/modalConfirm";

import { jobService } from "../../../services/jobService/jobService";


const ModeratorJobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState("");

  const navigate = useNavigate();

  const CategoryIcon = UseCategoryIcon(job.category);

  const fetchFunction = async () => {
    try {
      const response = await jobService.getJobForModeratorByID(id);
      console.log(response);
      setJob(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const handleAction = (action) => {
    setAction(action);
    setIsModalVisible(true);
    if (action == "Delete") {
      setMessage("¿Estas seguro de borrar el trabajo?");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await jobService.deleteJobReported(id);
      // console.log(response);
      setIsModalVisible(false);
      navigate("/moderator/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
                  <h1 className={styles.jobTitle}>{job.title}</h1>
                  <CategoryIcon className={styles.categoryIcon} />
                </div>
                <div className={styles.line}></div>
              </div>
              <div className={styles.userNameAndImage_container}>
                <div className={styles.userName_container}>
                  <h2 className={styles.name}>{job.userName}</h2>
                </div>
                <div className={styles.imageContainer}></div>
              </div>
            </div>
            <div className={styles.description_container}>
              <h1 className={styles.h1Description}>Descripción</h1>
              <p>{job.description}</p>
            </div>
          </div>
          <div className={styles.reportsAndButtons_container}>
            <div className={styles.reports_container}>
              <GoAlertFill className={styles.iconAlert} />
              <h2>Reportes</h2>
              <h1>{job.reportCount}</h1>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() => handleAction("Delete")}
                className={classNames(styles.buttonReport, styles.deleteButton)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
      <ModalConfirm
        message={message}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleConfirm={action == "Delete" && handleConfirmDelete}
      />
    </div>
  );
};

export default ModeratorJobDetail;
