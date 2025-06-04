import UseCategoryIcon from "../../../customhooks/useCategoryIcon";

import styles from "./ModeratorCardJob.module.css";

export default function ModeratorCardJob({ moderatorJob, cardType = false }) {
  const maxLength = 140;
  const wordLimit = 20;
  const ellipsis = "...";

  const CategoryIcon = UseCategoryIcon(moderatorJob.category);

  const getTruncatedContent = () => {
    if (!moderatorJob.description || moderatorJob.description.length <= maxLength) {
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
    <div className={`parent ${cardType && "client"}`}>
      <div className="topCard">
        <div className="titleSection">
          <h2>{moderatorJob.jobTitle}</h2>
          <CategoryIcon className="job-icon" />
        </div>
      </div>
      <div className="middleCard">
        <p>{getTruncatedContent()}</p>
      </div>
      <div className="bottomCard">
        <div className="infoJobSection">
            <div className={styles.userName_data}>
                <span className={styles.userName}>{moderatorJob.userName}</span>
                <div className={styles.user_avatar}></div>
            </div>
          <div className="divider"></div>
            <div className={styles.reports_container}>
                <span className={styles.report_title}>Reportes: </span>
                <span className={styles.report_count}>{moderatorJob.reports}</span>
            </div>
        </div>
      </div>
    </div>
  );
}
