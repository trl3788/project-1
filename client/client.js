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

const init = () => {
    const bikeForm = document.getElementById('bikeForm');
    const updateForm = document.getElementById('updateForm');
    const userName = document.getElementById('usersName');
    const cavnas = document.getElementById('canvas');
    
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

    const updateCanvas = (canvas) => {

    }

    updateCanvas(canvas);

    bikeForm.addEventListener('submit', addBike);
    updateForm.addEventListener('submit', updateBikes);
}

window.onload = init;