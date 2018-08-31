var imgIn = document.getElementById('imgInput');
var img = document.getElementById("thisImg");
var coordi = document.getElementById("coordi");
var imgC = document.getElementById("imgCanvas");

var ctx = imgC.getContext("2d");
var showImg = false;

imgIn.addEventListener('change', readImg);
img.addEventListener('load', imgSize);

function readImg(e) {
    var reader = new FileReader();
    var files = e.target.files;
    if(imgIn.files[0]) {
        reader.readAsDataURL(imgIn.files[0]);
        reader.onload = function(e) {
            if(img.src) imgCln();
            img.src = e.target.result;
            showImg = true;
        }
    }
}

function imgCln() {
    pers = 100;
    width = 0;
    height = 0;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 300, 300);
    coordi.innerHTML = '';
}

function imgSize(e) {
    var pers = 100;
    var width = this.naturalWidth;
    var height = this.naturalHeight;
    if (width > 650 || width < 650) {
        img.width = 650;
    }
    var widC = imgC.width;
    var heiC = imgC.height;
    img.onmouseup = function(e) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 350, 300);
        var x = e.offsetX;
        var y = e.offsetY;
        var imgX = x, imgY = y;
        if (showImg = false) return;
        if (width > 650 || width < 650) {
            imgX = (width*x/650)-100;
            imgY = (height*y/this.height)-100;
        }
        var coor = 'coordinates: (' + x + ',' + y + ')';
        coordi.innerHTML = coor;
        ctx.drawImage(img, imgX, imgY, 200, 200, 0, 0, 350, 300);
    }
}