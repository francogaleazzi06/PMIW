// ==========================================
// Contexto: Después del final 3 (el cómplice)
// ==========================================

let juegoActual;

function setup() {
  createCanvas(800, 400); 
  juegoActual = new GestorAventura();
}

function draw() {
  background(0);
  juegoActual.actualizar();
}

function mousePressed() {
  juegoActual.cliquear();
}
