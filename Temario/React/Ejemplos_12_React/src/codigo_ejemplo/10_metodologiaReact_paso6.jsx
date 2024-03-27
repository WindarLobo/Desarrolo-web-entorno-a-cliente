import React, { useState } from 'react';
import './10_metodologiaReact_paso6.css';

// Componente para introducir nuevas tareas
function AddTodoForm({ addTodo }) {
    // Estado local para almacenar el valor del input
    const [text, setText] = useState('');

    function handleChange(e) {
        setText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        addTodo(text);
        setText('');
    };
    
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={text}
                onChange={handleChange}
            />
            <button type="submit">Agregar</button>
        </form>
    );
}

// Componente para visualizar la lista de tareas
function TodoList({ todos, toggleTodo }) {
    
    return (
        <ul>
        {todos.map((todo) => (
            <li 
                key={todo.id}
                onClick={function() { toggleTodo(todo.id)}}
                className={todo.completed ? 'completed' : ''}
            >
                {todo.text}
            </li>
        ))}
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
    
    function addTodo(text) {
        const newTodo = {
          id: todos.length + 1,
          text,
          completed: false,
        };
        setTodos([...todos, newTodo]);
    };

    function toggleTodo(id) {
        console.log("toggle id="+id.toString());
        const updatedTodos = todos.map(function(task) {
            if (task.id === parseInt(id)) return { ...task, completed: !task.completed };
            else return task;
        });
        setTodos(updatedTodos);
    };
    
    return (
        <div className="App">
            <h1>Lista de Tareas</h1>
            <AddTodoForm addTodo={addTodo}/>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>
    );
}

export default App;

// SE ESTILIZA LA APLICACIÓN, AÑADIENDO CLASES E IDENTIFICADORES PARA REFERENCIAR EN CSS