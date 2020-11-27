import { apiKey } from  './secret.js';

const defaultRequest = makeRequest()
const img = document.querySelector('img');
const root = document.querySelector('body')

const newImageInput = document.createElement('input')
newImageInput.type = 'text'
root.appendChild(newImageInput)

const newImageButton = document.createElement('button');
newImageButton.addEventListener('click', newImageHandler)
newImageButton.textContent = 'New Image'
newImageButton.type = 'button'
root.appendChild(newImageButton);

changeImage(defaultRequest, img)

function newImageHandler(event) {
    let newRequest
    if(newImageInput.value) {
        newRequest = makeRequest(newImageInput.value)
    } else {
        newRequest = makeRequest()
    }
    changeImage(newRequest, img)
}

async function changeImage(request, image) {
    try {
        let response = await fetch(request, { mode: 'cors' })
        let query
        if (response.ok) {
            query = await response.json()
            console.log(query)
        } else {
            throw new Error('No image found.')
        }
        image.src = query.data.images.original.url
    }
    catch (err) {
        console.log(err)
    }
}

function makeRequest(search = 'cat', endpoint = 'translate') {
    return `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${apiKey}&s=${search}`
}
