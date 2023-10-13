const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const sendFetch = async (file) => {
    const response = await fetch(file, {
        method: get,
        headers:{
            'accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
}
const loadCanvas = () => {
    ctx.fillStyle = '#FEFEE3';
    ctx.fillRect(0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);
}

const canvasUpdateBike = async (bike) => {
    loadCanvas();
    let image;
    if(bike === 'road'){
        image = document.getElementById('rdBike');
    }else if(bike === 'mountain'){
        image = document.getElementById('mtBike');
    }

    ctx.drawImage(image, 2, 2);
}

const canvasUpdateTire = (tire) => {
    loadCanvas();
    let image;
    if(tire === 'road'){
        image = document.getElementById('rdTire');
    }
    else if(tire === 'mountain'){
        image = document.getElementById('mtTire');
    }
    ctx.drawImage(image, 2, 2);
}
const drawBike = (bike, tire, color) => {
    loadCanvas();
    let body; 
    let tires;
    if(bike){
        if(bike === 'road'){
            body = document.getElementById('rdBike');
        }else if(bike === 'mountain'){
            body = document.getElementById('mtBike');
        } 
        ctx.drawImage(body, 2, 2);
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
const canvasUpdateColor = (color) => {

}

module.exports = {
    loadCanvas,
    drawBike,
    canvasUpdateBike, 
    canvasUpdateTire,
    canvasUpdateColor,
}
