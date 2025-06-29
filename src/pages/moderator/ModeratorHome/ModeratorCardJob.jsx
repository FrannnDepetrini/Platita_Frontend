import UseCategoryIcon from "../../../customHooks/UseCategoryIcon";
import { useNavigate } from "react-router-dom";
import styles from "./ModeratorCardJob.module.css";

export default function ModeratorCardJob({ moderatorJob, cardType = false }) {
  const maxLength = 140;
  const wordLimit = 20;
  const ellipsis = "...";
  const navigate = useNavigate();

  const CategoryIcon = UseCategoryIcon(moderatorJob.category);

  const getTruncatedContent = () => {
    if (
      !moderatorJob.description ||
      moderatorJob.description.length <= maxLength
    ) {
      return moderatorJob.description;
    }

    let truncated = moderatorJob.description.substring(0, maxLength);

    const lastSpaceIndex = truncated.lastIndexOf(" ");

    if (lastSpaceIndex > 0) {
      const lastWord = truncated.substring(lastSpaceIndex + 1);
      if (!lastWord.length > wordLimit) {
        truncated = truncated.substring(0, lastSpaceIndex);
      }
    }

    return (
      <>
        {truncated}
        <span>{ellipsis}</span>
      </>
    );
  };

  return (
    <div
      className={`${styles.parentCard} ${cardType ? styles.clientCard : ""}`}
      onClick={() => {
        navigate(`/moderator/job/detail/${moderatorJob.id}`)
      }}
    >
      <div className={styles.topCardContainer}>
        <div className={styles.cardTitleSection}>
          <h2>{moderatorJob.title}</h2>
          <CategoryIcon className={styles.jobCardIcon} />
        </div>
      </div>
      <div className={styles.middleCardContainer}>
        <p>{getTruncatedContent()}</p>
      </div>
      <div className={styles.bottomCardContainer}>
        <div className={styles.infoJobCardSection}>
          <div className={styles.userName_data}>
            <span className={styles.userName}>{moderatorJob.userName}</span>
            <div className={styles.user_avatar}></div>
          </div>
          <div className={styles.jobCard_Divider}></div>
          <div className={styles.reports_container}>
            <span className={styles.report_title}>Reportes: </span>
            <span className={styles.report_count}>{moderatorJob.reportCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
