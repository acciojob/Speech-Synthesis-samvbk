// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

const speedRateInput = document.getElementById("speedRate");
const rateValueDisplay = document.getElementById("rateValue");

const pitchValueInput = document.getElementById("pitchTone");
const pitchToneDisplay = document.getElementById("pitchValue");

speedRateInput.addEventListener('input',() => {
	rateValueDisplay.textContent = speedRateInput.value + "x";
});

pitchValueInput.addEventListener('input',() => {
	pitchToneDisplay.textContent = pitchValueInput.value;
});

window.speechSynthesis.onvoicechanged = () => {
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
	// window.speechSynthesis.speak(msg);

	const utterence = new speechSynthesisUtterence(msg);
	utterence.rate = parseFloat(speedRateInput.value);
	utterence.pitch = parseFloat(pitchValueInput.value);

	window.speechSynthesis.speak(utterence);
});

stopButton.addEventListener('click',() => {
	window.speechSynthesis.cancel();
});

