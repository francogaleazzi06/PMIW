//COMISION 2 MATIAS 
//FRANCO GALEAZZI : https://youtu.be/YDU8FU8e2Q4?si=70xxIBsvy83KDntD
//MARCOS DAMIAN GONZALES : https://youtu.be/4n_J3TNvMoc


// Contexto: Después del final 3 (el cómplice)
//imagenes y sonido (DAMIAN)
let musicaJuicio; 
let imagenes = []; 

let juegoActual;


function setup() {
  createCanvas(800, 400); 
  juegoActual = new GestorAventura();
}

function preload (){
musicaJuicio = loadSound("data/musica_juicio.mp3"); //cargo las imagenes (DAMIAN)
imagenes[0] = loadImage("data/restriccion.jpg");  //evidencias
imagenes[1] = loadImage("data/ticket.jpg");
imagenes[2] = loadImage("data/foto_boda.jpg");
imagenes[3] = loadImage("data/factura.jpg");
imagenes[4] = loadImage("data/libreta.jpg");
imagenes[5] = loadImage("data/informe.jpg");
imagenes[6] = loadImage("data/investigador.jpg"); //desde aca son fondos 
imagenes[7] = loadImage("data/instrucciones.jpg");
imagenes[8] = loadImage("data/juicio.jpg");
imagenes[9] = loadImage("data/victoria.jpg");
imagenes[10] = loadImage("data/derrota.jpg");
imagenes[11] = loadImage("data/facuu.jpg");
}

function draw() {
  background(0);
  juegoActual.actualizar();
}

function mousePressed() {
  juegoActual.cliquear();
}
