// ==========================================
// BOTON (Control estándar de interfaz)
// ==========================================

class Boton {
  constructor(x, y, ancho, alto, etiqueta) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.etiqueta = etiqueta;
  }

  dibujar() {
    let hover = mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto;
    
    if (hover) {
      fill(80, 100, 160);
      cursor(HAND);
    } else {
      fill(40, 50, 90);
    }
    
    noStroke();
    rect(this.x, this.y, this.ancho, this.alto, 5);
    
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(this.etiqueta, this.x + this.ancho / 2, this.y + this.alto / 2);
  }

  fuePresionado() {
    return (mouseX > this.x && mouseX < this.x + this.ancho && mouseY > this.y && mouseY < this.y + this.alto);
  }
}
