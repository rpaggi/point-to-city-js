const request = require ('request');

const accessGoogleMapsApi = (latitude, longitude, cb) => {
   const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true'

   request.get(url, (error, response, body) => {
      if(error){
         return null;
      }

      cb(JSON.parse(body))
   })
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