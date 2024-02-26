document.addEventListener('DOMContentLoaded', function() {
    const weatherCtx = document.getElementById('weatherChart').getContext('2d');

    // Replace with your actual API key and endpoint
    fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=690239406f7534b3f7dd8c03384d6c89')
        .then(response => response.json())
        .then(data => {
            const temp = (data.main.temp - 273.15).toFixed(2); // Convert Kelvin to Celsius
            const feels_like = (data.main.feels_like - 273.15).toFixed(2); // Convert Kelvin to Celsius
            const humidity = data.main.humidity;

            new Chart(weatherCtx, {
                type: 'line',
                data: {
                    labels: ['Temperature', 'Feels Like', 'Humidity'],
                    datasets: [{
                        label: 'Weather Data for London',
                        data: [temp, feels_like, humidity],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        fill: false,
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: false
                        }
                    },
                    plugins: {
                        legend: {
                            display: true
                        },
                        title: {
                            display: true,
                            text: 'Current Weather Data'
                        }
                    }
                }
            });
        });
});
