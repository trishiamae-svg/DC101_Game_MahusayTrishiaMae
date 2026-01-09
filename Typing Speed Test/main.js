// array of words 
const words = [
    "apple",
    "banana",
    "cherry",
    "dog",
    "elephant",
    "flower",
    "guitar",
    "happy",
    "ice cream",
    "jazz",
    "kite",
    "lemon",
    "mountain",
    "nature",
    "ocean",
    "penguin",
    "quilt",
    "rainbow",
    "sunset",
    "tiger",
    "umbrella",
    "volcano",
    "waterfall",
    "xylophone",
    "zebra",
    "butterfly",
    "candle",
    "dolphin",
    "elephant",
    "fireworks",
    "giraffe",
    "hamburger",
    "island",
    "jungle",
    "koala",
    "lighthouse",
    "moon",
    "ninja",
    "octopus",
    "parrot",
    "quokka",
    "robot",
    "starfish",
    "toucan",
    "unicorn",
    "vampire",
    "whale",
    "x-ray",
    "yacht",
    "zeppelin",
   
];
// setting levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 3
};

// default level 
let defaultLevelName = "Normal"; // change level from here 
let defaultLevelSeconds = lvls[defaultLevelName];

// selectors 
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds")
let startButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let upcommingWords = document.querySelector(".upcomming-words");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish")
let againButton = document.querySelector(".again");

// setting level name, seconds, time left, score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disaple past event
input.onpaste = () => { return false };

// start game 
startButton.onclick = function () {
    this.remove();
    input.focus();

    // generate words function
    generateWords()
}

againButton.onclick = function () {
    this.remove();
    location.reload();
}

// the genrateWords function is to get a random word then remove it then and all of the array to the upcomming words
function generateWords() {

    randomWord();

    commingWords();


    // start play funciton
    startPlay();
}

function randomWord() {
    // get random word from the array
    let randomWord = words[Math.floor(Math.random() * words.length)];
    // show the random word in the word div
    theWord.innerHTML = randomWord;
    // get randomWord index
    let wordIndex = words.indexOf(randomWord);
    // remove the word index from the array
    words.splice(wordIndex, 1)
    // empty upcomming words div
    upcommingWords.innerHTML = "";
}

function commingWords() {
    // generate upcomming words
    for (let i = 0; i < words.length; i++) {
        // create div and append text to it
        let div = document.createElement("div");
        let txt = document.createTextNode(words[i]);
        div.appendChild(txt);
        upcommingWords.appendChild(div);
    }
}

function startPlay() {

    timeLeftSpan.innerHTML = defaultLevelSeconds; // reseting the time 

    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            clearInterval(start);

            if (theWord.innerHTML === input.value) {
                // empty input field
                input.value = "";
                // increase score got
                scoreGot.innerHTML++;
                if (words.length > 0) {
                    generateWords();
                } else {
                    goodSpan();
                }
            } else {
                badSpan();
            }
        }
    }, 1000);
}

function goodSpan() {
    let span = document.createElement("span");
    span.className = "good";
    let spanText = document.createTextNode("Wow, You Are Realy Fast");
    span.appendChild(spanText);
    finishMessage.appendChild(span);
    upcommingWords.remove();
    againButton.style.display = "block";
}

function badSpan() {
    let span = document.createElement("span");
    span.className = "bad";
    let spanText = document.createTextNode("Time Out Looser, Game Over");
    span.appendChild(spanText);
    finishMessage.appendChild(span);
    upcommingWords.remove();
    againButton.style.display = "block";

}