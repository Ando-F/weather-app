//main data API response
async function getWeather(city) {
	try {
		const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&appid=fcad1320eb0e956061faac7fb0397e89', {mode:'cors'});
		return await response.json();
	} catch (error) {
		console.log(error);
	}
}

//preventing page reload
document.getElementById('search-form').addEventListener('click', (e) => {
	e.preventDefault();
});

//creating object for the start page
async function mainFunction(city) {
	const startCityData = await getWeather(city);
	console.log(startCityData);

	const weatherObj = {
		city: startCityData.name,
		temp: startCityData.main.temp,
		feels_like: startCityData.main.feels_like,
		temp_max: startCityData.main.temp_max,
		temp_min: startCityData.main.temp_min,
		clouds: startCityData.clouds.all,
		wind: startCityData.wind.speed,
		humidity: startCityData.main.humidity
	}
	console.log(weatherObj);

	createPage(weatherObj);
}

mainFunction('New York');

//getting name of the city and passing it to the main function
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
	const inputValue = document.getElementById('input-bar').value;
	mainFunction(inputValue);
})

//populate the page with data from weather object
function createPage(object) {
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
}