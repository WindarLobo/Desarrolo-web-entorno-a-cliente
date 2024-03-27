import React from 'react';

// Supongamos que tenemos una lista de elementos
const elementos = ['Manzanas', 'Plátanos', 'Naranjas', 'Uvas'];

function ListaDeElementos() {

  // Map sobre la lista y genera elementos JSX
  const listaNoOrdenada = elementos.map((elemento, index) => (
    <li key={index}>{elemento}</li>
  ));

  // Map sobre la lista y genera elementos JSX dentro de un <ol>
  const listaOrdenada = (
    <ol>
      {elementos.map((elemento, index) => (
        <li key={index}>{elemento}</li>
      ))}
    </ol>
  );

  return (
    <div>
      <h2>Lista No Ordenada</h2>
      <ul>{listaNoOrdenada}</ul>

      <h2>Lista Ordenada</h2>
      {listaOrdenada}
    </div>
  );
}

export default ListaDeElementos;
