OvenPlayer.debug(false);


/** 
*Definimos sources, para cada reproductor.
*por ahora solo tiene uno, pero cada reproductor
*puede tener mas de un source.
 */
const movil_01 = [
    {
        file: 'ws://192.168.1.51:3333/app/stream1',
        label: 'WebRTC M01',
        type: 'webrtc'
    },
    {
        file: 'http://192.168.1.51/app/stream1/llhls.m3u8',
        label: 'LLHLS M01',
        type: 'hls'
    }
];

const movil_02 = [
    {
        file: 'ws://192.168.1.51:3333/app/stream2',
        label: 'WebRTC M02',
        type: 'webrtc'
    },
    {
        file: 'http://192.168.1.51/app/stream2/llhls.m3u8',
        label: 'LLHLS M02',
        type: 'hls'
    }
];

const movil_03 = [
    {
        file: 'ws://192.168.1.51:3333/app/stream3',
        label: 'WebRTC M03',
        type: 'webrtc'
    },
    {
        file: 'http://192.168.1.51/app/stream3/llhls.m3u8',
        label: 'LLHLS M03',
        type: 'hls'
    }
];

const movil_04 = [
    {
        file: 'ws://192.168.1.51:3333/app/stream4',
        label: 'WebRTC M04',
        type: 'webrtc'
    },
    {
        file: 'http://192.168.1.51/app/stream4/llhls.m3u8',
        label: 'LLHLS M04',
        type: 'hls'
    }
];

const movil_05 = [
    {
        file: 'ws://192.168.1.51:3333/app/stream5',
        label: 'WebRTC M05',
        type: 'webrtc'
    },
    {
        file: 'http://192.168.1.51/app/stream5/llhls.m3u8',
        label: 'LLHLS M05',
        type: 'hls'
    }
];

const movil_06 = [
    {
        file: 'ws://192.168.1.51:3333/app/stream6',
        label: 'WebRTC M06',
        type: 'webrtc'
    },
    {
        file: 'http://192.168.1.51/app/stream6/llhls.m3u8',
        label: 'LLHLS M06',
        type: 'hls'
    }
];


/**
 *Definimos ubicacion de archivo para marca de agua 
 asi como posicion tamanho y transparencia. 
 */
const playerWaterMark = {
    image: './live.jpg',
    position: 'top-left',
    y: '20px',
    x: '20px',
    width: '40px',
    height: '30px',
    opacity: 0.3
};

/**
 * Creamos unos ajustes y parametros que seran comunes 
 * en todos los reproductores
 */
const playerCommonSettings = {
    image: "rw.png",
    autoStart: false,
    mute: true,
    showBigPlayButton: true,
    controls: true,
    expandFullScreenUI: true,
    //waterMark: playerWaterMark
}


//definimos los parametros unicos 
//que tendra cada reproductor
const player1Data = Object.assign({
    title: "Móvil 01",
    sources: movil_01
}, playerCommonSettings);

const player2Data = Object.assign({
    title: "Móvil 02",
    sources: movil_02
}, playerCommonSettings);

const player3Data = Object.assign({
    title: "Móvil 03",
    sources: movil_03
}, playerCommonSettings);

const player4Data = Object.assign({
    title: "Móvil 04",
    sources: movil_04
}, playerCommonSettings);

const player5Data = Object.assign({
    title: "Móvil 05",
    sources: movil_05
}, playerCommonSettings);

const player6Data = Object.assign({
    title: "Móvil 06",
    sources: movil_06
}, playerCommonSettings);


/** Creamos una funcion que recibira un id y un source y con ello creamos un nuevo reproductor.
 @param {String} id - Identificador del Wrapper donde incrustaremos el reproductor.
 @param {Objet} src - Lista de Objetos con la configuracion que tengra el reproductor.
*/
function makePlayer(id, src) {
    const player = OvenPlayer.create(id, src);
    console.log("Se creo el reproductor en elemento con id " + id);
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
    makePlayer(nombreReproductor, fuenteReproductor);
}




function removeAllVideoContainers() {
    //por alguna extrana razon hay que llamar dos veces 
    //al metodo para eliminar todos los elementos del arreglo.
    removeAllPlayers();
    removeAllPlayers();
    removeElementsByClass("videocontainer1");
    removeElementsByClass("videocontainer2");
    removeElementsByClass("videocontainer3");

    removeElementsByClass("videocontainer1con2y3");
    removeElementsByClass("videocontainer2con1");
    removeElementsByClass("videocontainer3con1y2");

    removeElementsByClass("videocontainer2con3");
}



/** 
 * Creamos una funcion que recibe un className y lo eliminara del Dom
 * @param {String} className -  Nombre de la clase a eliminar
*/
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

/**
 * Creamos una funcion que remueve todos los objetos de tipo
 * Ovenplayer de la lista del DOM.
 */
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
        removeAllVideoContainers();

    };

    //tecla 1 alfanumerica
    if (evento.keyCode == 49 && !OvenPlayer.getPlayerByContainerId("reproductor1")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer1", "reproductor1", player1Data);
    };
    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor1")) {
        let pr1 = OvenPlayer.getPlayerByContainerId("reproductor1");
        pr1.toggleFullScreen();
    };





    //tecla 2 alfanumerica
    if (evento.keyCode == 50 && !OvenPlayer.getPlayerByContainerId("reproductor2")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer2", "reproductor2", player2Data);
    };

    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor2")) {
        let pr2 = OvenPlayer.getPlayerByContainerId("reproductor2");
        pr2.toggleFullScreen();
    };





    //tecla 3 alfanumerica
    if (evento.keyCode == 51 && !OvenPlayer.getPlayerByContainerId("reproductor3")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer3", "reproductor3", player3Data);
    };

    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor3")) {
        let pr3 = OvenPlayer.getPlayerByContainerId("reproductor3");
        pr3.toggleFullScreen();
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
    //tecla 5 alfanumerica opcion 3
    if (evento.keyCode == 53 && OvenPlayer.getPlayerByContainerId("reproductor2con3")) {
        OvenPlayer.getPlayerByContainerId("reproductor2con3").remove();
        removeElementsByClass("videocontainer2con3");
        createrVideoContainer("videocontainer3con1y2", "reproductor3con1y2", player3Data);
    };






    //tecla 6 alfanumerica
    if (evento.keyCode == 54 && !OvenPlayer.getPlayerByContainerId("reproductor2con3")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer2con3", "reproductor2con3", player2Data);
        createrVideoContainer("videocontainer3con1y2", "reproductor3con1y2", player3Data);
    };

    //tecla  alfanumerica opcion 2
    if (evento.keyCode == 54 && OvenPlayer.getPlayerByContainerId("reproductor2con1")) {
        OvenPlayer.getPlayerByContainerId("reproductor2con1").remove();
        removeElementsByClass("videocontainer2con2");
        createrVideoContainer("videocontainer3con1y2", "reproductor3con1y2", player3Data);
    };

    //tecla  alfanumerica opcion 3
    if (evento.keyCode == 54 && OvenPlayer.getPlayerByContainerId("reproductor1con2y3")) {
        OvenPlayer.getPlayerByContainerId("reproductor1con").remove();
        removeElementsByClass("videocontainer2con2");
        createrVideoContainer("videocontainer3con1y2", "reproductor3con1y2", player3Data);
    };








    console.log("Escuchando, la tecla del evento es: " + evento.keyCode);
    console.log("La lista de players en el dom es: " + list);

    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        console.log("Elemento en la lista N: " + index + " ", element);

    }
});
