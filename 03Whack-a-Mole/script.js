// DOM Elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const msgBox = document.querySelector('.msgBox');

const pauseBtn = document.querySelector('#pauseBtn');
const resumeBtn = document.querySelector('#resumeBtn');
const resetBtn = document.querySelector('#resetBtn');

const lastScoreBox = document.querySelector('.lastScoreBox');
const lastGameScoreDisplay = document.querySelector('#lastGameScore');

const fastestHitDisplay = document.querySelector('#fastestHit');


// Requried Variables
var score = 0;
var time = 60;
var bestScore = 0;
var playGame = false;
var gameId = null;

var lastScore = null;
var moleStartTime = null;
var timeTaken = null;
var fastestHit = null;


// Common function 
function webLoad() {
    onLoad()
    displayContent()
}

function onLoad() {
    var temp = localStorage.getItem('highScoreMole');
    bestScore = (temp != null) ? bestScore = temp : bestScore = 0;
    // if(temp!=null){
    //     bestScore=temp;
    // }
    // else{
    //     bestScore = 0;
    // }

    let temp2 = sessionStorage.getItem('lastScore');
    lastScore = (temp2 != null) ? lastScore = temp2 : lastScore = null;
    if (lastScore) {
        lastGameScoreDisplay.innerHTML = lastScore;
        lastScoreBox.style.display = "block";
    }

    let temp3 = sessionStorage.getItem('fastestHit');
    fastestHit = (temp3 != null) ? fastestHit = temp3 : fastestHit = '-';
    if (fastestHit) {
        fastestHitDisplay.innerHTML = `${fastestHit} ms`;
    }



}
function displayContent() {
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
    fastestHitDisplay.innerHTML = `${fastestHit} ms`;
}
function msgDisplay(msg) {
    msgBox.innerHTML = msg;
}
function randomTime(min, max) {
    return Math.floor(Math.random() * (max - min) + max)
}
function randomHole() {
    var index = Math.floor(Math.random() * holes.length)
    return holes[index];
}

function popGame() {
    moleStartTime = Date.now();
    if (time <= 10) {
        var timer = randomTime(200, 700);
    }
    else {
        var timer = randomTime(300, 1500);
    }
    var hole = randomHole();
    var mole = hole.querySelector('.mole');

    if (playGame) {
        mole.classList.add('up');

        setTimeout(function () {              // setTimeOut run only one time after random time
            mole.classList.remove('up');
            popGame();
        }, timer);
    }
}

function startGame() {
    lastScoreBox.style.display = 'none'
    time = 60;
    score = 0;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    playGame = true;
    gameResume();
}

function gameResume() {
    displayContent();
    popGame();

    gameId = setInterval(function () {
        time--;
        if (time == 0) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function endGame() {
    playGame = false;
    time = 60;
    clearInterval(gameId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;
    startBtn.innerHTML = "Play Again";
    sessionStorage.setItem('lastScore', score);

    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('highScoreMole', score);
        alert(`You've scored max value then previous one: ${score}`);
    }
    else {
        alert(`You're current score is: ${score}`);
    }
    displayContent();
}

function bonk(event) {
    if (!event.isTrusted) return;
    if (playGame == false) return;
    if (event.target.classList.contains('up')) {
        timeTaken = Date.now() - moleStartTime;
        if (timeTaken < fastestHit || fastestHit === '-') {
            fastestHit = timeTaken;
            sessionStorage.setItem('fastestHit', timeTaken);
            fastestHitDisplay.innerHTML = `${fastestHit} ms`;
        }
        score++;
        msgDisplay(`Whack!🔨`)
        event.target.classList.remove('up');
        event.target.classList.add('bonked');
        displayContent();
        if (score > 20) {
            scoreDisplay.style.color = "gold";
        }
        else {
            scoreDisplay.style.color = "currentColor";
        }
        if (score > bestScore) {
            msgDisplay(`🎉New Record!🎉`);
        }
    }
    setTimeout(function () {
        event.target.classList.remove('bonked');
    }, 300)
}


function pauseGame() {
    if (playGame) {
        pauseBtn.disabled = true;
        resumeBtn.disabled = false
    }
    playGame = false;
    clearInterval(gameId);
    moles.forEach(box => {
        box.classList.remove('up')
    });
}

function resumeGame() {
    playGame = true;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    gameResume()

}
function resetHignScore() {
    localStorage.clear();
    sessionStorage.clear();
    fastestHit = '-';
    lastScore = 0;
    score = 0;
    bestScore = 0;
    lastGameScoreDisplay.textContent = lastScore;
    displayContent();
}


webLoad();

startBtn.addEventListener('click', startGame);

moles.forEach(box => {
    box.addEventListener('click', bonk);
});

pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);
resetBtn.addEventListener('click', resetHignScore)