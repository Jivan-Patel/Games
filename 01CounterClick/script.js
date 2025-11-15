var currentScore = document.querySelector('#currentScore');
var highScore = document.querySelector('#highScore');
var timer = document.querySelector('#timer');

var clickButton = document.querySelector('#clickButton');
var startButton = document.querySelector('#startButton');
var resetButton = document.querySelector('#resetButton');
var pauseButton = document.querySelector('#pauseButton');
var resumeButton = document.querySelector('#resumeButton');
var vdocontainer = document.querySelector('#vdo');
var cpsScore = document.querySelector('#cpsScore');


var statusmessage = document.querySelector('#statusmessage');

var current = 0;     // user -> btn clicked -> data store
var high = 0;        // highscore -> track rakh dake...
var time1 = 10;      // time -> update
var track = false;
var cps = 0;

var idTracker = null;  // time control
var player = localStorage.getItem('userName');
if(player == null){
    player = prompt("Enter Your Name");
    localStorage.setItem('userName',player);
}

const styleObj1 = {
    color: "#ff3b3b",
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.45)",
    scale: "1.25"
}

function loadContent() {         // Load content when game open
    dataLoad();
    displayMessage();
}

function dataLoad() {            // Load Data when game open

    var temp = localStorage.getItem('highScore');
    // If user play game first time -> localStorage -> return null -- otherwise -> data 
    if (temp != null) {
        high = parseInt(temp);
    }
    else {
        high = 0;
    }
};

function displayMessage() {      // To display / change content

    currentScore.textContent = current;
    highScore.textContent = high;
    timer.textContent = time1;
    cpsScore.textContent = cps;


    if (current > 20) {
        Object.assign(currentScore.style, styleObj1)
    }
};

function statusMsg(msg) {
    statusmessage.textContent = msg;
}

function endGame() {
    clearInterval(id);
    track = false;
    clickButton.disabled = true;
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = false;
    clickButton.style.transform = `scale(1)`
    statusMsg(`You clicked ${cps} times per second!`);
    startButton.innerHTML = "Play Again"


    if (current > high) {
        localStorage.setItem('highScore', current);
        high = current;
        displayMessage();
        statusMsg(`Congratulations ${player} you Won The game`);
        alert("You Won the Game!");
        // vdocontainer.style.opacity = 1;
        document.body.style.background = 'gold'
        setTimeout(()=>{
            document.body.style.background = 'var(--primary-color)'
        },2000)

    }
    else if (current == high) {
        statusMsg(` ${player} Your current is equal to previous one`);
        alert("You Tied the preivous high");
    }
    else {
        statusMsg(`${player} Your current score is less compare to previous high`); 
        alert("Try again! You lose the Game!");
    }

}

function gameResume() {
    track = true;
    clickButton.disabled = false;
    startButton.disabled = true;
    pauseButton.disabled = false;
    statusMsg("Click on Click Me button!...");

    id = setInterval(function () {
        time1--;
        
        time1!= 10 ? cps = (current / (10 - time1)).toFixed(1) :cps = current
        if (time1 <= 0) {
            endGame();
        }
        displayMessage();
    }, 1000);
}

function startGame() {
    vdocontainer.style.opacity = 0;
    time1 = 10;
    current = 0;
    cps = 0;
    resetButton.disabled = true;
    clickButton.innerHTML = "Click Me!";
    setTimeout(() => {
        clickButton.innerHTML = ""
    }, 1000)
    displayMessage();
    gameResume();
}

function clickMe() {
    if (track) {
        current++;
        if (current <= 10) {
            const scale = 1 + current / 10;
            clickButton.style.transform = `scale(${scale})`
        }
        displayMessage();
    }
}

function resetHighScore() {
    localStorage.removeItem('highScore');       // Delete High score from local storage 
    high = 0;                                   // reset high variable 
    vdocontainer.style.opacity = 0;
    statusMsg("Your high score is now reset");
    if (time1 <= 0) {
        current = 0;
        cps = 0;                                // reset current variable
    }
    displayMessage();

}

function pauseGame() {
    clickButton.disabled = true;
    pauseButton.disabled = true;
    resumeButton.disabled = false;
    clearInterval(id);
}

function resumeGame() {
    clickButton.disabled = false;
    pauseButton.disabled = false;
    resumeButton.disabled = true;
    displayMessage();
    gameResume();
}


loadContent();
startButton.addEventListener("click", startGame);
clickButton.addEventListener("click", clickMe);
resetButton.addEventListener("click", resetHighScore);
pauseButton.addEventListener("click", pauseGame);
resumeButton.addEventListener("click", resumeGame);