window.onload = () => {
  document.addEventListener("keydown", playSound);
};

function playSound(e) {
  const key = e.key; // Obtengo la tecla presionada
  const button = document.querySelector(`.set .${key}.drum`); // SelSeleccionoccionamos el botón con las clases correspondientes a la tecla presionada
  const audio = button.querySelector("audio"); // Selecciono el elemento audio dentro del botón

  if (!audio) return; // Si no hay audio correspondiente, salimos de la función
  audio.currentTime = 0; // Reinicios la reproducción del audio
  audio.play(); // Reproduzco el audio

  button.classList.add("playing"); // Añado la clase "playing" al botón para resaltar que se está reproduciendo
}
