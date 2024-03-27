import React from 'react';

// Componente para introducir nuevas tareas
function AddTodoForm() {
    return(
        <form></form>
    );
}

// Componente para visualizar la lista de tareas
function TodoList() {
    return(
        <ul></ul>
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

// CREAMOS JERARQUÍA COMPONENTES