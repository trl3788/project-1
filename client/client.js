const canvasHandler = require('./canvas.js');

const handleResponse = async (response) => {
    const content = document.getElementById('content');
    console.log(response);
    const jsonResponse = await response.json();

    console.log(jsonResponse);
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

    const formData = `user=${user}&body=${bikeForm.querySelector('#bikeBody').value}&tires=${bikeForm.querySelector('#bikeTire').value}`;
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

const canvasUpdate = () => {

}

const init = () => {
    const bikeForm = document.getElementById('bikeForm');
    const updateForm = document.getElementById('updateForm');
    const userName = document.getElementById('usersName');
    const canvas = document.getElementById('canvas');
    const bikeSelect = document.getElementById('bikeBody');
    const tireSelect = document.getElementById('bikeTire');
    
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
        // if(e.target.id === 'bikeBody'){
        //     canvasHandler.canvasUpdateBike(bikeSelect.value);
        // }else if(e.target.id === 'bikeTire'){
        //     canvasHandler.canvasUpdateTire(tireSelect.value);
        // }
        canvasHandler.drawBike(bikeSelect.value, tireSelect.value);
        return false;
    }

    canvasHandler.loadCanvas(canvas);

    bikeForm.addEventListener('submit', addBike);
    updateForm.addEventListener('submit', updateBikes);
    bikeSelect.addEventListener('change', canvasUpdate);
    tireSelect.addEventListener('change', canvasUpdate);
}

window.onload = init;