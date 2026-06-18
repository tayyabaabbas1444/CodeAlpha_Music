var songs = [
{ title: "Dynamite", artist: "BTS", album: "BE", src: "songs/song 1.mpeg", cover: "https://i.pinimg.com/1200x/ac/0f/aa/ac0faa7cadb225cf9bdfe8eac2a81337.jpg", color: "#a78bfa" },
{ title: "Butter", artist: "BTS", album: "Butter", src: "songs/song2.mpeg", cover: "https://i.pinimg.com/1200x/ac/0f/aa/ac0faa7cadb225cf9bdfe8eac2a81337.jpg", color: "#a78bfa" },
{ title: "Boy With Luv", artist: "BTS", album: "Map of the Soul: Persona", src: "songs/song3.mpeg", cover: "https://i.pinimg.com/1200x/ac/0f/aa/ac0faa7cadb225cf9bdfe8eac2a81337.jpg", color: "#a78bfa" },

{ title: "Summertime Sadness", artist: "Lana Del Rey", album: "Born to Die", src: "songs/song4.mpeg", cover: "https://i.pinimg.com/736x/36/79/9f/36799fcd194959cdfeab63e451162feb.jpg", color: "#f4899a" },
{ title: "Video Games", artist: "Lana Del Rey", album: "Born to Die", src: "songs/song5.mpeg", cover: "https://i.pinimg.com/736x/36/79/9f/36799fcd194959cdfeab63e451162feb.jpg", color: "#f4899a" },
{ title: "Young and Beautiful", artist: "Lana Del Rey", album: "The Great Gatsby OST", src: "songs/song6.mpeg", cover: "https://i.pinimg.com/736x/36/79/9f/36799fcd194959cdfeab63e451162feb.jpg", color: "#f4899a" },

{ title: "Bellyache", artist: "Billie Eilish", album: "When We All Fall Asleep", src: "songs/song7.mpeg", cover: "https://i.pinimg.com/736x/6a/6d/13/6a6d134fc9ec3aa41b835e8f8309f9d5.jpg", color: "#4dd9ac" },
{ title: "Wildflower", artist: "Billie Eilish", album: "Happier Than Ever", src: "songs/song8.mpeg", cover: "https://i.pinimg.com/736x/6a/6d/13/6a6d134fc9ec3aa41b835e8f8309f9d5.jpg", color: "#4dd9ac" },
{ title: "Ocean Eyes", artist: "Billie Eilish", album: "dont smile at me", src: "songs/song9.mpeg", cover: "https://i.pinimg.com/736x/6a/6d/13/6a6d134fc9ec3aa41b835e8f8309f9d5.jpg", color: "#4dd9ac" },
{ title: "Birds of a Feather", artist: "Billie Eilish", album: "13 Reasons Why OST", src: "songs/song10.mpeg", cover: "https://i.pinimg.com/736x/6a/6d/13/6a6d134fc9ec3aa41b835e8f8309f9d5.jpg", color: "#4dd9ac" }
];

var themes = {
"BTS": { accent1: "#a78bfa", accent2: "#e879c5", glow: "rgba(167,139,250,0.3)" },
"Lana Del Rey": { accent1: "#f4899a", accent2: "#f4b76e", glow: "rgba(244,137,154,0.3)" },
"Billie Eilish": { accent1: "#4dd9ac", accent2: "#38bdf8", glow: "rgba(77,217,172,0.3)" }
};


var currentSong = 0;
var isPlaying = false;
var isShuffle = false;
var isRepeat = false;
var activeFilter = "all";
var filteredSongs = songs.slice(); 
var audio = document.getElementById("audio");
var playBtn = document.getElementById("playBtn");
var iconPlay = document.getElementById("iconPlay");
var iconPause = document.getElementById("iconPause");
var nextBtn = document.getElementById("nextBtn");
var prevBtn = document.getElementById("prevBtn");
var shuffleBtn = document.getElementById("shuffleBtn");
var repeatBtn = document.getElementById("repeatBtn");

var songTitle = document.getElementById("songTitle");
var songArtist = document.getElementById("songArtist");
var songAlbum = document.getElementById("songAlbum");
var cover = document.getElementById("cover");
var vinyl = document.getElementById("vinyl");
var artistBadge = document.getElementById("artistBadge");

var progress = document.getElementById("progress");
var progressThumb = document.getElementById("progressThumb");
var progressContainer = document.getElementById("progressContainer");
var currentTimeEl = document.getElementById("currentTime");
var durationEl = document.getElementById("duration");

var volumeSlider = document.getElementById("volumeSlider");
var volPct = document.getElementById("volPct");
var autoplayCheck = document.getElementById("autoplayCheck");

var playlistEl = document.getElementById("playlist");
var playlistLabel = document.getElementById("playlistLabel");
var tabs = document.querySelectorAll(".tab");

function applyTheme(song) {
var theme = themes[song.artist] || themes["BTS"];
document.documentElement.style.setProperty("--accent1", theme.accent1);
document.documentElement.style.setProperty("--accent2", theme.accent2);
document.documentElement.style.setProperty("--glow", theme.glow);
artistBadge.innerHTML = song.artist;
}

function loadSong(index) {
var song = songs[index];
currentSong = index;

audio.src = song.src;
songTitle.innerHTML = song.title;
songArtist.innerHTML = song.artist;
songAlbum.innerHTML = song.album;
cover.src = song.cover;

applyTheme(song);
highlightActiveSong();
}

function highlightActiveSong() {
var items = playlistEl.getElementsByTagName("li");
for (var i = 0; i < items.length; i++) {
var songIndex = Number(items[i].getAttribute("data-index"));
if (songIndex === currentSong) {
items[i].classList.add("active");
} else {
items[i].classList.remove("active");
}
}
}

function playSong() {
audio.play();
isPlaying = true;
iconPlay.style.display = "none";
iconPause.style.display = "block";
vinyl.classList.add("spinning");
}

function pauseSong() {
audio.pause();
isPlaying = false;
iconPlay.style.display = "block";
iconPause.style.display = "none";
vinyl.classList.remove("spinning");
}

playBtn.addEventListener("click", function () {
if (isPlaying) {
pauseSong();
} else {
playSong();
}
});
function getCurrentList() {
if (filteredSongs.length > 0) {
return filteredSongs;
}
return songs;
}

function nextSong() {
var list = getCurrentList();

if (isShuffle) {
var randomIndex = Math.floor(Math.random() * list.length);
currentSong = songs.indexOf(list[randomIndex]);
} else {
var currentPosition = list.indexOf(songs[currentSong]);
var nextPosition = currentPosition + 1;
if (nextPosition >= list.length) {
nextPosition = 0;
}
currentSong = songs.indexOf(list[nextPosition]);
}

loadSong(currentSong);
playSong();
}

function prevSong() {
var list = getCurrentList();
var currentPosition = list.indexOf(songs[currentSong]);
var prevPosition = currentPosition - 1;
if (prevPosition < 0) {
prevPosition = list.length - 1;
}
currentSong = songs.indexOf(list[prevPosition]);

loadSong(currentSong);
playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);
shuffleBtn.addEventListener("click", function () {
isShuffle = !isShuffle;
shuffleBtn.classList.toggle("active", isShuffle);
});

repeatBtn.addEventListener("click", function () {
isRepeat = !isRepeat;
repeatBtn.classList.toggle("active", isRepeat);
});
audio.addEventListener("timeupdate", function () {
var current = audio.currentTime;
var total = audio.duration;

if (total) {
var percent = (current / total) * 100;
progress.style.width = percent + "%";
progressThumb.style.left = percent + "%";
}

currentTimeEl.innerHTML = formatTime(current);

if (!isNaN(total)) {
durationEl.innerHTML = formatTime(total);
}
});

function formatTime(time) {
var minutes = Math.floor(time / 60);
var seconds = Math.floor(time % 60);
if (seconds < 10) {
seconds = "0" + seconds;
}
return minutes + ":" + seconds;
}

progressContainer.addEventListener("click", function (e) {
var width = this.clientWidth;
var clickX = e.offsetX;
var duration = audio.duration;
audio.currentTime = (clickX / width) * duration;
});
volumeSlider.addEventListener("input", function () {
audio.volume = volumeSlider.value;
volPct.innerHTML = Math.round(volumeSlider.value * 100) + "%";
});

audio.volume = volumeSlider.value;
audio.addEventListener("ended", function () {
if (isRepeat) {
audio.currentTime = 0;
playSong();
} else if (autoplayCheck.checked) {
nextSong();
} else {
pauseSong();
}
});
function buildPlaylist() {
playlistEl.innerHTML = "";

for (var i = 0; i < filteredSongs.length; i++) {
var song = filteredSongs[i];
var realIndex = songs.indexOf(song); 

var li = document.createElement("li");
li.setAttribute("data-index", realIndex);

li.innerHTML =
'<span class="song-dot" style="background-color:' + song.color + '"></span>' +
'<span class="song-info">' +
'<span class="name">' + song.title + '</span><br>' +
'<span class="sub">' + song.artist + " &middot; " + song.album + '</span>' +
'</span>';
li.addEventListener("click", function () {
var index = Number(this.getAttribute("data-index"));
loadSong(index);
playSong();
});

playlistEl.appendChild(li);
}

highlightActiveSong();
}

for (var t = 0; t < tabs.length; t++) {
tabs[t].addEventListener("click", function () {

for (var j = 0; j < tabs.length; j++) {
tabs[j].classList.remove("active");
}
this.classList.add("active");

var filter = this.getAttribute("data-filter");
activeFilter = filter;

if (filter === "all") {
filteredSongs = songs.slice();
playlistLabel.innerHTML = "All Songs";
} else {
filteredSongs = songs.filter(function (song) {
return song.artist === filter;
});
playlistLabel.innerHTML = filter;
}

buildPlaylist();
});
}
buildPlaylist();
loadSong(currentSong);