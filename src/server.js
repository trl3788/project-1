const http = require('http');
const url = require('url');
const query = require('querystring');
const jsonHandler = require('./jsonHandler.js');
const htmlHandler = require('./htmlHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,
    '/updateBikes': jsonHandler.updateBikes,
    '/bundle.js': htmlHandler.getBundle,
    '/mountainBike.png': htmlHandler.getMTBike,
    '/roadBike.png': htmlHandler.getRDBike,
    '/mountainTires.png': htmlHandler.getMTTires,
    '/roadTires.png': htmlHandler.getRDTires,
    notFound: jsonHandler.notFound,
  },
  POST: {
    '/addBike': jsonHandler.addBike,
  },
  HEAD: {
    '/updateBikes': jsonHandler.updateBikesMeta,
    notFound: jsonHandler.notFoundMeta,
  },
};

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
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);

  if (!urlStruct[request.method]) {
    return urlStruct.HEAD.notFound(request, response);
  }
  if (request.method === 'POST') {
    return parseBody(request, response, jsonHandler.addBike);
  } if (urlStruct[request.method][parsedURL.pathname]) {
    return urlStruct[request.method][parsedURL.pathname](request, response, params);
  }
  return urlStruct.GET.notFound(request, response, params);
};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
