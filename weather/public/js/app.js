const weatherForm = document.querySelector('#weatherForm');
const locationSearch = document.querySelector('#locationSearch');
const display = document.querySelector('#display');


weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const userLocation = locationSearch.value;
    fetch(`/weather?location=${userLocation}`)
    .then(response => response.json())
    .then(data => {
        if(data.error){
            console.error(data.error)
            return display.textContent = `error occured: ${data.error}`
        }else{
            console.log(data.weatherObj+';\n location is: '+data.cityName)
            display.textContent = data.weatherObj+';\nlocation is: '+data.cityName
        }
    })
    .catch(err => console.log(err));
})