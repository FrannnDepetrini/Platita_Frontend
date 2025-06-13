import { useEffect, useState } from "react";
import { IoLogoWhatsapp } from "../../../utils/icons/icons";
const PostulationNumber = ({ ps, userName }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    if (ps.Status === "Aceptado" && !phoneNumber) {
      fetch(
        `https://magicloops.dev/api/loop/dfd1c54a-2cef-4c26-95e9-c8ea808d54b2/run?input=Hello+World`
      )
        .then((res) => res.json())
        .then((data) => {
          setPhoneNumber(data.phoneNumber);
        })
        .catch((err) => {
          console.error("Error al obtener el número:", err);
        });
    }
  }, []);

  const handleContact = (jobTitle) => {
    const message = `Hola, me llamo ${userName}. Fui aceptado para el trabajo de *${jobTitle}* a través de la app Platita. Te escribo para coordinar los detalles.`;
    const encodedMessage = encodeURIComponent(message);
    console.log(`https://wa.me/${phoneNumber}?text=${encodedMessage}`);
    window.location.href = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };
  return (
    <td>
      {ps.Status === "Aceptado" ? (
        <IoLogoWhatsapp
          onClick={() => handleContact(ps.Title)}
          className="whatsapp_icon"
        />
      ) : (
        "-"
      )}
    </td>
  );
};
export default PostulationNumber;
