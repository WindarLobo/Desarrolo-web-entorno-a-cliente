// GeneracionDeComponentes.js - Ejemplo de cómo generar componentes en React, tanto funcionales como de clase

import React, { Component } from 'react';

// Función que crea un componente funcional llamado Saludo.
function SaludoFuncional(props) {
  return (
    <div>
      <h3>Saludo Funcional</h3>
      <p>¡Hola, {props.nombre}!</p>
    </div>
  );
}

// Función que crea un componente funcional llamado Despedida.
function DespedidaFuncional(props) {
  return (
    <div>
      <h3>Despedida Funcional</h3>
      <p>¡Hasta luego, {props.nombre}!</p>
    </div>
  );
}

// Componente de clase que genera un saludo.
class SaludoClase extends Component {
  render() {
    return (
      <div>
        <h3>Saludo de Clase</h3>
        <p>¡Hola, {this.props.nombre} desde un componente de clase!</p>
      </div>
    );
  }
}

// Componente de clase que genera una despedida.
class DespedidaClase extends Component {
  render() {
    return (
      <div>
        <h3>Despedida de Clase</h3>
        <p>¡Hasta luego, {this.props.nombre} desde un componente de clase!</p>
      </div>
    );
  }
}

// Exportamos los componentes funcionales y de clase.
export { SaludoFuncional, DespedidaFuncional, SaludoClase, DespedidaClase };
