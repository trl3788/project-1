const http = require('http');
const url = require('url');
const query = require('querystring');
const jsonHandler = require('./jsonHandler.js');
const htmlHandler = require('./htmlHandler.js');
const canvas = require('./canvas.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;
//#6564DB
//#FEFFA5
//#BBD5ED
//#CD533B
//#302B27

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/addBike': jsonHandler.addBike,
    '/updateBikes': jsonHandler.updateBikes,
    '/bundle.js':htmlHandler.getBundle,
    '/mountainBike.png': htmlHandler.getMTBike,
    '/roadBike.png': htmlHandler.getRDBike,
    '/mountainTires.png': htmlHandler.getMTTires,
    '/roadTires.png':htmlHandler.getRDTires,
    notFound: jsonHandler.notFound
}

const parseBody = (request, response, callback) => {
    const body = [];
    request.on('error', (err) => {
        console.dir(err);
        response.statusCode = 400;
        response.end();
    });
    
    request.on('data', (chunk) => {
        body.push(chunk);
    });
    
    request.on('end', () => {
        const bodyString = Buffer.concat(body).toString();
        const bodyParams = query.parse(bodyString);
        callback(request, response, bodyParams);
    });
    
}

const onRequest = (request, response) => {
    const parsedURL = url.parse(request.url);
    const params = query.parse(parsedURL.query);
    
    console.log(parsedURL);

    if(request.method === 'POST'){
        parseBody(request, response, jsonHandler.addBike);
    }else if(urlStruct[parsedURL.pathname]){
        urlStruct[parsedURL.pathname](request, response, params);
    }else {
        urlStruct.notFound(request, response, params);
    }
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1: ${port}`);
  });