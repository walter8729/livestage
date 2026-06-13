// Configuración Global
//const STREAM_SERVER_IP = 'tu.servidor.streaming';
const STREAM_SERVER_IP = '192.168.1.51';

OvenPlayer.debug(false);
let listabg = cargarVideoBackgroundPHP();

// Objeto para guardar las posiciones y tamaños personalizados de cada contenedor
let layoutSettings = {};









let backgroundFileList = [];
let actualBgIndex = 0;

function actualizarBackground() {
    if (backgroundFileList.length === 0) return;

    const currentBg = backgroundFileList[actualBgIndex];

    if (currentBg === "transparent") {
        $(".videobg").hide();
        console.log("Fondo transparente activado (Modo Overlay)");
    } else {
        $(".videobg").show();
        $(".videobg").attr({
            "src": currentBg,
            "poster": "./rw.png",
            "autoplay": "autoplay",
            "muted": "muted",
            "loop": "loop"
        });
    }
}

function cargarVideoBackgroundPHP() {
    const dir = "getbackground.php";
    $.ajax({
        url: dir,
        success: function (data) {
            // Obtenemos los videos y añadimos "transparent" al principio de la lista
            backgroundFileList = data.split(",").filter(Boolean);
            backgroundFileList.unshift("transparent");

            console.log(`Se han encontrado los siguientes backgrounds: ${backgroundFileList}`);
            actualizarBackground();
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
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream1`,
        label: 'WebRTC M01',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream1/llhls.m3u8`,
        label: 'LLHLS M01',
        type: 'hls'
    }
];

const movil_02 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream2`,
        label: 'WebRTC M02',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream2/llhls.m3u8`,
        label: 'LLHLS M02',
        type: 'hls'
    }
];

const movil_03 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream3`,
        label: 'WebRTC M03',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream3/llhls.m3u8`,
        label: 'LLHLS M03',
        type: 'hls'
    }
];

const movil_04 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream4`,
        label: 'WebRTC M04',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream4/llhls.m3u8`,
        label: 'LLHLS M04',
        type: 'hls'
    }
];

const movil_05 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream5`,
        label: 'WebRTC M05',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream5/llhls.m3u8`,
        label: 'LLHLS M05',
        type: 'hls'
    }
];

const movil_06 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream6`,
        label: 'WebRTC M06',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream6/llhls.m3u8`,
        label: 'LLHLS M06',
        type: 'hls'
    }
];

const movil_07 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream7`,
        label: 'WebRTC M07',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream7/llhls.m3u8`,
        label: 'LLHLS M07',
        type: 'hls'
    }
];

const movil_08 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream8`,
        label: 'WebRTC M08',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream8/llhls.m3u8`,
        label: 'LLHLS M08',
        type: 'hls'
    }
];

const movil_09 = [
    {
        file: `ws://${STREAM_SERVER_IP}:3333/app/stream9`,
        label: 'WebRTC M09',
        type: 'webrtc'
    },
    {
        file: `http://${STREAM_SERVER_IP}/app/stream9/llhls.m3u8`,
        label: 'LLHLS M09',
        type: 'hls'
    }
];



/**
 * Creamos unos ajustes y parametros que seran comunes 
 * en todos los reproductores
 */
const playerCommonSettings = {
    image: "rw.png",
    autoStart: true,
    mute: true,
    showBigPlayButton: true,
    controls: true,
    expandFullScreenUI: true,
    autoFallback: false
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


const player7Data = Object.assign({
    title: "Móvil 07",
    sources: movil_07
}, playerCommonSettings);

const player8Data = Object.assign({
    title: "Móvil 08",
    sources: movil_08
}, playerCommonSettings);

const player9Data = Object.assign({
    title: "Móvil 09",
    sources: movil_09
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
    },
    // --- LAYOUTS 36-70 (CH 4-5-6) ---
    { name: "CH4 FULL", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }] },
    { name: "CH5 FULL", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }] },
    { name: "CH6 FULL", cams: [{ id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }] },
    { name: "SPLIT 4-5 V", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 270, l: 0, w: 960, h: 540 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 270, l: 960, w: 960, h: 540 } }] },
    { name: "SPLIT 4-5 H", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 480, w: 960, h: 540 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 540, l: 480, w: 960, h: 540 } }] },
    { name: "PiP 4-5 BR", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 750, l: 1380, w: 500, h: 281 } }] },
    { name: "PiP 5-4 BR", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 750, l: 1380, w: 500, h: 281 } }] },
    { name: "SPLIT 4-6 V", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 270, l: 0, w: 960, h: 540 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 270, l: 960, w: 960, h: 540 } }] },
    { name: "SPLIT 4-6 H", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 480, w: 960, h: 540 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 540, l: 480, w: 960, h: 540 } }] },
    { name: "PiP 4-6 BL", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 750, l: 40, w: 500, h: 281 } }] },
    { name: "PiP 6-4 BL", cams: [{ id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 750, l: 40, w: 500, h: 281 } }] },
    { name: "SPLIT 5-6 V", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 270, l: 0, w: 960, h: 540 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 270, l: 960, w: 960, h: 540 } }] },
    { name: "SPLIT 5-6 H", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 0, l: 480, w: 960, h: 540 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 540, l: 480, w: 960, h: 540 } }] },
    { name: "SBS FOCUS 5", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 100, l: 100, w: 800, h: 450 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 500, l: 1000, w: 800, h: 450 } }] },
    { name: "OVER-UNDER 6-5", cams: [{ id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 50, l: 500, w: 700, h: 394 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 550, l: 700, w: 700, h: 394 } }] },
    { name: "TRI-MOSAIC 2", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 100, l: 50, w: 800, h: 450 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 100, l: 1050, w: 800, h: 450 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 600, l: 560, w: 800, h: 450 } }] },
    { name: "NEWS FOCUS 4", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 40, l: 100, w: 1200, h: 675 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 40, l: 1350, w: 500, h: 281 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 360, l: 1350, w: 500, h: 281 } }] },
    { name: "NEWS FOCUS 5", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 40, l: 620, w: 1200, h: 675 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 40, l: 70, w: 500, h: 281 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 360, l: 70, w: 500, h: 281 } }] },
    { name: "TRIPLE STACK 4L", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 50, w: 500, h: 281 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 380, l: 50, w: 500, h: 281 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 710, l: 50, w: 500, h: 281 } }] },
    { name: "TRIPLE STACK 4R", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 1370, w: 500, h: 281 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 380, l: 1370, w: 500, h: 281 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 710, l: 1370, w: 500, h: 281 } }] },
    { name: "BIG CENTER PiP (4)", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 150, l: 360, w: 1200, h: 675 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 150, l: 40, w: 300, h: 169 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 150, l: 1580, w: 300, h: 169 } }] },
    { name: "THE WALL 2", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 200, l: 50, w: 580, h: 326 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 200, l: 670, w: 580, h: 326 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 200, l: 1290, w: 580, h: 326 } }] },
    { name: "SYMMETRIC 4A", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 50, w: 900, h: 506 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 50, l: 970, w: 900, h: 506 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 600, l: 510, w: 900, h: 506 } }] },
    { name: "SYMMETRIC 4B", cams: [{ id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 50, l: 510, w: 900, h: 506 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 600, l: 50, w: 900, h: 506 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 600, l: 970, w: 900, h: 506 } }] },
    { name: "CCTV GRID 4", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 0, w: 960, h: 540 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 0, l: 960, w: 960, h: 540 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 540, l: 0, w: 960, h: 540 } }] },
    { name: "ACTION VIEW 4", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 30, l: 30, w: 1300, h: 731 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 400, l: 1360, w: 530, h: 298 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 710, l: 1360, w: 530, h: 298 } }] },
    { name: "TOWER 4", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 50, w: 1000, h: 563 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 50, l: 1100, w: 770, h: 433 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 550, l: 1100, w: 770, h: 433 } }] },
    { name: "TOWER 5", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 50, l: 870, w: 1000, h: 563 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 50, w: 770, h: 433 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 550, l: 50, w: 770, h: 433 } }] },
    { name: "PANORAMA 4", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 300, l: 20, w: 600, h: 337 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 300, l: 660, w: 600, h: 337 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 300, l: 1300, w: 600, h: 337 } }] },
    { name: "OVERLAY EXTREME 4", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 0, l: 0, w: 1920, h: 1080 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 50, l: 50, w: 400, h: 225 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 50, l: 1470, w: 400, h: 225 } }] },
    { name: "CH4 FOCUS L", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 100, l: 50, w: 1400, h: 788 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 100, l: 1500, w: 380, h: 214 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 350, l: 1500, w: 380, h: 214 } }] },
    { name: "CH5 FOCUS C", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 50, l: 260, w: 1400, h: 788 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 860, l: 260, w: 680, h: 383 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 860, l: 980, w: 680, h: 383 } }] },
    { name: "COMBO 4-6 A", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 50, w: 600, h: 337 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 50, l: 700, w: 1100, h: 618 } }] },
    { name: "COMBO 4-6 B", cams: [{ id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 400, l: 50, w: 1100, h: 618 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 50, l: 1200, w: 600, h: 337 } }] },
    { name: "COMBO 4-6 C", cams: [{ id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 550, l: 50, w: 400, h: 225 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 300, l: 50, w: 400, h: 225 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 550, l: 50, w: 400, h: 225 } }] },
    // --- MIXED LAYOUTS (CH 1-6) ---
    { name: "MIX 1-2-4", cams: [{ id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 100, l: 50, w: 800, h: 450 } }, { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 100, l: 1050, w: 800, h: 450 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 600, l: 560, w: 800, h: 450 } }] },
    { name: "MIX 3-5-6", cams: [{ id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 100, l: 50, w: 800, h: 450 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 100, l: 1050, w: 800, h: 450 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 600, l: 560, w: 800, h: 450 } }] },
    { name: "MIX 1-3-5", cams: [{ id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 100, l: 50, w: 800, h: 450 } }, { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 100, l: 1050, w: 800, h: 450 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 600, l: 560, w: 800, h: 450 } }] },
    { name: "MIX 2-4-6", cams: [{ id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 100, l: 50, w: 800, h: 450 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 100, l: 1050, w: 800, h: 450 } }, { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 600, l: 560, w: 800, h: 450 } }] },
    { name: "NEWS 1-4-5", cams: [{ id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 40, l: 100, w: 1200, h: 675 } }, { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 40, l: 1350, w: 500, h: 281 } }, { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 360, l: 1350, w: 500, h: 281 } }] },
    { name: "NEWS 4-2-3", cams: [{ id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 40, l: 100, w: 1200, h: 675 } }, { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 40, l: 1350, w: 500, h: 281 } }, { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 360, l: 1350, w: 500, h: 281 } }] },
    {
        name: "CCTV 6 CHANNELS", cams: [
            { id: "videocontainer1", rid: "reproductor1", data: player1Data, pos: { t: 180, l: 0, w: 640, h: 360 } },
            { id: "videocontainer2", rid: "reproductor2", data: player2Data, pos: { t: 180, l: 640, w: 640, h: 360 } },
            { id: "videocontainer3", rid: "reproductor3", data: player3Data, pos: { t: 180, l: 1280, w: 640, h: 360 } },
            { id: "videocontainer4", rid: "reproductor4", data: player4Data, pos: { t: 540, l: 0, w: 640, h: 360 } },
            { id: "videocontainer5", rid: "reproductor5", data: player5Data, pos: { t: 540, l: 640, w: 640, h: 360 } },
            { id: "videocontainer6", rid: "reproductor6", data: player6Data, pos: { t: 540, l: 1280, w: 640, h: 360 } }
        ]
    }
];

// Normalizar todos los layouts para asegurar 16:9 estricto basado en el ancho (w)
for (const layout of tvLayouts) {
    for (const cam of layout.cams) {
        // Calcula la altura (h) basándose en el ancho (w) para asegurar la relación de aspecto 16:9 (ar)
        cam.pos.h = Math.round(cam.pos.w / ar);
    }
}


function applyTVLayout(index) {
    const layout = tvLayouts[index];
    const ctnr = document.getElementById("contenedorPrincipal");
    const newCamRids = layout.cams.map(c => c.rid);

    // 1. Eliminar reproductores que NO están en el nuevo layout
    const currentPlayers = OvenPlayer.getPlayerList();
    for (let i = currentPlayers.length - 1; i >= 0; i--) {
        const p = currentPlayers[i];
        const rid = p.getContainerId();
        if (!newCamRids.includes(rid)) {
            const container = document.getElementById(rid).parentElement;
            p.remove();
            if (container) container.remove();
        }
    }

    showLayoutNotification(layout.name + " (" + (index + 1) + "/" + tvLayouts.length + ")");

    // 2. Procesar canales del nuevo layout (Actualizar o Crear)
    layout.cams.forEach(cam => {
        // Guardar ajustes de posición para este layout
        layoutSettings[cam.id] = {
            top: cam.pos.t + "px",
            left: cam.pos.l + "px",
            width: cam.pos.w + "px",
            height: cam.pos.h + "px"
        };

        const existingPlayer = OvenPlayer.getPlayerByContainerId(cam.rid);

        if (existingPlayer) {
            // REUTILIZAR: Solo mover y redimensionar el contenedor existente
            const vc = document.getElementById(cam.rid).parentElement;
            const s = layoutSettings[cam.id];
            vc.style.top = s.top;
            vc.style.left = s.left;
            vc.style.width = s.width;
            vc.style.height = s.height;
            vc.className = cam.id + ' videocontainer';
        } else {
            // CREAR: Si no existe, lo instanciamos
            createrVideoContainer(cam.id, cam.rid, cam.data);
        }
    });

    // Reordenar DOM para que coincida con el orden del layout (último = arriba)
    layout.cams.forEach(cam => {
        const vc = document.getElementById(cam.rid).parentElement;
        if (vc) ctnr.appendChild(vc);
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
    vc1.className = nombreContainer + ' videocontainer';
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

    // Añadir los 4 handles de redimensionado
    const corners = ['br', 'bl', 'tr', 'tl'];
    corners.forEach(corner => {
        const handle = document.createElement('div');
        handle.className = `videocontainer-handle ${corner}`;
        vc1.appendChild(handle);
    });

    // Inicializar interactividad (mover y redimensionar)
    console.log("Inicializando interactividad para: " + nombreContainer);
    initInteractable(vc1);

    return vc1;
}

/**
 * Inicializa la interactividad (arrastre y redimensionado) para un elemento,
 * manteniendo una relación de aspecto de 16:9.
 * 
 * @param {HTMLElement} el - El elemento que se hará interactivo.
 */
function initInteractable(el) {
    let isDragging = false;
    let isResizing = false;
    let currentHandle = null;
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    const aspectRatio = 16 / 9;

    el.addEventListener('mousedown', function (e) {
        if (el.classList.contains('locked')) return;

        // Quitar foco de otros y poner en este
        document.querySelectorAll('.videocontainer.focused').forEach(f => f.classList.remove('focused'));
        el.classList.add('focused');

        if (e.target.classList.contains('videocontainer-handle')) {
            isResizing = true;
            el.classList.add('resizing');
            currentHandle = e.target;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = el.offsetWidth;
            startHeight = el.offsetHeight;
            startLeft = el.offsetLeft;
            startTop = el.offsetTop;
            e.preventDefault();
            e.stopPropagation();
        } else {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = el.offsetLeft;
            startTop = el.offsetTop;
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (isDragging) {
            let newLeft = startLeft + (e.clientX - startX);
            let newTop = startTop + (e.clientY - startY);
            const width = el.offsetWidth;
            const height = el.offsetHeight;

            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft + width > 1920) newLeft = 1920 - width;
            if (newTop + height > 1080) newTop = 1080 - height;

            el.style.left = newLeft + 'px';
            el.style.top = newTop + 'px';
        } else if (isResizing) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            let newWidth, newHeight, newLeft, newTop;

            if (currentHandle.classList.contains('br')) {
                newWidth = startWidth + dx;
                if (newWidth < 200) newWidth = 200;
                newHeight = Math.round(newWidth / aspectRatio);

                if (startLeft + newWidth > 1920) {
                    newWidth = 1920 - startLeft;
                    newHeight = Math.round(newWidth / aspectRatio);
                }
                if (startTop + newHeight > 1080) {
                    newHeight = 1080 - startTop;
                    newWidth = Math.round(newHeight * aspectRatio);
                }
                el.style.width = newWidth + 'px';
                el.style.height = newHeight + 'px';
            } else if (currentHandle.classList.contains('bl')) {
                newWidth = startWidth - dx;
                if (newWidth < 200) newWidth = 200;
                newHeight = Math.round(newWidth / aspectRatio);
                newLeft = startLeft + (startWidth - newWidth);

                if (newLeft < 0) {
                    newLeft = 0;
                    newWidth = startLeft + startWidth;
                    newHeight = Math.round(newWidth / aspectRatio);
                }
                if (startTop + newHeight > 1080) {
                    newHeight = 1080 - startTop;
                    newWidth = Math.round(newHeight * aspectRatio);
                    newLeft = startLeft + (startWidth - newWidth);
                }
                el.style.left = newLeft + 'px';
                el.style.width = newWidth + 'px';
                el.style.height = newHeight + 'px';
            } else if (currentHandle.classList.contains('tr')) {
                newWidth = startWidth + dx;
                if (newWidth < 200) newWidth = 200;
                newHeight = Math.round(newWidth / aspectRatio);
                newTop = startTop + (startHeight - newHeight);

                if (newTop < 0) {
                    newTop = 0;
                    newHeight = startTop + startHeight;
                    newWidth = Math.round(newHeight * aspectRatio);
                }
                if (startLeft + newWidth > 1920) {
                    newWidth = 1920 - startLeft;
                    newHeight = Math.round(newWidth / aspectRatio);
                    newTop = startTop + (startHeight - newHeight);
                }
                el.style.top = newTop + 'px';
                el.style.width = newWidth + 'px';
                el.style.height = newHeight + 'px';
            } else if (currentHandle.classList.contains('tl')) {
                newWidth = startWidth - dx;
                if (newWidth < 200) newWidth = 200;
                newHeight = Math.round(newWidth / aspectRatio);
                newLeft = startLeft + (startWidth - newWidth);
                newTop = startTop + (startHeight - newHeight);

                if (newLeft < 0) {
                    newLeft = 0;
                    newWidth = startLeft + startWidth;
                    newHeight = Math.round(newWidth / aspectRatio);
                    newTop = startTop + (startHeight - newHeight);
                }
                if (newTop < 0) {
                    newTop = 0;
                    newHeight = startTop + startHeight;
                    newWidth = Math.round(newHeight * aspectRatio);
                    newLeft = startLeft + (startWidth - newWidth);
                }
                el.style.left = newLeft + 'px';
                el.style.top = newTop + 'px';
                el.style.width = newWidth + 'px';
                el.style.height = newHeight + 'px';
            }
        }
    });

    document.addEventListener('mouseup', function () {
        if (isDragging || isResizing) {
            isDragging = false;
            isResizing = false;
            el.classList.remove('resizing');
            // Guardar posición final en layoutSettings para persistencia durante cambios de layouts
            const className = el.className.split(' ')[0];
            layoutSettings[className] = {
                top: el.style.top,
                left: el.style.left,
                width: el.style.width,
                height: el.style.height
            };
        }
    });
}




function removeAllVideoContainers() {
    removeAllPlayers();

    removeElementsByClass("videocontainer1");
    removeElementsByClass("videocontainer2");
    removeElementsByClass("videocontainer3");
    removeElementsByClass("videocontainer4");
    removeElementsByClass("videocontainer5");
    removeElementsByClass("videocontainer6");
    removeElementsByClass("videocontainer7");
    removeElementsByClass("videocontainer8");
    removeElementsByClass("videocontainer9");
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
    const list = OvenPlayer.getPlayerList();
    while (list.length > 0) {
        list[0].remove();
    }
}






addEventListener("keydown", (evento) => {
    let list = OvenPlayer.getPlayerList();








    // Función auxiliar para activar/desactivar canales individuales (Toggle)
    function toggleChannel(num, data) {
        const rid = `reproductor${num}`;
        const cid = `videocontainer${num}`;
        const existing = OvenPlayer.getPlayerByContainerId(rid);

        if (existing) {
            existing.remove();
            removeElementsByClass(cid);
            console.log(`Canal ${num} removido`);
        } else {
            createrVideoContainer(cid, rid, data);
            console.log(`Canal ${num} activado`);
        }
    }

    // Tecla 0: Limpiar escena
    if (evento.keyCode == 48) {
        removeAllVideoContainers();
        console.log("Escena vaciada");
    }

    // Teclas 1 a 6: Toggle de canales
    if (evento.keyCode == 49) toggleChannel(1, player1Data); // 1
    if (evento.keyCode == 50) toggleChannel(2, player2Data); // 2
    if (evento.keyCode == 51) toggleChannel(3, player3Data); // 3
    if (evento.keyCode == 52) toggleChannel(4, player4Data); // 4
    if (evento.keyCode == 53) toggleChannel(5, player5Data); // 5
    if (evento.keyCode == 54) toggleChannel(6, player6Data); // 6
    if (evento.keyCode == 55) toggleChannel(7, player7Data); // 7
    if (evento.keyCode == 56) toggleChannel(8, player8Data); // 8
    if (evento.keyCode == 57) toggleChannel(9, player9Data); // 9

    // Tecla F: Pantalla completa del canal con FOCO
    if (evento.keyCode == 70) {
        const focused = document.querySelector('.videocontainer.focused');
        if (focused) {
            const rid = focused.querySelector('[id^="reproductor"]').id;
            const player = OvenPlayer.getPlayerByContainerId(rid);
            if (player) player.toggleFullScreen();
        }
    }





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

    // Tecla R para resetear posición y tamaño original
    if (evento.keyCode == 82) {
        if (currentLayoutIndex !== -1) {
            // Si hay un layout de TV activo, limpiamos TODA la persistencia y lo re-aplicamos
            layoutSettings = {};
            applyTVLayout(currentLayoutIndex);
            console.log("Layout de TV reseteado a valores originales");
        } else {
            // Si no hay un layout (canales individuales 1, 2, 3...), reseteamos los visibles
            const containers = document.querySelectorAll('[class^="videocontainer"]');
            containers.forEach(c => {
                const className = c.className.split(' ')[0];
                delete layoutSettings[className];
                c.style.top = '';
                c.style.left = '';
                c.style.width = '';
                c.style.height = '';
            });
            console.log("Canales individuales reseteados");
        }
    }

    // Tecla N y M para navegar entre los Layouts de TV
    if (evento.keyCode == 77) { // M - Siguiente
        currentLayoutIndex = (currentLayoutIndex + 1) % tvLayouts.length;
        applyTVLayout(currentLayoutIndex);
    }
    if (evento.keyCode == 78) { // N - Anterior
        currentLayoutIndex = (currentLayoutIndex - 1 + tvLayouts.length) % tvLayouts.length;
        applyTVLayout(currentLayoutIndex);
    }

    // Teclas V y B para navegar entre los backgrounds
    if (evento.keyCode == 86) { // V - Siguiente
        if (backgroundFileList.length > 0) {
            actualBgIndex = (actualBgIndex + 1) % backgroundFileList.length;
            actualizarBackground();
        }
    }
    if (evento.keyCode == 66) { // B - Anterior
        if (backgroundFileList.length > 0) {
            actualBgIndex = (actualBgIndex - 1 + backgroundFileList.length) % backgroundFileList.length;
            actualizarBackground();
        }
    }


});





