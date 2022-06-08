const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); //path - 길
        ctx.moveTo(x, y);
        } else {
        ctx.lineTo(x, y);
        ctx.stroke(); //획을 긋다
        }
}

function onMouseDown(event) {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    // strokeStyle overriding
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "FILL";
    } else {
        filling = true;
        mode.innerText = "PAINT";
    }
}

function handleCanvasClick() {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
    //여기서 조건문을 쓰는 이유는 뭐지? fillig의 기본값은 false인데 filling이 실행되는..건?
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PAIN JS";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove); 
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM)
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}





//canvas context >> 이 안에서 픽셀들을 컨트롤 하는 것
//ctx.strokeStyle >> 그릴 서들이 가질 색을 지정

//클릭하지 않고 마우스를 움직일때 path를 시작하게 된다.
//path의 시작점은 내 마우스가 있는 곳

//클릭을 하게되면 mousedown이벤트 발생 > startPainting 함수 실행 > painting = true
//else에 있는 메서드들이 실행된다.

//lineTo 메서드는 path이전의 위치에서 지금 위치까지 선을 만드는 것이다.

//stroke메서드는 현재의 sub-path를 현재의 stroke style로 획을 긋는다.

//lineTo와 stroke는 내가 마우스를 움직이는 내내 발생하는것 (시작점과 끝점의 개념이 아님)

//ㅅㅂ 이해 안되면 path는 그냥 line그 자체라고 일단 생각