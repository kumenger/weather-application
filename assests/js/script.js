var submit = document.getElementById("submit");
var oEL = document.getElementById("serchHistory");
var todayWeather = document.getElementById("today");
var weekforcastEL = document.getElementById("fivedays");
var modal=document.getElementById('modal-content')
var openWatherApiKey = "87710827a4c6f11401d8a2d244caad74";
var cityValue = document.getElementById("cityInput");
var cities = JSON.parse(localStorage.getItem("cities") || "[]");
var SerchHistory = JSON.parse(localStorage.getItem("cities"));
localStorage.setItem("cities", JSON.stringify(cities));

var isExits = false;
window.addEventListener("load", () => {
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
if(!val){
  alert('Please Enter City ')
  return
}
else
  var baseurlNow = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=${openWatherApiKey}`;

  fetch(baseurlNow)
    .then((resp) => resp.json())
    .then((data) => {
      var newlat = data.coord.lat;
      var newLon = data.coord.lon;
      var fiveDayBaseUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${newlat}&lon=${newLon}&appid=87710827a4c6f11401d8a2d244caad74&units=imperial`;
      let obj = {
        cityame: data.name,
        cord: {
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
      };
      //if previosuly city was  add to local storage not push to array bro
    for (var elem of SerchHistory) {
        if (elem.cityame === data.name) {
          isExits = true;
        }
      }
      if (!isExits) {
        cities.push(obj);
      }

      fetch(fiveDayBaseUrl)
        .then((response) => response.json())
        .then((data) => {
          var time2 = dayjs.unix(data.list[0].dt);
          var CitynameDateIcon = document.createElement("h1");
          CitynameDateIcon.innerHTML = `${data.city.name}(${time2.format(
            "DD/MM/YYYY"
          )})`;
          var tempdoc = document.createElement("p");
          var winddoc = document.createElement("p");
          var humdoc = document.createElement("p");
          tempdoc.innerHTML = `Temp: ${data.list[0].main.temp} °F`;
          winddoc.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`;
          humdoc.innerHTML = `Humidity: ${data.list[0].main.humidity} %`;
          todayWeather.appendChild(CitynameDateIcon);
          todayWeather.appendChild(winddoc);
          todayWeather.appendChild(humdoc);
          todayWeather.append(tempdoc);
          var weekForcast = data.list;

          for (let i = 7; i < weekForcast.length; i = i + 8) {
            var CitynameDateIconW = document.createElement("h1");
            var nextDay = dayjs.unix(weekForcast[i].dt);
            CitynameDateIconW.innerHTML = `${nextDay.format("DD/MM/YYYY")}`;
            var tempdocW = document.createElement("p");
            var winddocW = document.createElement("p");
            var humdocW = document.createElement("p");
            tempdocW.innerHTML = `Temp: ${data.list[i].main.temp} °F`;
            winddocW.innerHTML = `Wind: ${data.list[i].wind.speed} MPH`;
            humdocW.innerHTML = `Humidity: ${data.list[i].main.humidity} %`;
            weekforcastEL.appendChild(CitynameDateIconW);
            weekforcastEL.appendChild(tempdocW);
            weekforcastEL.appendChild(winddocW);
            weekforcastEL.append(humdocW);
          }
        }).catch(err=>alert(err));
    }).catch(err=>alert(err));
});
