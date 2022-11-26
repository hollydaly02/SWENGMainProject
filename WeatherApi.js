const WeatherApi = {
    fetchWeather: (ev) => {
        let location = document.getElementById('location').value;
        let key = 'T3LMXH7MYPS35QRD3B62FD8A3';
        let sDate = document.getElementById('sDate').value
        let fDate = document.getElementById('fDate').value
        //let lang = 'en';
        //let units = 'metric';
        let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${sDate}/${fDate}?key=${key}`;
        
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