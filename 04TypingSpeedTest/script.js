// DOM Elements
const textDisplay = document.querySelector('#textDisplay');
const typingArea = document.querySelector('#typingArea');
const timerDisplay = document.querySelector('#timer');
const wpmDisplay = document.querySelector('#wpm');
const accuracyDisplay = document.querySelector('#accuracy');
const bestWpmDisplay = document.querySelector('#bestWPM');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');

// Test Text
const testTexts = [
    "The quick brown fox jumps over the lazy dog. Practice makes perfect when learning to type faster.",
    "Technology has revolutionized the way we communicate and work in the modern digital era.",
    "Typing speed is an essential skill for anyone working with computers in today's workplace.",
    "Consistency is the key to mastering any new habit or improving your daily routine.",
    "Reading regularly helps you expand your vocabulary and improve your communication skills.",
    "Cloud computing has made it easier for people to store and access their data from anywhere.",
    "Artificial intelligence continues to transform industries by automating repetitive tasks.",
    "Good posture is important while typing to avoid back and neck pain during long sessions.",
    "Time management allows you to get more done in less time with reduced stress.",
    "Learning shortcuts on your keyboard can dramatically increase your typing efficiency.",
    "The internet has connected people from all corners of the world, making communication faster than ever.",
    "Focus and accuracy are more important than speed when you start practicing typing.",
    "Creative thinking helps solve complex problems with unique and effective solutions.",
    "Discipline and motivation go hand in hand when trying to achieve long-term goals.",
    "A balanced diet and regular exercise are crucial for maintaining a healthy lifestyle.",
    "Modern education increasingly depends on digital tools and online learning platforms.",
    "Working in teams teaches collaboration, patience, and the importance of communication.",
    "Practicing mindfulness can improve concentration and reduce unnecessary stress.",
    "Innovation often comes from small ideas that grow through experimentation and persistence.",
    "Writing regularly helps organize your thoughts and boosts your ability to express ideas clearly.",
    "Artificial intelligence is transforming industries by automating complex tasks and enhancing decision-making.",
    "Remote work has become increasingly popular, allowing employees to maintain productivity from anywhere.",
    "Learning to code opens up countless opportunities in software development and data analysis.",
    "Cloud computing provides scalable resources for businesses to manage data and applications efficiently.",
    "Cybersecurity is critical in protecting sensitive information from unauthorized access and breaches.",
    "Good keyboard shortcuts can significantly improve your efficiency while working on a computer.",
    "The internet connects billions of people, enabling instant communication across the globe.",
    "Regular practice with typing drills helps build muscle memory and increases accuracy over time.",
    "Virtual reality is changing how we experience gaming, training, and even social interactions.",
    "Data privacy laws are evolving to give individuals more control over their personal information.",
    "Agile methodologies allow development teams to adapt quickly to changing project requirements.",
    "Blockchain technology offers secure and transparent ways to record transactions and contracts.",
    "Ergonomic keyboards and proper posture are key to preventing strain during long typing sessions.",
    "Machine learning algorithms improve by analyzing large datasets and identifying patterns.",
    "Open-source software encourages collaboration and innovation among developers worldwide.",
    "Touch typing without looking at the keyboard is a valuable skill for professional typists.",
    "Quantum computing promises to solve problems that are currently impossible for classical computers.",
    "User experience design focuses on creating intuitive and enjoyable interfaces for applications.",
    "5G networks deliver faster speeds and lower latency for mobile devices and IoT systems.",
    "Version control systems like Git help teams track changes and collaborate on code effectively.",
    "Regular software updates patch vulnerabilities and introduce new features to applications.",
    "Big data analytics enables companies to gain insights and make informed business decisions.",
    "Freelancing platforms connect skilled professionals with clients seeking specific expertise.",
    "Automation tools streamline repetitive tasks, freeing up time for more creative work."
];


// Game state
let currentText = "";
let timeLeft = 60;
let timeInterval = null;
let startTime = null;
let isTestActive = false;
let bestWPM = 0;
let timerInterval = null;
let wpm = 0;
let currentScore = 0;

let lastTypedWords = [];



function webLoad() {
    onLoad();
    displayContent();
}
function onLoad() {
    var temp = sessionStorage.getItem('previousWpm')
    if (temp != null) {
        bestWPM = parseInt(temp);
    }
    else {
        bestWPM = 0;
    }
}
function displayContent() {
    timerDisplay.textContent = timeLeft;
    bestWpmDisplay.textContent = bestWPM;
}
function randomSentence() {
    return testTexts[Math.floor(Math.random() * testTexts.length)]
}
function startGame() {
    wpm = 0;
    timeLeft = 60;
    startBtn.disabled = true;
    currentText = randomSentence();
    textDisplay.innerHTML = currentText;
    typingArea.disabled = false;
    typingArea.setAttribute('placeholder', "Now you can start your typing test...");
    typingArea.value = "";
    typingArea.focus();
    startTime = Date.now();     // return time in millisecond

    timerInterval = setInterval(function () {
        timeLeft--;
        if (timeLeft <= 0) {
            endGame();
        }
        displayContent();
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    typingArea.disabled = true;
    timeLeft = 60;
    if (wpm > bestWPM) {
        sessionStorage.setItem('previousWpm', wpm)
        bestWPM = wpm;
    }
    displayContent();
}

function updateStatus() {
    var typed = typingArea.value;
    var word = typed.trim().split(/\s+/).filter(w => w.length > 0);
    // we can ignore () and {} from arrow functio if there is only one line in the arrow function
    const elapsedTime = (Date.now() - startTime) / (60 * 1000);
    wpm = Math.round((word.length + lastTypedWords.length) / elapsedTime);

    wpmDisplay.textContent = wpm;

    currentScore = 0;
    for (let i = 0; i < currentText.length; i++) {
        if (currentText[i] == typed[i]) {
            currentScore++;
        }
    }
    const accuracy = (typed.length > 0) ? Math.floor(currentScore / typed.length * 100) : 0;
    accuracyDisplay.textContent = accuracy;

}

function wordType() {
    // console.log(startTime);
    updateStatus();
    highlight();
}

function resetSession() {
    bestWPM = 0;
    sessionStorage.clear();
    displayContent();
}

function highlight() {
    var typed = typingArea.value;
    var highlightText = "";

    for (let i = 0; i < currentText.length; i++) {
        if (i < typed.length) {
            if (currentText[i] == typed[i]) {
                highlightText += `<span class="correct">${currentText[i]}</span>`;

            }
            else {
                highlightText += `<span class="incorrect">${currentText[i]}</span>`;
            }
        }
        else if (i == typed.length) {
            highlightText += `<span class="current">${currentText[i]}</span>`;
        }
        else {
            highlightText += currentText[i];
        }
    }
    textDisplay.innerHTML = highlightText;
    newText();
}

function newText() {
    if (currentScore == currentText.length) {
        lastTypedWords.push(...typingArea.value.trim().split(/\s+/).filter(w => w.length > 0));
        currentText = randomSentence();
        textDisplay.innerHTML = currentText;
        typingArea.value = "";
    }
}

webLoad();
startBtn.addEventListener('click', startGame);
typingArea.addEventListener('input', wordType);
// input will monitor whether user pressed any single key or not

resetBtn.addEventListener('click', resetSession);