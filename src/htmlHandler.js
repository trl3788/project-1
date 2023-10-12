const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../hosted/client.html`);
const css = fs.readFileSync(`${__dirname}/../hosted/style.css`);
const bundle = fs.readFileSync(`${__dirname}/../hosted/bundle.js`);
const mtBike = fs.readFileSync(`${__dirname}/../images/mountainBike.png`);
const rdBike = fs.readFileSync(`${__dirname}/../images/roadBike.png`);
const mtTires = fs.readFileSync(`${__dirname}/../images/mountainTires.png`);
const rdTires = fs.readFileSync(`${__dirname}/../images/roadTires.png`);

const serveFile = (response, file, contentType) => {
  response.writeHead(200, { 'Content-Type': contentType });
  response.write(file);
  response.end();
};

const getIndex = (request, response) => {
  serveFile(response, index, 'text/html');
};

const getCSS = (request, response) => {
  serveFile(response, css, 'text/css');
};

const getBundle = (request, response) => {
  serveFile(response, bundle, 'application/javascript');
}

const getMTBike = (request, response) => {
  serveFile(response, mtBike, 'image/png');
}
const getRDBike = (request, response) => {
  serveFile(response, rdBike, 'image/png');
}
const getMTTires = (request, response) => {
  serveFile(response, mtTires, 'image/png');
}
const getRDTires = (request, response) => {
  serveFile(response, mtTires, 'image/png');
}

module.exports = {
  getIndex,
  getCSS,
  getBundle,
  getMTBike, 
  getRDBike, 
  getMTTires, 
  getRDTires,
};
