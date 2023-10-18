const canvasHandler = require('./canvas.js');

const handleResponse = async (response) => {
    const content = document.getElementById('content');
    const responseArea = document.getElementById('response');
    let jsonResponse;
    if(response.status !== 204){
        jsonResponse = await response.json();
    }
    switch(response.status){
        case 200:
            content.innerHTML = "";
            let keys = Object.keys(jsonResponse.body);
            //if searching for just one owners bikes
            if(jsonResponse.body[keys[0]].owner){
                for (let i = 0; i < keys.length; i++){
                    let current = jsonResponse.body[keys[i]];

                    //create elements
                    let currentDiv = document.createElement('div');
                    currentDiv.setAttribute('class', 'bikeCard');
                    let canvasDiv = document.createElement('div');
                    canvasDiv.setAttribute('class', 'canvasDiv');
                    let currentCanvas = document.createElement('canvas');
                    currentCanvas.setAttribute('id',`display${keys[i]}`);

                    currentDiv.innerHTML += `<h3>${jsonResponse.body[keys[i]].owner}'s Bike #${keys[i]}</h3>`

                    //piece the elements together
                    document.body.appendChild(currentDiv);
                    canvasDiv.appendChild(currentCanvas);
                    currentDiv.appendChild(canvasDiv);
                    content.appendChild(currentDiv);

                    canvasHandler.loadCanvas(currentCanvas.id);
                    canvasHandler.drawBike(current.body, current.tires, current.color);
                }
            }else{
                //if searching for all bikes
                //through users
                for(let i = 0; i < keys.length; i++){
                    let keysJ = Object.keys(jsonResponse.body[keys[i]]);
                    //through users bikes
                    for (let j = 0; j < keysJ.length; j++){
                        let current = jsonResponse.body[keys[i]][keysJ[j]];

                        //create elements
                        let currentDiv = document.createElement('div');
                        currentDiv.setAttribute('class', 'bikeCard');    
                        let canvasDiv = document.createElement('div');
                        canvasDiv.setAttribute('class', 'canvasDiv');    
                        let currentCanvas = document.createElement('canvas');
                        currentCanvas.setAttribute('id',`display${keys[i]}x${keysJ[j]}`);
                        
                        currentDiv.innerHTML += `<h3>${jsonResponse.body[keys[i]][keysJ[j]].owner}'s Bike #${keysJ[j]}</h3>`

                        //piece them together
                        document.body.appendChild(currentDiv);
                        canvasDiv.appendChild(currentCanvas);
                        currentDiv.appendChild(canvasDiv);
                        content.appendChild(currentDiv);
    
                        canvasHandler.loadCanvas(currentCanvas.id);
                        canvasHandler.drawBike(current.body, current.tires, current.color);
                    }
                }
            }
            break;
        case 204:
            responseArea.innerText = "Bike added to collection";
            break;
        case 201:
        case 400:
            if(jsonResponse.id === 'noUsername'){
                content.innerHTML = jsonResponse.message;
            }else{
                responseArea.innerHTML = jsonResponse.message;
            }
            break;
        case 404:
            content.innerHTML = jsonResponse.message;
            break;            
    }
}

const sendFetch = async (updateForm, userName) => {
    const formAction = updateForm.getAttribute('action');
    const formMethod = updateForm.getAttribute('method');

    let user = userName.value;
    if(updateForm.querySelector('#whoseBikes').value === 'community'){
        user = 'allBikes';
    }

    const formData = `user=${user}`;
    const response = await fetch(`${formAction}?${formData}`, {
        method: formMethod,
        headers:{
            'accept':'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    handleResponse(response, formMethod);
}

const sendPost = async (bikeForm, userName) => {
    const formAction = bikeForm.getAttribute('action');
    const formMethod = bikeForm.getAttribute('method');
    const user = userName.value;

    const formData = `user=${user}&body=${bikeForm.querySelector('#bikeBody').value}&tires=${bikeForm.querySelector('#bikeTire').value}&color=${bikeForm.querySelector('#bikeColor').value}`;
    const response = await fetch(formAction, {
        method: formMethod,
        headers: {
            'Accept':'application/json',
            'Content-Type':'application/x-www-form-urlencoded',
        },
        body: formData,
    });
    handleResponse(response, formMethod);
}

const init = () => {
    const bikeForm = document.getElementById('bikeForm');
    const updateForm = document.getElementById('updateForm');
    const userName = document.getElementById('usersName');
    const canvas = document.getElementById('canvas');
    const bikeSelect = document.getElementById('bikeBody');
    const tireSelect = document.getElementById('bikeTire');
    const colorSelect = document.getElementById('bikeColor');
    
    const addBike = (e) => {
        e.preventDefault();
        sendPost(bikeForm, userName);
        return false;
    }

    const updateBikes = (e) => {
        e.preventDefault();
        sendFetch(updateForm, userName);
        return false;
    }

    const canvasUpdate = (e) => {
        canvasHandler.loadCanvas(canvas.id);
        canvasHandler.drawBike(bikeSelect.value, tireSelect.value, colorSelect.value);
        return false;
    }

    canvasHandler.loadCanvas(canvas.id);
    bikeForm.addEventListener('submit', addBike);
    updateForm.addEventListener('submit', updateBikes);
    bikeSelect.addEventListener('change', canvasUpdate);
    tireSelect.addEventListener('change', canvasUpdate);
    colorSelect.addEventListener('change', canvasUpdate);
    /*
    Resize event stuff was derived from: 
    https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
    */
    window.addEventListener('resize', canvasUpdate);
}

window.onload = init;