const time = document.querySelector('.time');
const day = document.querySelector('.day');
const dayTimes = document.querySelector('.day-times');
const name = document.querySelector('.name');
const focusTask = document.querySelector('.focus__task');
const quote = document.querySelector('.quote');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const button = document.querySelector('.button');
const weather = document.querySelector('.weather');
const weatherInfo = document.querySelector('.weather__info');
const weatherIcon = document.querySelector('.weather__icon');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const weatherAirHumidity = document.querySelector('.weather__air-humidity');
const weatherWindSpeed = document.querySelector('.weather__wind-speed');
const selectCity = document.querySelector('.weather__select-city');
const backgroundButton = document.querySelector('.background-button');
const loader = `<div class="loader"></div>`;

const morning = [
    './assets/images/background/morning/1.jpg',
    './assets/images/background/morning/2.jpg',
    './assets/images/background/morning/3.jpg',
    './assets/images/background/morning/4.jpg'
];

const afternoon = [
    './assets/images/background/afternoon/1.jpg',
    './assets/images/background/afternoon/2.jpg',
    './assets/images/background/afternoon/3.jpg',
    './assets/images/background/afternoon/4.jpg'
];

const evening = [
    './assets/images/background/evening/1.jpg',
    './assets/images/background/evening/2.jpg',
    './assets/images/background/evening/3.jpg',
    './assets/images/background/evening/4.jpg'
];

const night = [
    './assets/images/background/night/1.jpg',
    './assets/images/background/night/2.jpg',
    './assets/images/background/night/3.jpg',
    './assets/images/background/night/4.jpg'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const randomBackground = (array) => {
    array.sort(() => Math.random() - 0.5);
};

randomBackground(morning);
randomBackground(afternoon);
randomBackground(evening);
randomBackground(night);

let i = 0;
const changeBackground = (imageSrc) => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.onload = () => document.querySelector('body').style.backgroundImage = `url(${imageSrc})`;
};

const setBackground = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) {
        document.querySelector('body').style.backgroundImage = `url(${morning[0]})`;
    } else if (hours >= 12 && hours < 18) {
        document.querySelector('body').style.backgroundImage = `url(${afternoon[0]})`;
    } else if (hours >= 18 && hours < 24) {
        document.querySelector('body').style.backgroundImage = `url(${evening[0]})`;
    } else if (hours >= 0 && hours < 6) {
        document.querySelector('body').style.backgroundImage = `url(${night[0]})`;
    }
}

const getBackground = () => {
    const date = new Date();
    const hours = date.getHours();

    let index;
    let imageSrc;
    let imagesArray;

    if (hours >= 6 && hours < 12) {
        imagesArray = morning.concat(afternoon, evening, night);
    } else if (hours >= 12 && hours < 18) {
        imagesArray = afternoon.concat(evening, night, morning);
    } else if (hours >= 18 && hours < 24) {
        imagesArray = evening.concat(night, morning, afternoon);
    } else if (hours >= 0 && hours < 6) {
        imagesArray = night.concat(morning, afternoon, evening);
    }

    index = i % imagesArray.length;
    imageSrc = imagesArray[index];

    changeBackground(imageSrc);
    i++;
};

const showDate = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const weekDay = days[date.getDay() - 1];
    const month = months[date.getMonth()];
    const monthDay = date.getDate();

    time.innerHTML = `${hours}:${fixSingleValue(minutes)}:${fixSingleValue(seconds)}`;
    day.innerText = `${weekDay}, ${monthDay} ${month}`;

    setTimeout(showDate, 1000);
}

const fixSingleValue = (value) => parseInt(value, 10) < 10 ? `0${value}` : `${value}`;

const changeDayTimes = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours < 12) {
        dayTimes.innerText = 'Good Morning, ';
    } else if (hours >= 12 && hours < 18) {
        dayTimes.innerText = 'Good Afternoon, ';
    } else if (hours >= 18 && hours < 24) {
        dayTimes.innerText = 'Good Evening, ';
    } else if (hours >= 0 && hours < 6) {
        dayTimes.innerText = 'Good Night, ';
    }
};

const setName = (e) => {
    if (e.type === 'keypress') {
        if (e.keyCode == 13) {
            if (e.target.textContent == '') {
                e.target.textContent = localStorage.getItem('name');
            }
            localStorage.setItem('name', e.target.textContent);
            e.target.blur();
        }
    } else {
        if (e.target.textContent == '') {
            e.target.textContent = localStorage.getItem('name');
        }
        localStorage.setItem('name', e.target.textContent);
    }
};

const getName = () => {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Write your name]';
        localStorage.setItem('name', name.textContent);
    } else {
        name.textContent = localStorage.getItem('name');
    }
};

const setFocus = (e) => {
    if (e.type === 'keypress') {
        if (e.keyCode == 13) {
            if (e.target.textContent == '') {
                e.target.textContent = localStorage.getItem('focus');
            }
            localStorage.setItem('focus', e.target.textContent);
            e.target.blur();
        }
    } else {
        if (e.target.textContent == '') {
            e.target.textContent = localStorage.getItem('focus');
        }
        localStorage.setItem('focus', e.target.textContent);
    }
};

const getFocus = () => {
    if (localStorage.getItem('focus') === null) {
        focusTask.textContent = '[Write your focus for today]';
        localStorage.setItem('focus', focusTask.textContent);
    } else {
        focusTask.textContent = localStorage.getItem('focus');
    }
};

async function getQuote() {
    let buttonInnerElement = `<div class="quote__button"></div>`;
    button.innerHTML = loader;
    await fetch('https://api.quotable.io/random')
        .then(res => res.json())
        .then(body => {
            blockquote.textContent = body.content;
            figcaption.textContent = body.author;
            button.innerHTML = buttonInnerElement;
            quote.classList.add('opacity');
        })
        .then(quote.classList.remove('opacity'))
};

async function getWeather() {
    document.querySelector('.result').innerHTML = loader;
    weatherInfo.textContent = '';
    weatherIcon.classList = '';
    weatherDescription.textContent = '';
    weatherTemperature.textContent = '';
    weatherAirHumidity.textContent = '';
    weatherWindSpeed.textContent = '';

    let cityName = (!selectCity.textContent) ? localStorage.getItem('city') : selectCity.textContent;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=en&appid=350626f97bfd83f95eee81ddd708faa6&units=imperial`)
        .then(res => {
            if (!res.ok) {
                weatherInfo.textContent = 'Something went wrong!';
                weatherIcon.classList = '';
                weatherDescription.textContent = '';
                weatherAirHumidity.textContent = '';
                weatherWindSpeed.textContent = '';
                weatherTemperature.textContent = '';
                weatherInfo.classList.add('opacity');
                document.querySelector('.result').innerHTML = '';
                localStorage.clear('city');
            } else {
                weatherInfo.textContent = '';
            }
            return res.json()
        })
        .then(weatherInfo.classList.remove('opacity'))
        .then(body => {
            weatherIcon.className = 'weather__icon owf';
            weatherIcon.classList.add(`owf-${body.weather[0].id}`);
            weatherDescription.textContent = body.weather[0].description;
            weatherAirHumidity.textContent = `Air humidity: ${body.main.humidity}`;
            weatherWindSpeed.textContent = `Wind speed: ${body.wind.speed}`;
            weatherTemperature.textContent = `${body.main.temp}°F`;
            weather.classList.add('opacity');
            document.querySelector('.result').innerHTML = '';
        })
        .then(weather.classList.remove('opacity'))
}

const setCity = (e) => {
    if (e.type === 'keypress') {
        if (e.keyCode === 13) {
            if (e.target.textContent == '') {
                e.target.textContent = localStorage.getItem('city');
            }
            getWeather();
            localStorage.setItem('city', e.target.textContent);
            e.target.blur();
        }
    } else {
        if (e.target.textContent == '') {
            e.target.textContent = localStorage.getItem('city');
        }
        getWeather();
        localStorage.setItem('city', e.target.textContent);
    }
}

const getCity = () => {
    if (localStorage.getItem('city') === null) {
        selectCity.textContent = '[Write your city]';
        localStorage.setItem('city', selectCity.textContent);
        weatherInfo.textContent = '';
    } else {
        selectCity.textContent = localStorage.getItem('city');
        getWeather();
    }
};

name.addEventListener('focus', () => {
    name.textContent = '';
});
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focusTask.addEventListener('focus', () => {
    focusTask.textContent = '';
});
focusTask.addEventListener('keypress', setFocus);
focusTask.addEventListener('blur', setFocus);
selectCity.addEventListener('focus', () => {
    selectCity.textContent = '';
});
selectCity.addEventListener('keypress', setCity);
selectCity.addEventListener('blur', setCity);
document.addEventListener('DOMContentLoaded', getQuote());
button.addEventListener('click', getQuote);
backgroundButton.addEventListener('click', getBackground);

showDate();
changeDayTimes();
getName();
getFocus();
getCity();
setBackground();