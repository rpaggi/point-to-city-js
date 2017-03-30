const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const accessGoogleMapsApi = (latitude, longitude, cb) => {
	let xhr = new XMLHttpRequest();
   const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true'

	xhr.open('GET', url, true)
	xhr.responseType = 'arraybuffer'
	xhr.onload = (error) => {
      if(error){
         return null;
      }
      cb(JSON.parse(xhr.responseText))
   }
	xhr.send()
}

const extractName = (response) => {
   var res = response.results
   for(var key in res[0].address_components){
      if(res[0].address_components[key].types[0] === 'administrative_area_level_2'){
         return res[0].address_components[key].long_name
      }
   }
}

const getCityByPoint = (latitude, longitude, cb) => {
   accessGoogleMapsApi(latitude, longitude, (response) => {
      let city = null

      if(response.status !== 'ZERO_RESULTS')
         city = extractName(response)   

      cb(city)
   })
}

var pointToCityJs = {
   getCityByPoint : getCityByPoint
}

module.exports = pointToCityJs;
