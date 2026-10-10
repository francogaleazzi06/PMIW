// Variables globales
let estado = 0; 
let imagenes = [];
let textos = [];


function preload() {
  
  for (let i = 0; i < 17; i++) {
    imagenes[i] = loadImage('assets/pantalla' + (i + 1) + '.jpg');
  }
  
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
    zonaInteractiva(370, 0, 250, 230, "Seguir al jefe"); // Puerta (Ruta B)
    zonaInteractiva(210, 240, 80, 110, "Continuar con mi trabajo");  // Cuaderno (Ruta C)
  }
  
  // -- RUTA A --
  else if (estado === 4) {
    zonaInteractiva(400, 200, 100, 150); // Puerta del despacho
  }
  else if (estado === 5) { 
    zonaInteractiva(250, 180, 120, 80);  // Archivador
  }
  else if (estado === 6) {
    zonaInteractiva(350, 150, 100, 150); // El arma del jefe
  }
  else if (estado === 7) { 
    // FINAL 1
    dibujarBoton(150, 20, 220, 40, "Volver al inicio");
    dibujarBoton(430, 20, 220, 40, "Ver Créditos");
  }

  // -- RUTA B --
  else if (estado === 8) {
    zonaInteractiva(350, 150, 100, 150); // La mujer asustada
  }
  else if (estado === 9) {
    zonaInteractiva(400, 250, 80, 80);   // El documento en la mesa
  }
  else if (estado === 10) {
    zonaInteractiva(300, 150, 200, 150); // El tren
  }
  else if (estado === 11) { 
    // FINAL 2
    dibujarBoton(150, 20, 220, 40, "Volver al inicio");
    dibujarBoton(430, 20, 220, 40, "Ver Créditos");
  }

  // -- RUTA C --
  else if (estado === 12) {
    zonaInteractiva(350, 250, 100, 80);  // Las fotos o el informe
  }
  else if (estado === 13) {
    zonaInteractiva(400, 250, 60, 60);   // Llaves del depto
  }
  else if (estado === 14) { 
    zonaInteractiva(480, 200, 110, 90);  // Mueble para esconder prueba
  }
  else if (estado === 15) { 
    // FINAL 3
    dibujarBoton(150, 20, 220, 40, "Volver al inicio");
    dibujarBoton(430, 20, 220, 40, "Ver Créditos");
  }

  // -- CRÉDITOS --
  else if (estado === 16) {
    mostrarCreditos();
  }
  
}

// Acá todos los parámetros son hitboxes en el momento exacto en el que clickeamos 
// (al contrario del draw que caclula las hitboxes en tiempo real y sin necesidad de hacer click para saber cuándo cambiar el cursor a la manito o añadir el texto flotante a su lado):
function mousePressed() {
  
  if (estado === 0 && botonClickeado(280, 280, 170, 60)) estado = 1; // La carpeta del caso
  else if (estado === 1 && botonClickeado(240, 245, 50, 40)) estado = 2; // Llaves del auto
  else if (estado === 2 && botonClickeado(350, 0, 300, 350)) estado = 3; // Puerta del auto
  
  // Selección de ruta (Estado 3)
  else if (estado === 3) {
    if (botonClickeado(425, 240, 80, 60)) estado = 4;   // Libreta rojiza
    if (botonClickeado(370, 0, 250, 230)) estado = 8;  // Puerta
    if (botonClickeado(210, 240, 80, 110)) estado = 12;  // Cuaderno
  }

  // Lógica Ruta A
  else if (estado === 4 && botonClickeado(400, 200, 100, 150)) estado = 5;
  else if (estado === 5 && botonClickeado(250, 180, 120, 80)) estado = 6;
  else if (estado === 6 && botonClickeado(350, 150, 100, 150)) estado = 7;
  else if (estado === 7) {
    //hitboxes de los 2 botones del final
    if (botonClickeado(150, 20, 220, 40)) estado = 0;
    if (botonClickeado(430, 20, 220, 40)) estado = 16;
  }

  // Lógica Ruta B
  else if (estado === 8 && botonClickeado(350, 150, 100, 150)) estado = 9;
  else if (estado === 9 && botonClickeado(400, 250, 80, 80)) estado = 10;
  else if (estado === 10 && botonClickeado(300, 150, 200, 150)) estado = 11;
  else if (estado === 11) {
    //hitboxes de los 2 botones del final
    if (botonClickeado(150, 20, 220, 40)) estado = 0;
    if (botonClickeado(430, 20, 220, 40)) estado = 16;
  }

  // Lógica Ruta C
  else if (estado === 12 && botonClickeado(350, 250, 100, 80)) estado = 13;
  else if (estado === 13 && botonClickeado(400, 250, 60, 60)) estado = 14;
  else if (estado === 14 && botonClickeado(480, 200, 110, 90)) estado = 15; 
  else if (estado === 15) {
    //hitboxes de los 2 botones del final
    if (botonClickeado(150, 20, 220, 40)) estado = 0; 
    if (botonClickeado(430, 20, 220, 40)) estado = 16;
  }

  // Créditos
  else if (estado === 16 && botonClickeado(300, 380, 200, 40)) estado = 0;
  
}
