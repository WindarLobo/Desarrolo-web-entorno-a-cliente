import React from "react";

function ContadorA({ contador, incrementarContadores }) {
  return (
    <div>
      <h2>Contador A</h2>
      <p>Contador: {contador}</p>
      <button onClick={() => incrementarContadores(1)}>Incrementar </button>
    </div>
  );
}

export default ContadorA;
