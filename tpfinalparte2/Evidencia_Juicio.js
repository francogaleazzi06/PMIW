
// EVIDENCIA JUICIO (Tarjeta interactiva)

class EvidenciaJuicio {
  constructor(x, y, descripcion, colorPlaceholder , imagen , esPruebaClave) { 
    //pongo imagen en el constructor de evidencia (DAMI)
    this.x = x;
    this.y = y;
    this.ancho = 240;
    this.alto = 130;
    this.descripcion = descripcion;
    this.colorPlaceholder = colorPlaceholder; // Cuadrado de color donde va a ir la imagen
    this.esPruebaClave = esPruebaClave;
    this.seleccionada = false;
    this.imagen = imagen; //creo imagen en el constructor (DAMI)
  }

  reiniciar() {
    this.seleccionada = false;
  }  
  
  dibujar() {
  let sobreObjeto = mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto;

  if (this.seleccionada) {
    if (this.esPruebaClave) {
      fill(30, 80, 30);
    } else {
      fill(80, 30, 30);
    }
  } else if (sobreObjeto) {
    fill(50, 70, 100);
    cursor(HAND);
  } else {
    fill(30, 40, 60);
  }

  stroke(100, 130, 180);
  strokeWeight(2);
  rect(this.x, this.y, this.ancho, this.alto, 8);

  // Para poner la imagen de la evidencia (Dami)
  if (this.imagen) {
    image(this.imagen, this.x + 12, this.y + 15, 85, 100);
  }

  // Texto descriptivo
  fill(255);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text(this.descripcion, this.x + 105, this.y + 10, 125, this.alto - 20);
}

  
  fuePresionada() {
    return (mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto);
  }
}
