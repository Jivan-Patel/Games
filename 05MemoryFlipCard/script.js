// DOM Elements
const board = document.getElementById('board');
const movesEl = document.getElementById('moves');
const pairsEl = document.getElementById('pairs');
const timeEl = document.getElementById('timeLeft');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const resetBtn = document.getElementById('resetBtn');
const bestScoreEl = document.getElementById('bestScore');
const overlay = document.getElementById('countdownOverlay');


// Game configuration
const rows = 3; // grid layout chosen via CSS; use 6x3 = 18 cards
const cols = 6;
const totalPairs = 9;
const initialTime = 60; // seconds

// State
let firstCard = null;
let secondCard = null;
let busy = false;
let moves = 0;
let matchedPairs = 0;
let timeLeft = initialTime;
let timerId = null;
let pendingTimeouts = [];
let bestScore = null;



function onLoad() {
    var temp = localStorage.getItem('highScore')
    if (temp != null) {
        bestScore = parseInt(temp);
    }
    else {
        bestScore = 0;
    }
}
function displayContent() {
    timeEl.textContent = timeLeft;
    bestScoreEl.textContent = bestScore;
    pairsEl.textContent = matchedPairs;
    movesEl.textContent = moves;
}

var num1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function shuffle(num2) {
    console.log(num2);
    for (let i = num2.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        console.log(j);
        [num2[i], num2[j]] = [num2[j], num2[i]];
    }
    return num2;

}
function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');

    const inner = document.createElement('div');
    inner.classList.add('inner');

    const front = document.createElement('div');
    front.classList.add('front');
    front.textContent = ""

    const back = document.createElement('div');
    back.classList.add('back');
    back.textContent = value;

    inner.appendChild(front);
    inner.appendChild(back);

    card.appendChild(inner);

    return card;
}

function displayValue(card) {
    if (!busy) return;
    if (card == firstCard || card.classList.contains('matched')) return;
    console.log('displayValue run...');
    
    card.classList.add('flipped');  // Adding Fliping the card css

    if (firstCard == null) {        // when user select first card then this block exicute;
        firstCard = card;           // Store cilcked card into firstCard variable
        return;                     // return function if first card flip
    }

    secondCard = card;              // second card fliped by user will store into secondCard variable
    moves++;                        // moves increase...
    movesEl.innerHTML = moves;      // update move into html

    var a = firstCard.querySelector('.back');
    console.log('The vale of a is ' + a.textContent);

    var b = secondCard.querySelector('.back');
    console.log('The vale of b is ' + b.textContent);

    // console.log(firstCard);
    // console.log(secondCard);

    if (a.textContent == b.textContent) {        // Card Matched condition
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        pairsEl.textContent = matchedPairs;

        if (matchedPairs == 9) {
            endGame();
        }
        firstCard = null;
        secondCard = null;
    }
    else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
        }, 700);
    }

}
function createBoxGame() {
    board.innerHTML = "";
    const reshuffleNumber = shuffle([...num1, ...num1]);
    console.log(reshuffleNumber);

    reshuffleNumber.forEach(value => {
        const card = createCard(value);
        // console.log(card);
        board.appendChild(card);

        card.addEventListener('click', () => {
            displayValue(card);
        });
    });
}
function endGame() {
    clearInterval(timerId);
    busy = false;
    firstCard = null;
    secondCard = null;
    startBtn.disabled = false;
}

function statGame() {
    busy = true;
    timeLeft = 60;
    matchedPairs=0;
    moves=0;
    displayContent()
    createBoxGame();
    startBtn.disabled = true;
    timerId = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0 || matchedPairs == 9) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function restartGame(){
    endGame()
    statGame();
}

function resetHighScore(){
    localStorage.clear()
}

createBoxGame();

onLoad();
displayContent();

startBtn.addEventListener('click', statGame);
restartBtn.addEventListener('click',restartGame);
resetBtn.addEventListener('click',resetHighScore);