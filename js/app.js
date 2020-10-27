const result = document.querySelector('#resultado');
const form = document.querySelector('#formulario');
const pager = document.querySelector('#paginacion');

const imagesPerPage = 40;
let totalPages;
let iterator;

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
    const url = `https://pixabay.com/api/?key=${key}&q=${term}&per_page=${imagesPerPage}`;
    
    fetch(url)
        .then(data => data.json())
        .then(response => {
            totalPages = calculatePages(response.totalHits);
            showImages(response.hits);
        })
        .catch(error => {
            console.log(error);
        })
}

// Generator that will record the number of elements according to the pages
function *createPager(total) {
    for(let i = 1; i <= total; i++){
        yield i;
    }
}


function calculatePages(total) {
    return parseInt(Math.ceil(total/imagesPerPage));
}

function showImages(images){
    // console.log(images); Test
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }

    // Iterate over the image array and build the HTML
    images.forEach( image => {
        const { previewURL, likes, views, largeImageURL } = image;

        result.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}" />
                    <div class="p-4">
                        <p class="font-bold">${likes}<span class="font-light"> Me gusta</span></p>
                        <p class="font-bold">${views}<span class="font-light"> Vistas</span></p>

                        <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                            href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                            Ver Imagen
                        </a>
                    </div>
                </div>
            </div>
        `;
    });

    // Clean preview pager
    while(pager.firstChild){
        pager.removeChild(pager.firstChild);
    }

    printPager();
}

function printPager() {
    iterator = createPager(totalPages);

    while(true){
        const { value, done } = iterator.next();
        if(done) return;

        // Otherwise it generates a button for each element in the generator
        const button = document.createElement('a');
        button.href = '#';
        button.dataset.pagina = value;
        button.textContent = value;
        button.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','uppercase','rounded',);

        pager.appendChild(button);
    }
}

