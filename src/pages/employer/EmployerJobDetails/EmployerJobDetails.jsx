import { useParams } from "react-router-dom";

export default function EmployeeJobDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles del Trabajo</h1>
      <p>Viendo los detalles del trabajo con ID: {id}</p>
    </div>
  );
}
