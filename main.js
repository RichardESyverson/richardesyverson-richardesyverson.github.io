
// Weather app embeded in the website

function getWeather() {
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
                    <img src="${data.current.condition.icon}" alt="Weather icon" style="width: 100px; height: 100px;">
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
}

document.getElementById('get-weather').addEventListener('click', getWeather);

document.getElementById('city-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

//for the scroll effect
window.addEventListener('scroll', function() {
    const sidebar = document.querySelector('.sidebar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        sidebar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        sidebar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    } else {
        sidebar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        sidebar.style.boxShadow = 'none';
    }
});


//pulse animation

// Function to update the active link based on scroll position
// Function to update the active link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section:not(.ignore-highlight)'); // Skip sections with the class 'ignore-highlight'
    const navLinks = document.querySelectorAll('.sidebar a');
    let currentIndex = -1;

    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= window.innerHeight / 3) {
            currentIndex = index;
        }
    });

    navLinks.forEach((link, index) => {
        link.classList.remove('active');
        if (index === currentIndex) {
            link.classList.add('active');
        }
    });
}

// Debounce function to limit how often the scroll event handler is executed
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Update the active link on scroll with debouncing
document.addEventListener('scroll', debounce(updateActiveLink, 100));

// Update the active link on page load
document.addEventListener('DOMContentLoaded', updateActiveLink);

// Reset active links on page reload
window.addEventListener('load', function() {
    const navLinks = document.querySelectorAll('.sidebar a');
    navLinks.forEach(link => link.classList.remove('active'));
});
