const handleResponse = async (response) => {
    const content = document.getElementById('content');

    console.log(await response.json());
}

const sendFetch = async (updateForm, userName) => {
    const formAction = updateForm.getAttribute('action');
    const formMethod = updateForm.getAttribute('method');

    const user = userName.value;

    
    //const formData = `user=${user}`;
    const response = await fetch(formAction, {
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

    bikeForm.addEventListener('submit', addBike);
    updateForm.addEventListener('submit', updateBikes);
}

window.onload = init;