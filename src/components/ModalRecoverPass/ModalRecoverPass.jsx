import "../ModalRecoverPass/ModalRecoverPass.css"
import { IoAlertCircle, RxCross2, FaCircleCheck } from "../../utils/icons/icons";



const ModalRecoverPass = ({bool, hide }) => {
    
    

    return(
        <>
            <div className={`container_modal ${bool ? "approved" : ""}`}>
                {bool ? <FaCircleCheck className="faCircle"/> : <IoAlertCircle className="circle"/> }
                {bool 
                ?  <h4>¡Cambio de contraseña con éxito! Serás redirigido al Inicio</h4>
                :  <h4>Error: ¡TOKEN EXPIRADO!</h4> 
                }
                <div className="cross" onClick={() => hide()}><RxCross2 className="cross2"/></div>
            </div>
        </>
       
    )
}

export default ModalRecoverPass;