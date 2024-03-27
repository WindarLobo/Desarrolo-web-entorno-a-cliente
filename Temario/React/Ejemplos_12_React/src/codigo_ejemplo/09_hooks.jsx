import React, { useState, useRef } from 'react';

function EjemploHooks() {
  // Declaración de un estado utilizando el hook useState
  const [contador, setContador] = useState(0);

  // Declaración de una referencia utilizando el hook useRef
  const inputRef = useRef(null);

  function incrementarContador() {
    setContador(contador + 1);
  }

  function decrementarContador() {
    setContador(contador - 1);
  }

  function focusInput() {
    // Utiliza la referencia para enfocar el input cuando se llama a esta función
    inputRef.current.focus();
  }

  return (
    <div>
      <h1>Contador: {contador}</h1>
      <button onClick={incrementarContador}>Incrementar</button>
      <button onClick={decrementarContador}>Decrementar</button>
      {/* Input con una referencia para enfocarlo más tarde */}
      <input type="text" ref={inputRef} />
      <button onClick={focusInput}>Enfocar Input</button>
    </div>
  );
}

export default EjemploHooks;