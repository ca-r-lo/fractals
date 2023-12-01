
var x1,x2,y1,y2;
var generate = document.getElementById("butt1");
var stop = document.getElementById("butt2");
var reset = document.getElementById("butt3");

var frac1 = document.getElementById("frac1");
var frac2 = document.getElementById("frac2");
var frac3 = document.getElementById("frac3");
var frac4 = document.getElementById("frac4");

var i = 0;
var x,y;
var state = '';

var div1 = document.getElementById("mj");
var div2 = document.getElementById("gd");

div1.style.display = 'none';
div2.style.display = 'none';

var iter = document.getElementById("iterations");
iter.oninput = function() {
    document.getElementById("iterNum").innerHTML = iter.value;
}

var iter1 = document.getElementById("iterationsDragon");
iter1.oninput = function() {
    document.getElementById("iterNum").innerHTML = iter1.value;
}


frac1.addEventListener("click", 
    function() {
        state = '1000';
        console.log("mandelbrot")
        document.getElementById("label").innerHTML = "Mandelbrot Set";
        div1.style.display = "none";
        div2.style.display = "none";
        
    }
);
frac2.addEventListener("click", 
    function() {
        state = '0100';
        console.log("julia")
        document.getElementById("label").innerHTML = "Julia Set";
        div1.style.display = "block";
        div2.style.display = "none";
        document.getElementById("time").style.display = "block";
    }); 
frac3.addEventListener("click", 
    function() {
        state = '0010';
        console.log("gasket")
        document.getElementById("label").innerHTML = "Sierpinski Gasket ";
        div1.style.display = "none";
        div2.style.display = "block";
        document.getElementById("iterations").style.display = "block";
        document.getElementById("iterationsDragon").style.display = "none";
    }
);
frac4.addEventListener("click", 
    function() {
        state = "0001";
        console.log("dragon")
        document.getElementById("label").innerHTML = "Harter-Heighway Dragon Curve";
        div1.style.display = "none";
        div2.style.display = "block";
        document.getElementById("iterationsDragon").style.display = "block";
        document.getElementById("iterations").style.display = "none";
    }
);

reset.addEventListener("click", function() {
    draw();
    i=10000;
});


generate.addEventListener("click", 
    function() {
        i=0;
        var x = document.getElementById("xframe").value;
        var y = document.getElementById("yframe").value;
        var zoom;
        console.log(x,y);
        if(state=='1000'){
            mandelbrot(x,y,zoom);
        } else if(state=='0100'){
            julia();
        } else if(state=='0010'){
            draw();
            gasket();
        } else if (state=='0001'){
            dragon();
        }
    }
);
stop.addEventListener("click", 
function() {
    i=10000;
});





console.time('Execution Time');
var wid = window.innerWidth-50;
var hit = window.innerHeight-150;
var element, ctx;
black = {r: 0,g: 0,b: 0,a: 255};
interval = null;


function draw() {
    element = document.getElementById("canvas");
    ctx = element.getContext("2d");
    ctx.canvas.width  = wid;
    ctx.canvas.height = hit;
    element.style.marginLeft = '1em';
    console.log(wid,hit);
}

function setpixel(x,y,c){
    var p = ctx.createImageData(1,1);
    p.data[0]=c.r;
    p.data[1]=c.g;
    p.data[2]=c.b;
    p.data[3]=c.a;
    ctx.putImageData(p,x,y);
}

draw();


// =---------------------------mandelbrot set-----------
function scale (number, inMin, inMax, outMin, outMax) {return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;}
function squareComplexNumbers(re,im){
    aa = (re*re)-(im*im);
    bb = 2*re*im;
    return [aa,bb];
}
function addComplex(re1,im1,re2,im2){return [(re1+re2),(im1+im2)]}
function transColor(r,g,b){return {r: r,g: g,b: b,a: 255};}

function mandelbrot(){
    var startTime = performance.now();
    width = wid;
    height = hit;
    maxIter = 500;
    interval = setInterval(function () {
        for (let j = 0; j < wid; j++) {
            re = scale(j,0,width,-2.5,2.5);
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
                setpixel(j,i,color);
            }else{
                grade = scale(n,0,maxIter,0,1);
                bright = scale(Math.sqrt(grade),0,1,0,255)
                setpixel(j,i,{r: bright,g: 0,b: 0,a: 255 });
            }
        }
        i++;
        if(i>hit) {
            clearInterval(interval);
            var endTime = performance.now();
            document.getElementById("exec").innerHTML = ` ${endTime - startTime} ms`;
    }
}, .1);

}



// ---- mandelbrot set ------------------------------------
// mandelbrot();

// ----- julia set ---------------------------

function julia(){ 
    var startTime = performance.now();
    // draw();
    console.log("julia set")
    width = wid;
    height = hit;
    maxIter = 500;
    i=0
    interval = setInterval(function () {
        for (let j = 0; j < wid; j++) {
            // $.setColor(j,i,black);

            re = scale(j,0,width,-2.5,2.5);
            im = scale(i,0,height,-1.5,1.5);

            n=0;

            cre = 0;
            cim = .6923141;
            
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
                setpixel(j,i,color);
            }else{
                grade = scale(n,0,maxIter,0,1);
                bright = scale(Math.sqrt(grade),0,1,0,255)
                setpixel(j,i,{r: 0,g: 0,b: 0,a: bright});
            }


        }
        i++;
        if(i>hit) {
            clearInterval(interval)
            var endTime = performance.now();
            document.getElementById("exec").innerHTML = ` ${endTime - startTime} ms`;
        }
    }, 1);
    
}
// julia();

function gasket(){
    var startTime = performance.now();
    const c = document.getElementById("canvas");
    const ctx = c.getContext("2d"); // context variable is used to draw on a 2D plane
    
    var k =0;
    const createTriangle = (pos, sidelen) => {
        ctx.beginPath();
        ctx.moveTo(...pos); // go to the left vertex

        // note that (0,0) in canvas is the top left, so 'up' on the vertical component would use substraction.
        ctx.lineTo(pos[0] + sidelen / 2, pos[1] - sidelen * Math.sin(Math.PI/3)); // draw line from left vertex to top vertex
        ctx.lineTo(pos[0] + sidelen, pos[1]); // draw line from top vertex to right vertex
        ctx.lineTo(...pos); // draw line from right vertex back to left vertex
        ctx.closePath();
        ctx.fill(); // fill triangle
    };

    const createSierpinskiTriangle = (pos, sidelen, depth) => {
        k += 1;
        const innerTriangleSidelen = sidelen / 2; // side length of inner triangles is half the side length of the outer triangle
        const innerTrianglesPositions = [
          pos, [ pos[0] + innerTriangleSidelen, pos[1] ],
          [ pos[0] + innerTriangleSidelen / 2, pos[1] - Math.sin(Math.PI/3) * innerTriangleSidelen ]
        ]; // these positions are the same as what was used in the createTriangle function
        if(depth === 0) {
          innerTrianglesPositions.forEach((trianglePosition) => {
            createTriangle(trianglePosition, innerTriangleSidelen);
          });
        } else {
          innerTrianglesPositions.forEach((trianglePosition) => {
            createSierpinskiTriangle(trianglePosition, innerTriangleSidelen, depth - 1);
          });
        }
    }

    createSierpinskiTriangle([wid/2-350, 610], 700, iter.value);
    console.log(k);
    var endTime = performance.now();
    document.getElementById("exec").innerHTML = ` ${endTime - startTime} ms`;
    document.getElementById("recurNum").innerHTML = k;
}



function dragon(){
    var startTime = performance.now();
    var c = document.getElementById("canvas");
    c.width = wid;
    c.height = hit;
    var k =0;
    var ctx = c.getContext("2d");
    var i = 0;
    var steps = iter1.value;
    var colorRate = 8;
    
    // Add the points for drawing the dragon
    
    var dragon = function (x1, y1, x2, y2, step) 
    {
      if (step--)
      {
        var dx = x2 - x1,
            dy = y2 - y1;
    
        var midX = x1 + (dx - dy) / 2,
            midY = y1 + (dx + dy) / 2;
    
        dragon(midX, midY, x1, y1, step);
        dragon(midX, midY, x2, y2, step);	
    
        // Switch up colors 
        var r = (i >> (colorRate - 3)) & 255;
        var g = (i >> (colorRate + 0)) & 255;
        var b = (i >> (colorRate - 1)) & 255;
    
        ctx.fillStyle = 'rgb('+ r +', '+ g +','+ b +')';
    
        // Points as small squares
        ctx.fillRect(midX, midY, 1, 1);
        i++;
        k+=1;
      }
    };
    
    dragon( 
      wid * 3/16,  hit/5, /* start */ 
      wid * 11/16, hit/5, /* end */ 
      steps
    );  
    var endTime = performance.now();
    // console.log(endTime - startTime);
    
    document.getElementById("exec").innerHTML = ` ${endTime - startTime} ms`;
    // dragon(1,1,wid,height,steps);
    document.getElementById("recurNum").innerHTML = k;
}
