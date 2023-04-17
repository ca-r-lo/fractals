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

function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function squareComplexNumbers(re,im){
    aa = (re*re)-(im*im);
    bb = 2*re*im;
    return [aa,bb];
}

function addComplex(re1,im1,re2,im2){
    return [(re1+re2),(im1+im2)]
}

console.log(addComplex(.05,.21,.60,1.3));




function mandelbrot(){
    console.log("mandelbrot set")
    width = wid;
    height = hit;
    maxIter = 500;
    var i = 0;
    interval = setInterval(function () {
        for (let j = 0; j < wid; j++) {
            // setPixel(j,i,black);
            // $.setBlack(j,i);
            re = scale(j,0,width,-2.5,1.5);
            im = scale(i,0,height,-1,1);
            // console.log(j,i);
            // console.log(re,im);
            n=0;
            cre = re;
            cim = im;
            while(n<maxIter){
                num = squareComplexNumbers(re,im);

                re = num[0] + cre;
                im = num[1] + cim;

                if((re+im)>16)break;

                n++;
            }
            color = null;
            bright = 0;
            if(n==maxIter){
                color = {r: 0,g: 0,b: 0,a: 255};
                $.setColor(j,i,color);
            }else{

                p = n%16;
                mapping = [
                    {r: 66,g: 30,b: 15,a: 255},
                    {r: 25,g: 7,b: 26,a: 255},
                    {r: 9,g: 1,b: 47,a: 255},
                    {r: 4,g: 4,b: 73,a: 255},
                    {r: 0,g: 7,b: 100,a: 255},
                    {r: 12,g: 44,b: 138,a: 255},
                    {r: 24,g: 82,b: 177,a: 255},
                    {r: 57,g: 125,b: 209,a: 255},
                    {r: 134,g: 181,b: 229,a: 255},
                    {r: 211,g: 236,b: 248,a: 255},
                    {r: 241,g: 233,b: 191,a: 255},
                    {r: 248,g: 201,b: 95,a: 255},
                    {r: 255,g: 170,b: 0,a: 255},
                    {r: 204,g: 128,b: 0,a: 255},
                    {r: 153,g: 87,b: 0,a: 255},
                    {r: 106,g: 52,b: 3,a: 255}
                ]
                color = mapping[p];
                // console.log(color);

                // bright = scale(n,0,maxIter,0,255);

                // color = {r: bright,g: bright,b: bright,a: 255}
                $.setColor(j,i,color);
            }
            
        }
        i++;
        if(i>hit) clearInterval(interval);
    }, 1);
    
}






draw();