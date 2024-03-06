const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionreiciniar= document.getElementById('boton-reiniciar')
const botonMascota = document.getElementById('boton-mascota')
const botonReinicio = document.getElementById('boton-reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascota = document.getElementById('mascota-jugador')
 
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const ataquesDelJugador = document.getElementById('ataque-Del-Jugador')
const ataquesDelEnemigo = document.getElementById('ataque-Del-Enemigo')

let sectionMensajes = document.getElementById('resultado')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let mokepones = []
let ataqueJugador 
let ataqueEnemigo = []
let opcionDeMokepones
let inputHypo 
let inputPerro 
let inputFenix 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let botonTierra
let botonFuego 
let botonAgua  
let botones = []
let ataquesJugador = []
let indexAtaqueEnemigo
let indexAtaqueJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackgroud = new Image()
mapaBackgroud.src = 'img/mokemap.png'
let alturaQueBuscamos 
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

class Mokepon {
    constructor(nombre, foto, vida,fotoMapa){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x  = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hypo = new Mokepon('Hypo', 'img/hypo.png',5, 'img/hipodoge.png');
let fenix = new Mokepon('Fenix', 'img/fenix.png',5, 'img/ratigueya.png');
let perro = new Mokepon('Perro', 'img/perro.png',5, 'img/capipepo.png');

let hypoEnemigo = new Mokepon('Hypo', 'img/hypo.png',5, 'img/hipodoge.png');
let fenixEnemigo = new Mokepon('Fenix', 'img/fenix.png',5, 'img/ratigueya.png');
let perroEnemigo = new Mokepon('Perro', 'img/perro.png',5, 'img/capipepo.png');

hypo.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

hypoEnemigo.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

perro.ataques.push(
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

perroEnemigo.ataques.push(
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '🌱', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)


fenix.ataques.push(
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

fenixEnemigo.ataques.push(
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

mokepones.push(hypo,perro,fenix)

function iniciar(){

    sectionSeleccionarAtaque.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label for=${mokepon.nombre} class="tarjeta-de-mokepon">
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHypo = document.getElementById('Hypo')
    inputPerro = document.getElementById('Perro')
    inputFenix = document.getElementById('Fenix')
    })

    sectionSeleccionarAtaque.style.display = "none"
    sectionreiciniar.style.display = "none"

    botonMascota.addEventListener('click', seleccionarMascota)

    botonReinicio.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:5157/unirse")
        .then(function(res){
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascota(){
    sectionSeleccionarMascota.style.display = "none"

    if (inputHypo.checked){
        spanMascota.innerHTML = inputHypo.id
        mascotaJugador = inputHypo.id
    }
    else if (inputPerro.checked){
        spanMascota.innerHTML = inputPerro.id
        mascotaJugador = inputPerro.id
    }
    else if (inputFenix.checked){
        spanMascota.innerHTML = inputFenix.id
        mascotaJugador = inputFenix.id
    } else{
        alert('Selecciona una mascota')
    }

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://localhost:5157/mokepon/${jugadorId}`,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })

    botonTierra= document.getElementById('boton-tierra')
    botonFuego = document.getElementById('boton-fuego')
    botonAgua  = document.getElementById('boton-agua')
    botones = document.querySelectorAll('.BAtaque')
    //querySelectorAll = Selecciona todos los elementos que tengan algo ()
    
    //Se elimina esto debido a la creacion de la funcion
    //secuenciaAtaques
    // botonFuego.addEventListener('click', ataqueFuego)
    // botonAgua.addEventListener('click', ataqueAgua)
    // botonTierra.addEventListener('click', ataqueTierra)
}

function secuenciaAtaques(){
    botones.forEach((boton) =>{
        boton.addEventListener('click', (e) => {
            //La e es para poder acceder a las propiedades es el evento de click
            if (e.target.textContent === '🔥'){
                ataquesJugador.push('Fuego')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if (e.target.textContent === '💧'){
                ataquesJugador.push('Agua')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataquesJugador.push('Tierra')
                console.log(ataquesJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let mascotaAleatorio = aleatorio(0,mokepones.length-1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques
    secuenciaAtaques()
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//Se elimina esto debido a la creacion de la funcion
//secuenciaAtaques
// function ataqueFuego(){
//     ataqueJugador = 'Fuego'
//     ataqueAleatorioEnemigo()
// }

// function ataqueAgua(){
//     ataqueJugador = 'Agua'
//     ataqueAleatorioEnemigo()
// }

// function ataqueTierra(){
//     ataqueJugador = 'Tierra'
//     ataqueAleatorioEnemigo()
// }

function ataqueAleatorioEnemigo(){
    let AtaqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)

    if (AtaqueAleatorio == 0 || AtaqueAleatorio == 1){
        ataqueEnemigo.push('Fuego')
    } else if (AtaqueAleatorio == 3 || AtaqueAleatorio == 4){
        ataqueEnemigo.push('Agua')
    } else{
        ataqueEnemigo.push('Tierra')
    }
    iniciarPelea()
}

function iniciarPelea(){
    if (ataquesJugador.length === 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataquesJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){

    for (let index = 0; index < ataquesJugador.length; index++) {
        if(ataquesJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("Empate")
        }
        else if (ataquesJugador[index] === 'Fuego' && ataqueEnemigo[index] === 'Tierra'){
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }           
        else if (ataquesJugador[index] === 'Agua' && ataqueEnemigo[index] === 'Fuego'){
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } 
        else if (ataquesJugador[index] === 'Tierra' && ataqueEnemigo[index] === 'Agua'){
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        } 
        else {
            indexAmbosOponentes(index, index)
            crearMensaje("Ganaste")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }      
        
    }
    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto es un empate")
    }else if (victoriasEnemigo > victoriasJugador){
        crearMensajeFinal("Mamaste 🤷‍♂️")
    }
    else{
        crearMensajeFinal("Felicidades, ganaste")
    }
}

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('resultado')
    
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)

    //parrafo.innerHTML = 'Tu mascota ataco con ' + ataqueJugador + ', la mascota del enemigo atacó con ' + ataqueEnemigo + '-' + resultado
    //sectionMensajes.appendChild(parrafo)
}

function crearMensajeFinal(resultadoFinal){

    sectionMensajes.innerHTML = resultadoFinal
    
    // botonFuego.disabled = true
    // botonAgua.disabled = true
    // botonTierra.disabled = true

    sectionreiciniar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

function pintarCanvas(){
    
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.clientWidth, mapa.height)
    lienzo.drawImage(
        mapaBackgroud,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

    enivarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

    hypoEnemigo.pintarMokepon()
    perroEnemigo.pintarMokepon()
    fenixEnemigo.pintarMokepon()
    if (mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColision(hypoEnemigo)
        revisarColision(perroEnemigo)
        revisarColision(fenixEnemigo)
    }
}

function enivarPosicion(x, y){
    fetch(`http://localhost:5157/mokepon/${jugadorId}/posicion`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function detenerMovimiento (){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    switch(event.key){
        case 'ArrowUp':
            moverArriba()
            break
        case 'ArrowDown':
            moverAbajo()
            break
        case 'ArrowLeft':
            moverIzquierda()
            break
        case 'ArrowRight':
            moverDerecha()
            break
        default:
            break;
    }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
  
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo 
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciar)