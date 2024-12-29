let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', function() {
    if (!isRunning) {
        startTime = Date.now() - difference;
        interval = setInterval(updateDisplay, 10);
        startStopBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(interval);
        difference = Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        isRunning = false;
    }
});

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    isRunning = false;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    laps = [];
    renderLaps();
});

lapBtn.addEventListener('click', function() {
    if (isRunning) {
        laps.push(display.textContent);
        renderLaps();
    }
});

function updateDisplay() {
    updatedTime = Date.now() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds)
    );
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        let li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}
