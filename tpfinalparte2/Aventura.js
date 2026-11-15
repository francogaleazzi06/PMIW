

// GESTOR DE AVENTURA (Maneja pantallas y estados principales)

class GestorAventura {
  constructor() {
    this.estado = 0;
    
    //todos los botones
    this.botonInicio = new Boton(300, 330, 200, 40, "Iniciar Juicio");
    this.botonComenzar = new Boton(300, 330, 200, 40, "Comenzar Juicio");
    this.botonVolverVictoria = new Boton(150, 240, 220, 40, "Volver al inicio");
    this.botonCreditosVictoria = new Boton(430, 240, 220, 40, "Ver Créditos");
    this.botonVolverDerrota = new Boton(150, 240, 220, 40, "Volver al inicio");
    this.botonCreditosDerrota = new Boton(430, 240, 220, 40, "Ver Créditos");
    this.botonVolverCreditos = new Boton(300, 300, 200, 40, "Volver al inicio");
    
    this.minijuegoJuicio = new MinijuegoJuicio();
  }

  actualizar() {
    if (this.estado === 0) {
      // Primera pantalla
      image(imagenes[6], 0, 0, width, height); //cambio los background de cada estado de pantalla (DAMIAN)
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("Juicio de Apelación — El Ojo del Detective", width / 2, 85);
      
      textSize(13);
      fill(200);
      text("Después de mi retiro, me doy cuenta de que debo hacer justicia con este caso.", width / 2, 130);
      text("Sea como sea debo liberar a Linda de prisión...", width / 2, 155);
      text("Ella fue condenada injustamente por fraude corporativo", width / 2, 180);
      text("tras esconder esa caja en su ropero.", width / 2, 205);
      text("Regreso a la ciudad para enfrentar al tribunal, liberar a Linda", width / 2, 230);
      text("e inculpar a mi jefe.", width / 2, 255);
      
      this.botonInicio.dibujar();
    } 
    else if (this.estado === 1) {
      // Pantalla de instrucciones
      image(imagenes[7], 0, 0, width, height); //cambio fondo (DAMIAN)
      fill(255);
      textSize(14);
      textAlign(LEFT, TOP);
      
      text("INSTRUCCIONES:", 40, 40);
      text("El fiscal asegura que la caja hallada en el departamento demuestra el fraude.", 40, 75);
      text("Debes seleccionar exactamente las 3 pruebas clave entre las 6 disponibles", 40, 105);
      text("para exponer el montaje de tu jefe. Solo tienes 2 errores permitidos.", 40, 135);
      
      this.botonComenzar.dibujar();
    } 
    
    else if (this.estado === 2) {
     
      this.minijuegoJuicio.iniciarMusica();// Cuando el minijuego del juicio arranque se iniciara la musica (DAMIAN)
      
      this.minijuegoJuicio.actualizar();
    }
    
    else if (this.estado === 3) {
      
      image(imagenes[9], 0, 0, width, height);
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("¡VICTORIA (CASO RESUELTO)!", width / 2, 110);
      textSize(14);
      text("El tribunal anula la condena de Linda", width / 2, 155);
      text("y ordena la captura de tu exjefe.", width / 2, 180);
      
      // Botón 1: Volver al inicio
      this.botonVolverVictoria.dibujar();
      
      // Botón 2: Ver Créditos
      this.botonCreditosVictoria.dibujar();

    }
    
    else if (this.estado === 4) {
      // Pantalla de derrota (No resuelve el conflicto) con dos botones finales (Volver al inicio / Créditos)
      image(imagenes[10], 0, 0, width, height);
      fill(255);
      textSize(20);
      textAlign(CENTER, CENTER);
      text("¡DERROTA (CASO DESESTIMADO)!", width / 2, 110);
      textSize(14);
      text("Presentaste pruebas irrelevantes.", width / 2, 155);
      text("El juez confirma la sentencia.", width / 2, 180);
      
      // Botón 1: Volver al inicio
      this.botonVolverDerrota.dibujar();
      
      // Botón 2: Ver Créditos
      this.botonCreditosDerrota.dibujar();

    }
    
    else if (this.estado === 5) {
      // Nueva pantalla dedicada exclusivamente a los Créditos
      image(imagenes[11], 0, 0, width, height);
      fill(0);
      textSize(22);
      textAlign(CENTER, CENTER);
      text("CRÉDITOS", width / 2, 90);
      
      textSize(15);
      fill(0);
      text("Desarrollado por Franco Galeazzi y Marcos Damian Gonzales", width / 2, 155);
      text("Cátedra de Programación para Medios Interactivos Web (PMIW)", width / 2, 185);
      text("Facultad de Artes — Universidad Nacional de La Plata (UNLP)", width / 2, 215);

      // Botón para volver al inicio desde los créditos
      this.botonVolverCreditos.dibujar();
    }
  }


  cliquear() {
    if (this.estado === 0 && this.botonInicio.fuePresionado()) {
      this.estado = 1;
    } 
    else if (this.estado === 1 && this.botonComenzar.fuePresionado()) {
      this.minijuegoJuicio.reiniciar();
      this.estado = 2;
    } 
    else if (this.estado === 2) {
      this.minijuegoJuicio.cliquear();

      if (this.estado === 3 || this.estado === 4) {
        this.minijuegoJuicio.detenerMusica(); // Cuando el estado cambia a 3 o 4 se detiene la musica (DAMIAN)
      }
    } 
    else if (this.estado === 3) {
      if (this.botonVolverVictoria.fuePresionado()) {
        this.estado = 0;
      }
      if (this.botonCreditosVictoria.fuePresionado()) {
        this.estado = 5;
      }
    }
    else if (this.estado === 4) {
      if (this.botonVolverDerrota.fuePresionado()) {
        this.estado = 0;
      }
      if (this.botonCreditosDerrota.fuePresionado()) {
        this.estado = 5;
      }
    }
    else if (this.estado === 5) {
      if (this.botonVolverCreditos.fuePresionado()) {
        this.estado = 0;
      }
    }
  }
}
