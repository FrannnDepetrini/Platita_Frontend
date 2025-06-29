import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "../../../utils/icons/icons";
import { postulationService } from "../../../services/postulationServices/postulationService";
import { jobService } from "../../../services/jobService/jobService";
const PostulationNumber = ({ ps, userName, jobId = null }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const fetchNumber = async () => {
      if (ps.status === "Success" && !phoneNumber) {
        try {
          const response =
            await postulationService.showPhoneForAcceptedPostulation(ps.id);
          console.log(response);
          setPhoneNumber(response);
        } catch (error) {
          throw new Error(error);
        }
      }
    };
    fetchNumber();
  }, []);

  const handleContact = async () => {
    let jobTitle = "";
    if (!jobId) {
      jobTitle = ps.job.title;
    } else {
      const job = await jobService.getJobById(jobId);
      jobTitle = job.title;
    }
    const message = `Hola, me llamo ${userName}. Fui aceptado para el trabajo de *${jobTitle}* a través de la app Platita. Te escribo para coordinar los detalles.`;
    const encodedMessage = encodeURIComponent(message);
    console.log(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };
  return (
    <td>
      {ps.status === "Success" ? (
        <IoLogoWhatsapp
          onClick={() => handleContact()}
          className="whatsapp_icon"
        />
      ) : (
        "-"
      )}
    </td>
  );
};
export default PostulationNumber;
