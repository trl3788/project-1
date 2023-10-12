const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const loadCanvas = () => {
    ctx.fillStyle = '#302B27';
    ctx.fillRect(0,0,canvas.getBoundingClientRect().width,canvas.getBoundingClientRect().height);
}


module.exports = {
    loadCanvas,
}
