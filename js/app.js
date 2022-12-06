OvenPlayer.debug(false);

//definimos sources, para cada reproductor.
//por ahora solo tiene uno, pero cada reproductor
//puede tener mas de un source.
const movil_01 = [{
    file: 'http://192.168.1.51:8080/app/stream1/playlist.m3u8',
    label: 'stream',
    type: 'hls'
}];

const movil_02 = [{
    file: 'http://192.168.1.51:8080/app/stream2/playlist.m3u8',
    label: 'stream',
    type: 'hls'
}];

const movil_03 = [{
    file: 'http://192.168.1.51:8080/app/stream3/playlist.m3u8',
    label: 'stream',
    type: 'hls'
}];

const movil_04 = [{
    file: 'http://192.168.1.51:8080/app/stream4/playlist.m3u8',
    label: 'stream',
    type: 'hls'
}];

const movil_05 = [{
    file: 'http://192.168.1.51:8080/app/stream5/playlist.m3u8',
    label: 'stream',
    type: 'hls'
}];

const movil_06 = [{
    file: 'http://192.168.1.51:8080/app/stream6/playlist.m3u8',
    label: 'stream',
    type: 'hls'
}];

//definimos ubicacion de archivo para marca de agua
//asi como posicion tamanho y transparencia.
const playerWaterMark = {
    image: './live.jpg',
    position: 'top-left',
    y: '20px',
    x: '20px',
    width: '40px',
    height: '30px',
    opacity: 0.3
};

//ajustes comunes para todos los reproductores
const playerCommonSettings = {
    image: "rw.png",
    autoStart: false,
    mute: false,
    showBigPlayButton: true,
    controls: true,
    expandFullScreenUI: true,
    waterMark: playerWaterMark
}


//definimos los parametros unicos 
//que tendra cada reproductor
let player1Data = {
    title: "Móvil 01",
    sources: movil_01,
}

const player2Data = {
    title: "Móvil 02",
    sources: movil_01,
    playerCommonSettings
}
const player3Data = {
    title: "Móvil 03",
    sources: movil_01,
    playerCommonSettings
}
const player4Data = {
    title: "Móvil 04",
    sources: movil_01,
    playerCommonSettings
}
const player5Data = {
    title: "Móvil 05",
    sources: movil_01,
    playerCommonSettings
}
const player6Data = {
    title: "Móvil 06",
    sources: movil_01,
    playerCommonSettings
}








// $(document).ready(function () {
//     const player1 = OvenPlayer.create("reproductor1", {
//         image: "rw.png",
//         title: "Movil 01",
//         waterMark: waterMark,
//         sources: movil_01,
//         autoStart: false,
//         mute: false,
//         showBigPlayButton: true,
//         controls: true
//     });
// });



/** Creamos una funcion que recibira un id y un source y con ello creamos un nuevo reproductor.
 @param {String} id - Identificador del Wrapper donde incrustaremos el reproductor.
 @param {Objet} src - Lista de Objetos con la configuracion que tengra el reproductor.
*/
function makePlayer(id, src) {
    OvenPlayer.create(id, src);
}



/**
 * Funcion que crea un div como videoContainer y
 * un div como Wrapper para el reproductor.
 * @param {String} nombreContainer - Nombre de clase para el videoContainer
 * @param {String} nombreReproductor - Nombre de Id para el wrapper de reproductor
 * @param {Object} fuenteReproductor - Objeto con la lista de fuentes para el reproductor
 */
function createrVideoContainer(nombreContainer, nombreReproductor, fuenteReproductor) {
    //creamos div donde sera el container
    const vc1 = document.createElement('div');
    vc1.className = nombreContainer;
    //creamos el wrapper del reproductor con su id
    const rp1 = document.createElement('div');
    rp1.id = nombreReproductor;
    vc1.appendChild(rp1);//agrego el wrapper al videoContainer.
    //apunto al contenedor principal
    const ctnr = document.getElementById("contenedorPrincipal");
    ctnr.appendChild(vc1);//agrego el videoConteiner al Contenedor principal

    //creamos la instancia del reproductor en el wrapper
    const src = Object.assign(fuenteReproductor, playerCommonSettings);
    OvenPlayer.create(nombreReproductor, src);
}

function removeAllVideoContainers() {
    removeAllPlayers();
    removeElementsByClass("videocontainer1");
    removeElementsByClass("videocontainer2");
    removeElementsByClass("videocontainer3");

    removeElementsByClass("videocontainer1con2y3");
    removeElementsByClass("videocontainer2con1");
    removeElementsByClass("videocontainer3con1y2");

    removeElementsByClass("videocontainer2con3");
}



/**Creamos una funcion que recibe un className y lo eliminara del Dom
    @param {String} className -  Nombre de la clase a eliminar
*/
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}


//creamos una funcion que remueve todos los objetos de tipo
//Ovenplayer de la lista del DOM.
function removeAllPlayers() {
    for (let i = 0; i < OvenPlayer.getPlayerList().length; i++) {
        OvenPlayer.getPlayerList()[i].remove();
    };
}



addEventListener("keydown", (evento) => {

    let list = OvenPlayer.getPlayerList();

    //tecla 0 alfanumerica 
    if (evento.keyCode == 48) {
        removeAllPlayers();
        removeElementsByClass("videocontainer1");
        removeElementsByClass("videocontainer2");
        removeElementsByClass("videocontainer3");
        // $("div").remove(".videocontainer1")
        // $("div").remove(".videocontainer2")
        // $("div").remove(".videocontainer3")

    };

    //telca 1 alfanumerica
    if (evento.keyCode == 49 && !OvenPlayer.getPlayerByContainerId("reproductor1")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer1", "reproductor1", player1Data);
    };

    //tecla 2 alfanumerica
    if (evento.keyCode == 50 && !OvenPlayer.getPlayerByContainerId("reproductor2")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer2", "reproductor2", player2Data);
    };

    //tecla 3 alfanumerica
    if (evento.keyCode == 51 && !OvenPlayer.getPlayerByContainerId("reproductor3")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer3", "reproductor3", player3Data);
    };

    //tecla 4 alfanumerica
    if (evento.keyCode == 52 && !OvenPlayer.getPlayerByContainerId("reproductor1con2y3")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer1con2y3", "reproductor1con2y3", player1Data);
        createrVideoContainer("videocontainer2con1", "reproductor2con1", player2Data);
    };
    //tecla 4 alfanumerica
    if (evento.keyCode == 52 && OvenPlayer.getPlayerByContainerId("reproductor1con2y3")) {
        OvenPlayer.getPlayerByContainerId("reproductor3con1y2").remove();
        removeElementsByClass("videocontainer3con1y2");  
        createrVideoContainer("videocontainer2con1", "reproductor2con1", player2Data);
    };

    //tecla 5 alfanumerica
    if (evento.keyCode == 53 && !OvenPlayer.getPlayerByContainerId("reproductor1con2y3")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer1con2y3", "reproductor1con2y3", player1Data);
        createrVideoContainer("videocontainer3con1y2", "reproductor3con1y2", player3Data);
    };
    //tecla 5 alfanumerica opcion 2
    if (evento.keyCode == 53 && OvenPlayer.getPlayerByContainerId("reproductor1con2y3")) {
        OvenPlayer.getPlayerByContainerId("reproductor2con1").remove();
        removeElementsByClass("videocontainer2con1");  
        createrVideoContainer("videocontainer3con1y2", "reproductor3con1y2", player3Data);
    };

    console.log("Escuchando, la tecla del evento es: " + evento.keyCode);
    console.log("La lista de players en el dom es: " + list);
});









// console.log('hello world son of the');

// let search = document.getElementById('search');

// if (search) {
//     search.addEventListener("keyup", (event) => {
//         let h1Text = document.getElementById("searchText");
//         console.log("esto esta ahora en imput search " + search.value);
//         console.log("esto esta ahora en el h1 " + h1Text.innerText);
//         h1Text.innerText = search.value;
//     });
// } else {
//     console.log("No se encontro el id " + search);
// };

// function enviarPeticionPost() {
//     let data = new FormData();
//     data.append('metodo', 'hello');
//     fetch("backend.php", {
//         method: "post",
//         // headers: {
//         //     'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//         //     'Content-Type': 'multipart/form-data'
//         // },
//         body: data
//     })
//         .then((res) => { return res.text(); })
//         .then((txt) => {
//             document.getElementById('titu').innerHTML = txt;
//             console.log(txt);
//         })
//         .catch((err) => { console.log("Errores en el fetch post " + err); });

//     // (C) PREVENT HTML FORM SUBMIT
//     return false;
// }
