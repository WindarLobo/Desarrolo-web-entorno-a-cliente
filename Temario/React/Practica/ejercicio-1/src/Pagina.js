import React from "react";
import Encabezado from "./Encabezado";
import Contenido from "./Contenido";
import PieDePagina from "./PieDePagina";
import "./index.css";

function Pagina() {
  return (
    <div className="Pagina">
      <Encabezado titulo={"Windar Lobo"} />
      <Contenido texto={"Ejercicio-1 React"} />
      <PieDePagina />
    </div>
  );
}

export default Pagina;
