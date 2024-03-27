import React, { useState } from 'react';

// Componente que será reutilizado de contador individual
function Contador() {
  const [count, setCount] = useState(0); // cada componente tiene un estado individual e independiente

  const incrementar = () => {
    setCount(count + 1);
  };

  const decrementar = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={incrementar}>Incrementar</button>
      <button onClick={decrementar}>Decrementar</button>
    </div>
  );
}

// Componente principal que integra varios contadores
function CompIndepState() {
    return (
        <div>
            <h1>Contadores Independientes</h1>
            <Contador />
            <Contador />
            <Contador />
        </div>
    );
}

export default CompIndepState;