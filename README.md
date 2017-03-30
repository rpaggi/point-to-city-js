# point-to-city-js

> This package use the Google Maps API to parse a point(latitude and longitude) to a City.

## Install
```
npm install point-to-city-js

```
## How to use
```js
var pointToCityJs = require('point-to-city-js')

pointToCityJs.getCityByPoint('-25.0347189', '-49.3596443', (city) => {
   console.log(city) 
})
```

## License

This package is free and is open source, ditributed under "The MIT License". So feel free to use it in your project without citing or using a warning.

If you want to give me any credit in your project or make a tweet citing [@rpaggi](https://twitter.com/rpaggi), it will be cool 😊