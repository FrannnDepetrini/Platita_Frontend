import { useParams } from "react-router-dom";

export default function EmployerJobDetails() {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles del Trabajo (Empleador)</h1>
      <p>Viendo detalles del trabajo publicado con ID: {id}</p>
    </div>
  );
}
