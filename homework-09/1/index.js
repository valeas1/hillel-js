fetch('http://openweathermap.org/img/w/10d.png').then((res) => {
    let img = document.createElement('img');
    img.setAttribute('src', `${res.url}`);
    document.body.append(img);
});
fetch('http://api.openweathermap.org/data/2.5/weather?q=ODESSA,ua&units=metric&APPID=5d066958a60d315387d9492393935c19')
    .then((res) => res.json())
    .then(async (json) => {
        let div = document.createElement('div');
        let translation;

        const encodedParams = new URLSearchParams();
        encodedParams.append('text', `${json.weather[0].description}`);
        encodedParams.append('to', 'ru');

        await fetch('https://nlp-translation.p.rapidapi.com/v1/translate', {
            //этот фетч что бы описание было на русском, перевод может страдать)
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'c9c722d97dmshe045911f4b3cf7ep18e7d3jsna641ee553bb5',
                'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com',
            },
            body: encodedParams,
        })
            .then((response) => response.json())
            .then((response) => {
                translation = response.translated_text.ru;
            })
            .catch((err) => console.error(err));

        div.innerHTML = `
            Температура: ${Math.round(json.main.temp)}º <br>
            Давление: ${json.main.pressure} мбар<br>
            Описание: ${translation} <br>
            Влажность: ${json.main.humidity} % <br>
            Скорость ветра: ${json.wind.speed} м/с <br>
            Угол ветра: ${json.wind.deg} º
        `;
        document.body.append(div);
    });
