const time = document.querySelector('.time');
const day = document.querySelector('.day');
const dayTimes = document.querySelector('.day-times');
const name = document.querySelector('.name');
const focusTask = document.querySelector('.focus__task');
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const button = document.querySelector('button');
const weatherIcon = document.querySelector('.weather__icon');
const weatherTemperature = document.querySelector('.weather__temperature');
const weatherDescription = document.querySelector('.weather__description');
const selectCity = document.querySelector('.weather__select-city');

const images = {
    morning: [
        './assets/images/background/morning/1.jpg'
    ]
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

const changeBackground = () => {
    const date = new Date();
    const hours = date.getHours();

    switch (true) {
        case hours >= 6:
            {
                return document.body.style.backgroundImage = `url(${images.morning[0]})`;
            }

        case hours >= 6:
            {
                return document.body.style.backgroundImage = `url(${images.morning[0]})`;
            }

        default:
            {
                return document.body.style.backgroundImage = '';
            }
    }
}

const fixSingleValue = (value) => parseInt(value, 10) < 10 ? `0${value}` : `${value}`;

const changeDayTimes = () => {
    const date = new Date();
    const hours = date.getHours();

    if (hours >= 6 && hours <= 12) {
        dayTimes.innerText = 'Good Morning, ';
    } else if (hours >= 12 && hours <= 18) {
        dayTimes.innerText = 'Good Afternoon, ';
    } else if (hours >= 18 && hours <= 0) {
        dayTimes.innerText = 'Good Evening, ';
    } else if (hours >= 0 && hours <= 6) {
        dayTimes.innerText = 'Good Night, ';
    }
};

const setName = (e) => {
    if (e.type === 'keypress') {
        if (e.keyCode == 13) {
            localStorage.setItem('name', e.target.textContent);
            e.target.blur();
        } else {
            localStorage.getItem('name');
        }
    } else {
        localStorage.setItem('name', e.target.textContent);
    }
}


const getName = () => {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Write your name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
};

const setFocus = (e) => {
    if (e.type === 'keypress') {
        if (e.keyCode == 13) {
            localStorage.setItem('focus', e.target.textContent);
            e.target.blur();
        }
    } else {
        localStorage.setItem('focus', e.target.textContent);
    }
}

const getFocus = () => {
    if (localStorage.getItem('focus') === null) {
        focusTask.textContent = '[Write your focus for today]';
    } else {
        focusTask.textContent = localStorage.getItem('focus');
    }
};

async function getQuote() {
    let loader = `<div class="loader"></div>`;
    let buttonInnerElement = `<div class="quote__button"></div>`;
    button.innerHTML = loader;
    await fetch('https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
        .then(res => res.json())
        .then(body => {
            blockquote.textContent = body.quoteText;
            figcaption.textContent = body.quoteAuthor;
            button.innerHTML = buttonInnerElement;
        })
};

async function getWeather() {
    await fetch('https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=350626f97bfd83f95eee81ddd708faa6&units=imperial')
        .then(res => res.json())
        .then(body => {
            weatherIcon.classList.add(`owf-${body.weather[0].id}`)
            weatherDescription.textContent = body.weather[0].description;
            weatherTemperature.textContent = body.main.temp
        })

}

const setCity = (e) => {
    if (e.type = 'keypress') {
        if (e.keyCode === 13) {
            localStorage.setItem('city', e.target.textContent);
            e.target.blur();
        }
    } else {
        localStorage.setItem('city', e.target.textContent);
    }
}

const getCity = () => {
    if (localStorage.getItem('city') === null) {
        selectCity.textContent = '[Write your city]';
    } else {
        selectCity.textContent = localStorage.getItem('city');
    }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focusTask.addEventListener('keypress', setFocus);
focusTask.addEventListener('blur', setFocus);
selectCity.addEventListener('keypress', setCity);
selectCity.addEventListener('blur', setCity);
document.addEventListener('DOMContentLoaded', getQuote());
button.addEventListener('click', getQuote);

showDate();
changeBackground();
changeDayTimes();
getName();
getFocus();
getWeather();
getCity();