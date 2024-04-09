import React from "react";

function ContadorB({ contador, incrementarContadores }) {
  return (
    <div>
      <h2>Contador B</h2>
      <p>Contador: {contador}</p>
      <button onClick={() => incrementarContadores(2)}>Incrementar </button>
    </div>
  );
}

export default ContadorB;
