import React, { useState } from 'react';

const datosUsuario = {
  nombre: '',
  apellidos: '',
};

function LoginForm() {
  const [logueado, setLogueado] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    datosUsuario[name] = value;
  }

  function handleLogin() {
    if (datosUsuario.nombre && datosUsuario.apellidos) {
      setLogueado(true);
    }
  }

  function handleLogout() {
    setLogueado(false);
    // También puedes restablecer los datos del usuario aquí si es necesario
  }

  let contenido;
  if (logueado) {
    contenido = (
      <div>
        <h2>Bienvenido</h2>
        <p>Nombre: {datosUsuario.nombre}</p>
        <p>Apellidos: {datosUsuario.apellidos}</p>
        <button onClick={handleLogout}>Cerrar Sesión</button>
      </div>
    );
  } else {
    contenido = (
      <div>
        <h2>Iniciar Sesión</h2>
        <form>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            onChange={handleChange}
          />
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </form>
      </div>
    );
  }

  return <div>{contenido}</div>;
}

export default LoginForm;
