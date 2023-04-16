var wid = window.innerWidth-50;
var hit = window.innerHeight-100;
var q = null;
var state = true;
interval = null;
var element,canvas,width,height,red;
currentFractal = null;


function draw() {
    var a = document.getElementById("canvas");
    var ctx = a.getContext("2d");
    ctx.canvas.width  = wid;
    ctx.canvas.height = hit;
  }


$(window).load(function(){
    black = {r: 0,g: 0,b: 0,a: 255};
    // init canvas
    element = $('#canvas').get(0);
    canvas = element.getContext('2d');
    width = wid;
    height = hit;
    canvas.fillStyle = '#eeeeee';
    canvas.fillRect(0, 0, width, height);
    // setpixel
    var setPixel = function (x,y,c) {
        var p=canvas.createImageData(1,1);
        p.data[0]=c.r;
        p.data[1]=c.g;
        p.data[2]=c.b;
        p.data[3]=c.a;
        canvas.putImageData(p,x,y);
    }

    // drawPixels();
    
    $.setBlack = function(x,y){
        setPixel(x,y,black)
    }
}); 


function clicked(){
    // $.drawPix();
    if(currentFractal == 3) mandelbrot();
}

function stop(){
    clearInterval(interval);
}

function reset(){
    canvas.fillRect(0, 0, width, height);
    console.log("reset");
}

function indexName(index){
    if (index==0)return "Fractal Generation";
    if (index==1)return "Sierpinski Carpet";
    if (index==2)return "Sierpinski Gasket";
    if (index==3)return "Mandelbrot Set";
    if (index==4)return "Julia Set";
    if (index==5)return "Newton Fractal";
    if (index==6)return "Koch Snowflake";
    if (index==7)return "Harter-Heighway Dragon Curve";
    
}


function showDropInfo() {
    var sT = dropForm.dropSelect;
    var pF = document.getElementById('pF');
    pF.innerHTML = indexName(sT.selectedIndex);
    currentFractal = sT.selectedIndex;
}

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function squareComplexNumbers(re,im){
    aa = (re*re)-(im*im);
    bb = 2*re*im;
    return [aa,bb];
}

console.log(squareComplexNumbers(.0984,.431));

function mandelbrot(){
    console.log("mandelbrot set")
    width = wid;
    height = hit;
    var i = 0;
    interval = setInterval(function () {
        for (let j = 0; j < wid; j++) {
            // setPixel(j,i,black);
            $.setBlack(j,i);
        }
        console.log(i++);  
        if(i>hit) clearInterval(interval);
    }, 1);
    
}






draw();