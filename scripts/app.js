const citylocation = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");





const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span> ${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>`

    // night and day & icons

    iconSrc = `img/icons/${weather.WeatherIcon}.svg`

    icon.setAttribute('src', iconSrc);

    // using ternary opertors

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // if (weather.IsDayTime) {
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }

    time.setAttribute('src', timeSrc);

    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    }
};

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets: cityDets,
        weather: weather
    };


};

citylocation.addEventListener('submit', (e) => {

    e.preventDefault();
    const city = citylocation.city.value.trim();
    citylocation.reset();

    // update city UI

    updateCity(city).then((data) => {
        updateUI(data)
    }).catch((err) => {
        console.log(err);
    });
});









