
// Weather app embeded in the website

document.getElementById('get-weather').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiKey = '43e2048cc4984a55838214434240408'; // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                const weatherInfo = `
                    <p><strong>${data.location.name}, ${data.location.country}</strong></p>
                    <p>Temperature: ${data.current.temp_f}°F</p>
                    <p>Weather: ${data.current.condition.text}</p>
                    <p>UV: ${data.current.uv}</p>
                    <img src="${data.current.condition.icon}" alt="Weather icon" style="width: 50px; height: 50px;">
                `;
                document.getElementById('weather-info').innerHTML = weatherInfo;
            } else {
                document.getElementById('weather-info').innerHTML = `<p>Unable to retrieve weather data</p>`;
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('weather-info').innerHTML = `<p>Error fetching weather data</p>`;
        });
});
document.getElementById('city-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});