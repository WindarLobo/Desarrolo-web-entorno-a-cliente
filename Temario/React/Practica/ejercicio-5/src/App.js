import React, { useState } from "react";
import "./App.css";
function ContadorA() {
  const [contador, setContador] = useState(0);

  const handleClick = () => {
    setContador(contador + 1);
  };

  return (
    <div>
      <h2>Contador A</h2>
      <p>Contador: {contador}</p>
      <button onClick={handleClick}>Incrementar en 1</button>
    </div>
  );
}

function ContadorB() {
  const [contador, setContador] = useState(0);

  const handleClick = () => {
    setContador(contador + 2);
  };

  return (
    <div>
      <h2>Contador B</h2>
      <p>Contador: {contador}</p>
      <button onClick={handleClick}>Incrementar en 2</button>
    </div>
  );
}

function Contadores() {
  return (
    <div className="contadores-container">
      <div>
        <ContadorA />
      </div>
      <div className="contador-b-container">
        <ContadorB />
      </div>
    </div>
  );
}

export default Contadores;
