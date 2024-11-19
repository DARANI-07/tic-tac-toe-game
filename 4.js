let currentPlayer = '';
const cells = document.querySelectorAll('.cell');
const resultDisplay = document.getElementById('result');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const restartBtn = document.getElementById('restartBtn');
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

document.getElementById('btnX').addEventListener('click', function() {
    currentPlayer = 'X';
    closeModal();
});
  
document.getElementById('btnO').addEventListener('click', function() {
    currentPlayer = 'O';
    closeModal();
});

cells.forEach(cell => {
    cell.addEventListener('click', function() {
        if (this.textContent === '' && gameActive) {
            this.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch players
        }
    });
});

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function checkWinner() {
    const winningCombinations = [
        ['b1', 'b2', 'b3'],
        ['b4', 'b5', 'b6'],
        ['b7', 'b8', 'b9'],
        ['b1', 'b4', 'b7'],
        ['b2', 'b5', 'b8'],
        ['b3', 'b6', 'b9'],
        ['b1', 'b5', 'b9'],
        ['b3', 'b5', 'b7']
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (document.getElementById(a).textContent === currentPlayer &&
            document.getElementById(b).textContent === currentPlayer &&
            document.getElementById(c).textContent === currentPlayer) {
            resultDisplay.textContent = `${currentPlayer} wins!`;
            updateScore(currentPlayer);
            gameActive = false; // End the game
            restartBtn.style.display = 'inline'; // Show restart button
            return;
        }
    }

    // Check for draw
    if ([...cells].every(cell => cell.textContent !== '')) {
        resultDisplay.textContent = 'It\'s a draw!';
        gameActive = false; // End the game
        restartBtn.style.display = 'inline'; // Show restart button
    }
}

function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    }
}

restartBtn.addEventListener('click', restartGame);

function restartGame() {
    cells.forEach(cell => cell.textContent = ''); // Clear all cells
    resultDisplay.textContent = ''; // Clear result display
    currentPlayer = ''; // Reset current player
    gameActive = true; // Set game active
    restartBtn.style.display = 'none'; // Hide restart button
    document.getElementById('myModal').style.display = 'flex'; // Show modal to pick X or O
}