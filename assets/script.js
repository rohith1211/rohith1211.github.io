const alternatives = [
    {text: "Sundari Kannal Oru Sethi", images: "./assets/images/goblin.gif", song: './assets/songs/malare_piano_instr.mp3'},
    {text: "Sangeetham nuvaithe saahithyam nenavtha la...la..la.... Aalochinchu inkosari...", images: "./assets/images/roopa.jpg", song: './assets/songs/Anand.mp3'},
    {text: "Come on now, say yes!, We can have drinks, ledhante nik ivakunda motham tagestha", images: "./assets/images/strong.gif", song: './assets/songs/Mudhal.mp3'},
    {text: "I promise, A Date of Pappu Annam sambar and also gulabjamun with icecream", images: "./assets/images/sad1.gif", song: './assets/songs/mass.mp3'},
    {text: "Acha chalta hoon, Duaon mein yaad rakhna - Channa Mereya", images: "./assets/images/sundari.gif", song: './assets/songs/sundari.mp3'},
];

const ohyes = {text: "Aww.., Pranam kanna viluvaina ne sopathi na sontham, Shall i take you out for comfort food, Msg karo in the box", images: "./assets/images/rrr.gif", song: './assets/songs/Blue.mp3'};

const title = document.querySelector('.title');
const text = document.querySelector('.text');
const cat = document.querySelector('.cat');
const buttons = document.querySelectorAll('.button');
const errorButton = document.querySelector('.button__error');

let count = 0;
let audioPlayer = new Audio();  // Global audio player for controlling audio

// Function to send log messages to Google Sheets via the Google Apps Script
function sendLogToSheet(message) {
    const actionUrl = "https://script.google.com/macros/s/AKfycbxH3HlSwn_4EhdgFFCgQ86amq1uP4A7z4hcKMWKuxVnzCHTZOWJ7IU6rfnXSxVfGwLzZQ/exec"; // Your Google Apps Script URL

    const formData = new FormData();
    formData.append('entry.1234567890', message);  // Correct entry ID here

    fetch(actionUrl, {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log("Log sent to Google Sheets:", data);
    })
    .catch(error => {
        console.error("Error sending log to Google Sheets:", error);
    });
}


// Function to update the display and change song
function updateDisplay(item) {
    const message = `Updating display: ${item.text}`;  // Log message
    sendLogToSheet(message);  // Send the log to Google Sheets
    console.log(message);  // Original console.log

    cat.src = item.images;
    text.innerHTML = item.text;
    updateMusic(item.song);
    console.log("Playing song:", item.song);
    sendLogToSheet("Playing song: " + item.song);  // Log the song playing
    audioPlayer.play();
    
    if (audioPlayer.paused) {
        playMusicIcon.style.display = 'block';
        pauseMusicIcon.style.display = 'none';
    } else {
        playMusicIcon.style.display = 'none';
        pauseMusicIcon.style.display = 'block';
    }
}

// Function to update the music source
function updateMusic(song) {
    if (audioPlayer.src !== song) {
        audioPlayer.src = song;
        audioPlayer.load();
        console.log("Audio loaded:", song);
        sendLogToSheet("Audio loaded: " + song);  // Log the audio loading
    }
}

// Play/Pause Music Logic
function setupMusicPlayer() {
    const playMusicIcon = document.getElementById('playMusicIcon');
    const pauseMusicIcon = document.getElementById('pauseMusicIcon');

    playMusicIcon.addEventListener('click', () => {
        console.log("Play button clicked");  // Debugging message to confirm the click
        sendLogToSheet("Play button clicked");  // Log the play button click
        audioPlayer.play().then(() => {
            playMusicIcon.style.display = 'none';
            pauseMusicIcon.style.display = 'block';
            console.log("Music is playing now!");  // Debugging message to confirm play
            sendLogToSheet("Music is playing now!");  // Log that the music is playing
        }).catch(error => {
            console.log("Error playing the music:", error);
            sendLogToSheet("Error playing the music: " + error);  // Log error
        });
    });

    pauseMusicIcon.addEventListener('click', () => {
        console.log("Pause button clicked");  // Debugging message to confirm the click
        sendLogToSheet("Pause button clicked");  // Log the pause button click
        audioPlayer.pause();
        playMusicIcon.style.display = 'block';
        pauseMusicIcon.style.display = 'none';
        console.log("Music is paused.");
        sendLogToSheet("Music is paused.");  // Log that the music is paused
    });
}

// Reset to first alternative when error button is clicked
errorButton.addEventListener('click', () => {
    console.log("Error button clicked. Resetting to the first alternative.");
    sendLogToSheet("Error button clicked. Resetting to the first alternative.");
    count = 0;
    updateDisplay(alternatives[count]);
    buttons.forEach(btn => btn.style.display = 'inline-block');
    errorButton.style.display = 'none';
});

// Buttons event listener for YES and NO responses
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const message = `Button clicked: ${button.textContent}`;
        sendLogToSheet(message);  // Send the log to Google Sheets
        console.log(message);  // Original console.log

        if (button.textContent === 'YES') {
            updateDisplay(ohyes);
            buttons.forEach(btn => btn.style.display = 'none');
        }
        if (button.textContent === 'NO') {
            count++;
            if (count < alternatives.length) {
                updateDisplay(alternatives[count]);
            } else {
                buttons.forEach(btn => btn.style.display = 'none');
                errorButton.style.display = 'inline-block';
            }
        }
    });
});

// Initialize the page and event listeners
function init() {
    const openCardButton = document.querySelector('.open-card-btn');
    const intro = document.querySelector('.intro');
    const card = document.querySelector('.card');

    setupMusicPlayer();  // Initialize the music player

    // Set the intro music (this will play on the intro page)
    const introSong = './assets/songs/intro.mp3';
    updateMusic(introSong);  // Set the song for the intro section
    audioPlayer.play();  // Start playing the intro song when the page loads

    // Now update the play/pause buttons after the song starts
    const playMusicIcon = document.getElementById('playMusicIcon');
    const pauseMusicIcon = document.getElementById('pauseMusicIcon');
    if (audioPlayer.paused) {
        playMusicIcon.style.display = 'block';
        pauseMusicIcon.style.display = 'none';
    } else {
        playMusicIcon.style.display = 'none';
        pauseMusicIcon.style.display = 'block';
    }

    // Listen for the "Click to open the surprise!" button click
    openCardButton.addEventListener('click', () => {
        console.log("Open card button clicked");
        sendLogToSheet("Open card button clicked");
        intro.style.display = 'none';
        card.style.display = 'flex';

        // Set a different song for the card page
        const cardSong = './assets/songs/mass_sad_bgm.mp3';
        updateMusic(cardSong);
        audioPlayer.play();

        // Now update the play/pause buttons after the song starts
        if (audioPlayer.paused) {
            playMusicIcon.style.display = 'block';
            pauseMusicIcon.style.display = 'none';
        } else {
            playMusicIcon.style.display = 'none';
            pauseMusicIcon.style.display = 'block';
        }

        // Start with the first alternative and play the first song for the card
        updateDisplay(alternatives[0]);
    });
}

window.onload = init;  // Initialize the page when it's loaded

(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const submitButton = document.getElementById("submitSongName");
        const songNameInput = document.getElementById("songName");

        if (submitButton && songNameInput) {
            submitButton.addEventListener("click", function (event) {
                event.preventDefault();
                submitButton.textContent = "Sending...";

                const songName = songNameInput.value.trim();

                if (songName === '') {
                    alert('Please enter a song name!');
                    return;
                }

                const formData = new FormData();
                formData.append('entry.1234567890', songName);

                const actionUrl = "https://script.google.com/macros/s/AKfycbxH3HlSwn_4EhdgFFCgQ86amq1uP4A7z4hcKMWKuxVnzCHTZOWJ7IU6rfnXSxVfGwLzZQ/exec";

                fetch(actionUrl, {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => {
                        if (response.ok) {
                            songNameInput.value = '';
                            alert('Song name submitted successfully!');
                        } else {
                            alert('Error: Could not submit the song name. Please try again.');
                        }
                    })
                    .catch((error) => {
                        console.error("Error submitting the song name:", error);
                        alert("An unexpected error occurred. Please try again.");
                    })
                    .finally(() => {
                        submitButton.textContent = "Send";
                    });
            });
        }
    });
})();

// Add event listener to the submit button
document.getElementById('submitSongName').addEventListener('click', submitSongName);
