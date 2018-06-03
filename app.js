var lyrics;
var song;
var beat;

var available_beats = [
	"pull_up_and_wreck",
	"ric_flair_drip",
	"x"
]

var available_lyrics = [
	"finesse",
	"icy_grl",
	"rolex"
]

for (i = 0; i < available_beats.length; i++){
	document.getElementById('beats').innerHTML += "<option id='" + available_beats[i] + "'>" + available_beats[i] + "</option>"
}

for (i = 0; i < available_lyrics.length; i++){
	document.getElementById('lyrics').innerHTML += "<option id='" + available_lyrics[i] + "'>" + available_lyrics[i] + "</option>"
}


document.getElementById('start').onclick = function() {
	speechSynthesis.speak(new SpeechSynthesisUtterance("Starting up"))
	console.log("Getting " + document.getElementById("lyrics").value)
	fetch("lyrics/" + document.getElementById("lyrics").value + ".txt")
		.then(response => response.text())
		.then((text) => {
			console.log("Got lyrics!")
			lyrics = text.split(/\r\n|\n/)
			console.log("Getting beat " + document.getElementById("beats").value)
			beat = new Audio("beats/" + document.getElementById("beats").value + ".mp3")
			console.log("Mapping lyrics")
			song = lyrics.map(x => new SpeechSynthesisUtterance(x.replace(/ *\([^)]*\) */g, ""))) // drops everyting in (), could be better implemented
			console.log("setting up beat")
			beat.currentTime = 0
			beat.play()
			speechSynthesis.speak(new SpeechSynthesisUtterance("Check It"))
			speechSynthesis.speak(new SpeechSynthesisUtterance("If young metro don't trust you i'm gonna shoot you"))
			setTimeout(function() {
				for (i = 0; i < lyrics.length; i++) {
					console.log("adding line" + i + " to speak queue")
					speechSynthesis.speak(song[i])
				}
			}, 10000);
		})
}

document.getElementById('stop').onclick = function() {
	beat.pause()
	speechSynthesis.pause()
}

window.onbeforeunload = function(){
	beat.pause()
	speechSynthesis.pause()
}
/*

var song = new SpeechSynthesisUtterance();
var voices = window.speechSynthesis.getVoices();
song.voice = voices[10]; // Note: some voices don't support altering params
song.voiceURI = 'native';
song.volume = 1; // 0 to 1
song.rate = 1; // 0.1 to 10
song.pitch = 0.8; //0 to 2
song.text = "let's go";
song.lang = 'en-US';

song.onend = function(e) {
  console.log('Finished in ' + event.elapsedTime + ' seconds.');
};

speechSynthesis.speak(song);
*/
