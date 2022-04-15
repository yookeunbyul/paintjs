const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_CLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//실제 픽셀 사이즈 설정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//배경색을 하얀색으로 설정
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);

ctx.strokeStyle = INITIAL_CLOR;
ctx.fillStyle = INITIAL_CLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color //채워지는 색 = 선 색
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"; //현재는 paint
    } else {
        filling = true;
        mode.innerText = "Paint"; //현재는 fill
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
    //오른쪽 클릭하면 메뉴가 뜨는 것을 막아준다.
    event.preventDefault();
}

function handleSaveClick(){
    //디폴트가 PNG, 캔버스를 담은 링크를 만들어준다.
    const image = canvas.toDataURL();
    //a 태그 생성
    const link = document.createElement("a");
    //이미지 링크를 걸고
    link.href = image;
    //이미지 이름 설정(download는 링크로 가는게 아니라 url을 다운하라고 지시한다.)
    link.download = "PainJS[EXPORT]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}