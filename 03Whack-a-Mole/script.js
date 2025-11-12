// DOM Elements
const scoreDisplay = document.querySelector('#score');
const timeLeftDisplay = document.querySelector('#timeLeft');
const maxScoreDisplay = document.querySelector('#maxScore');
const startBtn = document.querySelector('#startBtn');
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');

const pauseBtn = document.querySelector('#pauseBtn');
const resumeBtn = document.querySelector('#resumeBtn');
const resetBtn = document.querySelector('#resetBtn');


// Requried Variables
var score = 0;
var time = 30;
var bestScore = 0;
var playGame = false;
var gameId = null;


// Common function 
function webLoad(){
    onLoad()
    displayContent()
}

function onLoad(){
    var temp = localStorage.getItem('highScoreMole');
    bestScore = (temp!=null) ? bestScore=temp : bestScore = 0;
    // if(temp!=null){
    //     bestScore=temp;
    // }
    // else{
    //     bestScore = 0;
    // }
}
function displayContent(){
    scoreDisplay.textContent = score;
    timeLeftDisplay.textContent = time;
    maxScoreDisplay.textContent = bestScore;
}

function randomTime(min, max){
    return Math.floor(Math.random()*(max-min) + max)
}
function randomHole(){
    var index = Math.floor(Math.random() * holes.length)
    return holes[index];
}

function popGame(){
    var timer = randomTime(500, 1500);
    var hole = randomHole();
    var mole = hole.querySelector('.mole');
    
    if(playGame){    
        mole.classList.add('up');
        
        setTimeout(function(){              // setTimeOut run only one time after random time
            mole.classList.remove('up');
            popGame();
        }, timer);
    }
}

function startGame(){
    time = 10;
    score = 0;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    playGame = true;    
    gameResume();
}

function gameResume(){
    displayContent();
    popGame();
    
    gameId = setInterval(function(){
        time--;
        if(time == 0){
            endGame();
        }
        displayContent();
    },1000);
}

function endGame(){
    playGame = false;
    clearInterval(gameId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resumeBtn.disabled = true;

    if(score > bestScore){
        bestScore = score;
        localStorage.setItem('highScoreMole', score);
        displayContent()
        alert(`You've scored max value then previous one: ${score}`);
    }
    else{
        alert(`You're current score is: ${score}`)
    }
    displayContent()
}

function bonk(event){
    if(!event.isTrusted) return;
    if(playGame == false) return;
    if(event.target.classList.contains('up')){
        score++;
        event.target.classList.remove('up');
        event.target.classList.add('bonk');
        displayContent();
    }
    setTimeout(function(){
        event.target.classList.remove('bonk');
    },300)
}


function pauseGame(){
    if(playGame){
        pauseBtn.disabled = true;
        resumeBtn.disabled = false
    }
    playGame = false;
    clearInterval(gameId);
    moles.forEach(box => {
        box.classList.remove('up')
    });
}

function resumeGame(){
    playGame = true;
    pauseBtn.disabled = false;
    resumeBtn.disabled = true;
    gameResume()

}
function resetHignScore(){
    localStorage.clear();
    score = 0;
    bestScore = 0;
    displayContent();
}


webLoad();

startBtn.addEventListener('click', startGame);

moles.forEach(box => {
    box.addEventListener('click',bonk);
});

pauseBtn.addEventListener('click', pauseGame);
resumeBtn.addEventListener('click', resumeGame);
resetBtn.addEventListener('click', resetHignScore)