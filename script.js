// Your script here.
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

windows.speechSynthesis.onvoicechanged = () => {
	voices = windows.speechSynthesis.getVoices();
	msg.voice = voices[0];
	voices.forEach((voice,i) => voicesDropdown.options[i] = new Option(voice.name,i));
};

voicesDropdown.addEventListener("change",()=>{
	speech.voice = voices[voicesDropdown.value];
});


speakButton.addEventListener('click',() => {
	msg.text = document.querySelector("textarea").value;
	window.speechSynthesis.speak(msg);
});

stopButton.addEventListener('click',() => {
	windows.speechSynthesis.cancel();
});

