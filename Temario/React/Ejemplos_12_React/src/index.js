import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// importamos ejemplos con componentes para renderizarlos posteriormente
import Titulo from './codigo_ejemplo/titulo';
import HolaMundo from './codigo_ejemplo/01_holamundo';
import { SaludoFuncional, DespedidaFuncional, SaludoClase, DespedidaClase } from './codigo_ejemplo/02_declaracionComponentes';
import ListaDeElementos from './codigo_ejemplo/03_renderizacionComponentes';
import PropsYState from './codigo_ejemplo/04_propsYstate';
import LoginForm from './codigo_ejemplo/05_embedJS';
import { EventHandlingExample, EventHandlingExample2 } from './codigo_ejemplo/06_gestionEventos';
import CompIndepState from './codigo_ejemplo/07_integracionComponentes_EstadoIndep';
import CompComState from './codigo_ejemplo/08_integracionComponentes_EstadoComun';
import Hooks from './codigo_ejemplo/09_hooks';
import MetodReact1 from './codigo_ejemplo/10_metodologiaReact_paso1';
import MetodReact2 from './codigo_ejemplo/10_metodologiaReact_paso2';
import MetodReact34 from './codigo_ejemplo/10_metodologiaReact_paso3y4';
import MetodReact5 from './codigo_ejemplo/10_metodologiaReact_paso5';
import MetodReact6 from './codigo_ejemplo/10_metodologiaReact_paso6';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const ejemplo1 = ReactDOM.createRoot(document.getElementById('ejemplo1'));
ejemplo1.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 1: Hola Mundo" />
    <HolaMundo />
  </React.StrictMode>
);

const ejemplo2 = ReactDOM.createRoot(document.getElementById('ejemplo2'));
ejemplo2.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 2: Declaración de componentes JSX" />
    <SaludoFuncional nombre="Juan" />
    <DespedidaFuncional nombre="Juan" />
    <SaludoClase nombre="Pedro" />
    <DespedidaClase nombre="Pedro" />
  </React.StrictMode>
);

const ejemplo3 = ReactDOM.createRoot(document.getElementById('ejemplo3'));
ejemplo3.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 3: Renderización de componentes" />
    <ListaDeElementos />
  </React.StrictMode>
);

const ejemplo4 = ReactDOM.createRoot(document.getElementById('ejemplo4'));
ejemplo4.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 4: Props y State" />
    <PropsYState mensaje="Esto es un mensaje de ejemplo" />
  </React.StrictMode>
);

const ejemplo5 = ReactDOM.createRoot(document.getElementById('ejemplo5'));
ejemplo5.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 5: Código JS embebido en JSX" />
    <LoginForm />
  </React.StrictMode>
);

const ejemplo6 = ReactDOM.createRoot(document.getElementById('ejemplo6'));
ejemplo6.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 6: Gestión de eventos" />
    <EventHandlingExample />
    <EventHandlingExample2 />
  </React.StrictMode>
);

const ejemplo7 = ReactDOM.createRoot(document.getElementById('ejemplo7'));
ejemplo7.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 7: Integración componentes (estados independientes)" />
    <CompIndepState />
  </React.StrictMode>
);


const ejemplo8 = ReactDOM.createRoot(document.getElementById('ejemplo8'));
ejemplo8.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 8: Integración componentes (estado común)" />
    <CompComState />
  </React.StrictMode>
);

const ejemplo9 = ReactDOM.createRoot(document.getElementById('ejemplo9'));
ejemplo9.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 9: Hooks" />
    <Hooks />
  </React.StrictMode>
);

const ejemplo10_1 = ReactDOM.createRoot(document.getElementById('ejemplo10_1'));
ejemplo10_1.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 10: Paso 1" />
    <MetodReact1 />
  </React.StrictMode>
);

const ejemplo10_2 = ReactDOM.createRoot(document.getElementById('ejemplo10_2'));
ejemplo10_2.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 10: Paso 2" />
    <MetodReact2 />
  </React.StrictMode>
);

const ejemplo10_3_4 = ReactDOM.createRoot(document.getElementById('ejemplo10_3_4'));
ejemplo10_3_4.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 10: Pasos 3 y 4" />
    <MetodReact34 />
  </React.StrictMode>
);

const ejemplo10_5 = ReactDOM.createRoot(document.getElementById('ejemplo10_5'));
ejemplo10_5.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 10: Paso 5" />
    <MetodReact5 />
  </React.StrictMode>
);

const ejemplo10_6 = ReactDOM.createRoot(document.getElementById('ejemplo10_6'));
ejemplo10_6.render(
  <React.StrictMode>
    <Titulo name="Ejemplo 10: Paso 6" />
    <MetodReact6 />
  </React.StrictMode>
);