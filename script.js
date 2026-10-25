// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

const speedRateInput = document.getElementById("speedRate");
const rateValueDisplay = document.getElementById("rateValue");

const pitchValueInput = document.getElementById("pitchValue");
const pitchToneDisplay = document.getElementById("pitchTone");

speedRateInput.addEventListener('input',() => {
	rateValueDisplay.textContent = speedRateInput.value + "x";
	msg.rate = parseFloat(speedRateInput.value);
});

pitchValueInput.value = 1;
pitchToneDisplay.textContent = pitchValueInput.value;
pitchValueInput.addEventListener('input',() => {
	pitchToneDisplay.textContent = pitchValueInput.value;
	msg.pitch = parseFloat(pitchValueInput.value);
});

window.speechSynthesis.onvoiceschanged = () => {
	voices = window.speechSynthesis.getVoices();
	msg.voice = voices[0];
	voices.forEach((voice,i) => voicesDropdown.options[i] = new Option(voice.name,i));
};

voicesDropdown.addEventListener("change",()=>{
	speech.voice = voices[voicesDropdown.value];
});


speakButton.addEventListener('click',() => {
	window.speechSynthesis.cancel();
	msg.text = document.querySelector("textarea").value;
	msg.rate = parseFloat(speedRateInput.value);
	msg.ton = parseFloat(pitchValueInput.value);
	// window.speechSynthesis.speak(msg);

	// const utterance = new speechSynthesisUtterance(msg);
	// utterance.rate = parseFloat(speedRateInput.value);
	// utterance.pitch = parseFloat(pitchValueInput.value);

	window.speechSynthesis.speak(msg);
});

stopButton.addEventListener('click',() => {
	window.speechSynthesis.cancel();
});

