const clickBtn = document.querySelector(".click-btn");
const modeSelector = document.querySelector(".mode-selector");
const chrono = document.querySelector(".chrono");
const averageSpeed = document.querySelector(".average-speed");
const counter = document.querySelector(".counter");
const retry = document.querySelector(".retry");
const circle = document.querySelector(".circle");

let maxTime = 1;
let clickscounter = 0;

let isRunning = false;
let elapsedTime = 0;
let startTime = null;
let intervalId = null;

clickBtn.addEventListener("mousedown", (e) => {
	if (!isRunning) {
		clickscounter += 1;
		clickBtn.querySelector("p").style.opacity = "0";
		isRunning = true;
		startTime = Date.now();
		intervalId = setInterval(() => {
			elapsedTime = Date.now() - startTime; // Calculer le temps écoulé
			if (elapsedTime / 1000 >= maxTime) {
				clearInterval(intervalId);
				updateDisplay(); // Mettre à jour l'écran
				retry.style.bottom = "-80px";
				setTimeout(() => {
					retry.style.zIndex = 1;
				}, 150);
			} else {
				updateDisplay(); // Mettre à jour l'écran
			}
		}, 10); // Mettre à jour toutes les 10 ms
	} else {
		clickscounter += 1;
	}
});

retry.addEventListener("mousedown", (e) => {
	isRunning = false;
	elapsedTime = 0;
	startTime = null;
	intervalId = null;
	clickBtn.querySelector("p").style.opacity = "1";
	chrono.textContent = 0.0;
	averageSpeed.innerHTML = "0<span>CPS</span>";
	counter.textContent = 0;
	clickscounter = 0;
	retry.style.zIndex = -1;
	setTimeout(() => {
		retry.style.bottom = "40px";
	}, 10);
});

function updateDisplay() {
	chrono.textContent = Math.round(elapsedTime / 10) / 100;
	averageSpeed.innerHTML = `${Math.round(((clickscounter * 1000) / elapsedTime) * 10) / 10}<span>CPS</span>`;
	counter.textContent = clickscounter;
}

modeSelector.addEventListener("mousedown", (e) => {
	if (!e.target.classList.contains("mode-selector")) {
		buttons = modeSelector.querySelectorAll("button");
		buttons.forEach((element, index) => {
			element.classList = [""];
		});
		e.target.classList = ["selected"];
		maxTime = parseInt(e.target.textContent);
	}
});
