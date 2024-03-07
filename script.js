document.addEventListener('DOMContentLoaded', function () {
    const popup = document.querySelector('.popup');
    const closeButton = document.querySelector('.close-button');

    closeButton.addEventListener('click', function () {
        popup.classList.add('hidden');
        startGame(); // Start the game when the popup is closed
    });

    popup.classList.remove('hidden');
});
const leaderboard = document.getElementById('leaderboard');
const leaderList = document.getElementById('leaderList');
const MAX_LEADERS = 5;

let guessesLeft = 6;
let targetWord;

function startGame() {
    // Set initial random word
    targetWord = getRandomWord();

    // Set up timer for 1 minute
    let timeLeft = 120;
    const timerElement = document.getElementById('timer');

    function updateTimer() {
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft === 0) {
            const feedbackContainer = document.getElementById('feedback');
            feedbackContainer.innerHTML += `<div style="color: red;">Time's up! The word was ${targetWord}.</div>`;
            endGame();
        } else {
            timeLeft--;
            timerId = setTimeout(updateTimer, 1000);
        }
    }

    // Start the timer when the game starts
    updateTimer();
}

function getRandomWord() {
    const wordList = ["apple", "fight", "range", "grape", "berry", "melon", "teach", "sleep", "glide", "peach"];
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function submitGuess() {
    const input = document.getElementById('guessInput');
    const guess = input.value.toLowerCase();
    const feedbackContainer = document.getElementById('feedback');

    if (guess.length !== 5) {
        alert('Guesses must be exactly 5 letters.');
        return;
    }

    let feedback = '';
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === targetWord[i]) {
            feedback += `<span style="color: green;">${guess[i]}</span>`;
        } else if (targetWord.includes(guess[i])) {
            feedback += `<span style="color: orange;">${guess[i]}</span>`;
        } else {
            feedback += `<span style="color: grey;">${guess[i]}</span>`;
        }
    }

    guessesLeft--;
    feedback += ` - Guesses left: ${guessesLeft}`;

    feedbackContainer.innerHTML += `<div>${feedback}</div>`;

    input.value = '';

    if (guess === targetWord) {
        feedbackContainer.innerHTML += '<div style="color: green;">Congratulations! You guessed the word!</div>';
        endGame();

        // Stop the timer when the word is guessed correctly
        clearTimeout(timerId);
    } else if (guessesLeft <= 0) {
        feedbackContainer.innerHTML += `<div style="color: red;">Out of guesses! The word was ${targetWord}.</div>`;
        endGame();
    }
}

// function endGame() {
//     document.getElementById('guessInput').disabled = true;
//     document.getElementById('guessButton').disabled = true;
//     document.getElementById('resetButton').style.display = 'inline';
// }

document.getElementById('guessInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && !document.getElementById('guessButton').disabled) {
        submitGuess();
    }
});

function resetGame() {
    guessesLeft = 6;
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('resetButton').style.display = 'none';
    startGame(); // Restart the game when the button is clicked
}



// Function to update the leaderboard
function updateLeaderboard() {
  leaderList.innerHTML = ''; // Clears the current list

  // Simulates random names and points
  const leaders = [];
  for (let i = 0; i < MAX_LEADERS; i++) {
    const name = generateRandomName();
    const points = generateRandomPoints();
    leaders.push({ name, points });
  }

  // Sorts leaders by points (descending order)
  leaders.sort((a, b) => b.points - a.points);

  // Displays the leaderboard
  leaders.slice(0, MAX_LEADERS).forEach((leader, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${leader.name}: ${leader.points} points`;
    leaderList.appendChild(listItem);
  });
}

// Function to generate a random name
function generateRandomName() {
  const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry'];
  return names[Math.floor(Math.random() * names.length)];
}

// Function to generate a random number of points
function generateRandomPoints() {
  return Math.floor(Math.random() * 1000);
}

function endGame() {
    document.getElementById('guessInput').disabled = true;
    document.getElementById('guessButton').disabled = true;
    document.getElementById('resetButton').style.display = 'inline';

    // Call the function to update the leaderboard after each game
    updateLeaderboard();
}