OvenPlayer.debug(false);
let listabg = cargarVideoBackgroundPHP();

// Objeto para guardar las posiciones y tamaños personalizados de cada contenedor
let layoutSettings = {};





/**
 * Metodo que manejará la lectura y de creacion de playlist 
 * de videos que esten almacenados en la carpeta videobg.
 * Una vez listo la lista, reproducirá el primer video; muteado y loopeado.
 * Con la tecla 'N' se reproducira el siguiente video en la lista, llegado al 
 * ultimo elemento se regresa al principio de la lista.
 */

function cargarVideoBackground() {
    const dir = "/videobg";
    const fileExtension = ".mp4";
    let actualbg = 0;
    let fileList = [];
    $.ajax({
        //Devolvera todos los elementos de la carpeta, si es que esta navegable.
        url: dir,
        success: function (data) {
            // Filtramos los anchor's con contenido y extencion. iteramos 
            // para borrar la direccion del host y el http
            $(data).find("a:contains(" + fileExtension + ")").each(function () {
                let filename = this.href.replace(window.location.host, "").replace("http:///", "");
                fileList.push(filename);
            });
            console.log(`Se han encontrado los siguientes backgrounds: ${fileList}`)
            $(".videobg").attr({
                "src": fileList[actualbg],
                "poster": "./rw.png",
                "autoplay": "autoplay",
                "muted": "muted",
                "loop": "loop"
            });
            $(document).keydown(function (event) {
                if (event.which == 78) {
                    actualbg++
                    if (actualbg == fileList.length) {
                        actualbg = 0;
                    }
                    $(".videobg").attr({
                        "src": fileList[actualbg],
                        "poster": "./rw.png",
                        "autoplay": "autoplay",
                        "muted": "muted",
                        "loop": "loop"
                    });
                }

            });
        }
    });
}




function cargarVideoBackgroundPHP() {
    const dir = "getbackground.php";
    const fileExtension = ".mp4";
    let actualbg = 0;
    let fileList = [];
    $.ajax({
        //Devolvera todos los elementos de la carpeta, si es que esta navegable.
        url: dir,
        success: function (data) {
            data.split(",").forEach(element => {
                if (element) {
                    fileList.push(element);
                }
            });

            console.log(`Se han encontrado los siguientes backgrounds: ${fileList}`)
            $(".videobg").attr({
                "src": fileList[actualbg],
                "poster": "./rw.png",
                "autoplay": "autoplay",
                "muted": "muted",
                "loop": "loop"
            });
            $(document).keydown(function (event) {
                if (event.which == 78) {
                    actualbg++
                    if (actualbg == fileList.length) {
                        actualbg = 0;
                    }
                    $(".videobg").attr({
                        "src": fileList[actualbg],
                        "poster": "./rw.png",
                        "autoplay": "autoplay",
                        "muted": "muted",
                        "loop": "loop"
                    });
                }

            });
        }
    });
}














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
    autoFallback: false,
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

// --- SISTEMA DE 30 LAYOUTS DE TV (ESTRICTO 16:9) ---
let currentLayoutIndex = -1;
const ar = 16 / 9;

const tvLayouts = [
    // --- SOLO (3) ---
    { name: "CH1 FULL", cams: [{ id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }] },
    { name: "CH2 FULL", cams: [{ id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }] },
    { name: "CH3 FULL", cams: [{ id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }] },

    // --- SPLITS 1-2 (4) ---
    {
        name: "SPLIT 1-2 V", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 270, l: 0, w: 960, h: 540 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 270, l: 960, w: 960, h: 540 } }
        ]
    },
    {
        name: "SPLIT 1-2 H", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 480, w: 960, h: 540 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 540, l: 480, w: 960, h: 540 } }
        ]
    },
    {
        name: "PiP 1-2 BR", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 750, l: 1380, w: 500, h: 281 } }
        ]
    },
    {
        name: "PiP 2-1 BR", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 750, l: 1380, w: 500, h: 281 } }
        ]
    },

    // --- SPLITS 1-3 (4) ---
    {
        name: "SPLIT 1-3 V", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 270, l: 0, w: 960, h: 540 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 270, l: 960, w: 960, h: 540 } }
        ]
    },
    {
        name: "SPLIT 1-3 H", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 480, w: 960, h: 540 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 540, l: 480, w: 960, h: 540 } }
        ]
    },
    {
        name: "PiP 1-3 BL", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 750, l: 40, w: 500, h: 281 } }
        ]
    },
    {
        name: "PiP 3-1 BL", cams: [
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 750, l: 40, w: 500, h: 281 } }
        ]
    },

    // --- SPLITS 2-3 (4) ---
    {
        name: "SPLIT 2-3 V", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 270, l: 0, w: 960, h: 540 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 270, l: 960, w: 960, h: 540 } }
        ]
    },
    {
        name: "SPLIT 2-3 H", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 0, l: 480, w: 960, h: 540 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 540, l: 480, w: 960, h: 540 } }
        ]
    },
    {
        name: "SBS FOCUS 2", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 100, l: 100, w: 800, h: 450 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 500, l: 1000, w: 800, h: 450 } }
        ]
    },
    {
        name: "OVER-UNDER 3-2", cams: [
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 50, l: 500, w: 700, h: 394 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 550, l: 700, w: 700, h: 394 } }
        ]
    },

    // --- TRIPLE COMBOS (15) ---
    {
        name: "TRI-MOSAIC 1", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 100, l: 50, w: 800, h: 450 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 100, l: 1050, w: 800, h: 450 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 600, l: 560, w: 800, h: 450 } }
        ]
    },
    {
        name: "NEWS FOCUS 1", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 40, l: 100, w: 1200, h: 675 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 40, l: 1350, w: 500, h: 281 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 360, l: 1350, w: 500, h: 281 } }
        ]
    },
    {
        name: "NEWS FOCUS 2", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 40, l: 620, w: 1200, h: 675 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 40, l: 70, w: 500, h: 281 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 360, l: 70, w: 500, h: 281 } }
        ]
    },
    {
        name: "TRIPLE STACK L", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 50, w: 500, h: 281 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 380, l: 50, w: 500, h: 281 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 710, l: 50, w: 500, h: 281 } }
        ]
    },
    {
        name: "TRIPLE STACK R", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 1370, w: 500, h: 281 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 380, l: 1370, w: 500, h: 281 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 710, l: 1370, w: 500, h: 281 } }
        ]
    },
    {
        name: "BIG CENTER PiP", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 150, l: 360, w: 1200, h: 675 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 150, l: 40, w: 300, h: 169 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 150, l: 1580, w: 300, h: 169 } }
        ]
    },
    {
        name: "THE WALL", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 200, l: 50, w: 580, h: 326 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 200, l: 670, w: 580, h: 326 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 200, l: 1290, w: 580, h: 326 } }
        ]
    },
    {
        name: "SYMMETRIC A", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 50, w: 900, h: 506 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 50, l: 970, w: 900, h: 506 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 600, l: 510, w: 900, h: 506 } }
        ]
    },
    {
        name: "SYMMETRIC B", cams: [
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 50, l: 510, w: 900, h: 506 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 600, l: 50, w: 900, h: 506 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 600, l: 970, w: 900, h: 506 } }
        ]
    },
    {
        name: "CCTV GRID", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 0, w: 960, h: 540 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 0, l: 960, w: 960, h: 540 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 540, l: 0, w: 960, h: 540 } }
        ]
    },
    {
        name: "ACTION VIEW", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 30, l: 30, w: 1300, h: 731 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 400, l: 1360, w: 530, h: 298 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 710, l: 1360, w: 530, h: 298 } }
        ]
    },
    {
        name: "TOWER 1", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 50, w: 1000, h: 563 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 50, l: 1100, w: 770, h: 433 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 550, l: 1100, w: 770, h: 433 } }
        ]
    },
    {
        name: "TOWER 2", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 50, l: 870, w: 1000, h: 563 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 50, w: 770, h: 433 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 550, l: 50, w: 770, h: 433 } }
        ]
    },
    {
        name: "PANORAMA", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 300, l: 20, w: 600, h: 337 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 300, l: 660, w: 600, h: 337 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 300, l: 1300, w: 600, h: 337 } }
        ]
    },
    {
        name: "OVERLAY EXTREME", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 50, l: 50, w: 400, h: 225 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 50, l: 1470, w: 400, h: 225 } }
        ]
    },
    // Nuevos para llegar a 30
    {
        name: "CH1 FOCUS L", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 100, l: 50, w: 1400, h: 788 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 100, l: 1500, w: 380, h: 214 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 350, l: 1500, w: 380, h: 214 } }
        ]
    },
    {
        name: "CH2 FOCUS C", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 50, l: 260, w: 1400, h: 788 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 860, l: 260, w: 680, h: 383 } }, // Nota: h corregido abajo
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 860, l: 980, w: 680, h: 383 } }
        ]
    },
    // Re-chequeo de h para 16:9 estricto en todos
    {
        name: "COMBO 28", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 50, w: 600, h: 337 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 50, l: 700, w: 1100, h: 618 } }
        ]
    },
    {
        name: "COMBO 29", cams: [
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 400, l: 50, w: 1100, h: 618 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 50, l: 1200, w: 600, h: 337 } }
        ]
    },
    {
        name: "COMBO 30", cams: [
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 50, l: 50, w: 400, h: 225 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 300, l: 50, w: 400, h: 225 } },
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 550, l: 50, w: 400, h: 225 } }
        ]
    }
];

// Corregir h en el layout index 26 que calculé mal a mano
tvLayouts[26].cams[1].pos.h = Math.round(tvLayouts[26].cams[1].pos.w / ar);
tvLayouts[26].cams[2].pos.h = Math.round(tvLayouts[26].cams[2].pos.w / ar);

function applyTVLayout(index) {
    removeAllPlayers();
    removeAllColorsContainers();
    removeAllVideoContainers();

    const layout = tvLayouts[index];
    showLayoutNotification(layout.name + " (" + (index + 1) + "/30)");

    layout.cams.forEach(cam => {
        // Establecer ajustes de persistencia ANTES de crear
        layoutSettings[cam.id] = {
            top: cam.pos.t + "px",
            left: cam.pos.l + "px",
            width: cam.pos.w + "px",
            height: cam.pos.h + "px"
        };
        createrVideoContainer(cam.id, cam.rid, cam.data);
    });
}

function showLayoutNotification(text) {
    let indicator = document.getElementById("layoutIndicator");
    if (!indicator) {
        indicator = document.createElement("div");
        indicator.id = "layoutIndicator";
        document.body.appendChild(indicator);
    }
    indicator.style.display = "block";
    indicator.innerText = text;
    setTimeout(() => {
        indicator.style.display = "none";
    }, 1500);
}

function removeAllColorsContainers() {
    // Función auxiliar opcional si hubiera otros contenedores
}
// ---------------------------------


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

    // Aplicar ajustes guardados si existen
    if (layoutSettings[nombreContainer]) {
        const s = layoutSettings[nombreContainer];
        vc1.style.top = s.top;
        vc1.style.left = s.left;
        vc1.style.width = s.width;
        vc1.style.height = s.height;
    }

    //creamos la instancia del reproductor en el wrapper
    makePlayer(nombreReproductor, fuenteReproductor);

    // Añadir el handle de redimensionado
    const handle = document.createElement('div');
    handle.className = 'videocontainer-handle';
    vc1.appendChild(handle);

    // Inicializar interactividad (mover y redimensionar)
    console.log("Inicializando interactividad para: " + nombreContainer);
    initInteractable(vc1);
}

function initInteractable(el) {
    let isDragging = false;
    let isResizing = false;
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    const aspectRatio = 16 / 9;

    el.addEventListener('mousedown', function (e) {
        if (el.classList.contains('locked')) return;

        if (e.target.classList.contains('videocontainer-handle')) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(el).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(el).height, 10);
            e.preventDefault();
        } else {
            // Dragging only if clicking the border/background, not the player itself if possible
            // But OvenPlayer might swallow clicks. Let's assume clicking the container works.
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = el.offsetLeft;
            startTop = el.offsetTop;
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            el.style.left = (startLeft + dx) + 'px';
            el.style.top = (startTop + dy) + 'px';
        } else if (isResizing) {
            const dx = e.clientX - startX;
            // Resizing symmetrically (maintaining aspect ratio)
            let newWidth = startWidth + dx;

            // Establecer un ancho mínimo para no deformar el aspect ratio
            if (newWidth < 200) newWidth = 200;

            const newHeight = newWidth / aspectRatio;

            el.style.width = newWidth + 'px';
            el.style.height = newHeight + 'px';
        }
    });

    document.addEventListener('mouseup', function () {
        if (isDragging || isResizing) {
            // Guardar los ajustes actuales para la persistencia
            layoutSettings[el.className.split(' ')[0]] = {
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height
            };
        }
        isDragging = false;
        isResizing = false;
    });
}




function removeAllVideoContainers() {
    //por alguna extrana razon hay que llamar dos veces 
    //al metodo para eliminar todos los elementos del arreglo.
    removeAllPlayers();
    removeAllPlayers();

    removeElementsByClass("videocontainer1");
    removeElementsByClass("videocontainer2");
    removeElementsByClass("videocontainer3");
    removeElementsByClass("videocontainer4");
    removeElementsByClass("videocontainer5");
    removeElementsByClass("videocontainer6");

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


    //tecla h
    if (evento.keyCode == 72) {
        let element = document.getElementById("dummy");
        let hidden = element.getAttribute("hidden");

        if (hidden) {
            element.removeAttribute("hidden");

        } else {
            element.setAttribute("hidden", "hidden");
        }

    };





    //tecla 0 alfanumerica 
    if (evento.keyCode == 48) {
        removeAllPlayers();
        removeAllVideoContainers();
        document.getElementById("dummy").setAttribute("hidden", "hidden");

    };





    //tecla 1 alfanumerica
    if (evento.keyCode == 49 && !OvenPlayer.getPlayerByContainerId("reproductor1")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer1", "reproductor1", player1Data);
    };
    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor1")) {
        OvenPlayer.getPlayerByContainerId("reproductor1").toggleFullScreen();
        OvenPlayer.getPlayerByContainerId("reproductor1");
    };





    //tecla 2 alfanumerica
    if (evento.keyCode == 50 && !OvenPlayer.getPlayerByContainerId("reproductor2")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer2", "reproductor2", player2Data);
    };

    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor2")) {
        OvenPlayer.getPlayerByContainerId("reproductor2").toggleFullScreen();
    };





    //tecla 3 alfanumerica
    if (evento.keyCode == 51 && !OvenPlayer.getPlayerByContainerId("reproductor3")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer3", "reproductor3", player3Data);
    };

    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor3")) {
        OvenPlayer.getPlayerByContainerId("reproductor3").toggleFullScreen();
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




    //tecla 7 alfanumerica
    if (evento.keyCode == 55 && !OvenPlayer.getPlayerByContainerId("reproductor4")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer4", "reproductor4", player4Data);
    };
    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor4")) {
        OvenPlayer.getPlayerByContainerId("reproductor4").toggleFullScreen();
    };





    //tecla 8 alfanumerica
    if (evento.keyCode == 56 && !OvenPlayer.getPlayerByContainerId("reproductor5")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer5", "reproductor5", player5Data);
    };

    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor5")) {
        OvenPlayer.getPlayerByContainerId("reproductor5").toggleFullScreen();
    };





    //tecla 9 alfanumerica
    if (evento.keyCode == 57 && !OvenPlayer.getPlayerByContainerId("reproductor6")) {
        removeAllVideoContainers();
        createrVideoContainer("videocontainer6", "reproductor6", player6Data);
    };

    //tecla f alfanumerica
    if (evento.keyCode == 70 && OvenPlayer.getPlayerByContainerId("reproductor6")) {
        OvenPlayer.getPlayerByContainerId("reproductor6").toggleFullScreen();
    };




    console.log("Escuchando, la tecla del evento es: " + evento.keyCode);
    console.log("La lista de players en el dom es: " + list);

    for (let index = 0; index < list.length; index++) {
        const element = list[index];
        console.log("Elemento en la lista N: " + index + " ", element);

    }

    // Tecla L para bloquear/desbloquear movimiento
    if (evento.keyCode == 76) {
        const containers = document.querySelectorAll('[class^="videocontainer"]');
        containers.forEach(c => {
            c.classList.toggle('locked');
        });
        console.log("Movimiento bloqueado/desbloqueado");
    }

    // Tecla R para resetear posición y tamaño original (SOLO de los canales visibles)
    if (evento.keyCode == 82) {
        const containers = document.querySelectorAll('[class^="videocontainer"]');
        containers.forEach(c => {
            // Obtener el nombre de la clase principal (ej: videocontainer1)
            const className = c.className.split(' ')[0];
            // Eliminar solo la configuración de este canal guardado
            delete layoutSettings[className];

            // Limpiar estilos visuales
            c.style.top = '';
            c.style.left = '';
            c.style.width = '';
            c.style.height = '';
        });
        console.log("Canales visibles reseteados");
    }

    // Tecla M para navegar entre los 20 Layouts de TV
    if (evento.keyCode == 77) {
        currentLayoutIndex = (currentLayoutIndex + 1) % tvLayouts.length;
        applyTVLayout(currentLayoutIndex);
    }
});



