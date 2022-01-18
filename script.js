//main data API response
async function getWeather(city) {
	try {
		const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=fcad1320eb0e956061faac7fb0397e89', {mode:'cors'});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

//second API call, using data from the first one
async function oneCallAPI(lon, lat) {
	try {
		const response = await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=metric&appid=fcad1320eb0e956061faac7fb0397e89')
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

//preventing page reload
document.getElementById('search-form').addEventListener('click', (e) => {
	e.preventDefault();
});

function getDayName(number) {
	let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	let today = new Date();
	let dayNum = today.getDay() + number;
	if (dayNum <= 6) {
		return days[dayNum];
	} else {
		return days[dayNum - 7];
	}
}

//creating object for the start page
async function mainFunction(city) {
	//working with data from the first API. Getting some basic info and coordinates of the types city
	//in order to use another API call.
	const cityData = await getWeather(city);
	console.log(cityData);
	const weatherObj = {
		city: cityData.name,
		temp: Math.round(cityData.main.temp),
		feels_like: Math.round(cityData.main.feels_like),
		temp_max: Math.round(cityData.main.temp_max),
		temp_min: Math.round(cityData.main.temp_min),
		clouds: cityData.clouds.all,
		wind: cityData.wind.speed,
		humidity: cityData.main.humidity,
		lon: cityData.coord.lon,
		lat: cityData.coord.lat
	};

	//creating another object from second API data to get daily forecast
	const openCallData = await oneCallAPI(weatherObj.lon, weatherObj.lat);
	console.log(openCallData);
	const openCallObj = {
		one: {
			dayTemp: openCallData.daily[1].temp.day,
			nightTemp: openCallData.daily[1].temp.night
		},
		two: {
			dayTemp: openCallData.daily[2].temp.day,
			nightTemp: openCallData.daily[2].temp.night
		},
		three: {
			dayTemp: openCallData.daily[3].temp.day,
			nightTemp: openCallData.daily[3].temp.night
		},
		four: {
			dayTemp: openCallData.daily[3].temp.day,
			nightTemp: openCallData.daily[3].temp.night
		},
		five: {
			dayTemp: openCallData.daily[4].temp.day,
			nightTemp: openCallData.daily[4].temp.night
		},
		six: {
			dayTemp: openCallData.daily[5].temp.day,
			nightTemp: openCallData.daily[5].temp.night
		},
		seven: {
			dayTemp: openCallData.daily[6].temp.day,
			nightTemp: openCallData.daily[6].temp.night
		},
		eight: {
			dayTemp: openCallData.daily[7].temp.day,
			nightTemp: openCallData.daily[7].temp.night
		}
	};
	console.log(openCallObj);

	//populating the page
	createPage(weatherObj, openCallObj);
}

mainFunction('New York');

//getting name of the city and passing it to the main function
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
	const inputValue = document.getElementById('input-bar').value;
	mainFunction(inputValue);
})

//populate the page with data from weather object
function createPage(object, openCallObj) {
	//main block
	const cityName = document.getElementById("city-name");
	cityName.innerHTML = object.city;

	const currentTemp = document.getElementById('current-temp');
	currentTemp.innerHTML = object.temp + '°C';

	const maxTemp = document.getElementById('max-temp');
	maxTemp.innerHTML = object.temp_max + '°C';

	const minTemp = document.getElementById('min-temp');
	minTemp.innerHTML = object.temp_min + '°C';

	//secondary block
	const feelsLike = document.getElementById("feels-like");
	feelsLike.innerHTML = "Feels like: <br>" + object.feels_like + '°C';

	const humidity = document.getElementById("humidity");
	humidity.innerHTML = "Humidity: <br>" + object.humidity + '%';

	const windSpeed = document.getElementById("wind-speed");
	windSpeed.innerHTML = "Wind speed: <br>" + object.wind + ' m/s';

	//daily block
	const tomorrow = document.getElementById('tomorrow');
	tomorrow.innerHTML = getDayName(0);
	const tomTemp = document.getElementById('tom-temp');
	tomTemp.innerHTML = openCallObj.one.dayTemp;

	const dayAfter1 = document.getElementById('day-after-1');
	dayAfter1.innerHTML = getDayName(1);

	const dayAfter2 = document.getElementById('day-after-2');
	dayAfter2.innerHTML = getDayName(2);

	const dayAfter3 = document.getElementById('day-after-3');
	dayAfter3.innerHTML = getDayName(3);

	const dayAfter4 = document.getElementById('day-after-4');
	dayAfter4.innerHTML = getDayName(4);

	const dayAfter5 = document.getElementById('day-after-5');
	dayAfter5.innerHTML = getDayName(5);

	const dayAfter6 = document.getElementById('day-after-6');
	dayAfter6.innerHTML = getDayName(6);
}