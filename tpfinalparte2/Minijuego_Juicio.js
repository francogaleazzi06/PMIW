
// MINIJUEGO JUICIO (Controlador del videojuego y arreglo de objetos)


class MinijuegoJuicio {
  constructor() {
    this.evidencias = []; // Arreglo de objetos EvidenciaJuicio
    this.erroresPermitidos = 2;
    this.aciertosNecesarios = 3;
    this.instrucciones = "Selecciona las 3 pruebas clave que demuestran la inocencia de Linda y la culpa del jefe.";

    // Grilla de 6 evidencias (3 columnas x 2 filas)
    // Fila superior
this.evidencias.push(new EvidenciaJuicio(25, 70, "Orden de restricción previa por violencia doméstica", color(100,150,220), imagenes[0], true)); 
//Dentro de cada evidencia le pongo una foto dentro con los array de las imagenes (DAMIAN)
this.evidencias.push(new EvidenciaJuicio(280, 70, "Ticket de cafetería cerca de la estación de trenes", color(200,120,100), imagenes[1], false));
this.evidencias.push(new EvidenciaJuicio(535, 70, "Foto de bodas oculta en la mesita de luz", color(120,200,140), imagenes[2], true));

    // Fila inferior
this.evidencias.push(new EvidenciaJuicio(25, 215, "Factura de compra de la caja fuerte en ferretería", color(210,190,90), imagenes[3], false));
this.evidencias.push(new EvidenciaJuicio(280, 215, "Libreta roja con seguimientos y amenazas escritas", color(180,110,210), imagenes[4], true));
this.evidencias.push(new EvidenciaJuicio(535, 215, "Informe de gastos oficiales de la agencia", color(110,190,200), imagenes[5], false));

    this.botonReiniciarMinijuego = new Boton(325, 360, 150, 30, "Reiniciar Intento");
  }

  // Funcion 
  iniciarMusica() {
    if (!musicaJuicio.isPlaying()) {
      musicaJuicio.setVolume(0.4);
      musicaJuicio.loop();
    }
  }

  // Detener musica de fondo (dami)
  detenerMusica() {
    if (musicaJuicio.isPlaying()) {
      musicaJuicio.stop();
    }
  }

  reiniciar() {
    this.erroresPermitidos = 2;
    for (let i = 0; i < this.evidencias.length; i++) {
      this.evidencias[i].reiniciar();
    }
  }

  actualizar() {
    image(imagenes[8], 0, 0, width, height);

    // Instrucciones y estado de intentos en la franja superior
    fill(255);
    textSize(12);
    textAlign(CENTER, TOP);
    text(this.instrucciones, width / 2, 12);

    textSize(12);
    fill(230, 140, 140);
    text("Errores permitidos: " + this.erroresPermitidos + "  |  Pruebas válidas encontradas: " + this.contarAciertos() + " / " + this.aciertosNecesarios, width / 2, 35);

    // Dibuja cada tarjeta del arreglo
    for (let i = 0; i < this.evidencias.length; i++) {
      this.evidencias[i].dibujar();
    }

    // Botón para reiniciar dentro del minijuego
    this.botonReiniciarMinijuego.dibujar();
  }

  contarAciertos() {
    let contador = 0;
    for (let i = 0; i < this.evidencias.length; i++) {
      if (this.evidencias[i].esPruebaClave && this.evidencias[i].seleccionada) {
        contador++;
      }
    }
    return contador;
  }

  cliquear() {
    if (this.botonReiniciarMinijuego.fuePresionado()) {
      this.reiniciar();
      return;
    }

    // Verifico clics en las 6 tarjetas de evidencia
    for (let i = 0; i < this.evidencias.length; i++) {
      if (this.evidencias[i].fuePresionada() && !this.evidencias[i].seleccionada) {
        this.evidencias[i].seleccionada = true;

        if (this.evidencias[i].esPruebaClave) {
          if (this.contarAciertos() === this.aciertosNecesarios) {
            juegoActual.estado = 3; // Gana
          }
        } else {
          this.erroresPermitidos--;
          if (this.erroresPermitidos <= 0) {
            juegoActual.estado = 4; // Pierde
          }
        }
      }
    }
  }
}
