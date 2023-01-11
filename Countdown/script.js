const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const title = document.getElementById('title');
const dateEle = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Data Input Min with Today's Date

const today = new Date().toISOString().split('T')[0];
dateEle.setAttribute('min', today);

// Populate Countdown / Complete UI
function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        // Hide Input
        inputContainer.hidden = true;

        if (distance < 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else {
            // Countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;

            completeEl.hidden = true;
            countdownEl.hidden = false;
        }
    }, second);
}


function updateCountdown(event) {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;
    countdownDate = event.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Get Number Version of Current Date, Update DOM
    if (countdownDate === '') {
        alert('Please select a date');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

function resetCountdown(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// Get Countdown from Local Storage If Available
function restoreLocalStoragecountdown() {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listners
countdownForm.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', resetCountdown);
completeButton.addEventListener('click', resetCountdown);

// Onload 

restoreLocalStoragecountdown();