var submit = document.getElementById("submit");
var oEL = document.getElementById("serchHistory");
var openWatherApiKey = "87710827a4c6f11401d8a2d244caad74";
var cityValue = document.getElementById("cityInput");
   var cities = JSON.parse(localStorage.getItem("cities") || "[]");
  var SerchHistory = JSON.parse(localStorage.getItem("cities"));
  localStorage.setItem("cities", JSON.stringify(cities));

var isExits = false;
window.addEventListener("load", () => {

  console.log(SerchHistory);
  if (SerchHistory) {
    for (var elem of SerchHistory) {
      var liEl = document.createElement("li");
      liEl.textContent = elem.cityame;
      oEL.appendChild(liEl);
    }
  }
});

submit.addEventListener("click", (e) => {
  e.preventDefault();
  var val = cityValue.value;
  console.log(val);
  var baseurlNow = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${openWatherApiKey}`;

  fetch(baseurlNow)
    .then((resp) => resp.json())
    .then((data) => {
     
      let obj = {
        cityame: data.name,
        cord: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
      };
      //if previosuly city was  add to local storage not push to array

      for (var elem of SerchHistory) {
        if (elem.cityame === data.name) {
          isExits = true;
        }
      }
      if (!isExits) {
        cities.push(obj);
      }

      // var liEl = document.createElement("li");
      // liEl.textContent = val;
      // oEL.appendChild(liEl);
      // localStorage.setItem("lat", data.coord.lat);
      // localStorage.setItem("lon", data.coord.lon);
      localStorage.setItem("cities", JSON.stringify(cities));
      setInterval(()=>{ window.location.reload()},1000)
      
    });
});
// var fiveDayBaseUrl =
//   "https://api.openweathermap.org/data/2.5/forecast?lat=39.7392&lon=-104.9847&appid=87710827a4c6f11401d8a2d244caad74";
// fetch(fiveDayBaseUrl)
//   .then( (response)=>
//     response.json()
//   )
//   .then( (data) =>{
//     console.log(data);
//   });
