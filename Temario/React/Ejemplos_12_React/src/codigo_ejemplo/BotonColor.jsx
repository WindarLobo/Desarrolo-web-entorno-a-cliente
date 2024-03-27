import React from 'react';
import './BotonColor.css'; // Importa el archivo de estilos CSS

function BotonColor(props) { // se podría utilizar también "( {color, manejador} )" en vez de "props" y más abajo simplemente utilizar "color" y "manejador"
  return (
    <button className={`boton ${props.color}`} onClick={props.manejador}>
      {props.texto}
    </button>
  );
}

export default BotonColor;