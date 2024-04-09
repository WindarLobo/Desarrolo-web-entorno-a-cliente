import React from "react";
import ListaUsuarios from "./ListaUsuarios";

function MuestraListaUsuarios() {
  const nombresUsuarios = ["Windar", "Martin", "Daniel", "Tacio"]; // Array de nombres de usuarios

  return (
    <div>
      <h1 className="titulo-centrado">Lista de Usuarios</h1>
      <ListaUsuarios nombres={nombresUsuarios} />
    </div>
  );
}

export default MuestraListaUsuarios;
