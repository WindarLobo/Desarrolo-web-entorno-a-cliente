import React, { useState } from 'react';

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

    const [todos, setTodos] = useState([
        { id: 1, text: 'Comprar leche', completed: false },
        { id: 2, text: 'Hacer ejercicio', completed: false },
        { id: 3, text: 'Estudiar React', completed: false },
      ]);
    
    return (
        <div className="App">
            <h1>Lista de Tareas</h1>
            <AddTodoForm />
            <TodoList />
        </div>
    );
}

export default App;

// PASO 3: DECIDIMOS QUE EL ESTADO MÍNIMO Y COMPLETO SE PODRÍA REPRESENTAR UN UN ARRAY {id, text, completed}
// PASO 4: DECIDIMOS QUE EL ESTADO TIENE QUE ESTAR EN EL COMPONENTE PRINCIPAL
//          (EN ESTE CASO, YA QUE LOS COMPONENTES VAN A NECESITAR QUE FLUYA LA INFORMACIÓN HACIA EL COMPONENTE GENERAL)