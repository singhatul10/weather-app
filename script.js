async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!location) {
    resultDiv.innerHTML = "Please enter a location.";
    return;
  }

  const apiKey = "702a9d2cc76d42eb8e890845252607";
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Location not found.");
    }

    const data = await response.json();
    const temp = data.current.temp_c;
    const city = data.location.name;
    const country = data.location.country;

    resultDiv.innerHTML = `
      <strong>${city}, ${country}</strong><br>
      Temperature: <strong>${temp}°C</strong>
    `;
  } catch (error) {
    resultDiv.innerHTML = "Error: " + error.message;
  }
}
