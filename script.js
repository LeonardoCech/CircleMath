let canvas1 = document.getElementById('canvas1');
let ctx1 = canvas1.getContext('2d');

let canvas2 = document.getElementById('canvas2');
let ctx2 = canvas2.getContext('2d');

let zero = canvas1.width / 2;

ctx1.translate(zero, zero);
ctx2.translate(zero, zero);

ctx1.beginPath();
ctx1.arc(0, 0, 200, 0, 2 * Math.PI);
ctx1.stroke();

ctx1.beginPath();
ctx1.moveTo(0, 0);

function drawLine1( deg, color) {
    
    let radius = 200;

    teta = (deg / 180) * Math.PI; // Regra de 3 considerando que 1 * Math.PI = 180 graus

    sin = radius * Math.sin(teta);
    cos = radius * Math.cos(teta);

    ctx1.strokeStyle = color;
    ctx1.beginPath();
    ctx1.moveTo(0, 0);
    ctx1.lineTo(cos, sin);
    ctx1.stroke();
}

function writeIn1( deg, difSin, difCos) {
    
    let radius = 200;

    teta = (deg / 180) * Math.PI; // Regra de 3 considerando que 1 * Math.PI = 180 graus

    sin = radius * Math.sin(teta) + difSin;
    cos = radius * Math.cos(teta) + difCos;

    ctx1.font = "18px Arial";
    ctx1.fillText(deg + "°", cos, sin);
}

function drawLine2( deg, color) {

    let radius = 200;

    teta = (deg / 180) * Math.PI; // Regra de 3 considerando que 1 * Math.PI = 180 graus

    sin = radius * Math.sin(teta);
    cos = radius * Math.cos(teta);

    ctx2.clearRect( -canvas2.width, -canvas2.height, 2 * canvas2.width, 2 * canvas2.height);

    // Reta do raio
    ctx2.strokeStyle = color;
    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.lineTo(cos, sin);
    ctx2.stroke();

    // Linhas do Seno e Cosseno
    ctx2.strokeStyle = 'gray';
    ctx2.beginPath();
    ctx2.moveTo(cos, 0);
    ctx2.lineTo(cos, sin);
    ctx2.stroke();

    writeInCanvas2('Cosseno', cos, 0);

    ctx2.beginPath();
    ctx2.moveTo(0, sin);
    ctx2.lineTo(cos, sin);
    ctx2.stroke();

    writeInCanvas2('Seno', 0, sin);

    // Pontos nas extremidades
    ctx2.fillStyle = 'black';

    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.arc(0, 0, 3.5, 0, 2 * Math.PI);
    ctx2.fill();

    ctx2.beginPath();
    ctx2.moveTo(cos, sin);
    ctx2.arc(cos, sin, 3.5, 0, 2 * Math.PI);
    ctx2.fill();
    
    writeInCanvas2('Raio(' + Math.cos(teta).toFixed(2) + ', ' + Math.sin(teta).toFixed(2) + ')', cos, sin);

    // Angulo do raio
    drawAngle2( deg );
}

function writeIn2( deg, difSin, difCos) {
    
    let radius = 200;

    teta = (deg / 180) * Math.PI; // Regra de 3 considerando que 1 * Math.PI = 180 graus

    sin = radius * Math.sin(teta) + difSin;
    cos = radius * Math.cos(teta) + difCos;

    ctx2.font = "18px Arial";
    ctx2.fillText(deg + "°", cos, sin);
}

function writeInCanvas2( text, x, y) {

    ctx2.font = "18px Arial";
    ctx2.fillText(text, x, y);
}

function drawAngle2( deg ) {

    // Angulo do raio
    ctx2.strokeStyle = 'gray';
    ctx2.beginPath();
    ctx2.moveTo(0, 0);
    ctx2.arc(0, 0, 50, 0, teta);
    ctx2.stroke();

    writeInCanvas2('Θ(' + deg.toFixed(2) + '°)', 0, 0);
}

drawLine1(  0, 'gray');
drawLine1( 90, 'gray');
drawLine1(180, 'gray');
drawLine1(270, 'gray');

writeIn1(  0,   5,  80);
writeIn1( 90,  90, -10);
writeIn1(180,   5, -95);
writeIn1(270, -80, -15);

let i = 0;
let maxDeg = 360;
let vel = 0.1;
let voltas = 1;

setInterval(animation => {

    if (i <= maxDeg && voltas > 0) {
        
        drawLine2(i, 'red', true);
        
        i += vel;

        if (i >= 360) {
            i = 0;
            voltas--;
        }
    }
    document.getElementById('numVoltas').innerHTML = voltas;
    document.getElementById('numVel').innerHTML = (vel * 10).toFixed(0);
}, null);

function maisVel() {
    if (vel < 0.9) vel += 0.1;
}
function menosVel() {
    if (vel > 0.1) vel -= 0.1;
}

function maisVoltas() {
    voltas++;
}
function menosVoltas() {
    if (voltas > 0) voltas--;
}