// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

const speedRateInput = document.getElementById("speedRate");
const rateValueDisplay = document.getElementById("rateValue");

const pitchToneInput = document.getElementById("pitchTone");
const pitchValueDisplay = document.getElementById("pitchValue");



function populateVoices() {
	voices = window.speechSynthesis.getVoices();
	voicesDropdown.innerHTML = '<option value="">Select A Voice</option>';
	voices.forEach((voice, i) => {
        voicesDropdown.add(new Option(voice.name, i));
    });
	if (voices.length > 0) {
        msg.voice = voices[0];
    }
}
window.speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();



speedRateInput.addEventListener('input',() => {
	rateValueDisplay.textContent = speedRateInput.value + "x";
	msg.rate = Number(speedRateInput.value);
});

pitchToneInput.value = 1;
pitchValueDisplay.textContent = pitchToneInput.value;

pitchToneInput.addEventListener("input", () => {
    pitchValueDisplay.textContent = pitchToneInput.value;
    msg.pitch = Number(pitchToneInput.value);
});



voicesDropdown.addEventListener("change",()=>{
	const selectedVoice = voices[voicesDropdown.value];
	if (selectedVoice) {
		msg.voice = selectedVoice;
	}
});


speakButton.addEventListener('click',() => {
	window.speechSynthesis.cancel();
	msg.text = document.querySelector("textarea").value;
	msg.rate = Number(speedRateInput.value);
	msg.pitch = Number(pitchToneInput.value);
	// window.speechSynthesis.speak(msg);

	// const utterance = new speechSynthesisUtterance(msg);
	// utterance.rate = parseFloat(speedRateInput.value);
	// utterance.pitch = parseFloat(pitchValueInput.value);

	window.speechSynthesis.speak(msg);
});

stopButton.addEventListener('click',() => {
	window.speechSynthesis.cancel();
});

