const WeatherApi = {
    fetchWeather: (ev) => {
        let location = document.getElementById('location').value;
        let key = '2d807f8e0410259076e22bc75ee21372';
        let lang = 'en';
        let units = 'metric';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=${units}&lang=${lang}`;
        
        fetch(url)
            .then((resp) => {
                if (!resp.ok) throw new Error(resp.statusText);
                return resp.json();
            })
            .then((data) => {
                app.showWeather(data);
            })
            .catch(console.err);
        }
}