// FONDO y FLECHAS

let imagenFondo;
let flechas;

// --- ARRAYS PARA LAS ANIMACIONES DE DARNELL ---
let darnellIdle = [];
let darnellDown = [];
let darnellLeft = [];
let darnellRight = [];
let darnellUp = [];

// --- ARRAYS PARA LAS ANIMACIONES DE PICO ---

let picoIdle = [];
let picoDown = [];
let picoLeft = [];
let picoRight = [];
let picoUp = [];

// Cantidad de cuadros de cada animación de darnell

let cantIdle = 14;  // DN-idle-0 a DN-idle-13
let cantDown = 12;  // DN-down-0 a DN-down-11
let cantLeft = 12;  // DN-left-0 a DN-left-11
let cantRight = 9;  // DN-right-0 a DN-right-8
let cantUp = 12;    // DN-up-0 a DN-up-11

// Cantidad de cuadros de cada animación de pico

let PCcantIdle = 7;  
let PCcantDown = 2;  
let PCcantLeft = 2;  
let PCcantRight = 2; 
let PCcantUp = 2;

// --- MÁQUINA DE ESTADOS DE AMBOS ---

// Tiempos independientes para cada uno
let tiempoProximoEventoDarnell = 2000; 
let tiempoProximoEventoPico = 2000; 

// Estados de Darnell
let estadoDarnell = "IDLE";
let estadoAnteriorDarnell = "IDLE"; 
let frameInicialDarnell = 0; 

// Estados de Pico
let estadoPico = "IDLE";
let estadoAnteriorPico = "IDLE"; 
let frameInicialPico = 0;      

function preload() {
  // Carga de sprites
  
  // -- DARNELL --
  
  for (let i = 0; i < cantIdle; i++) {
    darnellIdle[i] = loadImage("assets/DN-idle-" + i + ".png");
  }
  for (let i = 0; i < cantDown; i++) {
    darnellDown[i] = loadImage("assets/DN-down-" + i + ".png");
  }
  for (let i = 0; i < cantLeft; i++) {
    darnellLeft[i] = loadImage("assets/DN-left-" + i + ".png");
  }
  for (let i = 0; i < cantRight; i++) {
    darnellRight[i] = loadImage("assets/DN-right-" + i + ".png");
  }
  for (let i = 0; i < cantUp; i++) {
    darnellUp[i] = loadImage("assets/DN-up-" + i + ".png");
  }
  
  // -- PICO --
  
  for (let i = 0; i < PCcantIdle; i++) {
    picoIdle[i] = loadImage("assets/PC-idle-" + i + ".png");
  }
  for (let i = 0; i < PCcantDown; i++) {
    picoDown[i] = loadImage("assets/PC-down-" + i + ".png");
  }
  for (let i = 0; i < PCcantLeft; i++) {
    picoLeft[i] = loadImage("assets/PC-left-" + i + ".png");
  }
  for (let i = 0; i < PCcantRight; i++) {
    picoRight[i] = loadImage("assets/PC-right-" + i + ".png");
  }
  for (let i = 0; i < PCcantUp; i++) {
    picoUp[i] = loadImage("assets/PC-up-" + i + ".png");
  }
  
  // Cargar el fondo y las flechas
  
  imagenFondo = loadImage("assets/Philly-Streets.jpg"); 
  flechas = loadImage("assets/flechas.png");
}

function setup() {
  createCanvas(800, 600);
  frameRate(60);

  // --- Redimensión de todos los arrays a un ancho fijo ---
  // (Gemini me dio el tip de que si uno de los dos parámetros del 
  // random está en 0 se mantiene la proporción con respecto al otro parámetro)
  
  // -- DARNELL --
  
  redimensionarArray(darnellIdle, 250, 0);
  redimensionarArray(darnellDown, 250, 0);
  redimensionarArray(darnellLeft, 250, 0);
  redimensionarArray(darnellRight, 250, 0);
  redimensionarArray(darnellUp, 250, 0);
  
  // -- PICO --
  
  redimensionarArray(picoIdle, 300, 0);
  redimensionarArray(picoDown, 300, 0);
  redimensionarArray(picoLeft, 300, 0);
  redimensionarArray(picoRight, 300, 0);
  redimensionarArray(picoUp, 300, 0);
}

// Función auxiliar propia para escalar un array de imágenes
function redimensionarArray(listaImagenes, nuevoAncho, nuevoAlto) {
  for (let i = 0; i < listaImagenes.length; i++) {
    listaImagenes[i].resize(nuevoAncho, nuevoAlto);
  }
}

function draw() {
  let tiempoActual = millis();
  image(imagenFondo, 0, 0, 800, 600);
  image(flechas, 0, 0, 800, 600);

  // --- DISPARADORES ALEATORIOS DE SPRITESHEETS ---
  
  // Darnell
  
  if (tiempoActual >= tiempoProximoEventoDarnell) {
    let poses = ["UP", "DOWN", "LEFT", "RIGHT"];
    estadoDarnell = random(poses); 
    // Darnell espera entre 0.3 y 0.9 segundos para su próximo movimiento
    tiempoProximoEventoDarnell = tiempoActual + random(300, 900); 
  }

  // Pico
  
  if (tiempoActual >= tiempoProximoEventoPico) {
    let poses = ["UP", "DOWN", "LEFT", "RIGHT"];
    estadoPico = random(poses); 
    // Pico espera entre 0.3 y 0.9 segundos para su próximo movimiento
    tiempoProximoEventoPico = tiempoActual + random(300, 900); 
  }

  // --- DETECTORES DE CAMBIO DE ESTADO ---
  
  // Reseteo de Darnell
  if (estadoDarnell !== estadoAnteriorDarnell) {
    frameInicialDarnell = frameCount;
    estadoAnteriorDarnell = estadoDarnell;
  }

  // Reseteo de Pico
  if (estadoPico !== estadoAnteriorPico) {
    frameInicialPico = frameCount;
    estadoAnteriorPico = estadoPico;
  }
  
  let terminoDarnell = false;
  let terminoPico = false;
  
// --- DIBUJO SEGÚN EL ESTADO ---
    
  // -- DARNELL --
  switch (estadoDarnell) {
    case "IDLE":
      terminoDarnell = dibujarAnimacion(darnellIdle, 30, 160, 3, true, frameInicialDarnell);
      break;
    case "DOWN":
      terminoDarnell = dibujarAnimacion(darnellDown, 30, 160, 3, false, frameInicialDarnell);
      break;
    case "LEFT":
      terminoDarnell = dibujarAnimacion(darnellLeft, 30, 160, 3, false, frameInicialDarnell);
      break;
    case "RIGHT":
      terminoDarnell = dibujarAnimacion(darnellRight, 30, 160, 3, false, frameInicialDarnell);
      break;
    case "UP":
      terminoDarnell = dibujarAnimacion(darnellUp, 30, 160, 3, false, frameInicialDarnell);
      break;
  }
  
  // -- PICO --
  switch (estadoPico) {
    case "IDLE":
      terminoPico = dibujarAnimacion(picoIdle, 470, 220, 6, true, frameInicialPico);
      break;
    case "DOWN":
      terminoPico = dibujarAnimacion(picoDown, 470, 220, 8, false, frameInicialPico);
      break;
    case "LEFT":
      terminoPico = dibujarAnimacion(picoLeft, 470, 220, 8, false, frameInicialPico);
      break;
    case "RIGHT":
      terminoPico = dibujarAnimacion(picoRight, 470, 220, 8, false, frameInicialPico);
      break;
    case "UP":
      terminoPico = dibujarAnimacion(picoUp, 470, 220, 8, false, frameInicialPico);
      break;
  }

  // --- RETORNO AL IDLE ---
  if (terminoDarnell) {
    estadoDarnell = "IDLE";
  }
  if (terminoPico) {
    estadoPico = "IDLE";
  }
  
  // --- TEXTO DE REINICIO ---
  textSize(26);
  fill(255);
  stroke(0);      
  strokeWeight(3);
  text("Presiona 'R' para reiniciar", 10, 590);
}

// --- FUNCIÓN PARA DIBUJAR Y ANIMAR ---

function dibujarAnimacion(framesArray, x, y, velocidad, cicla, inicioFrame) {
  let frameRelativo = frameCount - inicioFrame;
  let frameIndice = floor(frameRelativo / velocidad);
  let terminada = false;
  
  // Si la animación no debe ciclar y ya llegó a su última imagen...
  if (!cicla && frameIndice >= framesArray.length) {
    
    terminada = true; // La animación terminó
    
    // Para que no se pase del array le ponemos el límite en su último frame
    frameIndice = framesArray.length - 1; 
    
  } else {
    // Si debe ciclar (como el IDLE) o aún no terminó, se usa el módulo normal //////////// para esto le pedí ayuda a gemini
    frameIndice = frameIndice % framesArray.length;
  }
  
  // Se dibuja el frame en pantalla
  image(framesArray[frameIndice], x, y);

  return terminada; 
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    // Se devuelven a ambos a su estado inicial "idle" por unos segundos
    estadoDarnell = "IDLE";
    estadoPico = "IDLE";
    estadoAnteriorDarnell = "IDLE";
    estadoAnteriorPico = "IDLE";
    
    // Se resetean los contadores de frames
    frameInicialDarnell = frameCount;
    frameInicialPico = frameCount;
    
    // Se reinician los temporizadores aleatorios desde el tiempo actual
    let tiempoActual = millis();
    tiempoProximoEventoDarnell = tiempoActual + 2000;
    tiempoProximoEventoPico = tiempoActual + 2000;
  }
}
