const users = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const addBike = (request, response, params) => {
  let statusCode;
  const responseJSON = {
    message: 'Bike Frame and Tires both required',
  };
  if (!params.body || !params.tires) {
    responseJSON.id = 'addMissingBikeParams';
    statusCode = 400;
    return respondJSON(request, response, statusCode, responseJSON);
  } if (!params.user) {
    responseJSON.message = 'Missing Username';
    responseJSON.id = 'addMissingUsername';
    statusCode = 400;
    return respondJSON(request, response, statusCode, responseJSON);
  }

  if (!users[params.user]) {
    responseJSON.message = 'Bike created successfully';
    statusCode = 201;
  } else if (users[params.user]) {
    statusCode = 204;
  }

  let bikeNumber = 1; // sets to one for new users
  if (users[params.user]) {
    // sets to the next number if the user exists
    bikeNumber = Object.keys(users[params.user]).length + 1;
  } else {
    users[params.user] = {};
  }

  users[params.user][bikeNumber] = {
    owner: params.user,
    body: params.body,
    tires: params.tires,
    color: params.color,
  };
  return respondJSON(request, response, statusCode, responseJSON);
};

const updateBikes = (request, response, params) => {
  const responseJSON = {
    message: 'Missing Username',
  };
  if (!params.user) {
    responseJSON.id = 'noUsername';
    return respondJSON(request, response, 400, responseJSON);
  } if (params.user === 'allBikes' && Object.keys(users).length !== 0) {
    responseJSON.message = 'Successfully retrieved';
    responseJSON.body = users;
    return respondJSON(request, response, 200, responseJSON);
  } if (params.user === 'allBikes' && Object.keys(users).length === 0) {
    responseJSON.message = 'No community bikes';
    responseJSON.id = 'noBikesInComm';
    return respondJSON(request, response, 404, responseJSON);
  } if (!users[params.user]) {
    responseJSON.message = 'No bikes found for that name';
    responseJSON.id = 'createNewBikes';
    return respondJSON(request, response, 404, responseJSON);
  }
  if (users[params.user]) {
    responseJSON.message = 'Successfully retrieved';
    responseJSON.body = users[params.user];
    return respondJSON(request, response, 200, responseJSON);
  }
  responseJSON.message = 'Bikes not found';
  responseJSON.id = 'errorInGet';
  return respondJSON(request, response, 404, responseJSON);
};

const updateBikesMeta = (request, response, params) => {
  if (!params.user) {
    return respondJSONMeta(request, response, 400);
  } if (params.user === 'allBikes' && Object.keys(users).length !== 0) {
    return respondJSONMeta(request, response, 200);
  } if (params.user === 'allBikes' && Object.keys(users).length === 0) {
    return respondJSONMeta(request, response, 404);
  } if (!users[params.user]) {
    return respondJSONMeta(request, response, 404);
  }
  if (users[params.user]) {
    return respondJSONMeta(request, response, 200);
  }
  return respondJSONMeta(request, response, 404);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notFoundMeta = (request, response) => { respondJSONMeta(request, response, 404); };

module.exports = {
  updateBikes,
  addBike,
  notFound,
  updateBikesMeta,
  notFoundMeta,
};
