
function iniciarLoop() {
 chillloop.loop(); // iniciar la musica 
}

function pausarLoop() {
 chillloop.pause(); // pausar la musica 
}

function detenerLoop() {
 chillloop.stop(); // detener la musica 
}

function dibujarControlVolumen() { //dibuja el boton de sonido
  
 fill(40);
 stroke(255);
 rect(700, 15, 98, 40, 8);

 fill(255);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);

// Texto para activar o desactivar la música
  text(musicaActiva ? "♫ L para desactivar" : "♫ L para activar", 750, 35);

// Si mostrar volumen es verdad , hace que se vea todo
  if (mostrarVolumen) {
  fill(30);
  stroke(255);
  rect(530, 65, 255, 90, 10);

  fill(255);
  noStroke();
  textSize(15);
  textAlign(LEFT, CENTER);
  //muestra porcentaje actual de volumen
  text("Volumen: " + round(volumenMusica * 100) + "%", 545, 88);

// Barra de volumen
  fill(100);
  rect(545, 112, 210, 10, 5);

  fill(80, 200, 120);
  rect(545, 112, 210 * volumenMusica, 10, 5);

// Indicador del volumen
  fill(255);
  circle(545 + 210 * volumenMusica, 117, 16);
  }

  textAlign(LEFT, TOP);
}
