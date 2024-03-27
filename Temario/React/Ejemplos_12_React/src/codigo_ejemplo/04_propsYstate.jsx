// PropsYState.js - Ejemplo de cómo usar props y state en un componente React

import React, { useState } from 'react';

function PropsYState({ mensaje }) {
  // State es donde almacenamos datos que pueden cambiar con el tiempo.
  const [contador, setContador] = useState(0);

  // Método personalizado para incrementar el contador en el estado.
  function incrementarContador() {
    setContador(contador + 1);
  }

  // Método personalizado para decrementar el contador en el estado.
  function decrementarContador() {
    setContador(contador - 1);
  }

  return (
    <div>
      <h2>Uso de Props y State</h2>
      <p>Contador: {contador}</p>
      {/* Utilizamos un prop llamado mensaje que se pasa desde fuera del componente. */}
      <p>Mensaje: {mensaje}</p>
      <button onClick={incrementarContador}>Incrementar Contador</button>
      <button onClick={decrementarContador}>Decrementar Contador</button>
    </div>
  );
}

export default PropsYState;
