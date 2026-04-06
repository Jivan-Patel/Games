# JavaScript Mini Games Collection

A beginner-friendly collection of browser games and mini-apps built with vanilla HTML, CSS, and JavaScript.

This repository is organized as independent folders, where each project runs directly in the browser without a build tool.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Games Included](#games-included)
- [Prerequisites](#prerequisites)
- [How to Run](#how-to-run)
- [How to Use](#how-to-use)
- [Data Persistence](#data-persistence)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

## Overview

This project contains multiple JavaScript practice projects:

- Tic-Toe-Tic (3x3 and 6x6 variants)
- Click Counter
- Color Guessing Game
- Whack-a-Mole
- Typing Speed Test
- Memory Flip Card
- To-Do Challenge

Primary goals:

- Practice DOM manipulation and event handling
- Work with timers and game loops
- Use localStorage and sessionStorage for persistence
- Build interactive UI logic without external frameworks

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES6+)
- Browser Storage APIs: localStorage, sessionStorage

## Project Structure

```text
Games/
├─ index.html
├─ 00Tic-Toe-Tic/
│  ├─ index.html
│  ├─ 3-3.html
│  ├─ 6-6.html
│  ├─ script3.js
│  ├─ script6.js
│  ├─ style.css
│  ├─ style3.css
│  └─ style6.css
├─ 01CounterClick/
│  ├─ index.html
│  ├─ script.js
│  └─ style.css
├─ 02ColorGuessing/
│  ├─ index.html
│  ├─ script.js
│  └─ style.css
├─ 03Whack-a-Mole/
│  ├─ index.html
│  ├─ script.js
│  └─ style.css
├─ 04TypingSpeedTest/
│  ├─ index.html
│  ├─ script.js
│  └─ style.css
├─ 05MemoryFlipCard/
│  ├─ index.html
│  ├─ script.js
│  └─ style.css
└─ 06ToDoChallenge/
   ├─ index.html
   ├─ script.js
   └─ style.css
```

## Games Included

### 1) 01CounterClick

A 10-second click speed challenge.

Features:

- Current score, high score, and clicks-per-second (CPS)
- Start, pause, resume, and high-score reset controls
- Player name prompt and persistent high score in localStorage

Entry point: `01CounterClick/index.html`

### 2) 02ColorGuessing

Guess the correct RGB color from multiple options.

Features:

- Easy mode (3 options) and Hard mode (6 options)
- Current streak and best streak tracking
- Separate best streak persistence for easy and hard mode

Entry point: `02ColorGuessing/index.html`

### 3) 03Whack-a-Mole

Classic reaction game with random mole appearances.

Features:

- 60-second timed gameplay
- Score, best score, last game score, and fastest hit timing
- Pause, resume, and reset controls

Entry point: `03Whack-a-Mole/index.html`

### 4) 04TypingSpeedTest

Timed typing test with sentence randomization.

Features:

- 15s, 30s, and 60s test durations
- Live WPM and accuracy calculation
- Character-by-character text highlighting
- Session-based best WPM tracking

Entry point: `04TypingSpeedTest/index.html`

### 5) 05MemoryFlipCard

Card matching game on a 6x3 grid.

Features:

- 60-second timer
- Move count and pair count
- Start, restart, and hard reset actions
- Best score display support

Entry point: `05MemoryFlipCard/index.html`

### 6) 06ToDoChallenge

To-do list manager with filtering and bulk actions.

Features:

- Add, complete/uncomplete, and delete tasks
- Filter: All, Pending, Completed
- Delete selected (completed) and delete all
- Live counters for completed and total tasks

Entry point: `06ToDoChallenge/index.html`

### 7) 00Tic-Toe-Tic

Two Tic-Toe-Tic variants:

- 3x3 board (`3-3.html`)
- 6x6 board (`6-6.html`)

Features:

- Two-player turn-based mode (X and O)
- Winner and draw detection

Entry point: `00Tic-Toe-Tic/index.html`

## Prerequisites

- A modern web browser (Chrome, Edge, Firefox, or Safari)
- JavaScript enabled in the browser
- Optional: VS Code or any code editor for development

## How to Run

No installation is required.

1. Clone or download this repository.
2. Open the project folder in your editor.
3. Launch any game by opening its `index.html` file in your browser.

Quick start options:

- Main launcher page: `index.html`
- Individual game pages: open each folder's `index.html`

## How to Use

- Use the root launcher (`index.html`) to open the listed games.
- For Tic-Toe-Tic, open `00Tic-Toe-Tic/index.html` manually from the folder.
- Most games include in-page buttons for start/reset/mode selection.

## Data Persistence

The project uses browser storage APIs:

- `localStorage`
  - Counter high score
  - Color Guessing best streaks
  - Whack-a-Mole best score
  - Memory game high score key usage
- `sessionStorage`
  - Whack-a-Mole last score and fastest hit
  - Typing Speed Test best WPM (session-based)

To clear stored values:

- Use each game's reset button where available, or
- Clear site data from browser dev tools.

## Known Limitations

- No automated tests are included yet.
- Some UI labels and naming are inconsistent (for example, "Resert" vs "Reset").
- Root launcher currently does not include a link to the Tic-Toe-Tic folder.
- There is no package manager setup, linting, or formatting pipeline.

## Roadmap

- Add a unified home page linking all projects, including Tic-Toe-Tic
- Standardize naming and UI text across all games
- Add accessibility improvements (keyboard support, ARIA labels, color contrast checks)
- Add lightweight test coverage for core game logic
- Add deployment instructions (GitHub Pages or Netlify)

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes with clear commit messages.
4. Open a pull request with:
   - What changed
   - Why it changed
   - Screenshots or recordings for UI changes

## License

No explicit license file is currently present in this repository.

If you plan to share or reuse this project publicly, add a license file (for example, MIT) at the root.

## Author

Created as a JavaScript practice project collection by the repository owner.
