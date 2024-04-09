import React, { useState } from "react";

function BotonCuadroTexto() {
  const [mensaje, setMensaje] = useState("");
  const [colorFondo, setColorFondo] = useState("white");

  const handleClick = () => {
    setMensaje("¡Hiciste clic en el botón!");
    setColorFondo("green");
  };

  const handleMouseEnter = () => {
    setColorFondo("yellow");
  };

  const handleMouseLeave = () => {
    setColorFondo("white");
  };

  return (
    <div>
      <button onClick={handleClick}>Haz clic aquí</button>
      <textarea
        value={mensaje}
        style={{ backgroundColor: colorFondo }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default BotonCuadroTexto;
