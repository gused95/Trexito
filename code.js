//Agregar el evento click al boton
let btnStart = document.querySelector(".start");

btnStart.addEventListener("click", () => {
  console.log("inicia el juegooooooooo");
  clearInterval(idInterval);
  iniciarJuego();
});


// idInterval
let idInterval;

//Imagenes

const trexito = new Image();
trexito.src = "trex1.webp";

const cactusImg = new Image();
cactusImg.src = "cactus1.webp";

const huesoImg = new Image();
huesoImg.src = "hueso.png";
console.log(trexito);

// Sprites
const cero = new Image();
cero.src = "0.gif";

const uno = new Image();
uno.src = "1.gif";

const dos = new Image();
dos.src = "2.gif";

const tres = new Image();
tres.src = "3.gif";

const cuatro = new Image();
cuatro.src = "4.gif";

const cinco = new Image();
cinco.src = "5.gif";

const seis = new Image();
seis.src = "6.gif";

const siete = new Image();
siete.src = "7.gif";

// arrego de las img

const sprites = [cero, uno, dos, tres, cuatro, cinco, seis, siete];
let posicion = 0;

//Seleccionar canvas

let lienzo = document.getElementById("lienzo");
let ctx = lienzo.getContext("2d");
//w 330 h 210

//Lista de enemigos/otros elementos

const nopalitos = [];
const huesos = [];

//Nuestro Personaje --> class
class Trex {
  constructor(x, y, w, h, color, vida, imagen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.vida = vida;
    this.imagen = imagen;
    this.saltando = false;
    this.score = 0;
  }
  avanzar() {
    console.log("Avanzarrrrrr", this.x);
    if (this.x + this.w < 330) {
      this.x += 10;
    }
  }
  retroceder() {
    console.log("retroceder");
    if (this.x > 0) {
      this.x -= 10;
    }
  }
  saltar() {
    console.log("saltar");
    if (this.x < 220) {
      this.saltando = true;
    }
  }
  agacharse() {
    console.log("agacharse");
  }
  dibujarse() {
    ctx.fillStyle = this.color;
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    //imagen
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
  }
  morirse() {}
  disparar() {
    console.log("dispara");
    const huesito = new Hueso(this.x + this.w, this.y + 10, 20, 40, huesoImg);
    huesos.push(huesito);
    console.log(huesos);
  }
}

//Nuestro Enemigo --> cactus

class Cactus {
  constructor(x, y, w, h, imagen, nivel) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagen = imagen;
    this.nivel = nivel;
  }
  dibujarse() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    if (this.nivel === "facil") {
      this.x -= 1;
    } else {
      this.x -= 3;
    }
  }
}

//Proyectil/hueso
class Hueso {
  constructor(x, y, w, h, imagen) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.imagen = imagen;
  }
  dibujarse() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.drawImage(this.imagen, this.x, this.y, this.w, this.h);
    this.x += 3;
  }
}

//Dibujar linea

function dibujarPiso() {
  ctx.beginPath();
  ctx.moveTo(0, 170);
  ctx.lineTo(330, 170);
  ctx.stroke();
  ctx.closePath();
}

dibujarPiso();

//Mostrar el nombre del juego

function mostrarDatos(distancia, score, vida) {
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText("Trexito", 115, 20);
  //distancia
  ctx.fillText(`${distancia}m`, 20, 20);
  //score
  ctx.fillText(`Score: ${score}`, 220, 20);
  ctx.fillText(`Vida: ${vida}`, 220, 50);
}

//Escuche las teclas

function teclas(dinosaurio) {
  //recibimos un evento
  document.addEventListener("keyup", (evento) => {
    // console.log("Tecla tocada", evento.code);
    switch (evento.code) {
      case "KeyF":
        dinosaurio.disparar();
        break;
      case "Space":
        dinosaurio.saltar();
        break;
      case "ArrowRight":
        dinosaurio.avanzar();
        break;
      case "ArrowLeft":
        dinosaurio.retroceder();
        break;
      case "ArrowDown":
        // console.log("Abajo");
        break;
      case "ArrowUp":
        // console.log("arriba");
        break;
    }
  });
}

//Crear enemigos
function crearCactus() {
  const num = Math.floor(Math.random() * 100);
  if (num === 3) {
    const cactus = new Cactus(300, 130, 30, 60, cactusImg, "facil");
    nopalitos.push(cactus);
  }
}

function iniciarJuego() {
  let distancia = 0;
  const dinosaurio = new Trex(20, 130, 30, 60, "green", 100, cero);
  teclas(dinosaurio);
  // console.log(dinosaurio);

  /**
   * AQUI SE RE-DIBUJA TODO EL VIDEOJUEGO
   */

  idInterval = setInterval(() => {
    ctx.clearRect(0, 0, 330, 210);
    //MostrarDatos
    mostrarDatos(distancia, dinosaurio.score, dinosaurio.vida);
    distancia += 1;

    dibujarPiso();
    dinosaurio.dibujarse();

    dinosaurio.imagen = sprites[posicion];
    
    console.log(sprites[posicion]);
    
    posicion++;

    if (posicion === 8) {
      posicion = 0;
    }

    //Esta saltando?? y "gravedad"
    if (dinosaurio.saltando === true) {
      //altura maxima de salto
      if (dinosaurio.y > 0) {
        dinosaurio.y -= 5;
        dinosaurio.x += 5;
      } else {
        dinosaurio.saltando = false;
      }
    }

    //no estas saltando??
    if (dinosaurio.saltando === false && dinosaurio.y < 130) {
      dinosaurio.y += 15;
      dinosaurio.x += 5;
    }

    //Dibujar enemigos/elementos extra
    nopalitos.forEach((cactus, index) => {
      cactus.dibujarse();
      if (cactus.x <= dinosaurio.x + dinosaurio.w 
          && cactus.x >= dinosaurio.x
          && cactus.y <= dinosaurio.y + dinosaurio.h
          ) {
        console.log("toca x")
        
        //eliminar elemento de nopalitos
        //array.splice
        nopalitos.splice(index, 1);
        dinosaurio.vida -= 25;
        //Si sigue vivo el dinosaurio
        if (dinosaurio.vida < 25) {
          clearInterval(idInterval);
          alert("murió");
        }
      }
    });

     //Proyectil
     huesos.forEach((hueso, hIndex) => {
      hueso.dibujarse();
      nopalitos.forEach((cactus, cIndex) => {
        console.log("posicion x cactus", cactus.x, " - ", hueso.x);
        if (hueso.x + hueso.w >= cactus.x) {
          // quitar el hueso y el cactus
          huesos.splice(hIndex, 1);
          nopalitos.splice(cIndex, 1);
          dinosaurio.score += 1;
        }
      });
    });

   
    crearCactus();
  }, 1000 / 30);
}

// iniciarJuego();

//Listo - Pagina de inicio
//Listo - agregar la imagen del trex
//Listo - crear los cactus
//Listo - brincar
//Listo - recibir daño trex
//Listo - contador de avance
//score - listo
//perder
//LISTO - trex dispare
//agregar sonido
//ganar
//reiniciar juego
