var submit = document.getElementById("submit");
var oEL = document.getElementById("serchHistory");
var todayWeather = document.getElementById("today");
var weekforcastEL = document.getElementById("fivedays");
var newh3hold = document.getElementById("newh3hold");
var display = document.getElementById("display");
var openWatherApiKey = "87710827a4c6f11401d8a2d244caad74";
var cityValue = document.getElementById("cityInput");
var cities = JSON.parse(localStorage.getItem("cities") || "[]");
var serchHistoryEL = document.getElementsByClassName("styleList");
var errorDisaplyEL = document.getElementById("errDisaply");

oEL.addEventListener("click", function (e) {
  if ((e.target.tagname = "li")) {
    fetchWather(e.target.innerHTML);
  }
});

var isExits = false;
window.addEventListener("load", () => {
  display.style.display = "block";
  if (cities.length > 0) {
    for (var elem of cities) {
      var liEl = document.createElement("li");
      liEl.classList.add("styleList");

      liEl.textContent = elem.cityame;
      oEL.appendChild(liEl);
    }
  }

  navigator.geolocation.getCurrentPosition((p) => {
    todayWeather.innerHTML = "";
    weekforcastEL.innerHTML = "";
    let lat = p.coords.latitude;
    let long = p.coords.longitude;
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=87710827a4c6f11401d8a2d244caad74&units=imperial`;

    fetch(url)
      .then((resp)=>resp.json())
      .then((data) => {
        var time2 = dayjs.unix(data.list[0].dt);
        var CitynameDateIcon = document.createElement("h1");
        CitynameDateIcon.innerHTML = `Your Located in ${
          data.city.name
        }(${time2.format("DD/MM/YYYY")})`;
        var tempdoc = document.createElement("h4");
        var winddoc = document.createElement("h4");
        var humdoc = document.createElement("h4");
        var todayImg = document.createElement("img");
        todayImg.setAttribute(
          "src",
          "http://openweathermap.org/img/wn/" +
            data.list[0].weather[0].icon +
            "@2x.png"
        );
        tempdoc.innerHTML = `Temp: ${data.list[0].main.temp} °F`;
        winddoc.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`;
        humdoc.innerHTML = `Humidity: ${data.list[0].main.humidity} %`;

        todayWeather.appendChild(CitynameDateIcon);
        todayWeather.appendChild(todayImg);
        todayWeather.appendChild(winddoc);
        todayWeather.appendChild(humdoc);
        todayWeather.appendChild(tempdoc);
      });
  });
});

submit.addEventListener("click", (e) => {
  e.preventDefault();

  display.style.display = "block";
  var val = cityValue.value;
  if (!val) {
    errorDisaplyEL.style.display = "block";
    errorDisaplyEL.innerHTML = "City Required";

    setInterval(() => {
      errorDisaplyEL.style.display = "none";
    }, 2000);
  } else fetchWather(val);
});

const fetchWather = (city) => {
  var baseurlNow = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWatherApiKey}`;

  fetch(baseurlNow)
    .then(function (resp) {
      if (resp.status === 404) {
        errorDisaplyEL.style.display = "block";
        errorDisaplyEL.innerHTML = "City not Found!!";

        setInterval(() => {
          errorDisaplyEL.style.display = "none";
        }, 2000);
      } else 
       return resp.json();
    })
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
      var lielhere = document.createElement("li");
      lielhere.innerHTML = data.name;
      lielhere.classList.add("styleList");

      oEL.appendChild(lielhere);
      //if previosuly city was  add to local storage not push to array bro
      if (cities.length > 0) {
        for (var elem of cities) {
          if (elem.cityame === data.name) {
            isExits = true;
          }
        }
      }

      if (!isExits) {
        cities.push(obj);
      }
      localStorage.setItem("cities", JSON.stringify(cities));

      fetch(fiveDayBaseUrl)
        .then((response) => response.json())
        .then((data) => {
          var time2 = dayjs.unix(data.list[0].dt);
          var CitynameDateIcon = document.createElement("h1");
          CitynameDateIcon.innerHTML = `${data.city.name}(${time2.format(
            "DD/MM/YYYY"
          )})`;
          var tempdoc = document.createElement("h4");
          var winddoc = document.createElement("h4");
          var humdoc = document.createElement("h4");
          var todayImg = document.createElement("img");
          todayImg.setAttribute(
            "src",
            "http://openweathermap.org/img/wn/" +
              data.list[0].weather[0].icon +
              "@2x.png"
          );
          tempdoc.innerHTML = `Temp: ${data.list[0].main.temp} °F`;
          winddoc.innerHTML = `Wind: ${data.list[0].wind.speed} MPH`;
          humdoc.innerHTML = `Humidity: ${data.list[0].main.humidity} %`;
          todayWeather.innerHTML = "";
          weekforcastEL.innerHTML = "";
          newh3hold.innerHTML = "";
          todayWeather.appendChild(CitynameDateIcon);
          todayWeather.appendChild(todayImg);
          todayWeather.appendChild(winddoc);
          todayWeather.appendChild(humdoc);
          todayWeather.appendChild(tempdoc);
          var weekForcast = data.list;
          var newH3 = document.createElement("h2");
          newH3.innerHTML = "5-day forcast";
          newh3hold.appendChild(newH3);
          for (let i = 7; i < weekForcast.length; i = i + 8) {
            var CitynameDateIconW = document.createElement("h1");
            var iconhold = document.createElement("img");
            var weekHolderDiv = document.createElement("div");
            weekHolderDiv.classList.add("weeksDiv");
            var nextDay = dayjs.unix(weekForcast[i].dt);
            CitynameDateIconW.innerHTML = `${nextDay.format("DD/MM/YYYY")}`;
            var tempdocW = document.createElement("p");
            var winddocW = document.createElement("p");
            var humdocW = document.createElement("p");

            iconhold.setAttribute(
              "src",
              "http://openweathermap.org/img/wn/" +
                weekForcast[i].weather[0].icon +
                "@2x.png"
            );
            tempdocW.innerHTML = `Temp: ${data.list[i].main.temp} °F`;
            winddocW.innerHTML = `Wind: ${data.list[i].wind.speed} MPH`;
            humdocW.innerHTML = `Humidity: ${data.list[i].main.humidity} %`;

            weekHolderDiv.appendChild(CitynameDateIconW);
            weekHolderDiv.appendChild(iconhold);
            weekHolderDiv.appendChild(tempdocW);
            weekHolderDiv.appendChild(winddocW);
            weekHolderDiv.append(humdocW);

            weekforcastEL.appendChild(weekHolderDiv);
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
