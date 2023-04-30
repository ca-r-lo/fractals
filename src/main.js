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
    
    $.setColor = function(x,y,col){
        setPixel(x,y,col)
    }
}); 


function clicked(){
    // $.drawPix();
    if(currentFractal == 3) mandelbrot();
    if(currentFractal == 4) julia();
}

function stop(){
    clearInterval(interval);
}

function reset(){
    clearInterval(interval);
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


// ----------------------------------------------------- mandelbrot ------------------------------------------------
function scale (number, inMin, inMax, outMin, outMax) {return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;}
function squareComplexNumbers(re,im){
    aa = (re*re)-(im*im);
    bb = 2*re*im;
    return [aa,bb];
}
function addComplex(re1,im1,re2,im2){return [(re1+re2),(im1+im2)]}
function transColor(r,g,b){return {r: r,g: g,b: b,a: 255};}
function mandelbrot(){
    console.log("mandelbrot set")
    width = wid;
    height = hit;
    maxIter = 500;
    var i = 0;
    interval = setInterval(function () {
        for (let j = 0; j < wid; j++) {
            re = scale(j,0,width,-2.5,1.5);
            im = scale(i,0,height,-1,1);
            n=0;
            cre = re;
            cim = im;
            nSmooth=0;
            while(n<maxIter){
                num = squareComplexNumbers(re,im);
                re = num[0] + cre;
                im = num[1] + cim;
                nSmooth =  n + 1 - Math.log(Math.log2(Math.abs(re + im)));
                if(Math.abs(re+im)>200)break;
                n++;
            }
            hue = scale(n,0,maxIter,0,255);
            color = null;
            bright = 0;
            if(n==maxIter){
                color = {r: 0,g: 0,b: 0,a: 255};
                $.setColor(j,i,color);
            }else{
                grade = scale(n,0,maxIter,0,1);
                bright = scale(Math.sqrt(grade),0,1,0,255)
                $.setColor(j,i,{r: 0,g: bright,b: 0,a: 255});
            }
        }
        i++;
        if(i>hit) clearInterval(interval);
    }, 1);
}
// ------------------------------------------------ mandelbrot ------------------------------------------------------------




function julia(){ 
    console.log("mandelbrot set")
    width = wid;
    height = hit;
    maxIter = 500;
    i=0
    interval = setInterval(function () {
        for (let j = 0; j < wid; j++) {
            // $.setColor(j,i,black);

            re = scale(j,0,width,-2.5,1.5);
            im = scale(i,0,height,-1,1);

            n=0;

            cre = .397;
            cim = -0.356;
            
            while(n<maxIter){
                num = squareComplexNumbers(re,im);
                re = num[0] + cre;
                im = num[1] + cim;

                if(Math.abs(re+im)>200)break;

                n++;
            }
            
            hue = scale(n,0,maxIter,0,255);
            color = null;
            bright = 0;
            if(n==maxIter){
                color = {r: 0,g: 0,b: 0,a: 255};
                $.setColor(j,i,color);
            }else{
                grade = scale(n,0,maxIter,0,1);
                bright = scale(Math.sqrt(grade),0,1,0,255)
                $.setColor(j,i,{r: 0,g: bright,b: 0,a: 255});
            }


        }
        i++;
        if(i>hit) clearInterval(interval);
    }, 1);
}




draw();