import '/dist/ovenPlayer.js';
import 'jquery-1.12.4.min.js';


function reproductor1(wraperID) {

    OvenPlayer.debug(true);

    const movil_01 = [{
        file: 'ws://193.123.98.212:3333/app/stream1',
        label: 'stream',
        type: 'webrtc'
    }];

    const movil_02 = [{
        file: 'ws://193.123.98.212:3333/app/stream2',
        label: 'stream',
        type: 'webrtc'
    }];

    const player = OvenPlayer.create(wraperID, {
        image: "rw.png",
        title: "Movil 01",
        sources: movil_01,
        autoStart: true,
        mute: false,
        expandFullScreenUI: true,
    });

    player.on("ready", function () {
        player.getConfig().systemText.ui.controls.low_latency_live = 'En vivo LL.';
        player.getConfig().systemText.api.error[501].message = 'Esperando... Sin Conexión.';
        player.getConfig().systemText.api.error[502].message = 'Esperando... Candidato ICE.';
        player.getConfig().systemText.api.error[503].message = 'Esperando... Falla Remota.';
        player.getConfig().systemText.api.error[504].message = 'Esperando... Sin Oferta.';
        player.getConfig().systemText.api.error[505].message = 'Esperando... Error Local.';
        player.getConfig().systemText.api.error[510].message = 'Conexión Lenta o Inestable.';
        player.getConfig().systemText.api.error[511].message = 'Interrupción Inesperada.';
    });

    if (player.getState() === 'error' || player.getState() === 'complete' || player.getState() === 'idle') {
        player = OvenPlayer.create("reproductor1", {
            image: "wait2.gif",
            title: "Movil 01",
            sources: movil_01,
            autoStart: true,
            expandFullScreenUI: true,
        });

    };

    player.on('stateChanged', function (data) {


    });

    player.on("error", function (error) {
        console.log(error);
    });

    return player;

}