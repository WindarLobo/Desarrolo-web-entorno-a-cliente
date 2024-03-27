import React, { useState } from 'react';

function EventHandlingExample() {
  const [count, setCount] = useState(0);

  function handleClick () {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={handleClick}>Incrementar</button>
    </div>
  );
}

function EventHandlingExample2() {
  const [text, setText] = useState('');

  function handleChange(event) {
    setText(event.target.value);
  };

  return (
    <div>
      <p>Texto ingresado: {text}</p>
      <input type="text" onChange={handleChange} />
    </div>
  );
}

export { EventHandlingExample, EventHandlingExample2 };