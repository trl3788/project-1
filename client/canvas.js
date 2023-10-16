const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const loadCanvas = () => {
    canvas.width = document.getElementById('bikeAdd').offsetWidth * .95;
    canvas.height = document.getElementById('bikeAdd').offsetHeight * .95
    ctx.fillStyle = '#FEFEE3';
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
    loadCanvas();
    let body; 
    let tires;
    if(bike){
        body = canvasUpdateBike(bike);
        ctx.drawImage(body, 2, 2);

        ctx.fillStyle = color;
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(body, 0, 0)


        // ctx.globalCompositeOperation = 'source-in';
        // console.log(color);
        // ctx.fillStyle = color;
        // console.log(canvas.width);
        // ctx.fillRect(0,0,canvas.width,canvas.height);
        // ctx.globalCompositeOperation = 'source-over';



    }
    if(tire){
        if(tire === 'road'){
            tires = document.getElementById('rdTire');
        }
        else if(tire === 'mountain'){
            tires = document.getElementById('mtTire');
        }
        ctx.drawImage(tires, 2, 2);
    }
}

module.exports = {
    loadCanvas,
    drawBike,
    canvasUpdateBike, 
    canvasUpdateTire,
}
