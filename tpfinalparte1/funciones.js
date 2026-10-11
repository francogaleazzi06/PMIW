function cargarTextos() {
  textos[0] = "El despacho huele a humo esta noche. El jefe no actúa como de costumbre: tiene una especie de obsesión con un encargo que, a mis saberes, jamás registró en los libros oficiales de la agencia. (Haz clic en la carpeta del nuevo caso para continuar).";
  textos[1] = "Espionaje corporativo, lo llama, pero el expediente no tiene cliente ni sello. Acepto por rutina, pero mis dudas empiezan a acumularse. ¿Quién será la mujer que persigue?";
  textos[2] = "Tercer noche en este auto. La mujer sale a caminar. El Jefe respira agitado y baja del vehículo bruscamente diciendo que necesita tomar aire. Mientras sale, accidentalmente deja caer una libreta de cuero rojiza que nunca había visto.";
  textos[3] = "Estoy solo en el vehículo. Después de semanas acumulando sospechas y viendo sus arranques de ira, un fugaz pensamiento pasa por mi cabeza: siento que es hora de tomar una decisión...";

  // RUTA A: La Libreta (Investigación)
  textos[4] = "Abro la libreta roja: no hay notas de empresas. Hay mapas detallados de los recorridos de la mujer, fotos tomadas sin que lo note y frases violentas. Mañana voy a llegar al despacho horas antes que él para buscar pruebas oficiales.";
  textos[5] = "El despacho está en silencio. Sé que las respuestas y los expedientes reales están guardados aquí.";
  textos[6] = "Abro el archivador: encuentro una orden de restricción por violencia doméstica y una foto de bodas. ¡Ella es su exesposa! La puerta se traba a mis espaldas. Él está ahí con el rostro desencajado y su pistola: 'Fuiste muy curioso...'";
  textos[7] = "FINAL 1 (JUSTICIA): Mantengo la calma, activo la grabadora y lo hago confesar. Al llegar la policía con la prueba, lo arrestan. No sé qué será de la vida de esa mujer, pero ahora está a salvo.";

  // RUTA B: El Callejón (Contacto directo)
  textos[8] = "Bajo del auto sin hacer ruido. Sigo a mi jefe por un callejón y veo como de repente empieza a conversar con ella. Me quedo observando. Él se retira furioso después de un rato.";
  textos[9] = "Persigo a la mujer hasta un café cercano para entender la situación. Se presenta como Linda y me muestra su documento: era su esposa y lleva un año huyendo de la violencia obsesiva de mi jefe. Me suplica con fuerza que no le revele su dirección.";
  textos[10] = "Acepto protegerla. Le doy una pista falsa por radio al Detective para despistarlo mientras acompaño a linda a la estación de trenes para que salga de la provincia sana y salva.";
  textos[11] = "FINAL 2 (LA FUGA): El tren arranca y ella logra escapar a salvo. Al día siguiente mi placa yace sobre el escritorio. Me voy de la ciudad rápidamente, antes de que ese loco se busque a otro compañero para atraparme.";

  // RUTA C: El Cómplice Ciego
  textos[12] = "Decido no meterme en los asuntos privados de mi Jefe y cumplo mi trabajo. Durante semanas tomo fotografías de la mujer y le entrego un informe detallado con todos sus horarios y rutinas.";
  textos[13] = "Satisfecho, el Detective me entrega las llaves del departamento de ella: 'Entrá mientras no está y escondé esta caja en su ropero. Son las pruebas del fraude corporativo que oculta hace años'.";
  textos[14] = "Luego de esconder la caja, veo en la mesita de luz una foto de mi jefe, todavía tenía el pelo castaño y estaba junto a esta mujer...";
  textos[15] = "FINAL 3 (EL CÓMPLICE): Al día siguiente, la policía irrumpe en su casa y la arresta por fraude corporativo. No sé cómo no me di cuenta de todo esto... supongo que ese trabajo no estaba hecho para mí.";
}


function dibujarPantalla(num) {
  
  // Ampliamos el alto de la imagen a 360
  image(imagenes[num], 0, 0, width, 360); 
  
  // Bajamos el inicio del rectángulo a 360, y reducimos su altura a 90 (360 + 90 = 450)
  fill(15, 15, 20);
  rect(0, 360, width, 90);
  
  // Bajamos la coordenada Y del texto (a 375) para que quede centrado en la nueva caja
  fill(255);
  textSize(15);
  textAlign(LEFT, TOP);
  text(textos[num], 20, 375, width - 40); 
  
}


function zonaInteractiva(x, y, ancho, alto, textoMouse = "Examinar") {
  
  let sobreLaZona = (mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto);
  if (sobreLaZona) {
    
    cursor(HAND); // Convierte el cursor en la manito
    
    push();
    
    // Dibujamos un pequeño marco flotante con texto que sigue al mouse
    textSize(12);
    textAlign(LEFT, CENTER);
    let wText = textWidth(textoMouse);
    
    // Fondo oscuro semitransparente para el cartelito
    fill(0, 0, 0, 200);
    noStroke();
    rect(mouseX + 15, mouseY - 10, wText + 12, 22, 4);
    
    // Texto blanco
    fill(255);
    text(textoMouse, mouseX + 21, mouseY + 1);
    
    pop();
  }
  
}


function dibujarBoton(x, y, ancho, alto, etiqueta) {
  
  let hover = mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto;
  if (hover) {
    fill(80, 100, 160); 
    cursor(HAND);
  } else {
    fill(40, 50, 90);   
  }
  
  rect(x, y, ancho, alto, 5); 
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
  text(etiqueta, x + ancho / 2, y + alto / 2);
  
}


function botonClickeado(x, y, ancho, alto) {
  
  return (mouseX > x && mouseX < x + ancho && mouseY > y && mouseY < y + alto);
  
}


function mostrarCreditos() { //funcion animacion

  // Fondo con movimiento parallax
  // Dibuja la primera imagen del fondo 
  image(fondoCreditos, posFondoCreditos, 0, width, height);

  // Para repetir el fondo y se dibuje en el otro lado
  image(fondoCreditos, posFondoCreditos + width, 0, width, height);

  // Para que se mueva para la izquierda
  posFondoCreditos -= velocidadFondoCreditos;

  // El que ve si ya salio de la pantalla
  if (posFondoCreditos <= -width) {
    // el que reincia la posicion para volver a moverse
    posFondoCreditos = 0;
  }
  
  //Titulos,subtitulo,facultad
  
  fill(255);
  textAlign(CENTER, TOP);
  textSize(22);
  text("Aventura Gráfica - El Ojo del Detective", width / 2, 40);
  textSize(15);
  text("Cátedra de Programación para Medios Interactivos Web",
       width / 2, 80);
  text("Facultad de Artes - Universidad Nacional de La Plata",
       width / 2, 105);
  textSize(17);
  fill(150, 200, 255);
  text("Desarrollado por:", width / 2, 150);

  // Del frame actual selecciona una imagen del array
  let img = nombresCreditos[frameCreditos];

 //le pongo ese tamaño
  if (img) {
    let ancho = 500; 
    let alto = 500;  

    // y lo dibuja en esa posicion
    image(
      img,
      posXCreditos,
      265,
      ancho,
      alto
    );
  }

  // ANIMACION CREDITOS 
  // Contadorcreditos aumenta
  contadorCreditos++;

// Se fija si llega a la cantidad de fotogramas
  if (contadorCreditos >= velocidadAnimacionCreditos) {

// Se reincia el contador 
  contadorCreditos = 0;

// Pasa a la otra imagen del array
  frameCreditos++;

//  Se fija si llega a la cantidad de fotogramas
  if (frameCreditos >= nombresCreditos.length) {

// Vuelve a la primera imagen
  frameCreditos = 0;
    }
  }

// Movimiento de la imagen
// Desplaza la imagen hacia la izquierda según la velocidad
  posXCreditos -= velocidadMovimientoCreditos;

// Comprueba si la imagen salió por el lado izquierdo
  if (posXCreditos < -500) {

// Hace que la imagen vuelva a aparecer desde la derecha
  posXCreditos = width;
  }

// Botón original
// Dibuja el botón para volver a la pantalla inicial
  dibujarBoton(300, 380, 200, 40, "Volver al Inicio");
}
