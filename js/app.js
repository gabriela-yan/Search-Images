const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');

window.onload = () => {
    form.addEventListener('submit', validateForm);
}

function validateForm(e) {
    e.preventDefault();

    const searchTerm = document.querySelector('#termino').value;

    if(searchTerm === ''){
        showAlert('Agrega un término de busqueda');
        return;
    }

    searchImages(searchTerm);
}

function showAlert(message) {

    const alertExist = document.querySelector('.alert');

    if(!alertExist){

        const alert = document.createElement('p');
        alert.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alert');

        alert.innerHTML = `
            <strong class="font-bold">¡Error!</strong>
            <span class="block sm:inline">${message}</span>
        `;

        form.appendChild(alert);

        setTimeout( () => {
            alert.remove();
        },3000);

    }
}

function searchImages(term) {
    const key = '...YOUR...API...KEY...';
    const url = `https://pixabay.com/api/?key=${key}&q=${term}`;
    
    fetch(url)
        .then(data => data.json())
        .then(response => {
            showImages(response.hits);
        })
}

function showImages(images){
    console.log(images);
}