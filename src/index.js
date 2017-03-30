function accessGoogleMapsApi (latitude, longitude, cb) {
   const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+latitude+','+longitude+'&sensor=true'

	fetch(url, {
		method: 'get'
	}).then(function (response) {
		if (response.status === 400) {
			cb(null)
		}

		response.json().then((json) => {
			cb(json)
		})

	}).catch(function (err) {
		// Error :(
		console.log(err);
		cb(null)
	});
}

function extractName (response) {
   var res = response.results
   for(var key in res[0].address_components){
      if(res[0].address_components[key].types[0] === 'administrative_area_level_2'){
         return res[0].address_components[key].long_name
      }
   }
}

function getCityByPoint (latitude, longitude, cb) {
   accessGoogleMapsApi(latitude, longitude, (response) => {
	
      let city = null

      if(response !== null)
         city = extractName(response)   

      cb(city)
   })
}

var pointToCityJs = {
   getCityByPoint : getCityByPoint
}

module.exports = pointToCityJs;