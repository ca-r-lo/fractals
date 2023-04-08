var wid = window.innerWidth-50;
var hit = window.innerHeight-100;
var q = null;
var state = true;


function draw() {
    var a = document.getElementById("canvas");
    var ctx = a.getContext("2d");
    ctx.canvas.width  = wid;
    ctx.canvas.height = hit;
  }







$(window).load(function(){
    var element,canvas,width,height,red;
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
        for (let i = 0; i < hit; i++) {
            if (state == true) {
                setTimeout(function() {
                    for (let j = 0; j < wid; j++) {
                        setPixel(j,i,black);
                    }
                }, 5);
            } 
        }
    }
}); 


function stop(){
    state = false;
}

function clicked(){
    $.drawPix();
}
draw();