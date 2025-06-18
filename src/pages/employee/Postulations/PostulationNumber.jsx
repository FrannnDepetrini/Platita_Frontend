import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "../../../utils/icons/icons";
import { postulationService } from "../../../services/postulationServices/postulationService";
const PostulationNumber = ({ ps, userName }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const fetchNumber = async () => {
      if (ps.status === "Success" && !phoneNumber) {
        // fetch(
        //   `https://magicloops.dev/api/loop/dfd1c54a-2cef-4c26-95e9-c8ea808d54b2/run?input=Hello+World`
        // )
        //   .then((res) => res.json())
        //   .then((data) => {
        //     setPhoneNumber(data.phoneNumber);
        //   })
        //   .catch((err) => {
        //     console.error("Error al obtener el número:", err);
        //   });
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

  const handleContact = (jobTitle) => {
    const message = `Hola, me llamo ${userName}. Fui aceptado para el trabajo de *${jobTitle}* a través de la app Platita. Te escribo para coordinar los detalles.`;
    const encodedMessage = encodeURIComponent(message);
    console.log(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };
  return (
    <td>
      {ps.status === "Success" ? (
        <IoLogoWhatsapp
          onClick={() => handleContact(ps.job.title)}
          className="whatsapp_icon"
        />
      ) : (
        "-"
      )}
    </td>
  );
};
export default PostulationNumber;
