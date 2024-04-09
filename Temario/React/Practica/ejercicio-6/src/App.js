import React, { useState } from "react";
import ContadorA from "./ContadorA";
import ContadorB from "./ContadorB";
import "./App.css";

function Contadores() {
  const [contador, setContador] = useState(0);

  const incrementarContadores = (cantidad) => {
    setContador(contador + cantidad);
  };

  return (
    <div className="contadores-container">
      <div>
        <ContadorA
          contador={contador}
          incrementarContadores={incrementarContadores}
        />
      </div>
      <div className="contador-b-container">
        <ContadorB
          contador={contador}
          incrementarContadores={incrementarContadores}
        />
      </div>
    </div>
  );
}

export default Contadores;
