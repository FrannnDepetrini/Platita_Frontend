// // import { HardHat } from "lucide-react";
// // import { FaHardHat } from "../../utils/icons/icons";
import UseCategoryIcon from "../../customHooks/UseCategoryIcon";
// import "./JobCard.css";

// export default function JobCard({ jobInfo }) {
//   const maxLength = 100;
//   const wordLimit = 15;
//   const ellipsis = "...";
//   const CategoryIcon = UseCategoryIcon(jobInfo.category);

//   const getTruncatedContent = () => {
//     if (!jobInfo.description || jobInfo.description.length <= maxLength) {
//       return jobInfo.description;
//     }

//     let truncated = jobInfo.description.substring(0, maxLength);

//     const lastSpaceIndex = truncated.lastIndexOf(" ");

//     if (lastSpaceIndex > 0) {
//       const lastWord = truncated.substring(lastSpaceIndex + 1);
//       //   if (lastWord.length > wordLimit) {
//       //   } else {
//       //     truncated = truncated.substring(0, lastSpaceIndex);
//       //   }
//       if (!lastWord.length > wordLimit) {
//         truncated = truncated.substring(0, lastSpaceIndex);
//       }
//     }

//     return (
//       <>
//         {truncated}
//         <span>{ellipsis}</span>
//       </>
//     );
//   };

//   return (
//     <div className="job-card-container">
//       <div className="job-card">
//         <div className="job-card-content">
//           <div className="job-info">
//             <div className="title-average-container">
//               <div className="title_container">
//                 <h2 className="job-title">{jobInfo.jobTitle}</h2>
//                 <CategoryIcon className="job-icon" />
//               </div>
//               <div className="average_container">
//                 <span className="job-price">
//                   Promedio: +${jobInfo.averagePrice}
//                 </span>
//               </div>
//             </div>

//             <p className="job-description">{getTruncatedContent()}</p>
//           </div>

//           <div className="job-meta">
//             <div className="user-info">
//               <div className="user-name">
//                 <p className="name">{jobInfo.userName}</p>
//               </div>
//               <div className="user-avatar"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// jobTitle: "Levantar un tapial",
//     description:
//       "Necesito a alguien con conocimientos de albañileria para levantar un tapial en mi local",
//     date: "Para esta semana",
//     location: "Santa fe 50, Rosario",
//     applications: 300,
//     averagePrice: 10000,
//     userName: "Fulano Detal",
//     category: "Construction",

import "./JobCard.css";

export default function JobCard({ jobInfo }) {
  const maxLength = 140;
  const wordLimit = 20;
  const ellipsis = "...";

  const text = jobInfo.description;
  console.log(text);

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
    <div className="parent">
      <div className="topCard">
        <div className="titleSection">
          <h2>{jobInfo.jobTitle}</h2>
          <CategoryIcon className="job-icon" />
        </div>
        <div className="priceSection">
          <p>Promedio +{jobInfo.averagePrice}$</p>
        </div>
      </div>
      <div className="middleCard">
        <p>{getTruncatedContent()}</p>
      </div>
      <div className="bottomCard">
        <div className="infoJobSection">
          <div className="detailJob-item">
            <span className="detail-label">Fecha:</span>
            <span className="detail-value">{jobInfo.date}</span>
          </div>

          <div className="divider"></div>

          <div className="detailJob-item">
            <span className="detail-label">Ubicación:</span>
            <span className="detail-value">{jobInfo.location}</span>
          </div>

          <div className="divider"></div>

          <div className="applications">
            <span>
              <strong>+{jobInfo.applications}</strong> Postulaciones
            </span>
          </div>
        </div>

        <div className="profileUser">
          <div className="user-name">
            <p className="name">{jobInfo.userName}</p>
          </div>
          <div className="user-avatar"></div>
        </div>
      </div>
    </div>
  );
}
