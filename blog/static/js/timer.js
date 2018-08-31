
//시계
var myclockBody, myclockBody2, myclockBody3, myclockBody4, mySec, mySec2, mySec3, hardTime, softTime;
var clockclick = document.getElementById("clockBody");;
var startBtn = document.getElementById("clockbtn");
var startBtn2 = document.getElementById("clockbtn2");
var clickState = 0;
var setTimer = 0;

function startClock() {
    clockArea.start();
    myclockBody = new clockComponent(160, 250, "#1c171a", 20, 80);
    myclockBody2 = new clockComponent(160, 43, "#1c171a", 20, 30);
    myclockBody3 = new clockComponent(150, 240, "white", 25, 85);
    myclockBody4 = new clockComponent(150, 240, "#ff949b", 25, 85);
    mytext = new clockComponent("20px", "Helevtica", "#1c171a", 60, 22, "text");
    mytext2 = new clockComponent("14px", "Helvetica", "#1c171a", 125, 345, "text");
    mySec = new clockComponent("30px", "Consolas", "#ff949b", 60, 60, "text");
    mySec2 = new clockComponent("45px", "Consolas", "#946b75", 64, 130, "text");
    mytext.text = "SET TIME"
    mytext2.text = "click me!"
    mySec.text = "00:00";
    mySec2.text = "001";
    makeSend1();
    makeSend2();
    clockclick.addEventListener("click", timeSet);
    startBtn.addEventListener("click", startTime);
    startBtn2.addEventListener("click", resetTime);
    updateClockArea();
}

window.onload = function() {
    startClock();
}

//캔버스 설정
var clockArea = {
    body : document.createElement("canvas"),
    start : function() {
        this.body.width = 200;
        this.body.height = 360;
        this.context = this.body.getContext("2d");
        this.interval = undefined;
        document.getElementById("clockBody").insertBefore(this.body, document.getElementById("clockBody").childNodes[0]);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.body.width, this.body.height)
    },
    stop: function() {
        clearInterval(this.interval);
    }
}

//몸체 만들기용 생성자
var clockComponent = function(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = clockArea.context;
        if(this.type == "text") {
            ctx.font = this.width+" "+this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

//모래시계 형태 만들기
function makeSend1() {
    var ctx = clockArea.context;
    ctx.beginPath();
    ctx.moveTo(20, 155);
    ctx.lineTo(25, 155);
    ctx.quadraticCurveTo(25, 190, 60, 190)
    ctx.quadraticCurveTo(82, 190, 80, 210)
    ctx.quadraticCurveTo(82, 230, 60, 230)
    ctx.quadraticCurveTo(25, 230, 25, 260)
    ctx.lineTo(20, 260);
    ctx.lineTo(20, 155);
    ctx.fillStyle = "#1c171a";
    ctx.fill();
    ctx.closePath();
}
function makeSend2() {
    var ctx = clockArea.context;
    ctx.beginPath();
    ctx.moveTo(180, 155);
    ctx.lineTo(175, 155);
    ctx.quadraticCurveTo(180, 190, 140, 190)
    ctx.quadraticCurveTo(120, 190, 120, 210)
    ctx.quadraticCurveTo(120, 230, 140, 230)
    ctx.quadraticCurveTo(175, 230, 175, 260)
    ctx.lineTo(180, 260);
    ctx.lineTo(180, 155);
    ctx.fillStyle = "#1c171a";
    ctx.fill();
    ctx.closePath();
}


//시간입력함수
function timeSet(e){
    if(setTimer === 0){
        var target = e.target
        var s = prompt("분:초의 형태로 입력해주세요.", "최대 '15:00'");
        var point = s.indexOf(":");
        var minTime = s.slice(0, point);
        var secTime = s.slice(point + 1);
        var everySec = (Number(minTime) * 60) + Number(secTime);
        hardTime = everySec;
        softTime = everySec - 1;

        if (target.className.indexOf("clockBody") > -1) return;
        if (secTime > 60 || minTime.length > 2 || secTime.length > 2 || Number(everySec) > 900 || Number(everySec) < 0 || s === null || s === undefined || point === -1) {
            alert("제대로 입력해주세요.");
            mySec.text = "00:00";
            return;
        }
        if (s.length < 5) {
            if (minTime.length < 2) {
                if (minTime.length < 1) minTime = "00"
                else minTime = "0" + minTime;
                if (secTime.length < 2) {
                    secTime = "0" + secTime;
                }
            } else if (secTime.length < 2) {secTime = "0" + secTime;}
            s = minTime + ":" + secTime;
        }
        if (everySec < 100) {
            everySec = "0" + everySec;
            if (everySec < 10) everySec = "0" + everySec;
        }
        mySec.text = s;
        mySec2.text = everySec;
        setTimer = 1;
        updateClock();
    } else alert("시간을 다시 설정하려면 재시작을 눌러주세요.");
}

//시작&일시정지 토글버튼
function startTime() {
    if(clickState === 0) {
        if (mySec2.text <= 0 || isNaN(mySec2.text)) return alert("시작할 수 없습니다.");
        else {
            clockArea.interval = setInterval(updateClockArea, 1000);
            this.textContent = "정지";
            clickState = 1;
        }
    } else {
        clockArea.stop();
        this.textContent = "시작";
        clickState = 0;
    }
}

//리셋버튼
function resetTime() {
    clockArea.stop();
    clockArea.interval = undefined;
    mySec.text = "00:00";
    mySec2.text = "001";
    myclockBody4.y = 85;
    myclockBody4.height = 240;
    clickState = 0;
    setTimer = 0;
    document.getElementById("clockbtn").innerHTML = "시작";
    updateClockArea();
}

//시간의 흐름에 따른 모래시계 값 변화
function timeSend() {
    var x, z;
    if (mySec2.text !== "000") {
        if(myclockBody4.y >= 324) return;
        x = (240 * softTime) / hardTime;
        z = 240 - x;
        myclockBody4.y += z;
        myclockBody4.height -= z;
    }
}

//업데이트 및 시간관리
function updateClockArea() {
    clockArea.clear();
    mySec2.text -= 1;
    if (mySec2.text < 100) {
        mySec2.text = "0" + mySec2.text;
        if (mySec2.text < 10) mySec2.text = "0" + mySec2.text;
    }
    if (clockArea.interval!==undefined && mySec2.text == 0) {
        mySec2.text = "000";
        mySec3 = new clockComponent("90px", "Consolas", "rgba(255, 0, 0, 0.8)", 0, 220, "text");
        mySec3.text = "stop";
        clockArea.stop();
    }
    updateClock();
}
function updateClock() {
    myclockBody.update();
    myclockBody2.update();
    myclockBody3.update();
    myclockBody4.update();
    makeSend1();
    makeSend2();
    mySec.update();
    mySec2.update();
    mytext.update();
    mytext2.update();
    timeSend();
    if(mySec3) mySec3.update();
}