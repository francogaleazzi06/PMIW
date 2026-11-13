// ==========================================
// EVIDENCIA JUICIO (Tarjeta interactiva)
// ==========================================
class EvidenciaJuicio {
  constructor(x, y, descripcion, colorPlaceholder, esPruebaClave) {
    this.x = x;
    this.y = y;
    this.ancho = 240;
    this.alto = 130;
    this.descripcion = descripcion;
    this.colorPlaceholder = colorPlaceholder; // Cuadrado de color donde va a ir la imagen
    this.esPruebaClave = esPruebaClave;
    this.seleccionada = false;
  }

  reiniciar() {
    this.seleccionada = false;
  }

  dibujar() {
    let sobreObjeto = mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto;

    if (this.seleccionada) {
      if (this.esPruebaClave) {
        fill(30, 80, 30); // Verde si era válida
      } else {
        fill(80, 30, 30); // Rojo si era falsa
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

    // Marcador de posición visual para la futura imagen de cada prueba
    fill(this.colorPlaceholder);
    noStroke();
    rect(this.x + 12, this.y + 15, 85, 100, 5);

    // Texto descriptivo centrado en su espacio asignado
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    text(this.descripcion, this.x + 105, this.y + 10, 125, this.alto - 20);
  }

  fuePresionada() {
    return (mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto);
  }
}
