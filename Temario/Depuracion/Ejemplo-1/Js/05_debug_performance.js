// limpiamos texto de consola
console.clear();
// Si queremos depurar algún problema de rendimiento
for (let i = 0; i < 5; i++) {
  console.log("Bucle principal, valor " + i.toString());
  // podemos utilizar console.time() para iniciar medición de tiempos
  console.time();
  for (let j = 0; j < 3; j++) {
    console.log("Bucle anidado, valor " + j.toString());
  }
  // e imprimir medición con console.timeEnd()
  console.timeEnd();
}
