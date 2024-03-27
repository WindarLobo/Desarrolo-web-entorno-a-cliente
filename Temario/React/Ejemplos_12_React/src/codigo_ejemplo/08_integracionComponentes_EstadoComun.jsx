import React, { useState } from 'react';
import BotonColor from './BotonColor';

function CompComState() {
  const [colors, setColors] = useState({
    colorBoton1: 'verde',
    colorBoton2: 'rojo',
    colorBoton3: 'verde',
    colorBoton4: 'rojo',
  });

  function cambiarColores() {
    setColors((prevState) => ({
      ...prevState,
      colorBoton1: prevState.colorBoton2,
      colorBoton2: prevState.colorBoton1,
    }));
  }

  function cambiarColores_pulsaverde(evento) {
    console.log("pulsando botón " + evento.target.className);
    if (evento.target.classList.contains("verde")) {
      console.log("verde pulsado");
      setColors((prevState) => ({
        ...prevState,
        colorBoton3: prevState.colorBoton4,
        colorBoton4: prevState.colorBoton3,
      }));
    }
  }

  return (
    <div>
      <BotonColor texto="Botón 1" color={colors.colorBoton1} manejador={cambiarColores} />
      <BotonColor texto="Botón 2" color={colors.colorBoton2} manejador={cambiarColores} />
      <br />
      <BotonColor texto="Botón 3" color={colors.colorBoton3} manejador={cambiarColores_pulsaverde} />
      <BotonColor texto="Botón 4" color={colors.colorBoton4} manejador={cambiarColores_pulsaverde} />
    </div>
  );
}

export default CompComState;
