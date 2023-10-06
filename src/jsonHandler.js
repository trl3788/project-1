const bikes = {};

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
    }
}

const updateBikes = (request, response) => {

}