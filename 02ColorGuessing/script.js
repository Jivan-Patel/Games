const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');

const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');

const forHardMode = document.querySelectorAll('.forHardMode');

const btnTrack = document.querySelector('.color-box-container');

const colorBoxes = document.querySelectorAll('.color-box');     // return array of all btn
// console.log(colorBoxes);

const container = document.querySelector('.container');

// variables
var currentStreak = 0;
var bestStreak6 = 0;
var bestStreak3 = 0;
var pickCorrectColor = 0;
var color = [];
var num = 6;

function webLoad() {
    onLoad();
    displayContent();
    setGame();
}

function onLoad() {
    var temp6 = localStorage.getItem('highBestStreak6');
    if (temp6 != null) {
        bestStreak6 = parseInt(temp6);
        // --> here the locolStorage contains the data so it will return the data not null
    }
    else {
        bestStreak6 = 0;
        // --> if there is  no data in localStorage so it will retun null insted of number
    }

    var temp3 = localStorage.getItem('highBestStreak3');
    if (temp3 != null) {
        bestStreak3 = parseInt(temp3);
        // --> here the locolStorage contains the data so it will return the data not null
    }
    else {
        bestStreak3 = 0;
        // --> if there is  no data in localStorage so it will retun null insted of number
    }
}

// here we will define content msg in a function
// we call this function when we have to display any changes into web 
function displayContent() {
    currentStreakDisplay.textContent = currentStreak;

    if (num == 6) {
        bestStreakDisplay.textContent = bestStreak6;
    }
    else {
        bestStreakDisplay.textContent = bestStreak3;
    }
}


// random color generator 
function colorGenerate() {
    var a = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var c = Math.floor(Math.random() * 256);
    return `rgb(${a}, ${b}, ${c})`;
}

// store colors in array
function generateColor(num) {
    const arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(colorGenerate());
    }
    return arr;
}

// to pick one box color randomly
function pickGenerator() {
    const index = Math.floor(Math.random() * color.length);    // return any index for color array
    return color[index];
}


function setGame() {
    color = generateColor(num);                     // Generate 6 colors and store it in color array 
    pickCorrectColor = pickGenerator();             // pick any random color from color array 
    // console.log(color);   
    // console.log(pickCorrectColor);
    colorDisplay.textContent = pickCorrectColor;    // to display pickCorrectColor 

    for (var i = 0; i < color.length; i++) {
        colorBoxes[i].style.backgroundColor = color[i];     // set color in boxes
    }
}

function msg(message) {
    messageDisplay.innerHTML = message;
}

function win() {
    currentStreak++;
    msg(`🎉New Best Streak!🎉`);
    document.body.style.backgroundColor = pickCorrectColor;

    if (num == 6) {
        if (currentStreak > bestStreak6 || bestStreak6 < 1) {
            bestStreak6 = currentStreak;
            localStorage.setItem('highBestStreak6', currentStreak);
            colorDisplay.style.fontWeight = 'bolder'
        }
    }
    else {
        if (currentStreak > bestStreak3 || bestStreak3 < 1) {
            bestStreak3 = currentStreak;
            localStorage.setItem('highBestStreak3', currentStreak);
            colorDisplay.style.fontWeight = 'bolder';
        }
    }

    setTimeout(() => {
        for (var i = 0; i < color.length; i++) {
            colorBoxes[i].disabled = false;
            colorBoxes[i].classList.remove = "incorrect";
            colorBoxes[i].style.borderColor = 'currentColor';
        }
        document.body.style.backgroundColor = "black";
        webLoad();
    }, 1000)

    if (currentStreak == 1) {
        msg(`First Win!`);
    }
    else if (currentStreak >= 3) {
        msg(`<span>Streak!</span>`);
    }
}
function lose() {
    msg("Wrong Button, try again");
    currentStreak = 0;
    document.body.style.backgroundColor = "var(--bg-color)";
}

function trackBtn(event) {
    // event track the child element 
    var element = event.target;                 // to store box where btn clicked
    // console.log(element);

    var rgb = element.style.backgroundColor;    // to srore color of btn which user click
    // console.log(rgb);

    if (pickCorrectColor == rgb) {
        win();
        element.style.borderColor = "Gold";
    }
    else {
        lose();
        element.classList.add("incorrect");
        setTimeout(() => {
            element.classList.remove("incorrect");
        }, 500)
    }
    displayContent();
}


function newRound() {
    currentStreak = 0;
    setGame();
    displayContent();
    msg("New Round Started");
}

function resetStreak() {
    localStorage.clear();
    bestStreak3 = 0;
    bestStreak6 = 0;
    currentStreak = 0;
    displayContent();
}

function easyMode() {
    num = 3;
    currentStreak = 0;
    easyBtn.disabled = true;
    hardBtn.disabled = false;

    for (let i = 0; i < forHardMode.length; i++) {
        forHardMode[i].style.display = "none";
    }
    webLoad();
}

function hardMode() {
    num = 6;
    easyBtn.disabled = false;
    hardBtn.disabled = true;

    for (let i = 0; i < forHardMode.length; i++) {
        forHardMode[i].style.display = "inline";
    }
    webLoad();

}


webLoad();

btnTrack.addEventListener('click', trackBtn); // to track color boxes (child element)

newRoundBtn.addEventListener('click', newRound);
resetStreakBtn.addEventListener('click', resetStreak);
easyBtn.addEventListener('click', easyMode);
hardBtn.addEventListener('click', hardMode);








