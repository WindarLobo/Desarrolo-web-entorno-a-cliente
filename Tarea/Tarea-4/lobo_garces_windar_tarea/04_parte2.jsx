import React, { useState } from "react";
import "./eventosGallegos.css";

//Añado una función GestorEventos ({ eventos }) que recibe un objeto eventos y  muestra los eventos de las ciudades
function GestorEventos({ eventos }) {
  const [selectedCity, setSelectedCity] = useState("Santiago de Compostela");

  //Elimino el const ya que no es una constante
  eventos = {
    "Santiago de Compostela": {
      title: "Festival de Jazz",
      description: "Un festival de jazz anual en Santiago de Compostela.",
    },
    "A Coruña": {
      title: "Exposición de Arte",
      description: "Una exposición de arte contemporáneo en A Coruña.",
    },
    Vigo: {
      title: "Concierto en la Playa",
      description: "Un concierto al aire libre en la playa de Vigo.",
    },
  };

  function handleCityChange(event) {
    const selectedCity = event.target.value;
    setSelectedCity(selectedCity);
  }

  return (
    <div className="eventos-gallegos">
      <h2>Eventos Gallegos</h2>
      <label htmlFor="city-select">Selecciona una ciudad: </label>
      <select id="city-select" value={selectedCity} onChange={handleCityChange}>
        <option value="Santiago de Compostela">Santiago de Compostela</option>
        <option value="A Coruña">A Coruña</option>
        <option value="Vigo">Vigo</option>
      </select>
      <div className="evento">
        <h3>{eventos[selectedCity].title}</h3>
        <p>{eventos[selectedCity].description}</p>
      </div>
    </div>
  );
}
//Exporto el componente GestorEventos
export default GestorEventos;
