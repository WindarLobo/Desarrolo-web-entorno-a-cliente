import React from 'react';

function Titulo(props) {
    return (
      <div className="separador">{props.name}</div>
    );
  }

// Exportamos el componente HolaMundo para que otros archivos puedan usarlo.
export default Titulo;
