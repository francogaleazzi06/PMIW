//COMISION 2 MATIAS 
//FRANCO GALEAZZI : https://youtu.be/u7-4LtaIkZM
//MARCOS DAMIAN GONZALES : https://youtu.be/RH7earvHxgw

// Variables globales
let estado = 0; 
let imagenes = [];
let textos = [];

//Variables de sonido
let chillloop; 
let mostrarVolumen = false;
let volumenMusica = 0.5;
let musicaActiva = false;
let llaveclick;
let click;

// Variables para los creditos 
// Imágenes de los nombres de los créditos
let nombresCreditos = [];

// Fondo de los créditos
let fondoCreditos;

// Variables de animación
let frameCreditos = 0;
let contadorCreditos = 0;
let velocidadAnimacionCreditos = 8;

// Variables de movimiento
let posXCreditos = 850;
let velocidadMovimientoCreditos = 3;

// Variables del fondo parallax
let posFondoCreditos = 0;
let velocidadFondoCreditos = 1;


function preload() {
  
  for (let i = 0; i < 16; i++) {
    imagenes[i] = loadImage('assets/pantalla' + (i + 1) + '.jpg');
  }
  
  chillloop = loadSound('assets/musicadefondo.mp3');
  llaveclick = loadSound('assets/clickllave.mp3');
  click = loadSound('assets/click.mp3');
  
  // Cargo las 9 imágenes de los nombres con un for 
  for (let i = 1; i <= 9; i++) {
    nombresCreditos.push(loadImage('assets/credito' + i + '.png'));
  }
  
  // Cargo el fondo de los créditos
  fondoCreditos = loadImage('assets/fondoCreditos.jpg');
  
}


function setup() {
  
  createCanvas(800, 450); 
  cargarTextos(); 
  
}


function draw() {
  
  cursor(ARROW); // Resetea el mouse a flecha normal por defecto cada frame
  background(0);

  if (estado < 16) {
    dibujarPantalla(estado);
  }

  // --- ZONAS INTERACTIVAS POINT & CLICK ---
  
  if (estado === 0) {
    zonaInteractiva(280, 280, 170, 60, "Leer expediente");  // La carpeta del caso
  } 
  else if (estado === 1) {
    zonaInteractiva(240, 245, 50, 40, "Empezar espionaje"); // Las llaves del auto
  }
  else if (estado === 2) {
    zonaInteractiva(350, 0, 300, 350); // La puerta del auto
  }
  else if (estado === 3) {
    zonaInteractiva(425, 240, 80, 60, "Revisar libreta");  // Libreta rojiza (Ruta A)
    zonaInteractiva(370, 0, 250, 210, "Seguir al jefe"); // Puerta (Ruta B)
    zonaInteractiva(210, 240, 80, 110, "Continuar con mi trabajo");  // Cuaderno (Ruta C)
  }
  
  // -- RUTA A --
  else if (estado === 4) {
    zonaInteractiva(490, 200, 70, 40, "Ir al despacho"); // Palabra "despacho"
  }
  else if (estado === 5) { 
    zonaInteractiva(350, 100, 50, 50, "Abrir");  // Archivador
  }
  else if (estado === 6) {
    zonaInteractiva(625, 180, 30, 50, "Grabar conversación"); // Grabadora
  }
  else if (estado === 7) { 
    // FINAL 1
    dibujarBoton(150, 20, 220, 40, "Volver al inicio");
    dibujarBoton(430, 20, 220, 40, "Ver Créditos");
  }

  // -- RUTA B --
  else if (estado === 8) {
    zonaInteractiva(510, 130, 40, 140, "Interrogar a la mujer"); // La mujer asustada
  }
  else if (estado === 9) {
    zonaInteractiva(270, 140, 200, 190, "Ayudar");   // La mano en la mesa
  }
  else if (estado === 10) {
    zonaInteractiva(230, 0, 200, 350, "irse"); // Escena del tren
  }
  else if (estado === 11) { 
    // FINAL 2
    dibujarBoton(150, 20, 220, 40, "Volver al inicio");
    dibujarBoton(430, 20, 220, 40, "Ver Créditos");
  }

  // -- RUTA C --
  else if (estado === 12) {
    zonaInteractiva(565, 100, 100, 80, "Tomar");  // Llaves del depto
  }
  else if (estado === 13) {
    zonaInteractiva(480, 100, 120, 200, "Esconder");   // Armario
  }
  else if (estado === 14) { 
    zonaInteractiva(390, 0, 100, 250, "Irse");  // Irse
  }
  else if (estado === 15) { 
    // FINAL 3
    dibujarBoton(150, 20, 220, 40, "Volver al inicio");
    dibujarBoton(430, 20, 220, 40, "Ver Créditos");
  }

  // -- CRÉDITOS --
  else if (estado === 16) {
    mostrarCreditos(); //mi funcion de creditos 
  }
  
  
  if (mostrarVolumen && mouseIsPressed && mouseX >= 545 && mouseX <= 755 && mouseY >= 100 && mouseY <= 130) {
 volumenMusica = map(mouseX, 545, 755, 0, 1);
}  // Es el que cambia el volumen segun la posicion del mouse
 
chillloop.setVolume(volumenMusica); // Pone el volumen que pongas a la musica

// Dibujar el botón y el panel
dibujarControlVolumen();
  
}

// Acá todos los parámetros son hitboxes en el momento exacto en el que clickeamos 
// (al contrario del draw que caclula las hitboxes en tiempo real y sin necesidad de hacer click para saber cuándo cambiar el cursor a la manito o añadir el texto flotante a su lado):

function mousePressed() {
  
  // La carpeta del caso  
  if (estado === 0 && botonClickeado(280, 280, 170, 60)) { // La carpeta del caso  
    click.play(); // Cuando el usuario presione hara el sonido
    estado = 1;
  } 
  
  else if (estado === 1 && botonClickeado(240, 245, 50, 40)) { // Llaves del auto
    llaveclick.play();
    estado = 2;
  }
  
  else if (estado === 2 && botonClickeado(350, 0, 300, 350)) { // Puerta del auto
    estado = 3;
    click.play();
  }
  
  
  // Selección de ruta (Estado 3)
  else if (estado === 3) {
    
    if (botonClickeado(425, 240, 80, 60)) { // Libreta rojiza
    estado = 4;
    click.play();
    }
    
    else if (botonClickeado(370, 0, 250, 210)) { // Puerta
      estado = 8; 
      click.play();
    }  
    
    else if (botonClickeado(210, 240, 80, 110)) { // Cuaderno
      estado = 12;
      click.play();
    }
    
  }

  // Lógica Ruta A
  else if (estado === 4 && botonClickeado(490, 200, 70, 40)) { // Palabra "despacho"
    estado = 5;
    click.play();
  }
  else if (estado === 5 && botonClickeado(350, 100, 50, 50)) { // Archivador
   estado = 6;
   click.play();
  }
  else if (estado === 6 && botonClickeado(625, 180, 30, 50)) { // Grabadora
   estado = 7;
   click.play();
  }
  else if (estado === 7) {
    //hitboxes de los 2 botones del final
    if (botonClickeado(150, 20, 220, 40)) estado = 0; // Volver al inicio
    if (botonClickeado(430, 20, 220, 40)) estado = 16; //Créditos
  }

  // Lógica Ruta B
  else if (estado === 8 && botonClickeado(510, 130, 40, 140)){ // La mujer asustada
    estado = 9;
    click.play();
  }
  else if (estado === 9 && botonClickeado(270, 140, 200, 190)){ // La mano en la mesa
    estado = 10;
    click.play();
  }
  else if (estado === 10 && botonClickeado(230, 0, 200, 350)){ // Escena del tren
    estado = 11;
    click.play();
  }
  else if (estado === 11) {
    //hitboxes de los 2 botones del final
    if (botonClickeado(150, 20, 220, 40)) estado = 0;
    if (botonClickeado(430, 20, 220, 40)) estado = 16;
  }

  // Lógica Ruta C
  else if (estado === 12 && botonClickeado(565, 100, 100, 80)){ // Llaves del depto
    estado = 13; 
    llaveclick.play();
  } 
  else if (estado === 13 && botonClickeado(480, 100, 120, 200)){ // Armario
   estado = 14; 
   llaveclick.play();
  } 
  else if (estado === 14 && botonClickeado(390, 0, 100, 250)){ // Irse
    estado = 15; 
    click.play();
  } 
  else if (estado === 15) {
    //hitboxes de los 2 botones del final
    if (botonClickeado(150, 20, 220, 40)) estado = 0; 
    if (botonClickeado(430, 20, 220, 40)) estado = 16;
  }

  // Créditos
  else if (estado === 16 && botonClickeado(300, 380, 200, 40)){
    
  estado = 0;
// Reinicia la animación de los créditos
  frameCreditos = 0;
  contadorCreditos = 0;
  posXCreditos = 850;
  posFondoCreditos = 0;
  
}

//Sonido
if (mouseX >= 700 && mouseX <= 798 && // comprueba si el mouse esta adentro de el boton de sonido.
 mouseY >= 15 && mouseY <= 55) {
 mostrarVolumen = !mostrarVolumen; // Muestra o oculta el panel de control de volumen
 return; // Hace q termine la funcion para que no se ejecuten las instrucciones que siguen como tocar botones
}
}


function keyPressed() {
  if (key == 'l' || key == 'L') { //si se toca l
    if (musicaActiva) { //la musica esta activa
      pausarLoop(); // se pausa
      musicaActiva = false; //se pone en falso
    }  
    else { // si no 
      iniciarLoop(); //inicia denuevo el loop
      musicaActiva = true; // se pone en true 
    }
  }

  if (key == 'p' || key == 'P') {
    pausarLoop();
    musicaActiva = false;
  }

  if (key == 's' || key == 'S') {
    detenerLoop();
    musicaActiva = false;
  }
  
}
