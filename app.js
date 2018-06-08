var lyrics;
var song = [];
var beat;
var voices = window.speechSynthesis.getVoices();
var playing = false;

var available_beats = [
	"im_upset",
	"look_alive",
	"pull_up_and_wreck",
	"ric_flair_drip",
	"win",
	"x"
]

var available_lyrics = [
	"finesse",
	"icy_grl",
	"its_everyday_bro",
	"mans_not_hot",
	"rap_god",
	"rolex"
]

for (i = 0; i < available_beats.length; i++){
	document.getElementById('beats').innerHTML += "<option id='" + available_beats[i] + "'>" + available_beats[i] + "</option>"
}

for (i = 0; i < available_lyrics.length; i++){
	document.getElementById('lyrics').innerHTML += "<option id='" + available_lyrics[i] + "'>" + available_lyrics[i] + "</option>"
}

speechSynthesis.speak(new SpeechSynthesisUtterance("Starting up"))

document.getElementById('start').onclick = function() {
	if (playing == false){
		playing = true
		console.log("Getting " + document.getElementById("lyrics").value)
		fetch("lyrics/" + document.getElementById("lyrics").value + ".txt")
			.then(response => response.text())
			.then((text) => {
				console.log("Got lyrics!")
				lyrics = text.split(/\r\n|\n/)
				console.log("Getting beat " + document.getElementById("beats").value)
				beat = new Audio("beats/" + document.getElementById("beats").value + ".mp3")
				console.log("Mapping lyrics")
				for (i = 0; i < lyrics.length; i++){
					line = lyrics[i].replace(/ *\([^)]*\) */g, "")   // drops everyting in (), could be better implemented
					if (line.replace(/ /g, '') != ''){
						console.log(line)
						var ssu = new SpeechSynthesisUtterance()
						ssu.voice = voices[Math.floor(Math.random()*voices.length)]; // Note: some voices don't support altering params
						ssu.voiceURI = 'native';
						ssu.volume = 1; // 0 to 1
						ssu.rate = 1; // 0.1 to 10
						ssu.pitch = 0.9; //0 to 2
						ssu.text = line;
						ssu.lang = 'en-US';
						song.push(ssu)
					}
				}
				console.log("setting up beat")
				beat.currentTime = 0
				beat.play()
				speechSynthesis.speak(new SpeechSynthesisUtterance("Check It"))
				speechSynthesis.speak(new SpeechSynthesisUtterance("If young metro don't trust you, i'm gonna shoot you"))
				for (i = 0; i < song.length; i++) {
					console.log("adding line" + i + " to speak queue")
					speechSynthesis.speak(song[i])
				}
			})
			.catch(function(err) {
		    console.log('Fetch Error :-S', err);
		  });
	}
}

document.getElementById('stop').onclick = function() {
	if (playing = true){
		beat.pause()
		speechSynthesis.cancel()
	}
}

window.onbeforeunload = function(){
	if (playing = true){
		beat.pause()
		speechSynthesis.cancel()
	}
}
