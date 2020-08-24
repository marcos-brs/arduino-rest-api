const { Board, Led } = require("johnny-five");
const express = require('express');

const board = new Board();
const app = express();

const port = 8080;
var led = null;

board.on("ready", () => {
    console.log("### Board ready!");
    led = new Led(13);
});

app.get('/led/:mode', function (req, res) {
    if (led) {
        const { mode } = req.params;
        var message = "Led Mode => ";
        switch (mode) {
            case "on":
                led.on();
                break;
            case "off":
                led.off();
                break;
            case "blink":
                led.blink();
                break;
            case "stop":
                led.stop();
                break;
            default:
                message = "Unknown mode: ";
                break;
        }
        console.log(message + mode);
        res.send(message + mode);
    } else {
        res.send('Board NOT ready!')
    }
});

app.listen(port, function () {
    console.log('Listening on port ' + port);
});