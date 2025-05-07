import EmployeeJobList from "../../../components/EmployeeJobList/EmployeeJobList";
import "./EmployeeHome.css"

export default function EmployeeHome() {
    return (
      <div className="employee-home">
      <div className="breadcrumb">Inicio</div>
<EmployeeJobList/>
      </div>
      
    );
  }
  