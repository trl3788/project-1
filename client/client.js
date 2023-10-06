const handleResponse = async (response) => {
    const content = document.getElementById('content');

}

const sendFetch = async (updateForm) => {
    const formAction = userForm.getAttribute('action');
    const formMethod = userForm.getAttribute('method');

    const response = await fetch(formAction, {
        method: formMethod,
        headers:{
            'accept':'application/json',
        }
    })
    handleResponse(response, formMethod);
}

const sendPost = async (bikeForm) => {
    const formAction = bikeForm.getAttribute('action');
    const formMethod = bikeForm.getAttribute('method');
    
    const formData = `body=${bikeForm.querySelector('#bikeBody').value}&tires=${bikeForm.querySelector('#bikeTire').value}`;
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
    
    const addBike = (e) => {
        e.preventDefault();
        sendPost(bikeForm);
        return false;
    }

    const updateBikes = (e) => {
        e.preventDefault();
        sendFetch(updateForm);
        return false;
    }

    bikeForm.addEventListener('submit', addBike);
    updateForm.addEventListener('submit', updateBikes);
}

window.onload = init;