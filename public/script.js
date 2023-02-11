window.initMap = function(){
    const searchElem = document.querySelector('[data-location-search]');
    const searchBox = new google.maps.places.SearchBox(searchElem);
    searchBox.addListener('places_changed', () => {
        const place = searchBox.getPlaces()[0]
        if(place == null) return
        const latitude = place.geometry.location.lat()
        const longitude = place.geometry.location.lng()
        //console.log(latitude, longitude) //works
        //this is all info we need to send that will be posted to our server
        fetch('/weather', { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
                'Accept': 'application/json'
            }, 
            body: JSON.stringify({
                latitude: latitude, 
                longitude: longitude
            })
        })    
        .then((res) => res.json())
        .then(data => { console.log(data)//setWeatherData(data, place.formatted_address)
    })

    })
}

function setWeatherData(data, place){

}