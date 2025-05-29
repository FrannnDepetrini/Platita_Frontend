import UseCategoryIcon from "../../customHooks/UseCategoryIcon";

import "./EmployeeCardJob.css";

export default function EmployeeCardJob({ jobInfo }) {
  const maxLength = 140;
  const wordLimit = 20;
  const ellipsis = "...";

  const CategoryIcon = UseCategoryIcon(jobInfo.category);

  const getTruncatedContent = () => {
    if (!jobInfo.description || jobInfo.description.length <= maxLength) {
      return jobInfo.description;
    }

    let truncated = jobInfo.description.substring(0, maxLength);

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
    <div className="eparent">
      <div className="etopCard">
        <div className="etitleSection">
          <h2>{jobInfo.jobTitle}</h2>
          <CategoryIcon className="ejob-icon" />
        </div>
        <div className="epriceSection">
          <p>Promedio +{jobInfo.averagePrice}$</p>
        </div>
      </div>
      <div className="emiddleCard">
        <p>{getTruncatedContent()}</p>
      </div>
      <div className="ebottomCard">
        <div className="einfoJobSection">
          <div className="edetailJob-item">
            <span className="edetail-label">Ubicación:</span>
            <span className="edetail-value">{jobInfo.city}</span>
          </div>

          <div className="edivider"></div>

          <div className="eapplications">
            <span>
              <strong>+{jobInfo.applications}</strong> Postulaciones
            </span>
          </div>
        </div>

        <div className="eprofileUser">
          <div className="euser-name">
            <p className="ename">{jobInfo.userName}</p>
          </div>
          <div className="euser-avatar"></div>
        </div>
      </div>
    </div>
  );
}
