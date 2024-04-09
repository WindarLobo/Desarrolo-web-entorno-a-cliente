import React, { useState } from "react";
import "./App.css";
import Pagina from "./Pagina"; // Importa el componente de la solución del ejercicio 1
import MuestraListaUsuarios from "./MuestraListaUsuarios"; // Importa el componente de la solución del ejercicio 2

function App() {
  const [mostrarPagina, setmostrarPagina] = useState(false);
  const [mostrarListaUsuario, setmostrarListaUsuario] = useState(false);

  const toggleEjercicio1Visibility = () => {
    setmostrarPagina(!mostrarPagina);
  };

  const toggleEjercicio2Visibility = () => {
    setmostrarListaUsuario(!mostrarListaUsuario);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={toggleEjercicio1Visibility}>
          Mostrar/Ocultar Ejercicio 1
        </button>
        <button onClick={toggleEjercicio2Visibility}>
          Mostrar/Ocultar Ejercicio 2
        </button>
        {mostrarPagina && <Pagina />}
        {mostrarListaUsuario && <MuestraListaUsuarios />}
      </header>
    </div>
  );
}

export default App;
