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
window.speechSynthesis.addEventListener("voiceschanged", populateVoices);
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


speakButton.addEventListener("click", () => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(
        document.querySelector("textarea").value
    );

    utterance.rate = Number(speedRateInput.value);
    utterance.pitch = Number(pitchToneInput.value);

    const selectedVoice = voices[voicesDropdown.value];
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.onstart = () => console.log("Speech started");
    utterance.onerror = (event) => console.error("Speech error:", event.error);

    window.speechSynthesis.speak(utterance);
});

stopButton.addEventListener('click',() => {
	window.speechSynthesis.cancel();
});

