const users = {};

const respondJSON = (request, response, status, object) => {
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(object));
    response.end();
};

const addBike = (request, response, params) => {
    const responseJSON = {
        message: 'Bike Frame and Tires both required',
    };
    if(!params.body || !params.tires){
        responseJSON.id = 'addMissingBikeParams';
        return respondJSON(request, response, 400, responseJSON);
    }else if(!params.user){
        responseJSON.message = 'Missing Username';
        responseJSON.id = 'addMissingUsername';
        return respondJSON(request, response, 400, responseJSON);
    }

    if(!users[params.user]){
        responseJSON.message = 'Bike created successfully';
    }else if(users[params.user]){
        responseJSON.message = 'Bike created successfully and added to your collection';
    }

    let bikeNumber = 1; //sets to one for new users
    if(users[params.user]){
        bikeNumber = Object.keys(users[params.user]).length + 1; //sets to the next number if the user exists
    } else {
        users[params.user] = {};
    }

    users[params.user][bikeNumber] = {
        owner: params.user,
        body: params.body,
        tires: params.tires,
    }
    return respondJSON(request, response, 201, responseJSON);
}

const updateBikes = (request, response, params) => {
    const responseJSON = {
        message: 'Missing Username',
    }
    if(!params.user){
        responseJSON.id = 'addMissingUsername';
        return respondJSON(request, response, 400, responseJSON);
    }
    if(!users[params.user]){
        responseJSON.message = 'No bikes found for that name';
        responseJSON.id = 'createNewBikes';
        return respondJSON(request, response, 12345, responseJSON);
    }
    if(users[params.user]){
        responseJSON.message = 'Successfully retrieved';
        responseJSON.body = users[params.user];
        return responseJSON(request, response, 200, responseJSON);
    }
}

const notFound = () => {
    return false;
}

module.exports = {
    updateBikes,
    addBike,
    notFound,
}