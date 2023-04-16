const buttonsContainer = document.getElementById("but1");
const buttonsContainer2 = document.getElementById("but2");


const button = document.createElement("button");
button.innerText = "butt";
buttonsContainer.appendChild(button);


const butt2 = document.createElement("button");
butt2.innerText = "stop";
buttonsContainer2.appendChild(butt2)



interval = null;

button.onclick = function () {
    var i = 0;
    interval = setInterval(function () {
        console.log(i++);  // this is inside your loop
        if(i==300) clearInterval(interval);
    }, 1);
};

butt2.onclick = function () {
    clearInterval(interval);
};


var i = 0;
        interval = setInterval(function () {
            console.log(i++);  // this is inside your loop
            if(i>hit) clearInterval(interval);
        }, 1);