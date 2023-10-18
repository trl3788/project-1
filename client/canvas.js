let canvas;
let ctx;
const baseColor = '#FEFEE3';

const loadCanvas = (canvasToLoad) => {
    canvas = document.getElementById(canvasToLoad);
    ctx = canvas.getContext('2d')
    /*
    Didn't explicitly use this code but it was a starting out point for where I ended up:
    https://stackoverflow.com/questions/9251480/set-canvas-size-using-javascript
    The following link helped me understand the offset____ properties as well: 
    https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
    */
    canvas.width = canvas.parentElement.offsetWidth * .9;
    canvas.height = canvas.parentElement.offsetHeight * .9;
    ctx.fillStyle = baseColor;
    ctx.fillRect(0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);
}

const canvasUpdateBike = (bike) => {
    if(bike === 'road'){
        return document.getElementById('rdBike');
    }else if(bike === 'mountain'){
        return document.getElementById('mtBike');
    }
    return false;
}

const canvasUpdateTire = (tire) => {
    if(tire === 'road'){
        return document.getElementById('rdTire');
    }
    else if(tire === 'mountain'){
        return document.getElementById('mtTire');
    }
    return false;
}

const drawBike = (bike, tire, color) => {
    let body; 
    let tires;
    if(bike){
        body = canvasUpdateBike(bike);

        /*
        Portions of this code started with code from: 
        https://stackoverflow.com/questions/45706829/change-color-image-in-canvas
        As well as guidance from the following link:
        https://www.w3schools.com/jsref/canvas_globalcompositeoperation.asp
        */
        ctx.fillStyle = color;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(body, canvas.width/2 -100, canvas.height/2 - 100);
        ctx.globalCompositeOperation = 'destination-atop';
        ctx.fillStyle = baseColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalCompositeOperation = 'source-over';
        //
    }
    if(tire){
        if(tire === 'road'){
            tires = document.getElementById('rdTire');
        }
        else if(tire === 'mountain'){
            tires = document.getElementById('mtTire');
        }
        ctx.drawImage(tires, canvas.width/2 - 100, canvas.height/2 - 100);
    }
}

module.exports = {
    loadCanvas,
    drawBike,
    canvasUpdateBike, 
    canvasUpdateTire,
}
