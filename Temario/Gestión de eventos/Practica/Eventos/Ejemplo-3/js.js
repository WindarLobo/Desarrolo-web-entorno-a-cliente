window.onload = function() {
  document.getElementById('texto').addEventListener('keyup',contenido );
 
  }
/*	En el siguiente código HTML, implementar un código en javascript que indique en el contenido del
 elemento “cantidad” el número de caracteres disponibles hasta el máximo (140) cuando introducimos por 
teclado texto en el recuadro texto. (Pista: utilizar el evento keyup).
 */

function  contenido(){
    var inputTexto = document.getElementById('texto');
    var spanCantidad = document.getElementById('cantidad');
    var caracteresRestantes = inputTexto.maxLength - inputTexto.value.length;
    spanCantidad.innerText = caracteresRestantes;
    
}