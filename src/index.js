import { apiKey } from  './secret.js';

let request = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&s=cat&rating=0`;
const img = document.querySelector('img');
fetch(request, { mode: 'cors' })
    .then( (response)=> {
        return response.json();
    })
    .then( (response)=> {
        img.src = response.data.images.original.url;
    });