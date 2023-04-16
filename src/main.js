var wid = window.innerWidth-50;
var hit = window.innerHeight-100;
var q = null;
var state = true;
interval = null;
var element,canvas,width,height,red;

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
    $.drawPix = function(){
        var i = 0;
        interval = setInterval(function () {
            for (let j = 0; j < wid; j++) {
                setPixel(j,i,black);
            }
            console.log(i++);  
            if(i>hit) clearInterval(interval);
        }, 1);
    }
}); 


function clicked(){
    $.drawPix();
}

function stop(){
    clearInterval(interval);
}

function reset(){
    canvas.fillRect(0, 0, width, height);
    console.log("reset");
}




draw();