const time = document.querySelector('.time');

const showTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    time.innerHTML = `${hours}:${fixSingleValue(minutes)}:${fixSingleValue(seconds)}`;

    setTimeout(showTime, 1000);
}

const fixSingleValue = (value) => parseInt(value, 10) < 10 ? `0${value}` : `${value}`;

showTime();