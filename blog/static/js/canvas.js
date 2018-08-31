var canvas, ctx, myBtn, Eras, delCanv, color,  cRed, cGreen, cBlue, Redc, Greenc, Bluec;
var isMousedown = false;

window.onload = function() {
    startpage();
}

function startpage() {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#000000";
    ctx.lineCap = "round";

    cRed = document.getElementById("cRed");
    cGreen = document.getElementById("cGreen");
    cBlue = document.getElementById("cBlue");
    Redc = document.getElementById("Redc");
    Greenc = document.getElementById("Greenc");
    Bluec = document.getElementById("Bluec");
    thisC = document.getElementById("thisC")

    myBtn = document.getElementById("brushBtn");
    myBtn.addEventListener('click', brushWidth);

    Eras = document.getElementById("Eraser");
    Eras.addEventListener('click', drawCanvas);

    delCanv = document.getElementById("delAll");
    delCanv.addEventListener('click', drawCanvas);

    color = document.getElementById("brushColor");
    color.addEventListener('click', drawCanvas);
    color.addEventListener('input', drawCanvas);

    canvas.addEventListener('mousedown', drawCanvas);
    canvas.addEventListener('mouseup', drawCanvas);
    canvas.addEventListener('mousemove', drawCanvas);
}

function drawCanvas(e) {
    var etype = e.type;
    var tId = e.target.id;
    if (etype === "mousedown") return downevent(e);
    else if (etype === "mousemove") return moveevent(e);
    else if (etype === "mouseup") return upevent(e);
    else if (etype === "click" && tId.indexOf("Eraser") > -1) return changeW();
    else if (etype === "click" && tId.indexOf("delAll") > -1) return eraseAll();
    else if (etype === "input") {
        makeColor(e);
        showColor();
        return
    }
}


function downevent(e) {
    isMousedown = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function moveevent(e){
    if (isMousedown === false) return;
    ctx.lineTo(e.offsetX,  e.offsetY);
    ctx.stroke();
}

function upevent(e){
    isMousedown = false;
}

function brushWidth(e){
    var target = e.target;
    var btnVal = target.value;

    ctx.lineWidth = btnVal;
}

function changeW() {
    ctx.strokeStyle = "white";
    cRed.value = 255;
    cGreen.value = 255;
    cBlue.value = 255;
    Redc.innerHTML = 255;
    Greenc.innerHTML = 255;
    Bluec.innerHTML = 255;
    thisC.style.backgroundColor = "#ffffff";
    thisC.innerHTML = "#ffffff";
}

function eraseAll() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 700, 520);
}

//색깔 변경(기본 검정000000)
function makeColor(e) {
    var targetColor = e.target;
    var colorVal = targetColor.value;
    if (targetColor.className.indexOf("cRed") > -1) {
        Redc.innerHTML = colorVal;
    } else if (targetColor.className.indexOf("cGreen") > -1) {
        Greenc.innerHTML = colorVal;
    } else if (targetColor.className.indexOf("cBlue") > -1) {
        Bluec.innerHTML = colorVal;
    }
}

//선택한 컬러 보여주기
function showColor() {
    var r = Redc.innerText;
    var g = Greenc.innerText;
    var b = Bluec.innerText;
    if(r === undefined || r === "Red" || r === null) r = 0
    if(g === undefined || g === "Green" || g === null ) g = 0
    if(b === undefined || b === "Blue" || b === null) b = 0
    var toHex = function(H) {
        var H = parseInt(H, 10).toString(16);
        H = (H.length === 1) ? "0" + H : H;
        return H
    }
    var hexType = "#" + toHex(r) + toHex(g) + toHex(b);
    ctx.strokeStyle = hexType;
    thisC.style.backgroundColor = hexType;
    thisC.innerHTML = hexType;
}
