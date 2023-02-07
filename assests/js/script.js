
var submit=document.getElementById('submit')
var openWatherApiKey = "87710827a4c6f11401d8a2d244caad74";
var cityValue = document.getElementById('cityInput')


submit.addEventListener('click',(e)=>{
  e.preventDefault()
  var val=cityValue.value
  console.log(val);
  var baseurlNow = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${openWatherApiKey}`;

  fetch(baseurlNow)
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data)
    // localStorage.setItem("lat", data.coord.lat);
    // localStorage.setItem("lon", data.coord.lon);
  });
})
// var fiveDayBaseUrl =
//   "https://api.openweathermap.org/data/2.5/forecast?lat=39.7392&lon=-104.9847&appid=87710827a4c6f11401d8a2d244caad74";
// fetch(fiveDayBaseUrl)
//   .then( (response)=> 
//     response.json()
//   )
//   .then( (data) =>{
//     console.log(data);
//   });
