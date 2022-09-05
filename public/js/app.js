console.log("Client side javascript file loaded");

const url = `/weather?address=`
const form = document.querySelector('form')
const input = document.querySelector('input')
const loading = document.getElementById('loading')
const locationElement = document.getElementById('location')
const forecast = document.getElementById('forecast')

form.addEventListener('submit', (e) => {

    e.preventDefault();
    let location = input.value;
    input.value = '';

    loading.textContent = 'Loading...'
    loading.classList.remove('hide')
    
    fetch(url + location).then(response => {
        response.json().then(data => {
            if(data.error){
                loading.textContent = data.error;
                loading.style.color = 'red'
            } else {
                loading.classList.add('hide');
                locationElement.textContent = data.name;
                forecast.innerHTML = data.forecast;
            }
        })
    })
})



