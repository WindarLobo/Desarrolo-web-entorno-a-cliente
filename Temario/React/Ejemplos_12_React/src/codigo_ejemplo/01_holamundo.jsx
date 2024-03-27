// HolaMundo.js - Un ejemplo simple para mostrar cómo funciona React

// Importamos la librería React.
import React from 'react';

// Creamos un componente React llamado HolaMundo que hereda de Component.
function HolaMundo () {
  return (
    // JSX: Esto se parece a HTML, pero es parte de JavaScript.
    <div>
      <h1>Hola, Mundo!</h1>
      <p>¡Bienvenido a mi primer componente en React!</p>
    </div>
  );
}

// Exportamos el componente HolaMundo para que otros archivos puedan usarlo.
export default HolaMundo; // EL NOMBRE HA DE EMPEZAR POR MAYÚSCULA (CONVENCIÓN PASCALCASE EN REACT) !!
