import React from "react";
import Usuario from "./Usuario";
import "./ListaUsuarios.css"; // Importa el archivo de estilos CSS

function ListaUsuarios({ nombres }) {
  return (
    <table className="lista-usuarios">
      <thead>
        <tr>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {nombres.map((nombre, index) => (
          <tr key={index}>
            <td>
              <Usuario nombre={nombre} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaUsuarios;
