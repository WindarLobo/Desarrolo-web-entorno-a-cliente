import React from 'react';

// Componente para introducir nuevas tareas
function AddTodoForm() {
    return(
        <form>
            <input
                type="text"
                placeholder="Nueva tarea"
            />
            <button>Agregar</button>
        </form>
    );
}

// Componente para visualizar la lista de tareas
function TodoList() {
    return(
        <ul>
            <li>Comprar leche</li>
            <li>Hacer ejercicio</li>
            <li>Estudiar React</li>
        </ul>
    );
}

// Aplicación principal
function App() {
  return (
    <div className="App">
      <h1>Lista de Tareas</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;

// ESCRIBIMOS CÓDIGO ESTÁTICO DE COMPONENTES, SIN INTERACTIVIDAD NI ESTADOS